import express from "express";
import { adminGetAll } from "../controllers/agent.js";
import { packetAssignedforDeliveries } from "../controllers/packets.js";

const router = express.Router();

// get all
router.get("/agent/all", adminGetAll)

// Assigned Deliveries
router.get("/deliveries/assigned", packetAssignedforDeliveries)


export default router