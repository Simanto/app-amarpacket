import Packet from "../models/Packet.js";
import Status from "../models/Status.js";
import mongoose from "mongoose";
import { createError } from "../utils/error.js";

export const updateStatus = async (req,res,next) =>{

    const requestedStatus = new Status({
        category: req.body.packet_status_category,
        name: req.body.packet_status,
        message: req.body.packet_status_message,
        packetID: req.params.id
    })

    const assignedAgent = {
        delivery_man: req.body.packet_delivery_agentID,
        pickup_man: req.body.packet_pickup_agentID,
    }

    try {
        const findPacket = await Packet.findById(req.params.id);
        const statusID = findPacket.status.at(-1);
        const currentStatus = await Status.findById(statusID);

        switch (requestedStatus.name) {
            case currentStatus.name:
                return next(createError(409, "Please change your status"))
            break;

            case "at-hub":
                await requestedStatus.save();

                await Packet.findByIdAndUpdate(req.params.id, {
                    paymentStatus: "pending",
                    delivery_man:"",
                    $push: {
                        status:requestedStatus._id
                    },
                });
                res.status(200).send("Pickup man assigned");
            break;

            case "assigned-for-pickup":
                await requestedStatus.save();

                await Packet.findByIdAndUpdate(req.params.id, {
                    pickup_man: assignedAgent.pickup_man,
                    $push: {
                        status:requestedStatus._id
                    },
                });

                res.status(200).send("Pickup man assigned");
            break;

            case "assigned-for-delivery":
                await requestedStatus.save();

                await Packet.findByIdAndUpdate(req.params.id, {
                    delivery_man: assignedAgent.delivery_man,
                    $push: {
                        status:requestedStatus._id
                    },
                });

                res.status(200).send("Delivery man assigned");
            break;

            case "assigned-for-return" :
                await requestedStatus.save();

                await Packet.findByIdAndUpdate(req.params.id, {
                    delivery_man: assignedAgent.delivery_man,
                    $push: {
                        status:requestedStatus._id
                    },
                });

                res.status(200).send("Delivery man assigned for return");
            break;

            case "delivered":
                await requestedStatus.save();

                await Packet.findByIdAndUpdate(req.params.id, {
                    paymentStatus: "due",
                    $push: {
                        status:requestedStatus._id
                    },
                });
                res.status(200).send("Status updated!");
            break;

            case "partial-return":
                await requestedStatus.save();

                await Packet.findByIdAndUpdate(req.params.id, {
                    paymentStatus: "due",
                    $push: {
                        status:requestedStatus._id
                    },
                });
                res.status(200).send("Status updated!");
            break;

            case "canceled":
                await requestedStatus.save();

                await Packet.findByIdAndUpdate(req.params.id, {
                    paymentStatus: "canceled",
                    $push: {
                        status:requestedStatus._id
                    },
                });
                res.status(200).send("Status updated!");
            break;

        
            default:
                await requestedStatus.save();

                await Packet.findByIdAndUpdate(req.params.id, {
                    $push: {
                        status:requestedStatus._id
                    },
                });

                res.status(200).send("Status updated");
                break;
        }

    } catch (err) {
        next(err)
    }
}