from typing import Any, Dict
import pandas as pd

def transform_competition(raw_competition_data: Dict[str, Any]) -> pd.DataFrame:
    row = {
        "competition_id": raw_competition_data.get("id"),
        "code": raw_competition_data.get("code"),
        "name": raw_competition_data.get("name"),
        "emblem": raw_competition_data.get("emblem"),
    }
    return pd.DataFrame([row])


def transform_team_identity(team):
    return {
        "team_id": team.get("id"),
        "name": team.get("name"),
        "short_name": team.get("shortName"),
        "tla": team.get("tla"),
        "crest": team.get("crest"),
    }

def transform_teams(raw_teams_data):
    teams = raw_teams_data.get("teams", [])
    rows = [transform_team_identity(team) for team in teams]
    return pd.DataFrame(rows)


def transform_standing(raw_standing_data: Dict[str, Any]) -> pd.DataFrame:
    standings_list = raw_standing_data.get("standings", [])
    competition_id = raw_standing_data.get("competition", {}).get("id")

    if not standings_list:
        return pd.DataFrame()

    standing_table = standings_list[0].get("table", [])
    df = pd.DataFrame(standing_table)
    df["competition_id"] = competition_id
    df["team_id"] = df["team"].apply(lambda x: x["id"])
    df = df[
        [
            "competition_id",
            "team_id",
            "position",
            "playedGames",
            "won",
            "draw",
            "lost",
            "points",
            "goalsFor",
            "goalsAgainst",
            "goalDifference",
        ]
    ]
    df = df.rename(columns={
        "playedGames": "played_games",
        "goalsFor": "goals_for",
        "goalsAgainst": "goals_against",
        "goalDifference": "goal_difference",
    })
    return df

def transform_squad(raw_squad_data: Dict[str, Any]) -> pd.DataFrame:
    squad = raw_squad_data.get("squad", [])
    team_id = raw_squad_data.get("id")

    if not squad:
        return pd.DataFrame()

    rows = []
    for player in squad:
        player_id = player.get("id")
        if not player_id:
            continue

        rows.append({
            "team_id": team_id,
            "player_id": player_id,
            "name": player.get("name"),
            "position": player.get("position"),
            "date_of_birth": player.get("dateOfBirth"),
            "nationality": player.get("nationality"),
            "shirt_number": player.get("shirtNumber"),
        })

    if not rows:
        return pd.DataFrame()

    return pd.DataFrame(rows)

def transform_coach(raw_team_data: Dict[str, Any]) -> pd.DataFrame:
    coach = raw_team_data.get("coach")
    coach_id = coach.get("id") if coach else None
    if not coach_id:
        return pd.DataFrame()
    return pd.DataFrame([{
        "coach_id": coach_id,
        "team_id": raw_team_data.get("id"),
        "name": coach.get("name"),
        "date_of_birth": coach.get("dateOfBirth"),
        "nationality": coach.get("nationality"),
    }])


def transform_match(raw_match_data: Dict[str, Any]) -> Dict[str, Any]:
    score = raw_match_data.get("score", {})
    full_time = score.get("fullTime", {})

    return {
        "match_id": raw_match_data.get("id"),
        "competition_id": raw_match_data.get("competition", {}).get("id"),
        "utc_date": raw_match_data.get("utcDate"),
        "status": raw_match_data.get("status"),
        "matchday": raw_match_data.get("matchday"),
        "venue": raw_match_data.get("venue"),
        "home_team_id": raw_match_data.get("homeTeam", {}).get("id"),
        "away_team_id": raw_match_data.get("awayTeam", {}).get("id"),
        "winner": score.get("winner"),
        "home_score": full_time.get("home"),
        "away_score": full_time.get("away"),
    }


def transform_matches(raw_matches_data: Dict[str, Any]) -> pd.DataFrame:
    matches = raw_matches_data.get("matches", [])
    rows = [transform_match(match) for match in matches]
    return pd.DataFrame(rows)


def transform_goals(raw_match_data: Dict[str, Any]) -> pd.DataFrame:
    goals = raw_match_data.get("goals", [])
    if not goals:
        return pd.DataFrame(columns=[
            "match_id",
            "scorer_id",
            "scorer_name",
            "team_id",
            "minute",
            "type"
        ])
    rows = []
    for goal in goals:
        rows.append({
            "match_id": raw_match_data.get("id"),
            "scorer_id": goal.get("scorer", {}).get("id"),
            "scorer_name": goal.get("scorer", {}).get("name"),
            "team_id": goal.get("team", {}).get("id"),
            "minute": goal.get("minute"),
            "type": goal.get("type"),
        })
    return pd.DataFrame(rows)

def transform_scorers(raw_scorers_data: Dict[str, Any]) -> pd.DataFrame:
    scorers = raw_scorers_data.get("scorers", [])
    competition_id = raw_scorers_data.get("competition", {}).get("id")

    rows = []

    for scorer in scorers:
        rows.append({
            "competition_id": competition_id,
            "scorer_id": scorer.get("player", {}).get("id"),
            "scorer_name": scorer.get("player", {}).get("name"),
            "team_id": scorer.get("team", {}).get("id"),
            "played_matches": scorer.get("playedMatches"),
            "goals": scorer.get("goals"),
        })

    return pd.DataFrame(rows)
