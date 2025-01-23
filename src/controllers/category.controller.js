import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";

///create category
export const createCategoryController=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    if(!name){
        throw new ApiError(400,"please provide the category name")
    }

    const category=await Category.create({
        name
    })

    if(!category){
        throw new ApiError(400,"category not created")
    }

    return res.status(200).json(new ApiResponse(200,category,"category created succesfully"))
})


///get all categories
export const getAllCategoriesController=asyncHandler(async(req,res)=>{
    const categories=await Category.find({})
    if(!categories){
        throw new ApiError(400,"categories not found")
    }
    return res.status(200).json(new ApiResponse(200,categories,"categories fetched succesfully"))

})

// update category
export const updateCategoryController=asyncHandler(async(req,res)=>{
    const {categoryId}=req.body
    const {name}=req.body
    if(!categoryId){
        throw new ApiError(400,"please provide the category id")
    }
    if(!name){
        throw new ApiError(400,"please provide the category name")
    }

    const category=await Category.findByIdAndUpdate(categoryId,{
        name
    })

    if(!category){
        throw new ApiError(400,"category not updated")
    }

    return res.status(200).json(new ApiResponse(200,category,"category updated succesfully"))
 

})

//delete category

export const deleteCategoryController=asyncHandler(async(req,res)=>{
    const {categoryId}=req.body
    if(!categoryId){
        throw new ApiError(400,"please provide the category id")
    }
    await Category.findByIdAndDelete(categoryId)

    return res.status(200).json(new ApiResponse(200,{},"category deleted successfully"))
})




