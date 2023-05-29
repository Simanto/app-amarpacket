import Customer from "../models/Customer.js";


//Get All Customers
export const allCustomer = async (req,res,next) =>{
    try {
        const customers = await Customer.aggregate([
            {$match:{merchantID: req.user.id}},
            {
                $lookup:{
                  from: "packets",
                  let:{cid:{$toString:"$_id"}},
                  pipeline:[
                    {$match:{$expr:{$eq:["$customerID", "$$cid"]}}},
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
            { $project: { 
                _id: 0,
                customer_createdAt: "$createdAt",
                customer_last_updateAt: "$updatedAt",
                customer_id: "$_id",
                customer_name: "$name",
                customer_phone: "$phone",
                customer_city: "$city",
                customer_area: "$area",
                customer_address: "$address",
                customer_packets: "$packets",
                customer_total_packets: {$size: "$packets"},
                customer_total_canceled: {
                    $size: {
                        "$filter": {
                        "input": "$packets",
                        "cond": { "$eq": [ "$$this.packet_payment_status", "canceled" ] }
                        }
                    }
                },
                customer_total_delivered: {
                    $size: {
                        "$filter": {
                        "input": "$packets",
                        "cond": { "$eq": [ "$$this.packet_status", "delivered" ] }
                        }
                    }
                },
                customer_success_rate: 
                {$cond: [
                    {$eq:[
                        {
                            $size: {
                                "$filter": {
                                "input": "$packets",
                                "cond": { "$eq": [ "$$this.packet_status", "delivered" ] }
                                }
                            }
                        },
                        0
                    ]}, 
                    "N/A",
                    {$multiply:[
                        {$divide:[
                            {
                                $size: {
                                    "$filter": {
                                    "input": "$packets",
                                    "cond": { "$eq": [ "$$this.packet_status", "delivered" ] }
                                    }
                                }
                            },
                            {$sum:[
                                    {
                                        $size: {
                                            "$filter": {
                                            "input": "$packets",
                                            "cond": { "$eq": [ "$$this.packet_payment_status", "canceled" ] }
                                            }
                                        }
                                    },
                                    {
                                        $size: {
                                            $filter: {
                                            "input": "$packets",
                                            "cond": { "$eq": [ "$$this.packet_status", "delivered" ] }
                                            }
                                        }
                                    },
                                ]
                            },
                        ]},
                        100 
                    ]}
                ]}




            },},
        ])

        // {$subtract:[{$sum:"$packets.collectionAmount"}, {$sum:"$packets.delivery_charge"}]}
        res.status(200).json(customers);
    } catch (err) {
        next(err)
    }
}