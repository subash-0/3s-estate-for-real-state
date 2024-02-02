const express = require("express");
const dotenv = require("dotenv");
const app = express();
require("./db/db");
dotenv.config();
const PORT = process.env.PORT;



app.listen(PORT,()=>{
    console.log(`Server is running at port: ${PORT} !!`)
})