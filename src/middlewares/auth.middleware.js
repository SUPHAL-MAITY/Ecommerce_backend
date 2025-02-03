import { asyncHandler } from "../utils/AsyncHandler.js";

import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"



export const verifyJwtToken=asyncHandler(async(req,res,next)=>{
    // const  accessToken= req.headers["authorization"].split(" ")[1]

    const accessToken=req.cookies.accessToken
    console.log("access token",accessToken)

    if(!accessToken){
        throw new ApiError(400," access token is not available")
    }

   let decodedAccessToken;

    try {
        console.log("🔑 Secret Key:", process.env.ACCESS_TOKEN_SECRET);

        let decodedAccessToken=jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log("decoded access token",decodedAccessToken)

        
    } catch (error) {
        console.log(error)

        if(error.name==="TokenExpiredError"){
            console.log("acess token is expired")
        }else{

            console.log("access token is invalid")
            throw new ApiError(401, "access token is invalid.");

        }
        
        
    }

    if(decodedAccessToken){
        req.user._id=decodedAccessToken._id  /////may change here
        return next()
    }

    

})


