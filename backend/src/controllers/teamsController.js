import pool from "../db/db.js";

export async function getTeams(req, res) {
  const code = req.params.code;
  try{
        const result =await pool.query(  `
                SELECT teams.name,teams.short_name,teams.tla,teams.crest 
                FROM teams
                JOIN competitions ON teams.competition_id = competitions.competition_id
                WHERE competitions.code = $1
                `,[code]);
            res.json(result.rows);
   } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function getTeamById(req, res) {
  const id = Number(req.params.id);
  try{
        const result =await pool.query(  `
                SELECT teams.name,teams.short_name,teams.tla,teams.crest ,competitions.name AS competition
                FROM teams
                JOIN competitions ON teams.competition_id = competitions.competition_id
                WHERE teams.team_id = $1
                `,[id]);
            res.json(result.rows);
   } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }

  
}

export async function detailTeams(req, res) {
  const id = Number(req.params.id);

  try {
    const teamResult = await pool.query(
      `
        SELECT teams.team_id, teams.name, teams.short_name, teams.tla, teams.crest, competitions.name AS competition
        FROM teams
        JOIN competitions ON teams.competition_id = competitions.competition_id
        WHERE teams.team_id = $1
      `,
      [id]
    );

    if (teamResult.rows.length === 0) {
      return res.status(404).json({ error: "Equipe introuvable" });
    }

    const coachResult = await pool.query(
      `
        SELECT coach_id, name, date_of_birth, nationality
        FROM coaches
        WHERE team_id = $1
      `,
      [id]
    );

    const squadResult = await pool.query(
      `
        SELECT player_id, name, position, date_of_birth, nationality, shirt_number
        FROM squads
        WHERE team_id = $1
        ORDER BY position
      `,
      [id]
    );

    return res.json({
      ...teamResult.rows[0],
      coach: coachResult.rows[0] || null,
      squad: squadResult.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
