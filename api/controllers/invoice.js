import Invoice from "../models/Invoice.js";
import Packet from "../models/Packet.js";
import User from "../models/User.js";
import crypto from "crypto";
import { createError } from "../utils/error.js";
import mongoose from "mongoose";
import { pipeline } from "stream";

// Admin: Create Invoices for payments due packets
export const adminCreateInvoice = async (req,res,next) =>{
    try {
        const invoice = await User.aggregate([
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
            {
                $lookup:{
                    from: "packets",
                    let:{mid:{$toString:"$_id"}, status: "due"},
                    pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    {
                                        $eq: [
                                            "$merchantID",
                                            "$$mid"
                                        ]
                                    },
                                    {
                                        $eq: [
                                            "$paymentStatus",
                                            "$$status"
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                    ],
                  as: "packets"
                },
            },
            {
                $project:{
                    _id: 0,
                    merchantID: "$_id",
                    merchant_name: "$name",
                    status: "in-process",
                    packetsID:"$packets._id",
                    total_collection_amount: {$sum:"$packets.collectionAmount"},
                    total_delivery_chaerge: {$sum:"$packets.delivery_charge"},
                    total_payables: {$subtract:[{$sum:"$packets.collectionAmount"}, {$sum:"$packets.delivery_charge"}]},
                }
            }
        ])

        const filterInvoice = invoice.filter((item)=> item.total_collection_amount !== 0)
        
        if(filterInvoice.length === 0 ) return next(createError("400", "No Payments due right now"));
        
        filterInvoice.forEach((item) =>{
            const trackID = crypto.randomBytes(7).toString('hex');
            item.trackingID = trackID;
        });

        const newInvoices = await Invoice.insertMany(filterInvoice);

        const updatePacketStatusID = [];

        newInvoices.forEach((invoice) =>{
            invoice.packetsID.forEach((id) =>
                updatePacketStatusID.push(id)
            )
        })

        await Packet.find({'_id': {$in: updatePacketStatusID}}).updateMany({paymentStatus: "in-process"});

        res.status(200).json(newInvoices);

    } catch (err) {
        next(err)
    }
}

// Admin Get All Invoices
export const adminGetAllInvoices = async (req,res,next) =>{
    try {
        const invoice = await Invoice.aggregate([
            {
                $lookup:{
                  from: "users",
                  let:{mid:"$merchantID"},
                  pipeline:[
                    {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$mid"]}}},
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
                  ],
                  as: "merchant"
                },
            },
            {
                $project:{
                    invoiceID: "$_id",
                    invoice_merchantID: { "$arrayElemAt": ["$merchant._id",0] },
                    invoice_createdAt: "$createdAt",
                    invoice_trackingID: "$trackingID",
                    invoice_merchant_name: "$name",
                    invoice_merchant_business_name:  { "$arrayElemAt": ["$merchant.profile.business_name" ,0] },
                    invoice_merchant_business_phone:  { "$arrayElemAt": ["$merchant.profile.phone", 0] },
                    invoice_merchant_business_address:  { "$arrayElemAt": ["$merchant.profile.pickup_address", 0] },
                    invoice_status: "$status",
                    invoice_packetsID:"$packets._id",
                    invoice_total_collection_amount: "$total_collection_amount",
                    invoice_total_delivery_charge: "$total_delivery_chaerge",
                    invoice_total_payables: "$total_payables",
                }
            }
        ]).sort({invoice_createdAt: -1});

        res.status(200).json(invoice);

    } catch (err) {
        next(err)
    }
}

// Update Invoice
export const adminUpdateInvoice = async (req,res,next) =>{
    try {
        const invoice = await Invoice.findById(req.params.id);

        if(!invoice) return next(createError(404, "Invoice not found"));

        const updateInvoiceStatus = {
            status: req.body.invoice_status,
        }

        const updatedInvoice = await Invoice.findByIdAndUpdate(
            {_id:req.params.id},
            {$set: updateInvoiceStatus}, 
            {new: true}
        );

        await Packet.find({ '_id': { $in: invoice.packetsID } }).updateMany({
            paymentStatus: req.body.invoice_status,
            invoiceID: updatedInvoice._id,
        });
        
        res.status(200).json(updatedInvoice);

    } catch (err) {
        next(err)
    }
}

// Gets Packets By Invoice
export const adminGetPacketsByInvoice = async (req,res,next) =>{
    try {
        const packets = await Invoice.aggregate([
            {$match:{_id: new mongoose.Types.ObjectId(req.params.id)}},
            {$lookup:{
                from: "packets",
                let:{sid:"$packetsID"},
                pipeline:[
                    {$match:{$expr:{$in:[{$toString:"$_id"}, "$$sid"]}}},
                    { $sort: { createdAt: -1 } },
                    {
                        $lookup:{
                            from: "customers",
                            let:{cid:"$customerID"},
                            pipeline:[
                                {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$cid"]}}},
                            ],
                            as: "customer"
                        },
                    },
                ],
                as:"allPackets"
            }},
            { $unwind: "$allPackets" },
            {$project:{
                _id: 0,
                invoice_packetID: "$allPackets._id",
                invoice_packet_createdAt: "$allPackets.createdAt",
                invoice_packet_trackingID:"$allPackets.trackingID",
                invoice_packet_customer_name: "$allPackets.customer.name",
                invoice_packet_customer_phone: "$allPackets.customer.phone",
                invoice_packet_collection_amount: "$allPackets.collectionAmount",
                invoice_packet_delivery_charge: "$allPackets.delivery_charge",
                invoice_packet_payables: {$subtract:["$allPackets.collectionAmount", "$allPackets.delivery_charge"]},
            }}
        ]);

        res.status(200).json(packets);

    } catch (err) {
        next(err)
    }
}

// Get Invoice For Merchant
export const merchantInvoice = async (req,res,next) =>{
    const invoice = await Invoice.aggregate([
      {$match:{merchantID: req.user.id}},
        {
            $lookup:{
              from: "users",
              let:{mid:"$merchantID"},
              pipeline:[
                {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$mid"]}}},
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
              ],
              as: "merchant"
            },
        },
        {
            $project:{
                invoiceID: "$_id",
                invoice_merchantID: { "$arrayElemAt": ["$merchant._id",0] },
                invoice_createdAt: "$createdAt",
                invoice_trackingID: "$trackingID",
                invoice_merchant_name: "$name",
                invoice_merchant_business_name:  { "$arrayElemAt": ["$merchant.profile.business_name" ,0] },
                invoice_merchant_business_phone:  { "$arrayElemAt": ["$merchant.profile.phone", 0] },
                invoice_merchant_business_address:  { "$arrayElemAt": ["$merchant.profile.pickup_address", 0] },
                invoice_status: "$status",
                invoice_packetsID:"$packets._id",
                invoice_total_collection_amount: "$total_collection_amount",
                invoice_total_delivery_charge: "$total_delivery_chaerge",
                invoice_total_payables: "$total_payables",
            }
        }
    ]).sort({invoice_createdAt: -1});

    res.status(200).json(invoice);
}

// Delete Invoice by Admin
export const adminDeleteInvoice = async(req,res,next) =>{
    console.log("Delete Invoice")
    try {
        const invoice = await Invoice.findById(req.params.id);

        if(!invoice) return next(createError(404, "Invoice not found"));

        console.log(invoice)
        await Invoice.deleteOne({_id: invoice._id});
        res.status(200).json("Invoice is deleted");
    } catch (err) {
        next(err)
    }
}