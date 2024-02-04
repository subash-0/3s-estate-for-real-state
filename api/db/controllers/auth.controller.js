import User from "../models/user.model.js";
import { camparePassword, hashPassword } from "../../security/passport.js";
import { errorHandler } from "../../security/error.js";
import jwt from "jsonwebtoken";
export const signup= async (req,res, next)=>{
    const {username , email, password} = req.body;
    let HasPassword = hashPassword(password);
        try {
            const newUser = new User({username , email,password:HasPassword});
            await newUser.save()
            .then(()=>{
            res.status(201).json("User created Successfully !");
            })
            .catch((error)=>{
                next(error)
            })

        } catch (error) {
            next(error);
        }
   
    
}

export const signin = async (req,res,next)=>{
    const {username ,password} = req.body;
    try {
        const userValid = await User.findOne({username});
        if(!userValid) return next(errorHandler(404, `User with ${username}, does not exist!`));
        const validPassword = camparePassword(password,userValid.password);
        console.log(validPassword);
        if(!validPassword) return next(errorHandler(404,'Wrong credentials !'));
        const token = jwt.sign({id:userValid._id}, process.env.JWT_SECRET)
        const {password:pass, ...rest} = userValid._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);

    } catch (error) {
        next(error);
        
    }

}