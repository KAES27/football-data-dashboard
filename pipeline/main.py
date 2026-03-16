from extract import (
    COMPETITIONS,
    get_competition,
    get_matches,
    get_scorers,
    get_standings,
    get_teams,
)
from transform import (
    transform_competition,
    transform_matches,
    transform_scorers,
    transform_standing,
    transform_teams,
)
from load import load_dataframe


def main():
    for competition_code, competition_name in COMPETITIONS.items():
        print(f"\n=== {competition_name} ({competition_code}) ===")

        raw_competition = get_competition(competition_code)
        competition_df = transform_competition(raw_competition)
        load_dataframe(competition_df, "competitions")

        raw_teams = get_teams(competition_code)
        teams_df = transform_teams(raw_teams)
        load_dataframe(teams_df, "teams")

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
