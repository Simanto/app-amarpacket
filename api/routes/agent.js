import express from "express";
import { adminGetAll } from "../controllers/agent.js";

const router = express.Router();

// get all
router.get("/agent/all", adminGetAll)


export default router