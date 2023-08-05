import Packet from "../models/Packet.js";
import Status from "../models/Status.js";
import mongoose from "mongoose";
import { createError } from "../utils/error.js";

export const updateStatus = async (req,res,next) =>{
    
    console.log(req.body);

    const requestedStatus = new Status({
        category: req.body.packet_status_category,
        name: req.body.packet_status,
        message: req.body.packet_status_message,
        packetID: req.params.id
    })

    const assignedAgent = {
        delivery_man: req.body.packet_delivery_agentID,
        delivery_man_name: req.body.packet_delivery_agent_name,
        pickup_man: req.body.packet_pickup_agentID,
        pickup_man_name: req.body.packet_pickup_agent_name
    }

    console.log(assignedAgent)

    try {
        const findPacket = await Packet.findById(req.params.id);
        const statusID = findPacket.status.at(-1);
        const currentStatus = await Status.findById(statusID);
        const savedStatus = await requestedStatus.save();

        switch (requestedStatus.name) {
            case findPacket.currentStatus:
                return next(createError(409, "Please change your status Valo"))
            break;

            case "at-hub":

                await Packet.findByIdAndUpdate(req.params.id, {
                    currentStatus: savedStatus.name,
                    currentStatusCategory: savedStatus.category,
                    currentStatusMessage: savedStatus.message,
                    currentStatusCreatedAt: savedStatus.createdAt,
                    paymentStatus: "pending",
                    delivery_man: "",
                    deliveryManName: "",
                    $push: {
                        status:savedStatus._id
                    },
                });
                res.status(200).send("Pickup man assigned");
            break;

            case "assigned-for-pickup":

                await Packet.findByIdAndUpdate(req.params.id, {
                    currentStatus: requestedStatus.name,
                    currentStatusCategory: requestedStatus.category,
                    currentStatusMessage: requestedStatus.message,
                    currentStatusCreatedAt: requestedStatus.createdAt,
                    pickup_man: assignedAgent.pickup_man,
                    pickupManName: assignedAgent.pickup_man_name,
                    $push: {
                        status:requestedStatus._id
                    },
                });

                res.status(200).send("Pickup man assigned");
            break;

            case "assigned-for-delivery":
                await requestedStatus.save();

                await Packet.findByIdAndUpdate(req.params.id, {
                    currentStatus: requestedStatus.name,
                    currentStatusCategory: requestedStatus.category,
                    currentStatusMessage: requestedStatus.message,
                    currentStatusCreatedAt: requestedStatus.createdAt,
                    delivery_man: assignedAgent.delivery_man,
                    deliveryManName: assignedAgent.delivery_man_name,
                    $push: {
                        status:requestedStatus._id
                    },
                });

                res.status(200).send("Delivery man assigned");
            break;

            case "assigned-for-return" :
                await requestedStatus.save();

                await Packet.findByIdAndUpdate(req.params.id, {
                    currentStatus: savedStatus.name,
                    currentStatusCategory: savedStatus.category,
                    currentStatusMessage: savedStatus.message,
                    currentStatusCreatedAt: savedStatus.createdAt,
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
                    currentStatus: savedStatus.name,
                    currentStatusCategory: savedStatus.category,
                    currentStatusMessage: savedStatus.message,
                    currentStatusCreatedAt: savedStatus.createdAt,
                    paymentStatus: "due",
                    $push: {
                        status:requestedStatus._id
                    },
                });
                res.status(200).send("Status updated!");
            break;

            case "partial-return":

                await Packet.findByIdAndUpdate(req.params.id, {
                    currentStatus: savedStatus.name,
                    currentStatusCategory: savedStatus.category,
                    currentStatusMessage: savedStatus.message,
                    currentStatusCreatedAt: savedStatus.createdAt,
                    paymentStatus: "due",
                    $push: {
                        status:requestedStatus._id
                    },
                });
                res.status(200).send("Status updated!");
            break;

            case "canceled":

                await Packet.findByIdAndUpdate(req.params.id, {
                    currentStatus: savedStatus.name,
                    currentStatusCategory: savedStatus.category,
                    currentStatusMessage: savedStatus.message,
                    currentStatusCreatedAt: savedStatus.createdAt,
                    paymentStatus: "canceled",
                    $push: {
                        status:requestedStatus._id
                    },
                });
                res.status(200).send("Status updated!");
            break;
    
            default:

                await Packet.findByIdAndUpdate(req.params.id, {
                    currentStatus: savedStatus.name,
                    currentStatusCategory: savedStatus.category,
                    currentStatusMessage: savedStatus.message,
                    currentStatusCreatedAt: savedStatus.createdAt,
                    $push: {
                        status: savedStatus._id
                    },
                });

                res.status(200).send("Status updated");
                break;
        }

    } catch (err) {
        next(err)
    }
}

export const updateStatusDeliveredFromAgent = async (req,res,next) => {
    const requestedStatus = new Status({
        category: 'success',
        name: 'done',
        message: 'Packet has been delivered',
        packetID: req.params.id
    })

    try {
        // Save packet status
        const savedStatus = await requestedStatus.save();

        await Packet.findByIdAndUpdate(req.params.id, {
            currentStatus: savedStatus.name,
            currentStatusCategory: savedStatus.category,
            currentStatusMessage: savedStatus.message,
            currentStatusCreatedAt: savedStatus.createdAt,
            paymentStatus: "pending",
            $push: {
                status:savedStatus._id
            },
        });
        res.status(200).send("Packet Delivered");
    } catch (err) {
        next(err)
    }
};




export const updateStatusFailedFromAgent = async (req,res,next) => {
    const requestedStatus = new Status({
        category: 'danger',
        name: 'failed',
        message: req.body.message,
        packetID: req.params.id
    })

    try {
       
        // Save packet status
        const savedStatus = await requestedStatus.save();

        await Packet.findByIdAndUpdate(req.params.id, {
            currentStatus: savedStatus.name,
            currentStatusCategory: savedStatus.category,
            currentStatusMessage: savedStatus.message,
            currentStatusCreatedAt: savedStatus.createdAt,
            paymentStatus: "pending",
            $push: {
                status:savedStatus._id
            },
        });

        // Response
        res.status(200).send("Packet Delivery Failed");

    } catch (err) {
        next(err)
    }
};