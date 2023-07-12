import mongoose from 'mongoose';
const { Schema } = mongoose;

const PacketSchema = new mongoose.Schema({
        merchantID:{
            type: String,
            required: true,
            index: true
        },
        trackingID:{
            type: String,
            required: true,
            unique: true,
        },
        customerID:{
            type:String,
            required: true,
            index: true
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
            type: String,
            index: true
        },
        delivery_man:{
            type: String,
            index: true
        },
        specialInstruction:{
            type: String
        },
        status:{
            type: [String],
            index: true
        },
        paymentStatus:{
            type: String
        },
        invoiceID:{
            type: String,
            index: true
        },
        current_status:{
            type: String
        },
        current_status_category:{
            type: String
        },
        current_status_message:{
            type: String
        },
        current_status_createdAt:{
            type: Date
        },
    },{
        timestamps: true
    }
);

PacketSchema.indexes();

export default mongoose.model("Packets", PacketSchema)