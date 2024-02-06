import {errorHandler}  from "./error.js";
import  jwt  from "jsonwebtoken";
export const  verifyUser =  (req , res,next) =>{
  const token = req.cookies.access_token;
    if(!token) return next(errorHandler(401,'Uauthorized !'))
    jwt.verify(token,process.env.JWT_SECRET,(err, user)=>{
      console.log(err)
      if(err) return next(errorHandler(403,'Forbidden'));
      req.user = user;
      next();
    });
}