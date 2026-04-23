import { Link } from "react-router-dom";

function TeamList({teams}){
    return(
        <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {teams.map((team) => (
          <Link
            key={team.team_id}
            to={`/teams/${team.team_id}/details`}
            style={{
              textDecoration: "none",
              color: "inherit",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {team.crest && (
              <img
                src={team.crest}
                alt={team.name}
                style={{ width: "72px", height: "72px", objectFit: "contain" }}
              />
            )}

            <h3
              style={{
                margin: 0,
                color: "#3f556b",
                textAlign: "center",
              }}
            >
              {team.name}
            </h3>

            <p style={{ margin: 0, color: "#6b7280" }}>
              {team.short_name || team.tla || "No short name"}
            </p>
          </Link>
        ))}
      </div>
    );
}

export default TeamList;