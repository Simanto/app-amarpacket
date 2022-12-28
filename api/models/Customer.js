import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        merchantID:{
            type: String,
            required: true
        }
    },{
        timestamps: true
    }
);

export default mongoose.model("Customer", customerSchema);