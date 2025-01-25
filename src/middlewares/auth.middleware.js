import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken"



export const verifyJwtToken=asyncHandler(async(req,res,next)=>{
    const  accessToken= req.headers["authorization"].split(" ")[1]

    if(!accessToken){
        throw new ApiError(400," access token is not available")
    }



    try {

        decodedAccessToken=jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        
    } catch (error) {

        if(error.name==="TokenExpiredError"){
            console.log("acess token is expired")
        }else{

            console.log("access token is invalid")
            throw new ApiError(401, "access token is invalid.");

        }
        
        
    }

    if(decodedAccessToken){
        req.user._id=decodedAccessToken.user  /////may change here
        return next()
    }

    

})


