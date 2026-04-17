import express from "express";
import { getMatchesBycompetition,getMatchesByid,getMatches } from "../controllers/matchesController.js";

const router = express.Router();

router.get("/competitions/:code/matches",getMatchesBycompetition);
router.get("/matches/:id",getMatchesByid);
router.get("/teams/:id/matches",getMatches);


export default router;


