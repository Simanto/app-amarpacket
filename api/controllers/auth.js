import User from "../models/User.js";
import Merchant from "../models/Merchant.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// utils
import { createError } from "../utils/error.js";


// Test Connection
export const welcome = async (req,res,next)=>{
    try {
        res.status(200).send("Congratulation! Connected to api server")
    } catch (err) {
        next(err)
    }
}

// Create User
export const registerUser = async(req,res,next) =>{
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role:req.body.role,
            isVerified:req.body.isVerified
        });

        await newUser.save();
        res.status(200).send("User has been created :)");
    } catch (err) {
        next(err);
    }
}


// Create or Register Merchant
export const registerMerchant = async(req,res,next) =>{
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        role: "merchant",
    });

    const newMerchant = new Merchant({
        business_name: req.body.businessName,
        phone: req.body.phone,
        fb_page: req.body.fb,
        pickup_area: req.body.area,
        pickup_address: req.body.address,
    });

    try {
        const hasEmail = await User.findOne({email:req.body.email})

        if(hasEmail) return next(createError(409, "An account with this email already exists. Please try login"));

        const hasPhone = await Merchant.findOne({phone:req.body.phone})

        if(hasPhone) return next(createError(409, "An account with this phone number already exists. Please try login"));

        const savedMerchant = await newMerchant.save();
        const savedUser = await newUser.save();
        
        try {
            await User.findByIdAndUpdate(savedUser._id,{
                merchantProfileID: savedMerchant._id
            })
        } catch (err) {
            next(err);
        }

        // Create Token
        const token = jwt.sign({id:savedUser.id}, process.env.JWT, { expiresIn: process.env.JWT_LIFE});

        const user = {name:savedUser.name, role:savedUser.role}

        res
            .cookie("access_token", token,{
                maxAge: 2592e8,
                httpOnly:true
            })
            .status(200)
            .send({user,token})
        
    } catch (err) {
        next(err);
    }
}

// {$or:[{email:req.body.email},{phone:req.body.phone}]}
// Login User
export const login = async(req,res,next) =>{
    try {
        // Check by email or phone

        if(!req.body.email || !req.body.password) return next(createError(400, "Please provide email and password"))

        const isUser = await User.findOne({email:req.body.email});

        if(!isUser) return next(createError(404, "User not found"));

        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, isUser.password
        );
        
        if(!isPasswordCorrect) return next(createError(400, "Wrong password"));


        // Create Token
        const token = jwt.sign({id:isUser.id}, process.env.JWT, { expiresIn: process.env.JWT_LIFE});

        const user = {name:isUser.name, role:isUser.role};
        
        // Send Response
        res
            .cookie("access_token", token,{
                httpOnly:true
            })
            .status(200)
            // .send(otherDetails) 
            .send({user,token})
        
    } catch (err) {
        next(err);
    }
}