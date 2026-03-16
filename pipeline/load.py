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


def load_dataframe(df: pd.DataFrame, table_name: str):
    if df.empty:
        print(f"Aucune donnee pour {table_name}")
        return

    # Convertit NaN en None et numpy types en types Python natifs.
    df = df.astype(object).where(pd.notnull(df), None)

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

    query = f"""
        INSERT INTO {table_name} ({cols})
        VALUES ({placeholders})
        ON CONFLICT DO NOTHING
    """

    with conn.cursor() as cur:
        cur.executemany(query, values)
        conn.commit()

    print(f"{len(values)} lignes inserees dans {table_name}")
