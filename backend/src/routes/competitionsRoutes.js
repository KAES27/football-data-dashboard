import express from "express";
import { getCompetitions,getCompetitionsBycode } from "../controllers/competitionsController.js";

const router = express.Router();

router.get("/competitions",getCompetitions);
router.get("/competitions/:code",getCompetitionsBycode);

export default router;