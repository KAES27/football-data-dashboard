import os
import time
import requests
from dotenv import load_dotenv
from collections import deque
from typing import Any, Deque, Dict, Optional

load_dotenv()

API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.football-data.org/v4"

if not API_KEY:
    raise ValueError("API_KEY introuvable dans le fichier .env")

HEADERS = {
    "X-Auth-Token": API_KEY
}

# Limite API: 10 appels par minute
MAX_CALLS_PER_MINUTE = 10
WINDOW_SECONDS = 60
_request_timestamps: Deque[float] = deque(maxlen=MAX_CALLS_PER_MINUTE)

# Les compétitions que tu veux suivre
COMPETITIONS = {
    "PL": "Premier League",
    "PD": "La Liga",
    "FL1": "Ligue 1",
    "SA": "Serie A",
    "BL1": "Bundesliga",
}


def _respect_rate_limit() -> None:
    """
    Attend si nécessaire pour rester sous la limite de 10 appels/minute.
    """
    now = time.time()
    if len(_request_timestamps) < MAX_CALLS_PER_MINUTE:
        return

    oldest = _request_timestamps[0]
    elapsed = now - oldest
    if elapsed < WINDOW_SECONDS:
        sleep_time = WINDOW_SECONDS - elapsed + 0.05
        print(f"Rate limit: pause de {sleep_time:.1f}s...")
        time.sleep(sleep_time)


def make_request(endpoint: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    """
    Envoie une requête GET à l'API football-data et retourne le JSON.
    """
    url = f"{BASE_URL}{endpoint}"
    max_retries = 3

    for attempt in range(max_retries + 1):
        _respect_rate_limit()
        response = requests.get(url, headers=HEADERS, params=params, timeout=30)
        _request_timestamps.append(time.time())
        response.raise_for_status()
        return response.json()

    raise requests.HTTPError(
        f"Échec après {max_retries + 1} tentatives pour {endpoint} (limite API)."
    )


def get_competition(competition_code: str) -> Dict[str, Any]:
    """
    Récupère les infos d'une compétition.
    Exemple : PL, FL1, PD...
    """
    return make_request(f"/competitions/{competition_code}")


def get_teams(competition_code: str, season: Optional[int] = None) -> Dict[str, Any]:
    """
    Récupère les équipes d'une compétition.
    """
    params = {}
    if season:
        params["season"] = season
    return make_request(f"/competitions/{competition_code}/teams", params=params)


def get_matches(
    competition_code: str,
    season: Optional[int] = None,
    status: Optional[str] = None,
    matchday: Optional[int] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    stage: Optional[str] = None,
    group: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Récupère les matchs d'une compétition avec filtres optionnels.
    """
    params = {}

    if season:
        params["season"] = season
    if status:
        params["status"] = status
    if matchday:
        params["matchday"] = matchday
    if date_from:
        params["dateFrom"] = date_from
    if date_to:
        params["dateTo"] = date_to
    if stage:
        params["stage"] = stage
    if group:
        params["group"] = group

    return make_request(f"/competitions/{competition_code}/matches", params=params)




def get_standings(
    competition_code: str,
    season: Optional[int] = None,
    matchday: Optional[int] = None,
    date: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Récupère le classement d'une compétition.
    """
    params = {}
    if season:
        params["season"] = season
    if matchday:
        params["matchday"] = matchday
    if date:
        params["date"] = date

    return make_request(f"/competitions/{competition_code}/standings", params=params)


def get_scorers(
    competition_code: str,
    season: Optional[int] = None,
    limit: Optional[int] = 10,
) -> Dict[str, Any]:
    """
    Récupère les meilleurs buteurs d'une compétition.
    """
    params = {}
    if season:
        params["season"] = season
    if limit:
        params["limit"] = limit

    return make_request(f"/competitions/{competition_code}/scorers", params=params)


def get_team(team_id: int) -> Dict[str, Any]:
    """
    Récupère les infos d'une équipe.
    """
    return make_request(f"/teams/{team_id}")


def get_team_matches(
    team_id: int,
    season: Optional[int] = None,
    status: Optional[str] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    venue: Optional[str] = None,
    limit: Optional[int] = None,
    competitions: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Récupère les matchs d'une équipe.
    competitions doit être une string d'ids séparés par des virgules si utilisé.
    """
    params = {}

    if season:
        params["season"] = season
    if status:
        params["status"] = status
    if date_from:
        params["dateFrom"] = date_from
    if date_to:
        params["dateTo"] = date_to
    if venue:
        params["venue"] = venue
    if limit:
        params["limit"] = limit
    if competitions:
        params["competitions"] = competitions

    return make_request(f"/teams/{team_id}/matches", params=params)


def get_match(match_id: int) -> Dict[str, Any]:
    """
    Récupère le détail d'un match.
    """
    return make_request(f"/matches/{match_id}")


def get_match_head2head(
    match_id: int,
    limit: Optional[int] = 10,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    competitions: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Récupère les confrontations précédentes d'un match.
    """
    params = {}

    if limit:
        params["limit"] = limit
    if date_from:
        params["dateFrom"] = date_from
    if date_to:
        params["dateTo"] = date_to
    if competitions:
        params["competitions"] = competitions

    return make_request(f"/matches/{match_id}/head2head", params=params)



if __name__ == "__main__":
    
    team=get_matches(competition_code="PL",date_from="2026-03-14")
    print(team)

    
