import mongoose from 'mongoose';

const merchantSchema = new mongoose.Schema(
    {
        business_name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
        },
        fb_page:{
            type: String,
        },
        product_type:{
            type: String
        },
        pickup_area:{
            type: String
        },
        pickup_address:{
            type: String
        },
        pickup_location:[{
            city: {
                type: String,
            },
            area: {
                type: String,
            },
            address: {
                type: String,
                required: true
            }
        }],
        bank_account:{
            bank_name: {
                type: String
            },
            account_holder_name:{
                type: String,
            },
            branch_name:{
                type: String,
            },
            account_number:{
                type: String,
            }
        },
        bikash_number:{
            type: String
        },
        nagad_number:{
            type: String
        },
        base_charge:{
            type: Number,
        },
        notes:{
            type: String,
        }
    },{
        timestamps: true
    }
);

export default mongoose.model("Merchant Profiles", merchantSchema)