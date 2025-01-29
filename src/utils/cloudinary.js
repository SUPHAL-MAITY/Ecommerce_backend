import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

 // Configuration
 cloudinary.config({ 

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY , 
    api_secret:  process.env.CLOUDINARY_API_SECRET

    

   
});

// console.log('Cloudinary Config:', cloudinary.config());

const uploadOnCloudinary=async(localFilePath)=>{
    try {

      
        /// if no path return 
        if(!localFilePath) return null;

        //upload file on the cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
        })
        console.log("file has been uploaded on cloudinary successfully",response)
        //deleting the file from server after successful uploading 
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        console.log("error",error)
        fs.unlinkSync(localFilePath)
        
    }

}


export {uploadOnCloudinary}
