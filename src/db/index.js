import mongoose from "mongoose";






const connectDB=async()=>{
    try {
       const connectionInstance= await mongoose.connect("mongodb+srv://suphal:z5wORl7KkVt5fBjE@cluster0.wrfvp.mongodb.net/ecommerce_2025?retryWrites=true&w=majority&appName=Cluster0")
       console.log(connectionInstance.connection.host)
     console.log(" database connected....... ")
    } catch (error) {
        console.log(error)
        
    }
}


export {connectDB}