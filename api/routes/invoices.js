import express from "express";
import { adminCreateInvoice, adminDeleteInvoice, adminGetAllInvoices, adminGetPacketsByInvoice, adminUpdateInvoice, merchantInvoice } from "../controllers/invoice.js";

const router = express.Router();

// Merchant CRUD Oprtations

// Get All
router.get("/all", merchantInvoice)

// ADMIN CRUD Operation
// Create
router.get("/invoice/create", adminCreateInvoice);
// Update
router.patch("/invoice/update/:id", adminUpdateInvoice)

// Delete
router.delete("/invoice/delete/:id", adminDeleteInvoice)
// Get All
router.get("/invoice/all", adminGetAllInvoices)

// Get Pakcets by Invoice
router.get("/invoice/packets/:id", adminGetPacketsByInvoice);

export default router