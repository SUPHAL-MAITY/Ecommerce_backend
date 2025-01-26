import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


 export  const createUserController=asyncHandler(async(req,res)=>{
    const {name,email,address,phone,password,profileUrl}=req.body;
    if(!name || !email || !address || !phone || !password ){
        throw new ApiError(400,"All fields are necessary while creating a user")
    }

    const exisingUser=await User.findOne({email})

    if(exisingUser){
        throw new ApiError(400,"user already exists")
    }
    let role="customer"

    const user=await User.create({name,email,address,phone,password,role,profileUrl})
    if(!user){
        throw new ApiError(400,"user not created")
    }

    return res.status(200).json(new ApiResponse(200,user,"User Created Sucessfully"))

})



export const loginUserController=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        throw new ApiError(400,"All fields are necessary while login")
    }



    const user=await User.findOne({email})

    if(!user){
        throw new ApiError(400,"user not found")
    }


    const isMatch=await user.comparePassword(password)

    if(!isMatch){
        throw new ApiError(400,"Invalid Credentials")
    }

     const accessToken=user.generateAccessToken()



     if(!accessToken){
        throw new ApiError(400,"access token not generated")
     }


     return res.status(200).cookie("accessToken",accessToken).json(new ApiResponse(200,user,"User Logged In Sucessfully"))

      




})



export const editUserController=asyncHandler(async(req,res)=>{
    const id=req.user._id;
    if(!id){
        throw new ApiError(400,"id not found while updating a user")
    }
    const {name,email,address,phone,profileUrl}=req.body;
    console.log(name,email,address,phone,profileUrl)
    if(!name || !email || !address ||  !phone || !profileUrl){
        throw new ApiError(400,"All fields are necessary while updating a user")
    }
    const user=await User.findByIdAndUpdate({_id:id},{name,email,address,phone,profileUrl})
    if(!user){
        throw new ApiError(400,"user not updated")
    }
    return res.status(200).json(new ApiResponse(200,{},"User Updated Sucessfully"))
})


export const deleteUserController=asyncHandler(async(req,res)=>{
    const {id}=req.body;
    console.log(id)
    if (!id) {
       
        throw new ApiError(400, "User ID is required");
      }
    
    const user=await User.findByIdAndDelete({_id:id})
    if(!user){
        throw new ApiError(400,"user not deleted")
    }
    return res.status(200).json(new ApiResponse(200,{},"User Deleted Sucessfully"))
})


export const getAllUsersController=asyncHandler(async(req,res)=>{
    
    const page=parseInt(req.query.page) ||1;   
    const limit=5;
    const skip=(page-1)*limit;

    const users=await User.find({}).skip(skip).limit(limit).sort({createdAt:-1})
    if(!users){
        throw new ApiError(400,"users not found")
    }


    const totalUsers=await User.countDocuments();
    if(!totalUsers){
        throw new ApiError(400,"total users not found")
    }
    

    const totalPages=Math.ceil(totalUsers/limit);
    if(!totalPages){
        throw new ApiError(400,"total pages not found")
    }

    return res.status(200).json(new ApiResponse(200,{users,recentPage:page,totalPages, length:users.length}," all users fetched sucessfully"))
})



export const getOwnUserController=asyncHandler(async(req,res)=>{
    const id=req.user._id;
    console.log("id in own user ",id)
    if(!id){
        throw new ApiError(400,"id is necessary while getting own profile")
    }

    const user=await User.findById(id)
    if(!user){
        throw new ApiError(400,"user not found")
    }
    return res.status(200).json(new ApiResponse(200,user,"own details fetched sucessfully"))
})


export const searchUserController=asyncHandler(async(req,res)=>{

    const item=req.query.q;
    
    if(!item  ){
        throw new ApiError(400,"Items are not found in Search Bar")
        
    }

    

    const  users=await User.find({  $or:[{name:{$regex:item,$options:"i"}}
                                       
        
    ] })

   
 
    if(! users){
        throw new ApiError(400,"users not found")
    }
    return res.status(200).json(new ApiResponse(200,{users,length:users.length},"users fetched successfully"))

})

export const uploadUserImage=asyncHandler(async(req,res)=>{
    let imagePath;
    imagePath=req.file.path
    console.log(imagePath)


    if(imagePath){
        const cloudinaryResponse=await  uploadOnCloudinary(imagePath)
        console.log("url",cloudinaryResponse.url)
    }
    return res.status(200).json(200,{},"ok")
})



