import { errorHandler } from "../../security/error.js"
import { hashPassword } from "../../security/passport.js"
import listingModel from "../models/listing.model.js";
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
                phone:req.body.phone,
            }
        },{new:true});
        const {password, ...rest} = upUser._doc;
        res.status(200).json(rest);
        
    } catch (error) {
        next(error);
    }

}

export const deleteUser =async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only delete your own account'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token')
        res.status(200).json({message:'User has been deleted !'});
    } catch (error) {
        next(error)
    }
}

export const getUserListing = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only view your own listing'));
    try {

      const listing = await  listingModel.find({userRef:req.params.id})
      res.status(200).json(listing);
        
    } catch (error) {
        next(error);
        
    }

}

export const getUser = async (req,res,next) =>{
   try {
    const user = await User.findById(req.params.id)
    if(!user) return next(errorHandler(404,'User not found !'));
    const {password:pass,...rest} = user._doc;
    res.status(200).json(rest);
        
    } catch (error) {
        next(error)
        
    }

}