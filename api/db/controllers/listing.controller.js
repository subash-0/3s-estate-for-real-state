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
        await listingModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing Deleted Successfully !');
    } catch (error) {
        next(error)
        
    }
}
export const updateListing = async (req,res,next) =>{
    const listing = await listingModel.findById(req.params.id);
    if(!listing) return next(errorHandler(404,'Listing not found !'));
    if(req.user.id!=listing.userRef) return next(errorHandler(401,'You can not delete listing'));
    try {
        const updatedListing = await listingModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true},
        );

        res.status(200).json(updatedListing);
        
    } catch (error) {
        next(error);
    }

}

 export const getListing =async(req,res,next)=>{
    try {

        const listing = await listingModel.findById(req.params.id);
        if(!listing) return next(errorHandler(404,'Listing not found'));
        res.status(200).json(listing);
        
    } catch (error) {
        next(error)
        
    }

}

export const searchListing =async (req,res,next) =>{
    try {
        const limit = parseInt(req.query.limit) || 5;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;
        let furnished = req.query.furnished;
        let type = req.query.type;
        let parkings = req.query.parkings;
        let status = req.query.status;
        if(offer === undefined || offer === 'false'){
            offer ={$in :[false,true]};
        }
        if(status === undefined || status === 'false'){
            status ={$in :[false,true]};
        }
        if(furnished === undefined || furnished === 'false'){
            furnished ={$in :[false,true]};
        }
       
        if(parkings === undefined || parkings === 'false'){
            parkings ={$in :[false,true]};
        }
        if(type === undefined || type === 'all'){
            type ={$in :['sale','rent']};
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        const listing = await listingModel.find({
            name:{$regex:searchTerm, $options:'i'},
            offer,
            furnished,
            parkings,
            type,
            status,
        }).sort({
            [sort]:order
        }).limit(limit).skip(startIndex);

        return res.status(200).json(listing);
        
    } catch (error) {
        next(error)
        
    }

}