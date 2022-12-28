import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) return next(createError(403, "Token is not valid"));
        req.user = user;
        next();
    });
};

export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,next, () => {
        if (req.user.role === "admin"){
            next()
        } else {
            return next(createError(403, "You are not admin!"))
        }
    })
}

export const verifyMerchant = async (req,res,next) => {
    verifyToken(req,res,next,() => {
        if (req.user.role === "merchant") {
            next()
        } else {
            return next(createError(403, "You are not Verified!"))
        }
    })
}