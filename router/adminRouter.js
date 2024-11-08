import express from 'express';
import {adminViewUsersController , adminLoginController ,updateAdminUserController,adminUpdateUser,deleteUser} from '../controller/adminController.js';
import { updateUserController } from '../controller/userController.js';

const adminRoute = express.Router();

adminRoute.get("/",(req,res)=>{
    res.render("adminlogin.ejs");
})
adminRoute.post("/adminlogin",adminLoginController);
adminRoute.get("/viewAllUsers",adminViewUsersController);
adminRoute.get("/updateUser",updateAdminUserController);
adminRoute.post("/adminUpdateUser",adminUpdateUser);
adminRoute.get("/deleteUser",deleteUser);

export default adminRoute; 
