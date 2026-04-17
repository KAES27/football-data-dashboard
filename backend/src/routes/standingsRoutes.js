import express from "express";
import { getStandings } from "../controllers/standingsController.js";

const router = express.Router();

router.get("/competitions/:code/standings",getStandings);

export default router;