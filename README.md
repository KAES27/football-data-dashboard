# Football Data Project

Dashboard football full-stack:
- ETL Python (Football-Data API -> PostgreSQL)
- Backend Node/Express
- Frontend React + Vite

## Etat actuel

Le projet permet deja de:
- charger les donnees principales en base (`competitions`, `teams`, `coaches`, `squads`, `matches`, `standings`, `scorers`)
- exposer les donnees via API REST
- naviguer dans le frontend avec React Router (competitions, standings, matches, scorers, teams)

Championnat cibles:
- `PL` (Premier League)
- `PD` (La Liga)
- `FL1` (Ligue 1)
- `SA` (Serie A)
- `BL1` (Bundesliga)

## Architecture

```text
Football-Data API -> Pipeline ETL -> PostgreSQL -> Backend API -> Frontend React
```

### 1) Pipeline ETL (`pipeline/`)
- `extract.py`: appels API + rate limit (10 calls/min)
- `transform.py`: normalisation JSON -> DataFrames
- `load.py`: insertion PostgreSQL
- `main.py`: orchestration ETL

### 2) Base de donnees (`database/`)
- `schema.sql`: schema relationnel principal

### 3) Backend API (`backend/src/`)
- `routes/`: endpoints HTTP
- `controllers/`: logique metier + requetes SQL
- `db/db.js`: connexion PostgreSQL
- `app.js`: config Express + CORS
- `server.js`: demarrage serveur (port `3000`)

### 4) Frontend (`frontend/src/`)
- `pages/`: pages principales
- `components/`: composants UI (navbar, dropdown, matchs, standings, etc.)
- `services/api.js`: appels backend centralises
- `main.jsx` / `App.jsx`: point d'entree React Router

## Prerequis

- Python 3.10+
- Node.js 18+
- PostgreSQL
- Token API Football-Data (`https://www.football-data.org/`)

## Configuration `.env`

A la racine du projet:

```env
API_KEY=your_api_key
DB_NAME=football_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

## Setup et lancement

### 1) Initialiser la base

```bash
psql -U postgres -d football_db -f database/schema.sql
```

### 2) Lancer l'ETL

```bash
pip install pandas requests psycopg2-binary python-dotenv
python pipeline/main.py
```

### 3) Lancer le backend

```bash
cd backend
npm install
npm run dev
```

Backend disponible sur `http://localhost:3000`.

### 4) Lancer le frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend Vite en local (port affiche dans le terminal, souvent `5173`).

## Endpoints backend disponibles

### Competitions
- `GET /competitions`
- `GET /competitions/:code`

### Teams
- `GET /competitions/:code/teams`
- `GET /teams/:id`
- `GET /teams/:id/details`

### Matches
- `GET /competitions/:code/matches`
- `GET /matches/:id`
- `GET /teams/:id/matches`

### Standings
- `GET /competitions/:code/standings`

### Top scorers
- `GET /competitions/:code/top_scorers`

## Notes

- Le chargement ETL utilise `ON CONFLICT DO NOTHING` dans `load.py`.
- `shirt_number` peut etre `NULL` selon les donnees renvoyees par l'API source.

