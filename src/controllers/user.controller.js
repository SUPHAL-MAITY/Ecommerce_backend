import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Reviews } from "../models/review.model.js";
import jwt from "jsonwebtoken"


 export  const createUserController=asyncHandler(async(req,res)=>{
    
    const {name,email,address,phone,password,profileUrl}=req.body.values
    
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
    const {email,password}=req.body.values;
    if(!email || !password){
        throw new ApiError(400,"All fields are necessary while login")
    }



    const user=await User.findOne({email})

    if(!user){
        throw new ApiError(400,"user not found")
    }


    const isMatch=await user.comparePassword(password)

    if(!isMatch){
        throw new ApiError(401,"Invalid Credentials")
    }

     const accessToken=user.generateAccessToken()



     if(!accessToken){
        throw new ApiError(400,"access token not generated")
     }


     return res.status(200).cookie("accessToken",accessToken,{
        httpOnly: true, // ✅ Prevents access from JavaScript
        secure: process.env.NODE_ENV === "production", // ✅ Only send over HTTPS in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ Required for cross-site cookies
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // ✅ Set expiration (e.g., 7 days)
      }).json(new ApiResponse(200,user,"User Logged In Sucessfully"))

      




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
    const {id}=req.body;

    // const id=req.user._id;
    let imagePath;
    imagePath=req.file.path
    console.log(imagePath)


    if(imagePath){
        const cloudinaryResponse=await  uploadOnCloudinary(imagePath)
        console.log("url",cloudinaryResponse.url)
        const user=await User.findByIdAndUpdate({_id:id},{profileUrl:cloudinaryResponse.url})
        return res.status(200).json(new ApiResponse(200,user,"user image uploaded successfully"))
       
    
    }else{
        throw new ApiError(400," image not uploaded successfully")
    }

    

    
   
})



export const addAddressController=asyncHandler(async(req,res)=>{

     //// id has to be passed from req.user._id

    const id=req.user

    if(!id){
        throw new ApiError(400,"id is necessary while adding address")
    }

    const {address}=req.body;

    console.log("id and address",id,address)

    if( !address){
        throw new ApiError(400," address is necessary while adding address")
    }

    const user=await User.findByIdAndUpdate({_id:id},{$push:{address:address}})

    if(!user){
        throw new ApiError(400,"address not added to the user array")
    }

    return res.status(200).json(new ApiResponse(200,user,"address added to the user array"))


})



export const getAddressController=asyncHandler(async(req,res)=>{
    const id=req.user;

    if(!id){
        throw new ApiError(400,"id is necessary while getting address")
    }


    const user=await User.findById(id)
    if(!user){
        throw new ApiError(400,"user not found")
    }

    let addressList=[]
    user.address.forEach((item)=>{
        addressList.push(item)
    })

    return res.status(200).json(new ApiResponse(200,addressList,"address fetched successfully"))

})


export const getProfileImageController=asyncHandler(async(req,res)=>{
    const accessToken=req.cookies.accessToken;
    console.log(accessToken)

    if(!accessToken){
        throw new ApiError(400,"Access token is not available for getting profile image")
    }


    let decodedAccessToken=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
    
    if(!decodedAccessToken){
        throw new ApiError(400,"decodedAccessToken is not available while fetching profile image")
    }

    const id=decodedAccessToken._id
            
    if(!id){
        throw new ApiError(400,"id not found while fetching profile image")
    }

    const user=await User.findById(id)

    if(!user){
        throw new ApiError(400,"user not found while fetching profile image")
    }

    const profileUrl=user.profileUrl;

    if(!profileUrl){
        throw  new ApiError(400,"profileUrl not found")
    }

    return res.status(200).json(new ApiResponse(200,profileUrl,"profile image fetched successfully"))





})


export const logoutController=asyncHandler(async(req,res)=>{
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true, // Use only in HTTPS
        sameSite: "Strict",
        path: "/",
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        path: "/",
    });

    return res.status(200).json(new ApiResponse(200,{},"user logged out successfully"));
})

export const checkAuthController=asyncHandler(async(req,res)=>{
     const accessToken=req.cookies.accessToken
        console.log("access token",accessToken)
    
        if(!accessToken){
            throw new ApiError(400," access token is not available in check auth ")
        }
    
       let decodedAccessToken;
    
        try {
            
    
        decodedAccessToken=jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log("decoded access token",decodedAccessToken)
    
            
        } catch (error) {
            console.log(error)
    
            if(error.name==="TokenExpiredError"){
                console.log("acess token is expired")
                throw new ApiError(401, "access token is expired");
            }else{
    
                console.log("access token is invalid")
                throw new ApiError(403, "access token is invalid.");
    
            }
            
            
        }
    
      return res.status(200).json(new ApiResponse(200,{ loggedIn:true },"Token is avaiable"))
            
             
        
    
})

