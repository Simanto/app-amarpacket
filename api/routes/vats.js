import express from "express";
import { allVat } from "../controllers/vats.js";

const router = express.Router();

// Create
// Update

// Delete
// Get
router.get("/vat/bymonth", allVat)

export default router