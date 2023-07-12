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
            type: String,
            index: true
        }
    },{
        timestamps: true
    }
);

statusSchema.indexes();

export default mongoose.model("Status Log", statusSchema);