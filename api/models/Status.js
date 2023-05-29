import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema(
    {
        category:{
            type: String
        },
        name:{
            type: String,
            required: true,
        },
        message:{
            type: String,
        },
        packetID:{
            type: String
        }
    },{
        timestamps: true
    }
);


export default mongoose.model("Status Log", statusSchema);