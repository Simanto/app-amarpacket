import Merchant from "../models/Merchant.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// utils
import { createError } from "../utils/error.js";

// UPDATE Merchant
export const updateMerchant = async(req,res,next) =>{

    const requestUser = {
      name: req.body.merchant_name,
      email: req.body.merchant_email,
      isVerified: req.body.merchant_isVerified,
    }

    const requestProfile ={
      business_name: req.body.merchant_business_name,
      phone: req.body.merchant_business_phone,
      product_type: req.body.merchant_product_type,
      pickup_area: req.body.merchant_pickup_area,
      pickup_address: req.body.merchant_pickup_address,
      base_charge: req.body.merchant_base_charge,
      notes: req.body.merchant_notes,
    }
  
  try {
      const currentUser = await User.findById(req.params.id);
      const profileID = currentUser.merchantProfileID;
      if(
        currentUser.name !== requestUser.name ||
        currentUser.email !== requestUser.email ||
        currentUser.isVerified !== requestUser.isVerified
      ){
        await User.findByIdAndUpdate(
            req.params.id,
            {$set: requestUser},
            { new: true }
          );
      }
          
      const currentMerchantProfile = await Merchant.findById(profileID);

      if(
        currentMerchantProfile.business_name !== requestProfile.business_name ||
        currentMerchantProfile.phone !== requestProfile.phone ||
        currentMerchantProfile.product_type !== requestProfile.product_type ||
        currentMerchantProfile.pickup_area !== requestProfile.pickup_area ||
        currentMerchantProfile.pickup_address !== requestProfile.pickup_address ||
        currentMerchantProfile.base_charge !== requestProfile.base_charge ||
        currentMerchantProfile.notes !== requestProfile.notes 
      ){
        await Merchant.findByIdAndUpdate(
          profileID,
          { $set: requestProfile},
          { new: true }
        );
      }

      
      res.status(200).json("Merchant Updated");
    } catch (err) {
      next(err);
    }
};

// Change Password
export const changePassword = async(req,res,next) =>{

  
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.newPassword, salt);

    const isUser = await User.findById(req.params.id);

    if(!isUser) return next(createError(404, "User not found"));

    // Check password
    const isPasswordCorrect = await bcrypt.compare(
      req.body.oldPassword, isUser.password
    );

    if(!isPasswordCorrect) return next(createError(400, "Wrong Old Password"));

    const newPassword = {
      password: hash
    }

    await User.findByIdAndUpdate(
      req.params.id,
      {$set: newPassword},
      {new: true}
    )

    res.status(200).send("Success! Password has been changed");

  } catch (err) {
    next(err)
  }
}

// Payment Method
export const addBank = async(req,res,next) =>{

  try {
      const user = await User.findById(req.user.id);
      
      const addBank = {
        bank_account:{
          bank_name: req.body.merchant_bank_name,
          branch_name: req.body.merchant_branch_name,
          account_holder_name: req.body.merchant_account_holder_name,
          account_number: req.body.merchant_account_number
        }
      }

      const merchantProfile = await Merchant.findByIdAndUpdate(user.merchantProfileID,
        {$set: addBank},
        {new: true}
      );

      res.status(200).json(merchantProfile);
  } catch (err) {
    next(err);
  }
 
};

export const addMFS = async(req,res,next) =>{

  try {
    const user = await User.findById(req.user.id);
    const addMFS = {
        bikash_number: req.body.merchant_bikash_number,
        nagad_number: req.body.merchant_nagad_number
    }

    const merchantProfile = await Merchant.findByIdAndUpdate(user.merchantProfileID,
      {$set: addMFS},
      {new:true}
    );

    res.status(200).json(merchantProfile);

  } catch (err) {
    next(err)
  }
}

// Delete Merchant
export const deleteMerchant = async(req,res,next) =>{
    try{
        await Merchant.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
    }catch(err){
        next(err);
    }
};

// Get Merchant Profile
export const getMerchant = async (req, res, next) => {
    try {
      const merchant = await User.findById(req.user.id);
      const merchantProfile = await Merchant.findById(merchant.merchantProfileID)
      // const [{address}] = merchantProfile.pickup_location;
      
      // construct data
      const user = {
        id: merchant._id,
        name: merchant.name,
        role: merchant.role,
        isVerified: merchant.isVerified,
        business_name: merchantProfile.business_name,
        email: merchant.email,
        phone: merchantProfile.phone,
        fb_page: merchantProfile.fb_page,
        pickup_area: merchantProfile.pickup_area,
        pickup_address: merchantProfile.pickup_address,
        payment_bank: merchantProfile.bank_account || "",
        payment_bikash: merchantProfile.bikash_number || "",
        payment_nagad: merchantProfile.nagad_number || "",
        base_charge: merchantProfile.base_charge || 50,
      }

      res.status(200).json(user);

    } catch (err) {
      next(err);
    }
};


// Get All Merchants
export const getMerchants = async (req,res,next) =>{
  try {
    const merchants = await User.aggregate([
      {$match:{role: "merchant"}},
      {
        $lookup:{
          from: "merchant profiles",
          let:{mid:"$merchantProfileID"},
          pipeline:[
            {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$mid"]}}},
          ],
          as: "profile"
        },
      },
      {$project:{
        createdAt: "$createdAt",
        merchantID: "$_id",
        merchant_name: "$name",
        merchant_email: "$email",
        merchant_isVerified:{ $toString: "$isVerified" } ,
        merchant_business_name: { "$arrayElemAt": ["$profile.business_name", 0] },
        merchant_business_phone: { "$arrayElemAt": ["$profile.phone", 0] },
        merchant_fb_page:{ "$arrayElemAt": ["$profile.fb_page", 0] },
        merchant_base_charge: { "$arrayElemAt": ["$profile.base_charge", 0] },
        merchant_bank_name: { "$arrayElemAt": ["$profile.bank_account.bank_name", 0 ]},
        merchant_branch_name: { "$arrayElemAt": ["$profile.bank_account.branch_name", 0 ]},
        merchant_account_holder_name: { "$arrayElemAt": ["$profile.bank_account.account_holder_name", 0 ]},
        merchant_account_number: { "$arrayElemAt": ["$profile.bank_account.account_number", 0 ]},
        merchant_bikash_number: { "$arrayElemAt": ["$profile.bikash_number", 0] },
        merchant_nagad_number: { "$arrayElemAt": ["$profile.nagad_number", 0] },
        merchant_notes: {"$arrayElemAt": ["$profile.notes", 0] },
        merchant_pickup_area: { "$arrayElemAt": ["$profile.pickup_area", 0] },
        merchant_pickup_address: { "$arrayElemAt": ["$profile.pickup_address", 0] },
        merchant_product_type: { "$arrayElemAt": ["$profile.product_type", 0] },
      }},
    ]).sort({createdAt: -1})
    res.status(200).json(merchants);
  } catch (err) {
    next(err)
  }
}

// Get Merchant By ID
export const MerchantByID = async (req,res,next) =>{
  try {
    const user = await User.findById(req.params.id);
    const profile = await Merchant.findById(user.merchantProfileID)

    const data = {
      merchantID: user._id,
      createdAt: user.createdAt,
      merchant_name: user.name,
      merchant_email: user.email,
      merchant_isVerified: user.isVerified,
      merchant_business_name: profile.business_name,
      merchant_business_phone: profile.phone,
      merchant_base_charge: profile.base_charge,
      merchant_product_type: profile.product_type,
      merchant_fb_page: profile.fb_page,
      merchant_pickup_area: profile.pickup_area,
      merchant_pickup_address: profile.pickup_address,
      merchant_bank_name: profile.bank_account.bank_name,
      merchant_branch_name: profile.bank_account.branch_name,
      merchant_account_holder_name: profile.bank_account.account_holder_name,
      merchant_account_number: profile.bank_account.account_number,
      merchant_bikash_number: profile.bikash_number,
      merchant_nagad_number: profile.nagad_number
    }
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}