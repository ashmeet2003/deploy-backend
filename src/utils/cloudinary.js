//reusable code for any project
import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
 
// Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try{
    if(!localFilePath) return null;
    //upload the file on cloudinary -> using code from documentary
    const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto"   //will detect by itself
    });
    console.log("file is successfully uploaded on cloudinary", response.url);
    return response;
  } catch(error) {
    //if file not uploaded, remove from sever - we use fs for this
    fs.unlinkSync(localFilePath)   // to make it synchronous
    return null;
  }
} 

export {uploadOnCloudinary}