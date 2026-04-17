import os
import numpy as np
import pandas as pd
import psycopg2
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
)

CONFLICT_COLUMNS_BY_TABLE = {
    "competitions": ["competition_id"],
    "teams": ["team_id"],
    "coaches": ["team_id"],
    "squads": ["team_id", "player_id"],
    "matches": ["match_id"],
    "standings": ["competition_id", "team_id"],
    "scorers": ["scorer_id", "competition_id"],
}


def load_dataframe(df: pd.DataFrame, table_name: str):
    if df.empty:
        print(f"Aucune donnee pour {table_name}")
        return

    # Convertit NaN en None et numpy types en types Python natifs.
    df = df.astype(object).where(pd.notnull(df), None)

    # On construit la requete depuis les colonnes du DataFrame.
    columns = list(df.columns)
    values = []

    for row in df.to_numpy():
        converted_row = []
        for value in row:
            if isinstance(value, np.generic):
                converted_row.append(value.item())
            else:
                converted_row.append(value)
        values.append(tuple(converted_row))

    cols = ",".join(columns)
    placeholders = ",".join(["%s"] * len(columns))

    conflict_columns = CONFLICT_COLUMNS_BY_TABLE.get(table_name)
    if not conflict_columns:
        raise ValueError(f"Table non supportee pour upsert: {table_name}")

    update_columns = [col for col in columns if col not in conflict_columns]
    conflict_target = ",".join(conflict_columns)

    if update_columns:
        set_clause = ",".join([f"{col}=EXCLUDED.{col}" for col in update_columns])
        conflict_clause = f"ON CONFLICT ({conflict_target}) DO UPDATE SET {set_clause}"
    else:
        conflict_clause = f"ON CONFLICT ({conflict_target}) DO NOTHING"

    query = f"""
        INSERT INTO {table_name} ({cols})
        VALUES ({placeholders})
        {conflict_clause}
    """

    # executemany envoie toutes les lignes en un lot.
    with conn.cursor() as cur:
        # coaches a deux contraintes d'unicite (coach_id PK et team_id UNIQUE).
        # On purge d'abord les lignes potentiellement en conflit pour eviter
        # les collisions croisées pendant l'upsert.
        if table_name == "coaches":
            coach_id_idx = columns.index("coach_id")
            team_id_idx = columns.index("team_id")
            coach_ids = [row[coach_id_idx] for row in values if row[coach_id_idx] is not None]
            team_ids = [row[team_id_idx] for row in values if row[team_id_idx] is not None]

            if coach_ids or team_ids:
                cur.execute(
                    """
                    DELETE FROM coaches
                    WHERE coach_id = ANY(%s) OR team_id = ANY(%s)
                    """,
                    (coach_ids or [None], team_ids or [None]),
                )

        cur.executemany(query, values)
        conn.commit()

    print(f"{len(values)} lignes inserees dans {table_name}")
