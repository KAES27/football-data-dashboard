import express from "express";
import { gettopscorers } from "../controllers/topscorersController.js";

const router = express.Router();

router.get("/competitions/:code/top_scorers", gettopscorers);


export default router;