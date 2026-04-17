import express from "express";
import { detailTeams, getTeams, getTeamById } from "../controllers/teamsController.js";

const router = express.Router();

router.get("/competitions/:code/teams", getTeams);
router.get("/teams/:id", getTeamById);
router.get("/teams/:id/details", detailTeams);

export default router;
