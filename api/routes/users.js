import express from "express";
import { adminAddUser, updateUser, alluser } from "../controllers/users.js";

const router = express.Router();

router.get("/user/all", alluser)

// Create
// Update
router.patch("/user/edit/:id", updateUser)

// Delete
// Get
router.post("/user/add", adminAddUser)

export default router