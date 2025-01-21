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
        type: Array,
        default:"https://images.unsplash.com/photo-1525980955931-afd2d0adf1c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
    },
   
    rating:{
        type:String,  ///hashed password
        required:true
    },
    ratingCount:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    }
  
    

},{timestamps:true})










export const Products=mongoose.model("Products",productSchema)