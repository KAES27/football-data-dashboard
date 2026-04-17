import pool from "../db/db.js";

export async function getStandings(req,res){
  const code = req.params.code;
  try{
        const result =await pool.query(  `
                SELECT teams.name,teams.crest, standings.position, standings.points,standings.played_games , standings.won ,
                standings.draw , standings.lost ,standings.goals_for ,standings.goals_against ,standings.goal_difference
                FROM standings
                JOIN teams ON standings.team_id = teams.team_id
                JOIN competitions ON standings.competition_id = competitions.competition_id
                WHERE competitions.code = $1
                ORDER BY standings.position
                `,[code]);
            res.json(result.rows);
   } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
  


}