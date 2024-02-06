import { errorHandler } from "../../security/error.js"
import { hashPassword } from "../../security/passport.js"
import User from "../models/user.model.js";
export const updateUser = async (req,res, next)=>{
   
 if(req.user.id !== req.params.id) return next(errorHandler(401,"Update your account only"));

    try {
        if(req.body.password){
            req.body.password = hashPassword(req.body.password);
            
        }
        const upUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                password:req.body.password,
                email:req.body.email,
                avatar:req.body.avatar,
            }
        },{new:true});
        const {password, ...rest} = upUser._doc;
        res.status(200).json(rest);
        
    } catch (error) {
        next(error);
    }

}
