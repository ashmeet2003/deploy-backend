import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
  //steps - get user detail
  //validation
  //check if user already exist
  //check for images, check for avatar
  //upload them to cloudinary
  //create user object - create entry in db
  //remove password and refresh token field from respomse
  //check for user creation
  //return response

  //get user detail
  const {fullName, email, username, password} = req.body
  console.log("email : ", email);

  /*if(fullName===""){
    //using model designed in utils
    throw new ApiError(400, "full name is requires")
  }*/
  //handling all if-else at once instead of above
  if(
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ){
    //using error model designed
    throw new ApiError(400, "All Fields Are Required")
  }

  //checking if user exists by shecking both email and username using operator
  const existedUser = User.findOne({
    $or: [{ username }, { email }]
  })

  if(existerUser){
    throw new ApiError(409, "user with username or email exists")
  }

  //check for images and avatar, file acess by multer
  const avatarLocalPath = req.files?.avatar[0]?.path; 
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  //check for avatar
  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar File is required")
  }
  
  //upload 
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  //check if uploaded
  if(!avatar){
    throw new ApiError(400, "Avatar File is required")
  }

  //entry in db
  const user = await User.create({
    fullName,
    //only url of path response from cloudinary
    avatar : avatar.url,
    coverImage : coverImage?.url || "",  //as not compulsary
    email,
    password,
    username: username.toLowercase()
  })

  //checking user using monodb id, also removing password and token
  const createdUser = await User.findById(user._id).select(
    "-password - refreshToken"
  )
  //server error so 500
  if(createdUser){
    throw new ApiError(500, "something went wrong while registering user")
  }

  //sending response using model created in utils
  return res.status(201).json(
    new ApiResponse(200, createdUser, "user registered Successfully")
  )
})

export {registerUser} 