import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Orders } from "../models/orders.model.js";



export const createOrderController=asyncHandler(async(req,res)=>{
    const {userId,status,totalPrice,shippingAddress,paymentMethod,paymentIntentId}=req.body;
    if(!userId || !status || !totalPrice || !shippingAddress || !paymentMethod || !paymentIntentId){
        throw new ApiError(400,"please provide all required fields for creating an order")
    }


    const order=await Orders.create({
        userId,
        status,
        totalPrice,
        shippingAddress,
        paymentMethod,
        paymentIntentId
    })
    if(!order){
        throw new ApiError(400,"order not created")
    }

    return res.status(200).json(new ApiResponse(200,order,"order created Successfully"))
})