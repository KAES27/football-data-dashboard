# Football Data Project

Projet full-stack autour de la data football :
- pipeline ETL Python pour collecter et charger les donnees
- base PostgreSQL pour stocker les donnees structurees
- backend Node.js / Express pour exposer une API REST
- frontend React / Vite pour visualiser les competitions, matchs, classements et equipes

## Apercu

Le projet couvre aujourd'hui toute la chaine :

```text
Football-Data API -> Pipeline ETL -> PostgreSQL -> Backend API -> Frontend React
```

L'objectif est de construire une plateforme simple d'exploration de donnees footballistiques, avec une base solide pour ajouter ensuite des statistiques plus avancees, de l'automatisation et des fonctionnalites de prediction.

## Fonctionnalites actuelles

### Pipeline et donnees
- extraction des donnees depuis l'API Football-Data
- transformation et normalisation des donnees en tables relationnelles
- chargement en base PostgreSQL
- gestion des competitions principales
- chargement des tables `competitions`, `teams`, `coaches`, `squads`, `matches`, `standings`, `scorers`

### Backend API
- exposition des donnees via une API REST Express
- endpoints par competition, equipe, classement, match et top scorers
- endpoints detailles pour consulter une equipe avec son coach et son effectif

### Frontend
- navigation par competition via une navbar avec menu deroulant
- page d'accueil avec les 3 prochains matchs de chaque competition
- page des classements
- page des matchs d'une competition
- page des meilleurs buteurs
- page des equipes d'un championnat
- page detail d'une equipe avec :
  - upcoming matches
  - general information
  - coach details
  - squad list

## Competitions cibles

- `PL` : Premier League
- `PD` : La Liga
- `FL1` : Ligue 1
- `SA` : Serie A
- `BL1` : Bundesliga

## Structure du projet

```text
football-data-project/
|-- backend/
|-- database/
|-- frontend/
|-- pipeline/
`-- README.md
```

### `pipeline/`
- `extract.py` : appels API et logique de recuperation
- `transform.py` : transformation des reponses en donnees exploitables
- `load.py` : insertion en base PostgreSQL
- `main.py` : orchestration du pipeline

### `database/`
- `schema.sql` : schema principal de la base

### `backend/src/`
- `controllers/` : logique metier et requetes SQL
- `routes/` : definition des endpoints
- `db/db.js` : connexion PostgreSQL
- `app.js` : configuration Express
- `server.js` : lancement du serveur

### `frontend/src/`
- `pages/` : pages principales de l'application
- `components/` : composants UI reutilisables
- `services/api.js` : couche d'appels API frontend
- `App.jsx` : configuration des routes React

## Stack technique

- Python
- PostgreSQL
- Node.js
- Express
- React
- Vite

## Prerequis

- Python 3.10+
- Node.js 18+
- PostgreSQL
- une cle API Football-Data

Source API :
- `https://www.football-data.org/`

## Configuration

Creer un fichier `.env` a la racine du projet :

```env
API_KEY=your_api_key
DB_NAME=football_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

## Installation et lancement

### 1. Initialiser la base de donnees

```bash
psql -U postgres -d football_db -f database/schema.sql
```

### 2. Installer les dependances Python et lancer le pipeline

```bash
pip install pandas requests psycopg2-binary python-dotenv
python pipeline/main.py
```

### 3. Lancer le backend

```bash
cd backend
npm install
npm run dev
```

Backend disponible sur :
- `http://localhost:3000`

### 4. Lancer le frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible en local via Vite :
- souvent `http://localhost:5173`

## Routes frontend principales

- `/`
- `/competitions/:code/standings`
- `/competitions/:code/matches`
- `/competitions/:code/scorers`
- `/competitions/:code/teams`
- `/teams/:id/details`

## Endpoints backend

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

## Notes techniques

- le pipeline charge les donnees principales de football dans PostgreSQL
- `shirt_number` peut etre `NULL` selon les donnees disponibles dans l'API source
- certaines informations peuvent etre absentes selon la competition ou l'equipe

## Ameliorations prevues

- ajout de statistiques plus avancees sur les equipes et les joueurs
- fonctionnalites de prediction de matchs
- automatisation plus poussee du pipeline
- amelioration continue de l'interface et de l'experience utilisateur
