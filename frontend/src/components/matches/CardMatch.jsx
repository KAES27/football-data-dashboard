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

  function renderTeams(match) {
    const home = (
      <img
        src={match.home_team_crest}
        alt={`${match.home_team_name} crest`}
        className="match-team-crest"
      />
    );

    const away = (
      <img
        src={match.away_team_crest}
        alt={`${match.away_team_name} crest`}
        className="match-team-crest"
      />
    );

    if (match.status === "TIMED") {
      return (
        <span className="match-teams-line">
          {home}
          <span>vs</span>
          {away}
        </span>
      );
    }

    return (
      <span className="match-teams-line">
        {home}
        <span>
          {match.home_score} - {match.away_score}
        </span>
        {away}
      </span>
    );
  }


  return (
    
    <div className="matchday-list">
      {dayfiltre?(

          <section key={dayfiltre} className="matchday-section">
          <h3 className="matchday-title">
            {dayfiltre === "unknown" ? "Journée non renseignée" : `Day ${dayfiltre}`}
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
                  {renderTeams(match)}
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
            {day === "unknown" ? "Journée non renseignée" : `Day ${day}`}
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
                  {renderTeams(match)}
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
