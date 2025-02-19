import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OrderItems } from "../models/orderItems.model.js";
import mongoose from "mongoose";



export const createOrderItemsControler=asyncHandler(async(req,res)=>{

    const {orderId,productId,quantity,price,totalPrice}=req.body;
    if(!orderId || !productId || !quantity || !price || !totalPrice){
        throw new ApiError(400,"please provide all required fields for creating a order item")
    }
  

    const orderItem=await OrderItems.create({
        orderId,
        productId,
        quantity,
        price,
        totalPrice
    })


    if(!orderItem){
        throw new ApiError(400,"order item not created")
    }


    return res.status(200).json(new ApiResponse(200,orderItem,"order item created successfully"))
})


export const getRecentOrdersController=asyncHandler(async(req,res)=>{

    const page=parseInt(req.query.page)|| 1;
    const limit=req.query.limit||5;
    const skip=(page -1)*limit;

    const orders=await OrderItems.find({}).skip(skip).limit(limit).populate("productId").populate("orderId").sort({createdAt:-1})

    if(!orders){
        throw new ApiError(400,"No orders found ")
    }


    const totalOrders=await OrderItems.countDocuments()
    if(!totalOrders){
        throw new ApiError(400,"total orders not found")
    }


    const totalPages=Math.ceil(totalOrders/limit)
    if(!totalPages){
        throw new ApiError(400,"pages not found while counting the total pages")
    }

    return res.status(200).json(new ApiResponse(200,{orders,totalPages},"users fetched successfully"))
})


export const getSearchRecentorderController=asyncHandler(async(req,res)=>{
    
    const q=req.query.q;
    if(!q){
        throw new ApiError(400,"No search query found for searching orders")
    }

    if(!mongoose.isValidObjectId(q)){
        throw new ApiError(401,"it is not a valid object id")
    }
    const orders = await OrderItems.find({orderId:new mongoose.Types.ObjectId(q)}).populate("productId").populate("orderId")
    

    if(!orders){
        throw new ApiError(400,"No orders found  while searching orders")
    }



    return res.status(200).json(new ApiResponse(200,orders,"users fetched successfully"))

})