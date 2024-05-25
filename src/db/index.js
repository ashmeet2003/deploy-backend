import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);  
    console.log("mongoDB connected");
  } catch(error){
      console.log("mongodb connection error". error);
      process.exit(1)
  }
}

export default connectDB