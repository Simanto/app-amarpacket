import express from "express";
import { allCustomer } from "../controllers/customers.js";


const router = express.Router();

// Get All
router.get("/all", allCustomer);



export default router