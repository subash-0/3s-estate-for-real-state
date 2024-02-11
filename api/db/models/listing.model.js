import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    regularPrice:{
        type:Number,
        required:true,
    },
    regularPrice:{
        type:Number,
        required:true,
    },
    bathrooms:{
    type:Number,
    require:true,
    },
    furnished:{
        type:Boolean,
        required:true,
    },
    parkings:{
        type:Boolean,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    offer:{
        type:Boolean,
        required:true,
    },
    imageUrl:{
        type:Array,
        required:true,

    },
    userRef:{
        type:String,
        required:true,
    }
},{timestamps:true});
const listingModel = mongoose.model('Listing',listingSchema);
export default listingModel;