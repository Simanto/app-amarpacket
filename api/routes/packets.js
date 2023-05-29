import express from "express";
import { allPacket, createPacket, GetPacket, updatePacket, adminAllPacket, PacketStats, packetOutforDelivery, packetDelivered, packetReturned } from "../controllers/packets.js";

const router = express.Router();



// Create
// router.post("/new", createPacket);
router.post("/new", createPacket);

// Update
router.patch("/edit/:id", updatePacket);

// Delete
// router.get("/:merchantid/:id", deletePacket);

// Get All
router.get("/all", allPacket);
router.get("/stats", PacketStats);
router.get("/out-for-delivery", packetOutforDelivery);
router.get("/delivered", packetDelivered);
router.get("/returned", packetReturned);
router.get("/packets/all", adminAllPacket);
// Get Single Packet
router.get("/:packetid", GetPacket)


export default router 