import User from "../models/user.model.js";
import { hashPassword } from "../../security/passport.js";
export const signup= async (req,res)=>{
    const {username , email, password} = req.body;
    let HasPassword = hashPassword(password);
    const newUser = new User({username , email, password:HasPassword});
        try {
            await newUser.save();
            res.status(201).json("User created Successfully !");
        } catch (error) {
            res.status(500).json(error.message);
            
        }
   
    
}