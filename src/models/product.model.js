import mongoose ,{Schema} from "mongoose";




const productSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true

    },

    discountPrice:{
        type:Number,
        required:true,

    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",

    },
    
    images:{
        type: [String],
        default:["https://images.unsplash.com/photo-1525980955931-afd2d0adf1c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"] ,
    },
   
    rating:{
        type:Number,  
        default:0
    },
    ratingCount:{
        type:Number,  
        default:0
    },
    stock:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        enum:["Men","Woman","Unisex"]
    },
    discountType:{
        type:String,
        required:true,
    }
  
    

},{timestamps:true})










export const Products=mongoose.model("Products",productSchema)