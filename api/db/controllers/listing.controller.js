import { errorHandler } from "../../security/error.js";
import listingModel from "../models/listing.model.js";

export const createListing=async (req,res,next)=>{
    try {
        const listing = await listingModel.create(req.body);
        return res.status(200).json(listing);
    } catch (error) {
        next(error);
        
    }

}

export const deleteListing =async(req,res,next)=>{
    const listing = await listingModel.findById(req.params.id);
    if(!listing) return next(errorHandler(404,'Listing not found !'));
    if(req.user.id!=listing.userRef) return next(errorHandler(401,'You can not delete listing'));
    try {
        const result = await listingModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing Deleted Successfully !');
    } catch (error) {
        next(error)
        
    }
}
