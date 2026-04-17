
function CardMatch({ matches,dayfiltre }) {
  const groupedByMatchday = matches.reduce((acc, match) => {
    const dayKey =
      typeof match.matchday === "number" ? String(match.matchday) : "unknown";

    if (!acc[dayKey]) {
      acc[dayKey] = [];
    }

    acc[dayKey].push(match);
    return acc;
  }, {});

  const orderedDays = Object.keys(groupedByMatchday).sort((a, b) => {
    if (a === "unknown") return 1;
    if (b === "unknown") return -1;
    return Number(a) - Number(b);
  });


  return (
    
    <div className="matchday-list">
      {dayfiltre?(

          <section key={dayfiltre} className="matchday-section">
          <h3 className="matchday-title">
            {dayfiltre === "unknown" ? "Journée non renseignée" : `Journée ${dayfiltre}`}
          </h3>
            {groupedByMatchday[dayfiltre]?(
            <ul className="match-cards">
            {groupedByMatchday[dayfiltre].map((match) => (
              <li key={match.match_id} className="match-card">
                <div className="match-header">
                  
                  
                  <span className="match-date">
                    {match.utc_date
                      ? new Date(match.utc_date).toLocaleString("fr-FR")
                      : ""}
                  </span>
                </div>

                <div className="match-teams">
                  {match.status === "TIMED" ? (
                    <span>
                      {match.home_team_name} vs {match.away_team_name}
                    </span>
                  ) : (
                    <span>
                      {match.home_team_name} {match.home_score} - {match.away_score}{" "}
                      {match.away_team_name}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          ):(
             <h2>
                Aucun match correspendant a vos critères
             </h2>
          )}
          </section>
      ):(orderedDays.map((day) => (
        <section key={day} className="matchday-section">
          <h3 className="matchday-title">
            {day === "unknown" ? "Journée non renseignée" : `Journée ${day}`}
          </h3>

          <ul className="match-cards">
            {groupedByMatchday[day].map((match) => (
              <li key={match.match_id} className="match-card">
                <div className="match-header">
                  
                  
                  <span className="match-date">
                    {match.utc_date
                      ? new Date(match.utc_date).toLocaleString("fr-FR")
                      : ""}
                  </span>
                </div>

                <div className="match-teams">
                  {match.status === "TIMED" ? (
                    <span>
                      {match.home_team_name} vs {match.away_team_name}
                    </span>
                  ) : (
                    <span>
                      {match.home_team_name} {match.home_score} - {match.away_score}{" "}
                      {match.away_team_name}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )))

  
    }
     </div>
); 
}

export default CardMatch;
