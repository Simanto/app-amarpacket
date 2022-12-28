import express from "express";
import { login, registerUser, registerMerchant, welcome } from "../controllers/auth.js";
import rateLimiter from "express-rate-limit";

const router = express.Router();
// Test route
router.get("/welcome", welcome)

// Merchant login
const appLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 5 minitues
    max: 9,
    message: "Too many request. Please try again after 15 minitues."
});

router.post("/login", appLimiter, login );

// Admin Panel
router.post("/user/create", appLimiter, registerUser );

// Merchants Panel
router.post("/merchant/register", appLimiter, registerMerchant );


export default router