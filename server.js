import express, { urlencoded } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
// Link react dir
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";


// Import Links

// Routes
import authRoute from "./api/routes/auth.js";
import userRoute from "./api/routes/users.js";
import agentRoute from "./api/routes/agent.js";
import packetRoute from "./api/routes/packets.js";
import merchantRoute from "./api/routes/merchant.js";
import customerRoute from "./api/routes/customers.js";
import statusRoute from "./api/routes/statuses.js";
import invoiceRoute from "./api/routes/invoices.js";
import {verifyAdmin,verifyMerchant} from "./api/utils/verifyToken.js";

const app = express();
dotenv.config();

// Prevent CORS Error
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
}

const __dirname = dirname(fileURLToPath(import.meta.url))

// Uncoment Only For Deployment
app.use(express.static(path.resolve(__dirname, './merchant/build')))
 
// Middlewares
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(helmet({
    originAgentCluster: true,
}));
app.use(xss());
app.use(mongoSanitize());

mongoose.set("strictQuery", false);

const connect = async () =>{
    try {
        if(process.env.NODE_ENV === "PRODUCTION"){
            await mongoose.connect(process.env.PRODUCTIONDB);
            console.log("connected to Production Mongo db")
        } 
        
        if(process.env.NODE_ENV === "DEV") {
            await mongoose.connect(process.env.DB);
            console.log("connected to Mongo db ATLAS")
        }
        
      } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected" , ()=>{
    console.log("mongo db disconnected")
});

if (process.env.NODE_ENV !== "PRODUCTION") {
    app.use(morgan("dev"));
}


// ****************************
// Routes
//  ****************************

// Test Connection
app.get('/', (req, res) => {
    res.send('Congratulation! Connected with Express')
})

// Login and Registration
app.use("/api/v1/auth", authRoute);

// Merchant Panel
app.use("/api/v1/merchant", verifyMerchant, merchantRoute);
app.use("/api/v1/packets", verifyMerchant, packetRoute);
app.use("/api/v1/customer", verifyMerchant, customerRoute);
app.use("/api/v1/invoice", verifyMerchant, invoiceRoute);


// Admin Panel
app.use("/api/v1/admin", verifyAdmin, merchantRoute);
app.use("/api/v1/admin", verifyAdmin, packetRoute);
app.use("/api/v1/admin", verifyAdmin, userRoute);
app.use("/api/v1/admin", verifyAdmin, agentRoute);
app.use("/api/v1/admin", verifyAdmin, statusRoute);
app.use("/api/v1/admin", verifyAdmin, invoiceRoute);


app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, './merchant/build', 'index.html'))
})

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
});


// Server Setup
app.listen(9000, ()=>{
    connect();
    console.log("connected to api server");
});