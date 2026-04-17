import pool from "../db/db.js";

export async function gettopscorers(req,res){
  const code = req.params.code;
  try{
        const result =await pool.query(  `
                SELECT scorers.scorer_name, teams.name,teams.crest,scorers.goals,scorers.played_matches ,scorers.scorer_id
                FROM scorers
                JOIN teams ON scorers.team_id = teams.team_id
                JOIN competitions ON scorers.competition_id = competitions.competition_id
                WHERE competitions.code = $1
                ORDER BY scorers.goals DESC
                `,[code]);
            res.json(result.rows);
   } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}