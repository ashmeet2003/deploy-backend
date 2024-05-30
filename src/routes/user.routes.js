import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(
  //injecting middleware - multer
  upload.fields([
    // to accept two files
    {
      name:"avatar",   //same should be name in frontend
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  //then running method
  registerUser
  )

export default router