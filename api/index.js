import  express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cookieParser());
import "./db/db.js";
dotenv.config();
app.use(cors({
    credentials:true,
}));
app.use(express.json());


const PORT = process.env.PORT;
 //Routes 
 import userRoute from "./db/routers/user.router.js";
 import authRoute from "./db/routers/auth.route.js";


app.listen(PORT,()=>{
    console.log(`Server is running at port: ${PORT} !!`)
})

app.use("/api/v1",userRoute);
app.use("/api/v1",authRoute);

app.use((error,req,res,next)=>{
    const statusCode = error.statusCode || 500;
    const message =error.message || 'Internal Server error ';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})