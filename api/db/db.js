import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to db!");
})
.catch((err)=>{
    console.log(err);
})