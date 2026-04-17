const API_BASE_URL = "http://localhost:3000";

export async function getApi(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Erreur API competitions");
  }

  return response.json();
}
export async function getcompetitionBycode(code){
    const route = `/competitions/${code}`;
    const json=getApi(route);
    return json;
}
export async function getTeamsbyid(id){
    const route=`/teams/${id}`;
    const json=getApi(route);
    return json;
}
export async function getTeamsdetailsbyid(id){
    const route=`/teams/${id}/details`;
    const json=getApi(route);
    return json;
}
export async function getMatchesofTeam(id){
    const route=`/teams/${id}/matches`;
    const json=getApi(route);
    return json ;
}
export async function getCompetitions(){
    const route='/competitions';
    const json=getApi(route);
    return json;
}
export async function getStandings(code){
    const route = `/competitions/${code}/standings`;
    const json=getApi(route);
    return json;
}
export async function getMatchesofcompetitions(code,status){
    let route = `/competitions/${code}/matches`;
    if (status){
        route +=`?status=${status}`
    }
   
    const json=getApi(route);
    return json;
}
export async function getsocers(code) {
    const route=`/competitions/${code}/top_scorers`;
    const json=getApi(route);
    return json;
}