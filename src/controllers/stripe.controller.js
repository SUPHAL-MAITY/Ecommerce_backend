import { asyncHandler } from "../utils/AsyncHandler.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51Qh8djCKxfS1go2SH7dNVXkhP6GGAIcmXV5opabIDDFmo4RTHyKUyyXWHX6iXZYslmaR4BtSZt8CoefdgnKihq7w00o0t6ethd');



export const createCheckoutSession=asyncHandler(async(req,res)=>{

    const {products}=req.body;
    console.log("products",products)

 

    const lineItems=products.map((product)=>(
        {
            price_data:{
                currency:"usd",
                product_data:{
                    name: product.title,
                    images:[product.image]
                },
                unit_amount:Math.round(product.price*100) ,
            },
            quantity:product.quantity

        }
    ));


    // if total Amount is less than 500 then add delivery fee 
 
    const totalAmounts=lineItems.reduce((sum,item)=>{
      return   sum + item.price_data.unit_amount*item.quantity
    },0)

   if(totalAmounts<50000){
    lineItems.push({
        price_data:{
            currency:"usd",
            product_data:{
                name: "Delivery Fee",
               images:["https://cdn1.vectorstock.com/i/1000x1000/79/25/car-delivery-logo-vector-20897925.jpg"]
            },
            unit_amount:1500 ,
        },
        quantity:1


    })
   }
 console.log("line items",lineItems)

    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:5173/success",
        cancel_url:"http://localhost:5173/fail"
    })

    res.json({id:session.id})
    
})  