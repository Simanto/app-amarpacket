import User from "../models/User.js";

export const adminGetAll = async (req,res,next) =>{
    try {
        const agents = await User.aggregate([
            {$match:{"role": {$regex: "agent"}}},
            {
                $lookup:{
                    from: "user profiles",
                    let:{uid:"$userProfileID"},
                    pipeline:[
                    {$match:{$expr:{$eq:[{$toString:"$_id"}, "$$uid"]}}},
                    ],
                    as: "profile"
              },
            },
            {$project:{
                agentID:"$_id",
                agent_role:"$role",
                agent_name: "$name",
                agent_phone: { "$arrayElemAt": ["$profile.phone", 0] }
            }}
        ])
        res.status(200).json(agents);
    } catch (err) {
        next(err)
    }
}