import mongoose ,{Schema} from "mongoose";




const orderSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","shipped","delivered","cancelled","returned"]
      
    },
  
    totalPrice:{
        type:Number,
        required:true,
    },
  
    shippingAddress:{
        type:String,
        required:true,
    },
  
    paymentMethod:{
        type:String,
       
    },
  
  
  
    

},{timestamps:true})










export const Orders=mongoose.model("Orders",orderSchema)