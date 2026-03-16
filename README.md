# Football Data Project

Projet final: construire un site web de donnees football (backend + frontend).

Etat actuel du projet: la partie pipeline ETL est en place pour recuperer et charger les donnees dans PostgreSQL.

## Objectif final

Construire un site qui permet de consulter les donnees des 5 grands championnats.

## Objectif actuel (en cours)

Recuperer puis stocker en base:
- competitions
- teams
- matches
- standings
- scorers

Championnat cibles:
- `PL` (Premier League)
- `PD` (La Liga)
- `FL1` (Ligue 1)
- `SA` (Serie A)
- `BL1` (Bundesliga)

## Structure du projet

- `pipeline/`
  - `extract.py` : appels API + gestion limite 10 calls/min
  - `transform.py` : transformation JSON -> DataFrame
  - `load.py` : insertion PostgreSQL
  - `main.py` : orchestration ETL
- `database/schema.sql` : creation des tables
- `backend/` : API du site (en cours)
- `frontend/` : interface du site (en cours)

## Prerequis

- Python 3.10+
- PostgreSQL
- Un token API sur `https://www.football-data.org/`

## Installation

Depuis le dossier `football-data-project`:

```bash
pip install pandas requests psycopg2-binary python-dotenv
```

## Configuration

Creer/editer le fichier `.env`:

```env
API_KEY=your_api_key
DB_NAME=football_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

## Initialiser la base

1. Creer la base `football_db` dans PostgreSQL.
2. Executer le schema:

```bash
psql -U postgres -d football_db -f database/schema.sql
```

## Lancer la pipeline

```bash
python pipeline/main.py
```

Le script charge automatiquement les 5 championnats.

## Notes importantes

- Limite API: 10 appels/minute geree dans `extract.py`.
- Les insertions utilisent `ON CONFLICT DO NOTHING` pour eviter les doublons.
- `load.py` convertit les types `numpy` pour eviter l'erreur `can't adapt type 'numpy.int64'`.

## Erreurs frequentes

- `API_KEY introuvable`:
  - Verifier le fichier `.env` et le nom de variable `API_KEY`.
- `connection to server at "localhost" failed`:
  - Verifier que PostgreSQL tourne.
- `relation "xxx" does not exist`:
  - Rejouer `database/schema.sql`.
- `violates foreign key constraint`:
  - Lancer via `pipeline/main.py` (ordre de chargement deja gere).

## Prochaines etapes

- Ajouter les tables et le chargement pour:
  - `goals`
  - `coach`
  - `squad`
- Ajouter des tests unitaires sur `transform.py`.
- Brancher backend/frontend sur la base pour exposer les donnees.
