import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OrderItems } from "../models/orderItems.model.js";
import { Orders } from "../models/orders.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"


export const adminDashBoardController=asyncHandler(async(req,res)=>{
    const totalEarning=await OrderItems.aggregate([
        {$match : {
            createdAt:{
                $gte:new Date(new Date().getFullYear(),new Date().getMonth(),1),
                $lt:new Date(new Date().getFullYear(),new Date().getMonth()+1,1)
            }

        }
    },{
        $group:{
            _id:null,
            totalSales:{$sum:"$totalPrice"}
        }
    }


    ])

    
    const totalEarningThisMonth=totalEarning.length>0 ? totalEarning[0].totalSales : 0;

    console.log(totalEarningThisMonth)


    const totalSalesPrevMonth=await OrderItems.aggregate([
        {$match : {
            createdAt:{
                $gte:new Date(new Date().getFullYear(),new Date().getMonth()-1 ,1),
                $lt:new Date(new Date().getFullYear(),new Date().getMonth(),1)
            }

        }
    },{
        $group:{
            _id:null,
            totalSales:{$sum:"$totalPrice"}
        }
    }


    ])


    const totalEarningPrevMonth=totalSalesPrevMonth.length>0 ? totalSalesPrevMonth[0].totalSales : 0;
    
    console.log(totalEarningPrevMonth)

  ////  this has to made open when previous month will have some value
    const EarningPer=(totalEarningThisMonth-totalEarningPrevMonth)/totalEarningPrevMonth;
    
    console.log("earning per",EarningPer)

    const thisMonthDays=new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate()
    
    console.log(thisMonthDays)
    const prevMonthDays=new Date(new Date().getFullYear(),new Date().getMonth(),0).getDate()
    console.log(prevMonthDays)

    const totalOrders=await Orders.countDocuments()

    console.log(totalOrders)

    const totalCustomers=await User.countDocuments()

    console.log(totalCustomers)

    const totalSalePrice=await OrderItems.aggregate([
        {$group :{
            _id:null,
            totalSales:{$sum:"$totalPrice"}

        }}
    ])
    
  

  const totalSalePriceValue=totalSalePrice.length>0 ? totalSalePrice[0].totalSales : 0;
  
  console.log(totalSalePriceValue)

 return res.status(200).json(new ApiResponse(200,{totalEarningThisMonth,totalEarningPrevMonth,thisMonthDays,prevMonthDays,totalOrders,totalCustomers,totalSalePriceValue},"admin data fetched successfully"))

})


export const authCheckController=asyncHandler(async(req,res)=>{

        const accessToken=req.cookies.accessToken
        console.log("access token in auth Check",accessToken)
    
        if(!accessToken){
            throw new ApiError(400," access token is not available")
        }
    
       let decodedAccessToken;
    
        try {
            console.log("🔑 Secret Key:", process.env.ACCESS_TOKEN_SECRET);
    
            decodedAccessToken=jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
            console.log("decoded access token in auth check controller",decodedAccessToken)
    
            
        } catch (error) {
            console.log(error)
    
            if(error.name==="TokenExpiredError"){
                console.log("acess token is expired")
                throw new ApiError(401, "access token is expired.");
            }else{
    
                console.log("access token is invalid")
                throw new ApiError(401, "access token is invalid.");
    
            }
            
            
        }
    
        if(decodedAccessToken){
            console.log("id",decodedAccessToken._id)
            const id=decodedAccessToken._id
            
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
        
           return res.status(200).json(new ApiResponse(200,{auth:true},"auth status fetched successfully"))
        }


     throw new ApiError(400,"user is not a admin")
})



