import mongoose from 'mongoose';
const { Schema } = mongoose;

const PacketSchema = new mongoose.Schema({
        merchantID:{
            type: String,
            required: true
        },
        trackingID:{
            type: String,
            required: true,
            unique: true,
        },
        customerID:{
            type:String,
            required: true
        },
        merchantInvoice:{
            type: String,
        },
        collectionAmount:{
            type: Number,
            required: true
        },
        costPrice:{
            type: Number,
        },
        weight:{
            type: Number,
        },
        delivery_charge:{
            type: Number
        },
        cod_charge:{
            type: Number
        },
        pickup_man:{
            type: String
        },
        delivery_man:{
            type: String
        },
        specialInstruction:{
            type: String
        },
        status:{
            type: [String]
        },
        paymentStatus:{
            type: String
        },
        invoiceID:{
            type: String
        }
    },{
        timestamps: true
    }
);

export default mongoose.model("Packets", PacketSchema)