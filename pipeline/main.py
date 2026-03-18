from extract import (
    COMPETITIONS,
    get_competition,
    get_matches,
    get_team,
    get_scorers,
    get_standings,
    get_teams,
)
from transform import (
    transform_coach,
    transform_competition,
    transform_matches,
    transform_scorers,
    transform_squad,
    transform_standing,
    transform_teams,
)

import pandas as pd
from load import load_dataframe

def main():
    # On charge competition par competition pour garder un flux ETL lisible.
    for competition_code, competition_name in COMPETITIONS.items():
        print(f"\n=== {competition_name} ({competition_code}) ===")

        # 1) Reference competition (parents FK)
        raw_competition = get_competition(competition_code)
        competition_df = transform_competition(raw_competition)
        load_dataframe(competition_df, "competitions")

        # 2) Teams (utilisees ensuite par matches, standings, scorers)
        raw_teams = get_teams(competition_code)
        teams_df = transform_teams(raw_teams)
        load_dataframe(teams_df, "teams")

        coach_frames = []
        squad_frames = []

        for team in raw_teams.get("teams", []):
            team_id = team.get("id")
            raw_team_data = team

            # Si l'endpoint competition ne renvoie pas coach/squad, on complete via /teams/{id}.
            if (not team.get("coach")) and (not team.get("squad")) and team_id:
                raw_team_data = get_team(team_id)

            coach_df = transform_coach(raw_team_data)
            if not coach_df.empty:
                coach_frames.append(coach_df)

            squad_df = transform_squad(raw_team_data)
            if not squad_df.empty:
                squad_frames.append(squad_df)

        coaches_df = pd.concat(coach_frames, ignore_index=True) if coach_frames else pd.DataFrame()
        squads_df = pd.concat(squad_frames, ignore_index=True) if squad_frames else pd.DataFrame()

        load_dataframe(coaches_df, "coaches")
        load_dataframe(squads_df, "squads")

        # 3) Donnees de competition dependantes des equipes
        raw_matches = get_matches(competition_code)
        matches_df = transform_matches(raw_matches)
        load_dataframe(matches_df, "matches")

        raw_standings = get_standings(competition_code)
        standings_df = transform_standing(raw_standings)
        load_dataframe(standings_df, "standings")

        raw_scorers = get_scorers(competition_code)
        scorers_df = transform_scorers(raw_scorers)
        load_dataframe(scorers_df, "scorers")


if __name__ == "__main__":
    main()
