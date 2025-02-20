import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OrderItems } from "../models/orderItems.model.js";
import { Orders } from "../models/orders.model.js";
import { User } from "../models/user.model.js";


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



