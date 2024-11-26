import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const connectDB = async ()=>{
    await mongoose.connect(process.env.DATABASE+'/navigation').then(()=>{
        console.log("DB connected")
    })
}

export default connectDB