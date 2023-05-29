import express from "express";
import { updateStatus } from "../controllers/status.js";

const router = express.Router();

// Create
// Update
router.patch("/status/update/:id", updateStatus)
// Delete
// Get

export default router