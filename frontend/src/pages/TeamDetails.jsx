import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamsdetailsbyid,getcompetitionBycode,getMatchesofTeam } from "../services/api.js";

function TeamDetails(){
    const {id,code}=useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [competition,setCompetition]=useState(null);
    const [team,setTeam]=useState({});
    const [matches,setMatches]=useState([]);


    useEffect(()=>{
        async function loadData(){
            try{
                const row_comptition=getcompetitionBycode(code)
                const row_team=getTeamsdetailsbyid(id);
                const row_matches=getMatchesofTeam(id);
                setCompetition(row_comptition[0]);
                setTeam(row_team);
                setMatches(row_matches);
            }catch(err){
                setError("Impossible de charger les données");
            } finally {
                setLoading(false);
            }
        
        }
        loadData();
    },[id],[code])
     if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

  return (
    <div>
     
      <ScorersTable scorers={scorers}/>
    </div>
  );
}

export default TeamDetails;
