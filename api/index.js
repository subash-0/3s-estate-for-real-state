import  express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
import "./db/db.js";
dotenv.config();
app.use(cors({
    credentials:true,
    
}));
app.use(cookieParser());

const PORT = process.env.PORT;
 //Routes 
 import userRoute from "./db/routers/user.router.js";


app.use("/api/v1",userRoute);
app.listen(PORT,()=>{
    console.log(`Server is running at port: ${PORT} !!`)
})
