import CompetitionDropdown from "./CompetitionDropdown";
import { getCompetitions } from "../../services/api";
import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";


  

function Navbar() {
  
  const [competitions, setCompetition] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDropdownCode, setOpenDropdownCode] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const competitionData = await getCompetitions();
        

        setCompetition(competitionData);
       
      } catch (err) {
        setError("Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "12px 16px",
        borderBottom: "1px solid #ddd",
        background:" #3f556b",
      }}
    >
       <Link
        to={`/`}
        style={{ margin: 0, fontSize: "20px",color:"white", textDecoration: "none",fontWeight:"20px" }}>Football Dashboard
      </Link>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {competitions.map((competition) => (
          <CompetitionDropdown
            key={competition.competition_id}
            code={competition.code}
            label={competition.name}
            emblem={competition.emblem}
            isOpen={openDropdownCode === competition.code}
            onToggle={() =>
              setOpenDropdownCode((prev) =>
                prev === competition.code ? null : competition.code
              )
            }
            onClose={() => setOpenDropdownCode(null)}
          />
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
