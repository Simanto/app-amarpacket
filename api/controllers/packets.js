import crypto from "crypto";
import mongoose from "mongoose";

import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";
import Packet from "../models/Packet.js";
import Status from "../models/Status.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

// Create New Packet
export const createPacket = async (req, res, next) => {

    const packet = req.body;
    const trackID = "ap" + crypto.randomBytes(4).toString('hex');

    const newCustomer = new Customer({
      name: packet.packet_customerName,
      phone: packet.packet_customerPhone,
      city: packet.packet_customerCity,
      area: packet.packet_customerArea,
      address: packet.packet_customerAddress,
      merchantID: req.user.id,
    });

    const merchant = {
      id: req.user.id,
      // name: req.user.business_name,
      // phone: 
    }

    const newPacket = new Packet({
      merchantID: req.user.id,
      merchant: merchant,
      trackingID: trackID,
      merchantInvoice: req.body.packet_merchantInvoice,
      collectionAmount: req.body.packet_collectionAmount,
      costPrice: req.body.packet_costPrice,
      weight: req.body.packet_weight,
      delivery_charge: req.body.packet_delivery_charge,
      specialInstruction:req.body.packet_specialInstruction,
      paymentStatus: "pending",
    })

    // Add Status
    const addStatus = new Status({
      category: "info",
      name: "new",
      message: "Pickup requested by merchant."
    })

    try {
      // Check Customer
      const customer = await Customer.findOne({phone: packet.packet_customerPhone, merchantID: req.user.id})

      if(!customer){
        const savedCustomer = await newCustomer.save();
        newPacket.customerID = savedCustomer._id;
      } else if(
        customer.name !== packet.packet_customerName ||
        customer.city !== packet.packet_customerCity ||
        customer.area !== packet.packet_customerArea ||
        customer.address !== packet.packet_customerAddress
      ){
        const updateCustomer = await Customer.findOneAndUpdate(
          {phone: packet.packet_customerPhone, merchantID: req.user.id},
          {$set:{
            name:packet.packet_customerName,
            city:packet.packet_customerCity,
            area:packet.packet_customerArea,
            address:packet.packet_customerAddress
          }}, 
          {new: true}
        )
        newPacket.customerID = updateCustomer._id;
      } else {
        newPacket.customerID = customer._id;
      }

      const addedStatus = await addStatus.save();
      const savedPacket = await newPacket.save();
      
      try {
        await Packet.findByIdAndUpdate(savedPacket._id, {
          $push: {
            status:addedStatus._id
          },
        });

        await Status.findByIdAndUpdate(addedStatus._id,{
            packetID: savedPacket._id
        })

      } catch (err) {
        next(err);
      }

      res.status(200).json("Packet has added!");

    } catch (err) {
      next(err);
    }
};

// Update
export const updatePacket =  async(req,res,next) =>{
  try {
    const packet = await Packet.findById(req.params.id);

    // if(packet.merchantID !== req.user.id)  return next(createError(401, "You are not authorized to edit this packet"));
    
    const requestedCustomer = {
      name: req.body.packet_customerName,
      phone: req.body.packet_customerPhone,
      city: req.body.packet_customerCity || "dhaka",
      area: req.body.packet_customerArea,
      address: req.body.packet_customerAddress,
    }

    // Check req has Customer or not
    if(req.body.packet_customerName ||
      req.body.packet_customerPhone ||
      req.body.packet_customerCity ||
      req.body.packet_customerArea ||
      req.body.packet_customerAddress
    ){
      const customer = await Customer.findById(packet.customerID)
    
      if(
          customer.name !== requestedCustomer.customerName ||
          customer.city !== requestedCustomer.customerCity ||
          customer.area !== requestedCustomer.customerArea ||
          customer.address !== requestedCustomer.customerAddress
        ){
          await Customer.findByIdAndUpdate(
            {_id:packet.customerID},
            {$set: requestedCustomer}, 
            {new: true}
          )
      } 
    }
    
    const requestedPacketData = {
      merchantInvoice: req.body.packet_merchantInvoice,
      collectionAmount: req.body.packet_collectionAmount,
      costPrice: req.body.packet_costPrice,
      weight: req.body.packet_weightght,
      delivery_charge: req.body.packet_delivery_charge,
      specialInstruction:req.body.packet_specialInstruction,
    }

    if(packet.merchantInvoice !== requestedPacketData.merchantInvoice ||
      packet.collectionAmount !== requestedPacketData.collectionAmount ||
      packet.costPrice !== requestedPacketData.costPrice ||
      packet.weight !== requestedPacketData.weight ||
      packet.delivery_charge !== requestedPacketData.delivery_charge ||
      packet.specialInstruction !== requestedPacketData.specialInstruction 
    ){
      await Packet.findByIdAndUpdate(
        req.params.id,
        { $set: requestedPacketData },
        { new: true }
      );
    } 

    res.status(200).send("Packet has benn updated");

  } catch (err) {
    next(err);
  }
}

// Delete
export const deletePacket = async(req,res,next) => {
  try {
    
    const packet = await Packet.findById(req.params.packetid);
    
    if(!packet) return next(createError(404, "packet not found"));

    // Delete Status
    await Status.deleteMany({'_id':{'$in': packet.status}})

    await Packet.deleteOne({'_id':{'$in': packet._id}})

    res.status(200).json("Packet has been deleted.");

  } catch (err) {
    next(err)
  }
}

// Get All Packets by merchant
export const allPacket = async (req,res,next) => {
  try {
    const packets = await Packet.aggregate([
      {$match:{merchantID: req.user.id}},
      { 
        $lookup:{
          from: "users",
          let:{mid: req.user.id},
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
        $lookup:{
          from: "customers",
          let:{cid:"$customerID"},
          pipeline:[
            {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$cid"]}}},
          ],
          as: "customer"
        },
      },
      {
        $lookup:{
          from: "status logs",
          let:{sid:"$status"},
          pipeline:[
            {$match:{$expr:{$in:[{$toString:"$_id"}, "$$sid"]}}},
          ],
          as:"status"
        }
      },
      {$project:{
        packetID: "$_id",
        packet_trackingID: "$trackingID",
        packet_createdAt: "$createdAt",
        packet_merchantInvoice: "$merchantInvoice",
        packet_collectionAmount: "$collectionAmount",
        packet_costPrice: "$costPrice" || 0,
        packet_weight: "$weight",
        packet_delivery_charge: "$delivery_charge",
        packet_customerName:{ "$arrayElemAt": ["$customer.name", 0] },
        packet_customerPhone:{ "$arrayElemAt": ["$customer.phone", 0] },
        packet_customerArea:{ "$arrayElemAt": ["$customer.area", 0] },
        packet_customerAddress:{ "$arrayElemAt": ["$customer.address", 0] },
        packet_status_category: { "$arrayElemAt": ["$status.category", -1] },
        packet_status:{ "$arrayElemAt": ["$status.name", -1] },
        packet_paymentStatus: "$paymentStatus",
        packet_invoiceID: "$invoiceID" || null,
        packet_base_charge: {"$arrayElemAt": ["$merchant.profile.base_charge", 0] } || 50,
        packet_merchant: {"$arrayElemAt": ["$merchant.profile.business_name", 0] },
        packet_merchant_phone: {"$arrayElemAt": ["$merchant.profile.phone", 0] },
        packet_pcikup_area: {"$arrayElemAt": ["$merchant.profile.pickup_area", 0]},
        packet_pcikup_address: {"$arrayElemAt": ["$merchant.profile.pickup_address", 0]},
      }}
    ]).sort({packet_createdAt: -1});

    res.status(200).json(packets)
    
  } catch (err) {
    next(err)
  }
}

export const adminAllPacket = async (req,res,next) => {
  try {
    let {search,status,start_date,end_date,pickup_agent,delivery_agent,page,limit} = req.query;
    
    page = parseInt(page);
    limit = parseInt(limit);
    
    const queryObject = [
      { "$sort": { "createdAt": -1 }},
      {
        $lookup:{
          from: "status logs",
          let:{sid:"$status"},
          pipeline:[
            {$match:{$expr:{$in:[{$toString:"$_id"}, "$$sid"]}}},
            { "$sort": { "_id": -1 } },
            { "$limit": 1 }
          ],
          as:"status"
        }
      },
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
        $lookup:{
          from: "users",
          let:{pid:"$pickup_man"},
          pipeline:[
            {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$pid"]}}},
          ],
          as: "pickup_man"
        },
      },
      {
        $lookup:{
          from: "users",
          let:{did:"$delivery_man"},
          pipeline:[
            {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$did"]}}},
          ],
          as: "delivery_man"
        },
      },
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
      {
        $project: {
          packetID: "$_id",
          packet_trackingID: "$trackingID",
          packet_createdAt: "$createdAt",
          packet_updatedAt: { "$arrayElemAt": ["$status.createdAt", -1] },
          packet_merchantInvoice: "$merchantInvoice",
          packet_collectionAmount: "$collectionAmount",
          packet_costPrice: "$costPrice" || 0,
          packet_weight: "$weight" || 1,
          packet_delivery_charge: "$delivery_charge",
          packet_customerName:{ "$arrayElemAt": ["$customer.name", 0] },
          packet_customerPhone:{ "$arrayElemAt": ["$customer.phone", 0] },
          packet_customerArea:{ "$arrayElemAt": ["$customer.area", 0] },
          packet_customerAddress:{ "$arrayElemAt": ["$customer.address", 0] },
          packet_status_category: { "$arrayElemAt": ["$status.category", -1] },
          packet_status: { "$arrayElemAt": ["$status.name", -1] },
          // packet_status_all: "$status",
          packet_paymentStatus: "$paymentStatus",
          packet_invoiceID: "$invoiceID" || null,
          packet_base_charge: {"$arrayElemAt": ["$merchant.profile.base_charge", 0]},
          packet_merchant: {"$arrayElemAt": ["$merchant.profile.business_name", 0] },
          packet_merchant_phone: {"$arrayElemAt": ["$merchant.profile.phone", 0] },
          packet_pcikup_area: {"$arrayElemAt": ["$merchant.profile.pickup_area", 0]},
          packet_pcikup_address: {"$arrayElemAt": ["$merchant.profile.pickup_address", 0]},
          packet_pickup_man: {"$arrayElemAt": ["$pickup_man.name", 0] },
          packet_delivery_man: {"$arrayElemAt": ["$delivery_man.name", 0] },
        }
      }
    ];

    if(typeof start_date !== 'undefined' && start_date != null && start_date !== '' && typeof end_date !== 'undefined' && end_date != null && end_date !== ''){
      
      const query_start_date = new Date(start_date);
      const query_end_date = new Date(end_date);

      queryObject.push(
        {
          $match: {
            "packet_updatedAt": { "$gte": query_start_date, "$lte": query_end_date}
          }
        }
      );
    }

    if(typeof search !== 'undefined' && search != null && search !== ''){
      queryObject.push(
        {
          $match: {
            $or: [
              {packet_trackingID: {$regex: search, $options: "i"}},
              {packet_customerPhone: {$regex: search, $options: "i"}},
              {packet_customerName: {$regex: search, $options: "i"}},
            ]
          }
        }
      );
    }

    if(typeof pickup_agent !== 'undefined' && pickup_agent != null && pickup_agent !== ''){
      queryObject.push(
        {
          $match: {packet_pickup_man: {$regex: pickup_agent, $options: "i"}}
        }
      );
    }

    if(typeof delivery_agent !== 'undefined' && delivery_agent != null && delivery_agent !== ''){
      queryObject.push(
        {
          $match: {packet_delivery_man: {$regex: delivery_agent, $options: "i"}}
        }
      );
    }

    if(typeof status !== 'undefined' && status != null && status !== ''){
      queryObject.push(
        {$match: {packet_status: status}}
      );
    }
    
    if(typeof page !== 'undefined' && page != null && page !== '' && typeof limit !== 'undefined' && limit != null && limit !== ''){
      page = parseInt(page);
      limit = parseInt(limit);

      queryObject.push(
        {
          $facet: {
            metadata: [{$count: "total"}, {$addFields: {pages: page}}],
            packets: [{$skip: (page * limit) - limit}, {$limit: limit}]
          }
        }
      );
    }

    // NO AWAIT
    let getPackets = await Packet.aggregate(queryObject);

    //let getPackets = results;

    const {metadata, packets} = getPackets[0];
    
    if(packets.length > 0){
      const numOfPages = Math.ceil(metadata[0].total / limit);
      res.status(200).json({packets, totalPackets: metadata[0].total, totalPages: numOfPages})

      return;
    }

    res.status(200).json({packets, totalPackets: 0, totalPages: 1})

  } catch (err) {
    next(err)
  }
}

// Get Single Packet by Merchant
export const GetPacket = async (req,res,next) =>{
  try {
    const packet = await Packet.aggregate([
      {$match:{_id: new mongoose.Types.ObjectId(req.params.packetid)}},
      {
        $lookup:{
          from: "customers",
          let:{cid:"$customerID"},
          pipeline:[
            {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$cid"]}}},
          ],
          as: "customer"
        }
      },
      {
        $lookup:{
          from: "invoices",
          let:{invid:"$invoiceID"},
          pipeline:[
            {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$invid"]}}},
          ],
          as: "invoice"
        }
      },
      {
        $lookup:{
          from: "status logs",
          let:{sid:"$status"},
          pipeline:[
            {$match:{$expr:{$in:[{$toString:"$_id"}, "$$sid"]}}},
            { $sort: { createdAt: -1 } },
          ],
          as:"status"
        }
      },
      {$project:{
        createdAt: "$createdAt",
        trackingID: "$trackingID",
        weight: "$weight",
        collectionAmount: "$collectionAmount",
        costPrice: "$costPrice",
        customerName:{ "$arrayElemAt": ["$customer.name", 0] },
        customerPhone:{ "$arrayElemAt": ["$customer.phone", 0] },
        customerArea:{ "$arrayElemAt": ["$customer.area", 0] },
        customerAddress:{ "$arrayElemAt": ["$customer.address", 0] },
        specialInstruction: "$specialInstruction",
        delivery_charge: "$delivery_charge",
        status: "$status",
        paymentStatus: "$paymentStatus",
        merchantInvoice: "$merchantInvoice",
        invoiceID: "$invoiceID",
        invoice_trackingID: { "$arrayElemAt": ["$invoice.trackingID", 0] }
      }}
    ])
    if(!packet) return next(createError(404, "Packet not found"))
    res.status(200).json(packet)
  } catch (err) {
    next(err)
  }
}


// Dashboard Satats
export const PacketStats = async (req,res,next) =>{
  try {
    const deliveries = await User.aggregate([
      {$match:{_id: new mongoose.Types.ObjectId(req.user.id)}},
      {
        $lookup:{
          from: "packets",
          let:{mid: req.user.id},
          pipeline:[
            {$match:{$expr:{$eq:["$merchantID", "$$mid"]}}},
            {
                $lookup:{
                  from: "status logs",
                  let:{sid:"$status"},
                  pipeline:[
                    {$match:{$expr:{$in:[{$toString:"$_id"}, "$$sid"]}}},
                  ],
                  as:"status"
                }
            },
            {$project:{
                packet_status:{ "$arrayElemAt": ["$status.name", -1] },
                packet_payment_status: "$paymentStatus"
            }}
          ],
          as: "packets"
        },
    },
    {
      $project:{
        _id: 1,
        stats_deliveries_total_packets_count: { $size:"$packets" },
        stats_deliveries_on_route:  {
          $size: {
              "$filter": {
              "input": "$packets",
              "cond": { "$eq": [ "$$this.packet_status", "out-for-delivery" ] }
              }
          }
        },
        stats_deliveries_delivered:  {
          $size: {
              "$filter": {
              "input": "$packets",
              "cond": { "$eq": [ "$$this.packet_status", "delivered" ] }
              }
          }
        },
        stats_deliveries_returned:  {
          $size: {
              "$filter": {
              "input": "$packets",
              "cond": { "$eq": [ "$$this.packet_status", "returned" ] }
              }
          }
        },

      }
    }
    ]);

    const payments_paid = await User.aggregate([
      {$match:{_id: new mongoose.Types.ObjectId(req.user.id)}},
      {
        $lookup:{
          from: "packets",
          let:{mid:req.user.id, status: "paid"},
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
          },
          {$project:{
              packet_collectionAmount: "$collectionAmount",
              packet_status:{ "$arrayElemAt": ["$status.name", -1] },
              packet_payment_status: "$paymentStatus"
          }}
          ],
        as: "packets"
      },
    },
    {
      $project:{
        _id: 1,
        total_collection_amount: {$sum:"$packets.packet_collectionAmount"},
      }
    },
    ]);

    const payments_in_process = await User.aggregate([
      {$match:{_id: new mongoose.Types.ObjectId(req.user.id)}},
      {
        $lookup:{
          from: "packets",
          let:{mid:req.user.id, status: "in-process"},
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
          },
          {$project:{
              packet_collectionAmount: "$collectionAmount",
              packet_status:{ "$arrayElemAt": ["$status.name", -1] },
              packet_payment_status: "$paymentStatus"
          }}
          ],
        as: "packets"
      },
    },
    {
      $project:{
        _id: 1,
        total_collection_amount: {$sum:"$packets.packet_collectionAmount"},
      }
    },
    ]);


    const payments_due = await User.aggregate([
      {$match:{_id: new mongoose.Types.ObjectId(req.user.id)}},
      {
        $lookup:{
          from: "packets",
          let:{mid:req.user.id, status: "due"},
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
          },
          {$project:{
              packet_collectionAmount: "$collectionAmount",
              packet_status:{ "$arrayElemAt": ["$status.name", -1] },
              packet_payment_status: "$paymentStatus"
          }}
          ],
        as: "packets"
      },
    },
    {
      $project:{
        _id: 1,
        total_collection_amount: {$sum:"$packets.packet_collectionAmount"},
      }
    },
    ]);


    const payments_out_for_delivery = await User.aggregate([
      {$match:{_id: new mongoose.Types.ObjectId(req.user.id)}},
      {
        $lookup:{
          from: "packets",
          let:{mid: req.user.id},
          pipeline:[
            {$match:{$expr:{$eq:["$merchantID", "$$mid"]}}},
            {
                $lookup:{
                  from: "status logs",
                  let:{sid:"$status"},
                  pipeline:[
                    {$match:{$expr:{$in:[{$toString:"$_id"}, "$$sid"]}}},
                  ],
                  as:"status"
                }
            },
            {$project:{
                packet_collectionAmount: "$collectionAmount",
                packet_status:{ "$arrayElemAt": ["$status.name", -1] },
                packet_payment_status: "$paymentStatus"
            }}
          ],
        as: "packets"
      },
    },
    {
      $project:{
        _id: 1,
        packets:{
          "$filter":{
            "input": "$packets",
            "cond": { "$eq": [ "$$this.packet_status", "out-for-delivery" ] }
          }
        }
      },
    },
    {$unwind: "$packets"},
    {$group:{
      _id: "$_id",
      total: {$sum: '$packets.packet_collectionAmount'},
    }},
    {$project:{
      total: "$total"
    }}
    ]);


    const invoice = await Invoice.aggregate([
      {$match:{merchantID: req.user.id, status:"paid"}},
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
                _id: 0,
                invoice_createdAt: "$createdAt",
                invoice_total_payables: "$total_payables",
            }
        }
    ]).sort({invoice_createdAt: -1});

    let value = 0

    if(payments_out_for_delivery.length > 0){
      value = payments_out_for_delivery[0].total
    } 

    const stats = {
      deliveries: {
        out_for_delivery: deliveries[0].stats_deliveries_on_route || 0,
        total_packets: deliveries[0].stats_deliveries_total_packets_count || 0,
        total_delivered: deliveries[0].stats_deliveries_delivered || 0,
        total_returned: deliveries[0].stats_deliveries_returned || 0,
      },
      payments: {
        out_for_delivery: value,
        total_paid: payments_paid[0].total_collection_amount || 0,
        in_process: payments_in_process[0].total_collection_amount || 0,
        due: payments_due[0].total_collection_amount || 0,
      },
      invoices: invoice,
    }

    res.status(200).json(stats)
  } catch (err) {
    next(err)
  }
}

// Packets Out for Delivery packets
export const packetOutforDelivery = async (req,res,next)=>{
  try {
    const packetOutforDelivery = await User.aggregate([
      {$match:{_id: new mongoose.Types.ObjectId(req.user.id)}},
      {
        $lookup:{
          from: "packets",
          let:{mid: req.user.id},
          pipeline:[
            {$match:{$expr:{$eq:["$merchantID", "$$mid"]}}},
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
            {

                $lookup:{
                  from: "status logs",
                  let:{sid:"$status"},
                  pipeline:[
                    {$match:{$expr:{$in:[{$toString:"$_id"}, "$$sid"]}}},
                  ],
                  as:"status"
                }
            },
            {$project:{
              packetID: "$_id",
              packet_trackingID: "$trackingID",
              packet_createdAt: "$createdAt",
              packet_merchantInvoice: "$merchantInvoice",
              packet_collectionAmount: "$collectionAmount",
              packet_costPrice: "$costPrice" || 0,
              packet_weight: "$weight",
              packet_delivery_charge: "$delivery_charge",
              packet_customerName:{ "$arrayElemAt": ["$customer.name", 0] },
              packet_customerPhone:{ "$arrayElemAt": ["$customer.phone", 0] },
              packet_customerArea:{ "$arrayElemAt": ["$customer.area", 0] },
              packet_customerAddress:{ "$arrayElemAt": ["$customer.address", 0] },
              packet_status_category: { "$arrayElemAt": ["$status.category", -1] },
              packet_status:{ "$arrayElemAt": ["$status.name", -1] },
              packet_paymentStatus: "$paymentStatus",
            }}
          ],
        as: "packets"
      },
    },
    {
      $project:{
        _id: 1,
        packets:{
          "$filter":{
            "input": "$packets",
            "cond": { "$eq": [ "$$this.packet_status", "out-for-delivery" ] }
          }
        }
      },
    },
    ]);

    res.status(200).json(packetOutforDelivery)

  } catch (err) {
    next(err)
  }
}


// Packets Delivered packets
export const packetDelivered = async (req,res,next)=>{
  try {
    const packetDelivered = await User.aggregate([
      {$match:{_id: new mongoose.Types.ObjectId(req.user.id)}},
      {
        $lookup:{
          from: "packets",
          let:{mid: req.user.id},
          pipeline:[
            {$match:{$expr:{$eq:["$merchantID", "$$mid"]}}},
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
            {

                $lookup:{
                  from: "status logs",
                  let:{sid:"$status"},
                  pipeline:[
                    {$match:{$expr:{$in:[{$toString:"$_id"}, "$$sid"]}}},
                  ],
                  as:"status"
                }
            },
            {$project:{
              packetID: "$_id",
              packet_trackingID: "$trackingID",
              packet_createdAt: "$createdAt",
              packet_merchantInvoice: "$merchantInvoice",
              packet_collectionAmount: "$collectionAmount",
              packet_costPrice: "$costPrice" || 0,
              packet_weight: "$weight",
              packet_delivery_charge: "$delivery_charge",
              packet_customerName:{ "$arrayElemAt": ["$customer.name", 0] },
              packet_customerPhone:{ "$arrayElemAt": ["$customer.phone", 0] },
              packet_customerArea:{ "$arrayElemAt": ["$customer.area", 0] },
              packet_customerAddress:{ "$arrayElemAt": ["$customer.address", 0] },
              packet_status_category: { "$arrayElemAt": ["$status.category", -1] },
              packet_status:{ "$arrayElemAt": ["$status.name", -1] },
              packet_paymentStatus: "$paymentStatus",
            }}
          ],
        as: "packets"
      },
    },
    {
      $project:{
        _id: 1,
        packets:{
          "$filter":{
            "input": "$packets",
            "cond": { "$eq": [ "$$this.packet_status", "delivered" ] }
          }
        }
      },
    },
    ]);

    res.status(200).json(packetDelivered)

  } catch (err) {
    next(err)
  }
}

// Packets Delivered packets
export const packetReturned = async (req,res,next)=>{
  try {
    const packetReturned = await User.aggregate([
      {$match:{_id: new mongoose.Types.ObjectId(req.user.id)}},
      {
        $lookup:{
          from: "packets",
          let:{mid: req.user.id},
          pipeline:[
            {$match:{$expr:{$eq:["$merchantID", "$$mid"]}}},
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
            {
                $lookup:{
                  from: "status logs",
                  let:{sid:"$status"},
                  pipeline:[
                    {$match:{$expr:{$in:[{$toString:"$_id"}, "$$sid"]}}},
                  ],
                  as:"status"
                }
            },
            {$project:{
              packetID: "$_id",
              packet_trackingID: "$trackingID",
              packet_createdAt: "$createdAt",
              packet_merchantInvoice: "$merchantInvoice",
              packet_collectionAmount: "$collectionAmount",
              packet_costPrice: "$costPrice" || 0,
              packet_weight: "$weight",
              packet_delivery_charge: "$delivery_charge",
              packet_customerName:{ "$arrayElemAt": ["$customer.name", 0] },
              packet_customerPhone:{ "$arrayElemAt": ["$customer.phone", 0] },
              packet_customerArea:{ "$arrayElemAt": ["$customer.area", 0] },
              packet_customerAddress:{ "$arrayElemAt": ["$customer.address", 0] },
              packet_status_category: { "$arrayElemAt": ["$status.category", -1] },
              packet_status:{ "$arrayElemAt": ["$status.name", -1] },
              packet_paymentStatus: "$paymentStatus",
            }}
          ],
        as: "packets"
      },
    },
    {
      $project:{
        _id: 1,
        packets:{
          "$filter":{
            "input": "$packets",
            "cond": { "$eq": [ "$$this.packet_status", "returned" ] }
          }
        }
      },
    },
    ]);

    res.status(200).json(packetReturned)

  } catch (err) {
    next(err)
  }
}


// *********************************
//              Agents
// *********************************
export const packetAssignedforDeliveries = async(req,res,next)=>{
  try {
    console.log("agent id:",req.user.id)
    const packets = await User.aggregate([
      {$match:{_id: new mongoose.Types.ObjectId(req.user.id)}},
      {
        $lookup:{
          from: "packets",
          let:{id: req.user.id},
          pipeline:[
            {$match:{$expr:{$eq:["$delivery_man", "$$id"]}}},
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
              $lookup:{
                from: "customers",
                let:{cid:"$customerID"},
                pipeline:[
                  {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$cid"]}}},
                ],
                as: "customer"
              },
            },
            {
                $lookup:{
                  from: "status logs",
                  let:{sid:"$status"},
                  pipeline:[
                    {$match:{$expr:{$in:[{$toString:"$_id"}, "$$sid"]}}},
                  ],
                  as:"status"
                }
            },
            {$project:{
              packetID: "$_id",
              packet_trackingID: "$trackingID",
              packet_createdAt: "$createdAt",
              packet_collectionAmount: "$collectionAmount",
              packet_delivery_charge: "$delivery_charge",
              packet_customerName:{ "$arrayElemAt": ["$customer.name", 0] },
              packet_customerPhone:{ "$arrayElemAt": ["$customer.phone", 0] },
              packet_customerArea:{ "$arrayElemAt": ["$customer.area", 0] },
              packet_customerAddress:{ "$arrayElemAt": ["$customer.address", 0] },
              packet_status:{ "$arrayElemAt": ["$status.name", -1] }, 
              packet_merchant: {"$arrayElemAt": ["$merchant.profile.business_name", 0] },
              packet_merchant_phone: {"$arrayElemAt": ["$merchant.profile.phone", 0] },
              packet_note: "$specialInstruction",
            }}
          ],
        as: "packets"
      },
    },
    {
      $project:{
        _id: 1,
        packets:{
          "$filter":{
            "input": "$packets",
            "cond": { 
              "$or": [ 
                {"$eq": ["$$this.packet_status", "assigned-for-delivery"]},
                {"$eq": ["$$this.packet_status", "out-for-delivery"]},
            ]}
          }
        }
      },
    },
    ]);
    res.status(200).json(packets)
  } catch (err) {
    next(err)
  }
}


// *********************************
//    Merge Operation for Packet
// *********************************

export const mergeLastStatusIntoPacket = async(req,res,next)=>{
  try {
    const data = await Packet.find();


    // data.forEach(
    //   await Packet.findByIdAndUpdate(data._id,{

    //   })
    // )
    // const data = await Status.findById("6413092702eb5a0b1e4056c6");

    // const data = await Packet.find({_id: '642e562002eb5a0b1e409505'});

    // console.log(getData);
    res.status(200).json(data)

  } catch (err) {
    next(err)
  }
}
