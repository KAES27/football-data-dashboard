CREATE TABLE competitions (
    competition_id BIGINT PRIMARY KEY,
    code TEXT,
    name TEXT,
    emblem TEXT
);

CREATE TABLE teams (
    team_id BIGINT PRIMARY KEY,
    name TEXT,
    short_name TEXT,
    tla TEXT,
    crest TEXT
);

CREATE TABLE coaches (
    coach_id BIGINT PRIMARY KEY,
    team_id BIGINT UNIQUE,
    name TEXT,
    date_of_birth DATE,
    nationality TEXT,

    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

CREATE TABLE squads (
    team_id BIGINT,
    player_id BIGINT,
    name TEXT,
    position TEXT,
    date_of_birth DATE,
    nationality TEXT,
    shirt_number INTEGER,

    PRIMARY KEY (team_id, player_id),

    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

CREATE TABLE matches (
    match_id BIGINT PRIMARY KEY,
    competition_id BIGINT,
    utc_date TIMESTAMP,
    status TEXT,
    matchday INTEGER,
    venue TEXT,
    home_team_id BIGINT,
    away_team_id BIGINT,
    home_score INTEGER,
    away_score INTEGER,
    winner TEXT,

    FOREIGN KEY (competition_id) REFERENCES competitions(competition_id),
    FOREIGN KEY (home_team_id) REFERENCES teams(team_id),
    FOREIGN KEY (away_team_id) REFERENCES teams(team_id)
);

CREATE TABLE standings (
    competition_id BIGINT,
    team_id BIGINT,
    position INTEGER,
    played_games INTEGER,
    won INTEGER,
    draw INTEGER,
    lost INTEGER,
    points INTEGER,
    goals_for INTEGER,
    goals_against INTEGER,
    goal_difference INTEGER,

    PRIMARY KEY (competition_id, team_id),

    FOREIGN KEY (competition_id) REFERENCES competitions(competition_id),
    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

CREATE TABLE scorers (
    scorer_id BIGINT,
    competition_id BIGINT,
    team_id BIGINT,
    scorer_name TEXT,
    played_matches INTEGER,
    goals INTEGER,

    PRIMARY KEY (scorer_id, competition_id),

    FOREIGN KEY (team_id) REFERENCES teams(team_id)
);
