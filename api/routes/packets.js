import express from "express";
import { allPacket, createPacket, GetPacket, updatePacket, adminAllPacket, PacketStats, packetOutforDelivery, packetDelivered, packetReturned, deletePacket, mergeLastStatusIntoPacket, adminWeeklyPacket, statPacketByArea } from "../controllers/packets.js";

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
router.get("/packets/weekly", adminWeeklyPacket);
router.get("/packets/merge-status", mergeLastStatusIntoPacket);

// Stat
router.get("/packets/byarea", statPacketByArea);


// Get Single Packet
router.get("/:packetid", GetPacket)

// Delete Packet
router.delete("/packet/delete/:packetid", deletePacket);

export default router 