import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotpassword,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

// forgot password
router.post('/forgot-password', forgotpassword )

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route
router.get('/user-auth',requireSignIn, (req,res)=>{
  res.status(200).send({ok:true})
})

//protected admin route
router.get('/admin-auth',requireSignIn,isAdmin, (req,res)=>{
  res.status(200).send({ok:true})
})

//update profile
router.put("/profile", requireSignIn, updateProfileController);



export default router;
