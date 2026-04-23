import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Standings from "./pages/Standings.jsx";
import Matches from "./pages/Matches.jsx";
import Teams from "./pages/Teams.jsx";
import TeamDetails from "./pages/TeamDetails.jsx";

import Scorers from "./pages/Scorers.jsx";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competitions/:code/standings" element={<Standings />} />
        <Route path="/competitions/:code/matches" element={<Matches />} />
        <Route path="/competitions/:code/scorers" element={<Scorers />} />
        <Route path="/competitions/:code/teams" element={<Teams />} />
        <Route path="/teams/:id/details" element={<TeamDetails />} />
      </Routes>
    </>
  );
}

export default App;
