import express, { request, response } from 'express';
import { registrationController,loginController ,updateController,updateUserController,userResetPassword,userPasswordCheker} from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get("/register",(request,response)=>{
    response.render("register.ejs");
})

userRouter.get("/login",(request,response)=>{
    response.render("index.ejs",{message:""});
})

userRouter.get("/resetPassword",userResetPassword);
userRouter.post("/resetPassword",userPasswordCheker);
userRouter.get("/update",updateController);
userRouter.post("/register",registrationController)
userRouter.post("/login",loginController)
userRouter.post("/update",updateUserController)



export default userRouter;