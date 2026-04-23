import pool from "../db/db.js";

export async function getMatchesByid(req, res) {
    const id=req.params.id;
    try {
    const result = await pool.query(  `
                SELECT  matches.match_id,matches.utc_date, matches.status , matches.matchday ,home_team.name AS home_team_name,home_team.crest AS home_team_crest,
                away_team.name AS away_team_name ,away_team.crest AS away_team_crest,matches.home_score, matches.away_score,matches.winner
                FROM Matches
                JOIN teams AS home_team
                ON matches.home_team_id = home_team.team_id
                JOIN teams AS away_team
                ON matches.away_team_id = away_team.team_id
                JOIN competitions ON matches.competition_id = competitions.competition_id
                WHERE matches.match_id = $1
                `,[id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }

}

export async function getMatchesBycompetition(req, res) {
    const code=req.params.code;
    const status=req.query.status;
    try {
        if(status){
        const result = await pool.query(  `
                    SELECT  matches.match_id,matches.utc_date, matches.status , matches.matchday ,home_team.name AS home_team_name,home_team.crest AS home_team_crest,
                    away_team.name AS away_team_name ,away_team.crest AS away_team_crest,matches.home_score, matches.away_score,matches.winner
                    FROM Matches
                    JOIN teams AS home_team
                    ON matches.home_team_id = home_team.team_id
                    JOIN teams AS away_team
                    ON matches.away_team_id = away_team.team_id
                    JOIN competitions ON matches.competition_id = competitions.competition_id
                    WHERE competitions.code = $1
                    AND matches.status=$2
                    ORDER BY matches.utc_date
                    `,[code,status]);
                    res.json(result.rows);
        }
        else{
             const result = await pool.query(  `
                SELECT  matches.match_id,matches.utc_date, matches.status , matches.matchday ,home_team.name AS home_team_name,home_team.crest AS home_team_crest,
                away_team.name AS away_team_name ,away_team.crest AS away_team_crest,matches.home_score, matches.away_score,matches.winner
                FROM Matches
                JOIN teams AS home_team
                ON matches.home_team_id = home_team.team_id
                JOIN teams AS away_team
                ON matches.away_team_id = away_team.team_id
                JOIN competitions ON matches.competition_id = competitions.competition_id
                WHERE competitions.code = $1
                ORDER BY matches.utc_date
                `,[code]);
                res.json(result.rows);
        }
        
        
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }

}

export async function getMatches(req, res) {
    const id=req.params.id;
    const status=req.query.status;
    try {
    if(status){  
    const result = await pool.query(  `
                SELECT  matches.match_id,matches.utc_date, matches.status , matches.matchday ,home_team.name AS home_team_name,home_team.crest AS home_team_crest,
                away_team.name AS away_team_name ,away_team.crest AS away_team_crest,matches.home_score, matches.away_score,matches.winner
                FROM Matches
                JOIN teams AS home_team
                ON matches.home_team_id = home_team.team_id
                JOIN teams AS away_team
                ON matches.away_team_id = away_team.team_id
                JOIN competitions ON matches.competition_id = competitions.competition_id
                WHERE (home_team.team_id = $1 OR away_team.team_id=$1)
                AND matches.status=$2
                `,[id,status]);
              res.json(result.rows);
    }else{
           const result = await pool.query(  `
                SELECT  matches.match_id,matches.utc_date, matches.status , matches.matchday ,home_team.name AS home_team_name,home_team.crest AS home_team_crest,
                away_team.name AS away_team_name ,away_team.crest AS away_team_crest,matches.home_score, matches.away_score,matches.winner
                FROM Matches
                JOIN teams AS home_team
                ON matches.home_team_id = home_team.team_id
                JOIN teams AS away_team
                ON matches.away_team_id = away_team.team_id
                JOIN competitions ON matches.competition_id = competitions.competition_id
                WHERE home_team.team_id = $1 OR away_team.team_id=$1
                `,[id]);
                res.json(result.rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }

}