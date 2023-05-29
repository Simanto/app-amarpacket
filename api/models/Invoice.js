import mongoose from 'mongoose';
const merchantSchema = new mongoose.Schema(
    {
        trackingID:{
            type: String,
            required: true,
            unique: true,
        },
        status:{
            type: String,
            required: true,
        },
        packetsID:{
            type: [String],
            required: true,
            unique: true,
        },
        merchantID:{
            type: String
        },
        total_collection_amount:{
            type: String,
            required: true,
        },
        total_delivery_chaerge:{
            type: String,
            required: true, 
        },
        total_payables:{
            type: String,
            required: true,
        },
    },{
        timestamps: true
    }
);

export default mongoose.model("Invoices", merchantSchema)