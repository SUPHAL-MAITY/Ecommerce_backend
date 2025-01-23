import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Reviews } from "../models/review.model.js";





export const createReviewController=asyncHandler(async(req,res)=>{
    const {productId,rating,comment}=req.body;
    if(!productId || !rating){
        throw new ApiError(400,"please provide productId and rating  for creating a review")
    }
    
    ////// get the user id from the req.user._id 

    const userId=req.user._id;

    const review=await Reviews.create({
        productId,
        userId,
        rating,
        comment
    })


    if(!review){
        throw new ApiError(400,"review not created")
    }


    return res.status(200).json(new ApiResponse(200,review,"review created successfully"))



})



export const updateReviewController=asyncHandler(async(req,res)=>{
    const {reviewId}=req.params;
    const {rating,comment}=req.body;
    if(!reviewId){
        throw new ApiError(400,"please provide the review id")
    }
    if(!rating){
        throw new ApiError(400,"please provide the rating") 
    }
    if(!comment){
        throw new ApiError(400,"please provide the comment")
    }
    const review=await Reviews.findByIdAndUpdate(reviewId,{
        rating,
        comment
    })
    if(!review){
        throw new ApiError(400,"review not updated")
    }

    return res.status(200).json(new ApiResponse(200,review,"review updated successfully"))

})



export const getAllReviewsController=asyncHandler(async(req,res)=>{

    const page=parseInt(req.query.page)|| 1;
    const limit=req.query.limit || 10;
    const skip=(page-1)*limit;


    const reviews=await Reviews.find({}).skip(skip).limit(limit).sort({createdAt:-1})

    if(!reviews){
        throw new ApiError(400,"reviews not found")
    }


    return res.status(200).json(new ApiResponse(200,reviews,"reviews fetched successfully"))


    
   
    
})



export const deleteReviewController=asyncHandler(async(req,res)=>{
    const {reviewId}=req.body;
    if(!reviewId){
        throw new ApiError(400,"please provide the review id for deleting the review")
    }


    await Reviews.findByIdAndDelete(reviewId)

    return res.status(200).json(new ApiResponse(200,null,"review deleted successfully"))


})


