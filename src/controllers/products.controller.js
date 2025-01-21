import { asyncHandler } from "../utils/AsyncHandler.js";
import { Products } from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";




////create product

export const createProductController=asyncHandler(async(req,res)=>{

 

 const {title ,description,price,discountPrice,categoryId}=req.body;

 if(!title || !description || !price || !discountPrice || !categoryId){
    throw new ApiError(400,"please provide all required fields for creating a product")
 }

 const product=await Products.create({
    title,
    description,
    price,
    discountPrice,
    categoryId,


 })

 if(!product){
    throw new ApiError(400,"product not created")
 }




    
return res.status(200).json(new  ApiResponse(200,product,"product created successfully",))
    
    
    
   
   




})

/// get all products by pagination
export const  getAllProductsController=asyncHandler(async(req,res)=>{

    const page=parseInt(req.query.page)|| 1;
    const limit= req.query.limit || 10;
    const skip=(page-1)*limit;


    const products=await  Products.find({}).skip(skip).limit(limit).sort({createdAt:-1})
    
    if(!products){
        throw new ApiError(400,"Products not found while fetching all products")
    }

    return res.status(200).json(new ApiResponse(200,products,"products are fetched successfully"))

})

///// get single product by id

export const singleProductController=asyncHandler(async(req,res)=>{
    const {productId}=req.params

    if(!productId){
        throw new ApiError(400," please provide the product id")
    }

    const product=await  Products.findById(productId)
    if(!product){
        throw new ApiError(400,"product not found")
    }

    return res.status(200).json(new ApiResponse(200,product,"product is fetched successfully"))


})

///update product
export const updateProductController=asyncHandler(async(req,res)=>{
    const {productId}=req.params  ;
    if(!productId){
        throw new ApiError(400,"please provide the product id")
    }
    const {title,description,price,discountPrice,categoryId}=req.body;
    if(!title || !description || !price || !discountPrice || !categoryId){
        throw new ApiError(400,"please provide all required fields for creating a product")
    }

    const product=await Products.findByIdAndUpdate(productId,{
        title,
        description,
        price,
        discountPrice,
        categoryId, 
    },{new:true})

    if(!product){
        throw new ApiError(400,"product not updated")
    }

    return res.status(200).json(new ApiResponse(200,product,"product updated successfully"))



})  


///delete product 
export const deleteProductController=asyncHandler(async(req,res)=>{
    const {productId}=req.body;
    if(!productId){
        throw new ApiError(400,"please provide the product id")
    }

    await Products.findByIdAndDelete(productId)

    return res.status(200).json(new ApiResponse(200,"product deleted successfully"))
})


