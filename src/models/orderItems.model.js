import mongoose ,{Schema} from "mongoose";




const orderItemSchema=new Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Orders",
        required:true,
        
    },
    productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Products",
            required:true,
    }, 
      
    quantity:{
      type:Number,
      required:true,
    },   
       
    price:{
        type:Number,
        required:true,
       
    },
    totalPrice:{
        type:Number,
        required:true
    }
  
  
  
    

},{timestamps:true})










export const OrderItems=mongoose.model("OrderItems",orderItemSchema)