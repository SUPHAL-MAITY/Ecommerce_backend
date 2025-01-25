import { asyncHandler } from "../utils/AsyncHandler.js";
import { Products } from "../models/product.model.js";
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

/// get product with review
export const  getAllProductsWithReviewController=asyncHandler(async(req,res)=>{

    const page=parseInt(req.query.page)|| 1;
    const limit= req.query.limit || 10;
    const skip=(page-1)*limit;

    const products=await Products.aggregate([
        {$sort :{createdAt:-1}},
        {$skip : skip},
        {$limit:limit },
        {$lookup:{
            from:"reviews",
            localField:"_id",
            foreignField:"productId",
            as:"reviews"
        }}
    ])

   
    
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




////filtered products controller 


export const filteredProductsController=asyncHandler(async(req,res)=>{

    console.log("filter started")

    const {priceMin,priceMax,category}=req.query;
    console.log(priceMin,priceMax,category)

    const filter={}

    if(category){
        filter.category=category
    }

    if(priceMin && priceMax){
        filter.price={}

        filter.price.$gte=priceMin;
        filter.price.$lte=priceMax;


    }


  console.log("filter",filter)
    const products=await Products.find(filter)
    console.log(products)
    if(!products){
        throw new ApiError(400,"products not found")
    }


    return res.status(200).json(new ApiResponse(200,{products,legth:products.length},"products are fetched successfully"))

    




})


///searched products controller 


export const searchedProductsController=asyncHandler(async(req,res)=>{
    const {search}=req.query;
    if(!search){
        throw new ApiError(400,"please provide the search query")
    }
    const products=await Products.find({title:{$regex:search,$options:"i"}})

    if(!products){
        throw new ApiError(400,"products not found")
    }

    return res.status(200).json(new ApiResponse(200,products,"products are fetched successfully"))
})





