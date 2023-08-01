import User from "../models/User.js";
import bcrypt from "bcrypt";
import UserProfile from "../models/UserProfile.js";

// utils
import { createError } from "../utils/error.js";


//Get All User Admin and Agent
export const alluser = async (req,res,next) =>{
    try {
        const data = await User.aggregate([
            {$match:{"role": {$regex: "^(?!merchant$)"}}},
            {
                $lookup:{
                  from: "user profiles",
                  let:{uid:"$userProfileID"},
                  pipeline:[
                    {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$uid"]}}},
                  ],
                  as: "profile"
                },
              },
            {$project:{
                userID: "$_id",
                createdAt: "$createdAt",
                user_fullname: "$name", 
                user_email: "$email",
                // user_password,
                user_phone:{ "$arrayElemAt": ["$profile.phone", 0] },
                user_designation: { "$arrayElemAt": ["$profile.designation", 0] },
                user_blood_group:{ "$arrayElemAt": ["$profile.blood_group", 0] },
                user_employee_id:{ "$arrayElemAt": ["$profile.employeeID", 0] },
                user_isVerified: { $toString: "$isVerified" },
                user_isActive:  {$toString:{ "$arrayElemAt": ["$profile.isActive", 0] }},
                user_role: "$role",
                user_area: { "$arrayElemAt": ["$profile.area", 0] },
                user_address: { "$arrayElemAt": ["$profile.address", 0] },
                user_emergency_contact_name: { "$arrayElemAt": ["$profile.emergency_conatact.name", 0] },
                user_emergency_contact_phone: { "$arrayElemAt": ["$profile.emergency_conatact.phone", 0] },
                user_emergency_contact_relation: { "$arrayElemAt": ["$profile.emergency_conatact.relation", 0] },
                user_emergency_contact_area: { "$arrayElemAt": ["$profile.emergency_conatact.area", 0] },
                user_emergency_contact_address: { "$arrayElemAt": ["$profile.emergency_conatact.address", 0] },
            }},
        ])
        res.status(200).json(data);
    } catch (err) {
        next(err)
    }
}

// Add Employess
export const adminAddUser = async (req,res,next) =>{
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.user_password, salt);


    const newUser =  new User({
        name: req.body.user_fullname,
        email: req.body.user_email,
        password: hash,
        role: req.body.user_role,
        isVerified: true,
    });

    const newUserProfile = new UserProfile({
        phone: req.body.user_phone,
        designation: req.body.user_designation,
        blood_group: req.body.user_blood_group,
        employeeID: req.body.user_employee_id,
        isActive: req.body.user_isActive,
        area: req.body.user_area,
        address: req.body.user_address,
        emergency_conatact:{
            name: req.body.user_emergency_contact_name,
            phone: req.body.user_emergency_contact_phone,
            relation: req.body.user_emergency_contact_relation,
            area: req.body.user_emergency_contact_area,
            address: req.body.user_emergency_contact_address,
        } 
    });
    
    try {
        const hasEmail = await User.findOne({email:req.body.user_email})
        if(hasEmail) return next(createError(409, "An account with this email already exists. Please try login"));

        const hasPhone = await UserProfile.findOne({phone:req.body.user_phone})
        if(hasPhone) return next(createError(409, "An account with this phone number already exists. Please try login"));

        const addedUser = await newUser.save();
        const addedUserProfile = await newUserProfile.save();

        try {
            await User.findByIdAndUpdate(addedUser._id,{
                userProfileID: addedUserProfile._id
            })
        } catch (err) {
            next(err)
        }

        res.status(200).json("User Created");

    } catch (err) {
        next(err)
    }
}

// Edit User
export const updateUser = async (req,res,next) =>{
    const userID = req.params.id;

    if(req.body.user_password){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.user_password, salt);
    }

    const requestUser = {
        name: req.body.user_fullname,
        email: req.body.user_email,
        password: hash || null,
        role: req.body.user_role,
        isVerified: true,
    }
    const requestProfile = {
        phone: req.body.user_phone,
        designation: req.body.user_designation,
        blood_group: req.body.user_blood_group,
        employeeID: req.body.user_employee_id,
        isActive: req.body.user_isActive,
        area: req.body.user_area,
        address: req.body.user_address,
        emergency_conatact:{
            name: req.body.user_emergency_contact_name,
            phone: req.body.user_emergency_contact_phone,
            relation: req.body.user_emergency_contact_relation,
            area: req.body.user_emergency_contact_area,
            address: req.body.user_emergency_contact_address,
        } 
    }

    try {

        const currentUser = await User.findById(userID)
        const currentProfile = await UserProfile.findById(currentUser.userProfileID);
        
        if(
            currentUser.name !== requestUser.name ||
            currentUser.email !== requestUser.email ||
            requestUser.password !== null ||
            currentUser.password !== requestUser.password ||
            currentUser.role !== requestUser.role ||
            currentUser.isVerified !== requestUser.isVerified
        ){
            await User.findByIdAndUpdate(
                req.params.id,
                {$set: requestUser},
                { new: true }
            );
        }

        if(
            currentProfile.phone !== requestProfile.phone ||
            currentProfile.designation !== requestProfile.designation ||
            currentProfile.blood_group !== requestProfile.blood_group ||
            currentProfile.employeeID !== requestProfile.employeeID ||
            currentProfile.isActive !== requestProfile.isActive ||
            currentProfile.area !== requestProfile.area ||
            currentProfile.address !== requestProfile.address ||
            currentProfile.emergency_conatact.name !== requestProfile.emergency_conatact.name ||
            currentProfile.emergency_conatact.phone !== requestProfile.emergency_conatact.phone ||
            currentProfile.emergency_conatact.relation !== requestProfile.emergency_conatact.relation ||
            currentProfile.emergency_conatact.area !== requestProfile.emergency_conatact.area ||
            currentProfile.emergency_conatact.address !== requestProfile.emergency_conatact.address
        ){
            await UserProfile.findByIdAndUpdate(
                currentUser.userProfileID,
                {$set: requestProfile},
                { new: true }
            );
        }
        
        res.status(200).json("User Updated");

    } catch (err) {
        next(err)
    }
}