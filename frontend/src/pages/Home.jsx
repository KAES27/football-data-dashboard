import { useEffect, useState } from "react";
import { getMatchesofcompetitions } from "../services/api.js";


const code="PL";
const status ="TIMED";

function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCompetitions() {
      try {
        const data = await getMatchesofcompetitions(code,status);
        setMatches(data);
      } catch (err) {
        setError("Impossible de charger les compétitions");
      } finally{
        setLoading(false);

      }
}

    loadCompetitions();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div>
      <h1>Matches a venir en PL</h1>
      <ul>
        {matches.map((match) => (
          <li key={match.match_id}>
            {match.home_team_name} V {match.away_team_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;