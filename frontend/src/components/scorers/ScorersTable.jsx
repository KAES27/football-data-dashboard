import "../standings/Stangins.css"

function ScorersTable({ scorers }) {
  return (
    <div className="standings-table-wrap">
      <table className="standings-table">
      <thead>
        <tr>
          <th>name</th>
          <th>Team</th>
          <th>goals</th>
          <th>Played matches</th>
        </tr>
      </thead>

      <tbody>
        {scorers.map((scorer) => (
          <tr key={scorer.scorer_id}>
            <td className="col-pos">{scorer.scorer_name}</td>
            <td className="team-cell">
              <img
                src={scorer.crest}
                alt={`${scorer.name} crest`}
                className="team-creste"
              />
             
            </td>
            <td>{scorer.goals}</td>
            <td>{scorer.played_matches}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}

export default ScorersTable;
