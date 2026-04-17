import "./Stangins.css";

function StandingsTable({ standings }) {
  return (
    <div className="standings-table-wrap">
      <table className="standings-table">
      <thead>
        <tr>
          <th>Pos</th>
          <th>Team</th>
          <th>Pts</th>
          <th>Played</th>
          <th>Won</th>
          <th>Draw</th>
          <th>Lost</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
        </tr>
      </thead>

      <tbody>
        {standings.map((standing) => (
          <tr key={standing.team_id}>
            <td className="col-pos">{standing.position}</td>
            <td className="team-cell">
              <img
                src={standing.crest}
                alt={`${standing.name} crest`}
                className="team-crest"
              />
              <span className="team-name">{standing.name}</span>
            </td>
            <td>{standing.points}</td>
            <td>{standing.played_games}</td>
            <td>{standing.won}</td>
            <td>{standing.draw}</td>
            <td>{standing.lost}</td>
            <td>{standing.goals_for}</td>
            <td>{standing.goals_against}</td>
            <td>{standing.goal_difference}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}

export default StandingsTable;
