import express from "express";
import { adminGetAll } from "../controllers/agent.js";
import { packetAssignedforDeliveries, } from "../controllers/packets.js";
import { updateStatusDeliveredFromAgent, updateStatusFailedFromAgent } from "../controllers/status.js";

const router = express.Router();

// get all
router.get("/agent/all", adminGetAll)

// Assigned Deliveries
router.get("/deliveries/assigned", packetAssignedforDeliveries)
router.get("/status/delivered/:id", updateStatusDeliveredFromAgent)
router.post("/status/failed/:id", updateStatusFailedFromAgent)

export default router