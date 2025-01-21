import mongoose ,{Schema} from "mongoose";




const reviewSchema=new Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products",

    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",

    },
    
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    comment:{
        type:String,
        
        
    },
   
    

},{timestamps:true})










export const Reviews=mongoose.model("Reviews",reviewSchema)