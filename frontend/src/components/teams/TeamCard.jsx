function TeamCard({ team }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      }}
    >
      <div
        style={{
          padding: "16px",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#3f556b" }}>General information</h3>
        <p>
          <strong>Name:</strong> {team?.name || "Not available"}
        </p>
        <p>
          <strong>Short name:</strong> {team?.short_name || "Not available"}
        </p>
        <p>
          <strong>TLA:</strong> {team?.tla || "Not available"}
        </p>
        <p>
          <strong>Competition:</strong> {team?.competition || "Not available"}
        </p>
      </div>

      <div
        style={{
          padding: "16px",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#3f556b" }}>Coach</h3>
        <p>
          <strong>Name:</strong> {team?.coach?.name || "Not available"}
        </p>
        <p>
          <strong>Nationality:</strong>{" "}
          {team?.coach?.nationality || "Not available"}
        </p>
        <p>
          <strong>Date of birth:</strong>{" "}
          {team?.coach?.date_of_birth || "Not available"}
        </p>
      </div>

      <div
        style={{
          padding: "16px",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          gridColumn: "1 / -1",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#3f556b" }}>Squad</h3>

        {team?.squad?.length ? (
          <div style={{ display: "grid", gap: "12px" }}>
            {team.squad.map((player) => (
              <div
                key={player.player_id}
                style={{
                  padding: "12px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                }}
              >
                <p>
                  <strong>Name:</strong> {player.name}
                </p>
                <p>
                  <strong>Position:</strong>{" "}
                  {player.position || "Not available"}
                </p>
                <p>
                  <strong>Nationality:</strong>{" "}
                  {player.nationality || "Not available"}
                </p>
                <p>
                  <strong>Shirt number:</strong>{" "}
                  {player.shirt_number || "Not available"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No players available.</p>
        )}
      </div>
    </div>
  );
}

export default TeamCard;
