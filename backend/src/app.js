import express from "express";
import teamsRoutes from "./routes/teamsRoutes.js";
import standingsRoute from "./routes/standingsRoutes.js"
import competitionsRoutes from "./routes/competitionsRoutes.js"
import matchesRoutes from "./routes/matchesRoutes.js"
import topscorersRoutes from "./routes/topscorersRoutes.js"
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(teamsRoutes);
app.use(standingsRoute);
app.use(competitionsRoutes);
app.use(matchesRoutes);
app.use(topscorersRoutes);

export default app;