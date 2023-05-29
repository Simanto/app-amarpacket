import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        role:{
            type: String,
        },
        isVerified:{
            type: Boolean,
            default: false
        },
        merchantProfileID:{
            type: String
        },
        userProfileID:{
            type: String
        },
    },{
        timestamps: true
    }
);

export default mongoose.model("Users", userSchema);