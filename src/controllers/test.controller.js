import { asyncHandler } from "../utils/AsyncHandler.js";


export const test=asyncHandler(async(req,res)=>{
    res.send("hello all set")
})