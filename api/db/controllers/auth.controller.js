import User from "../models/user.model.js";
import { hashPassword } from "../../security/passport.js";
import { errorHandler } from "../../security/error.js";
export const signup= async (req,res, next)=>{
    const {username , email, password} = req.body;
    let HasPassword = hashPassword(JSON.stringify(password));
    const newUser = new User({username , email, password:HasPassword});
        try {
            await newUser.save();
            res.status(201).json("User created Successfully !");
        } catch (error) {
            next(error);
        }
   
    
}