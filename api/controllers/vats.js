
// utils
import Packet from "../models/Packet.js";
import { createError } from "../utils/error.js";


//Get All User Admin and Agent
export const allVat = async (req,res,next) =>{
    try {
        const packets = await Packet.aggregate([
            
            {$project:{
                "_id": 0,
                packetID: "$_id",
                packet_trackingID: "$trackingID",
                packet_createdAt: "$createdAt",
                packet_createdAt_month: { $month: "$createdAt" },
            }},
            { 
                $match: { $expr: { $eq: [ "$packet_createdAt_month", 11 ] } }
            },
          ]).sort({packet_createdAt: -1});

          res.status(200).json(packets)
    } catch (err) {
        next(err)
    }
}