import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: true,
        },
        designation:{
            type: String
        },
        blood_group:{
            type: String
        },
        area:{
            type: String
        },
        address:{
            type: String
        },
        emergency_conatact:{
            name:{
                type: String
            },
            phone:{
                type: String
            },
            relation:{
                type: String
            },
            area:{
                type: String
            },
            address:{
                type: String
            },
        },
        isActive:{
            type: Boolean,
            default: false
        },
        employeeID:{
            type: String,
        }
    },{
        timestamps: true
    }
);

export default mongoose.model("User Profiles", userProfileSchema);