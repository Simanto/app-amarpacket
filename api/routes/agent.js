import express from "express";
import { adminGetAll } from "../controllers/agent.js";
import { packetAssignedforDeliveries, } from "../controllers/packets.js";
import { updateStatusFromAgent } from "../controllers/status.js";

const router = express.Router();

// get all
router.get("/agent/all", adminGetAll)

// Assigned Deliveries
router.get("/deliveries/assigned", packetAssignedforDeliveries)
router.get("/status/delivered/:id", updateStatusFromAgent)

export default router