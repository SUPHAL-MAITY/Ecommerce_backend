import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";

import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"



export const verifyJwtToken=asyncHandler(async(req,res,next)=>{
    // const  accessToken= req.headers["authorization"].split(" ")[1]

    const accessToken=req.cookies.accessToken
    // console.log("access token",accessToken)

    if(!accessToken){
        throw new ApiError(400," access token is not available")
    }

   let decodedAccessToken;

    try {
        // console.log("🔑 Secret Key:", process.env.ACCESS_TOKEN_SECRET);

        decodedAccessToken=jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        // console.log("decoded access token",decodedAccessToken)

        
    } catch (error) {
        console.log(error)

        if(error.name==="TokenExpiredError"){
            // console.log("acess token is expired")
            throw new ApiError(401, "access token is invalid.");
        }else{

            // console.log("access token is invalid")
            throw new ApiError(401, "access token is invalid.");

        }
        
        
    }

    if(decodedAccessToken){
        // console.log("id",decodedAccessToken._id)

        req.user=decodedAccessToken._id  /////may change here
         next()
    }

    

})



export const isAdmin=asyncHandler(async(req,res,next)=>{
    const id=req.user
    if(!id){
        throw new ApiError(400,"id not found while checking if user is admin")
    }

    const user=await User.findById(id)

    if(!user){
        throw new ApiError(400,"user not found while checking if user is admin")
    }

    if(user.role !=="admin"){
        throw new ApiError(401,"user is not admin")
    }

    next()




})





