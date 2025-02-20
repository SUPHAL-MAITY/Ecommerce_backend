import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"





const app=express()





/// need to improve later 
app.use(cors({
    // origin: process.env.CORS_ORIGIN, 
    // credentials: true
    //    origin:"*",
    origin: 'http://localhost:5173',  // Allow requests from your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow the methods you need
    
    credentials: true,
}))



app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))








///// router middlewares 

 import testRouter from "./routes/test.routes.js"
 import checkoutRouter from "./routes/stripe.routes.js"
 import productRouter from "./routes/products.routes.js"
 import  categoryRouter from "./routes/category.routes.js"
 import reviewRouter from "./routes/review.routes.js"
 import userRouter from "./routes/user.routes.js"
 import orderRouter from "./routes/order.routes.js"
 import orderItemsRouter from "./routes/orderItems.routes.js"
 import adminRouter from "./routes/admin.routes.js"


 app.use("/api/v1",testRouter)
 app.use("/api/v1",checkoutRouter)  
 app.use("/api/v1",productRouter)  
 app.use("/api/v1",categoryRouter)  
 app.use("/api/v1",reviewRouter)  
 app.use("/api/v1",userRouter)  
 app.use("/api/v1",orderRouter)
 app.use("/api/v1",orderItemsRouter)
 app.use("/api/v1",adminRouter)










export {app}