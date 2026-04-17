import pool from "../db/db.js";

export async function getCompetitions(req, res) {
  try {
    const result = await pool.query("SELECT * FROM competitions");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
export async function getCompetitionsBycode(req, res) {
  const code=req.params.code;
  try {
    const result = await pool.query(`
                SELECT *
                FROM competitions
                WHERE competitions.code = $1
                `,[code]);
      
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}