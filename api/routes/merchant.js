import express from "express";
import { addBank, addMFS, changePassword, deleteMerchant, getMerchant, getMerchants, MerchantByID, updateMerchant } from "../controllers/merchant.js";

const router = express.Router();

//Registration and login managed thorugh auth

// Update
router.put("/add/bank", addBank);
router.put("/add/mfs", addMFS);
router.patch("/changepassword/:id", changePassword);

// Delete
router.delete("/delete/:id", deleteMerchant);

// Get Merchant Profile
router.get("/get", getMerchant);

// ******************************
//          Admin Routes
// ******************************

// All Merchat
router.get("/merchants", getMerchants);

// Get Merchant By ID
router.get("/merchant/:id", MerchantByID)

// Update Merchant
router.patch("/merchant/update/:id", updateMerchant);


export default router