import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompetitions, getMatchesofcompetitions } from "../services/api.js";
import CardMatch from "../components/matches/CardMatch.jsx";

const status = "TIMED";

function Home() {
  const [competitionMatches, setCompetitionMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        setError("");

        const competitions = await getCompetitions();
        const matchesByCompetition = await Promise.all(
          competitions.map(async (competition) => {
            const matches = await getMatchesofcompetitions(
              competition.code,
              status
            );

            return {
              ...competition,
              matches: matches.slice(0, 3),
            };
          })
        );

        setCompetitionMatches(matchesByCompetition);
      } catch (err) {
        setError("Unable to load home page data.");
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ color: "#3f556b", marginBottom: "24px" }}>
        Upcoming matches by competition
      </h1>

      <div style={{ display: "grid", gap: "24px" }}>
        {competitionMatches.map((competition) => (
          <section
            key={competition.competition_id}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "14px",
              backgroundColor: "#ffffff",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                marginBottom: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {competition.emblem && (
                  <img
                    src={competition.emblem}
                    alt={`${competition.name} emblem`}
                    style={{ width: "36px", height: "36px", objectFit: "contain" }}
                  />
                )}

                <h2 style={{ margin: 0, color: "#3f556b" }}>{competition.name}</h2>
              </div>

              <Link
                to={`/competitions/${competition.code}/matches`}
                style={{
                  textDecoration: "none",
                  color: "#3f556b",
                  fontWeight: "600",
                }}
              >
                See all matches
              </Link>
            </div>

            {competition.matches.length ? (
              <CardMatch matches={competition.matches} />
            ) : (
              <p style={{ margin: 0, color: "#6b7280" }}>
                No upcoming matches available.
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

export default Home;
