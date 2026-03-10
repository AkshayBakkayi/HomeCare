import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

// Firebase Login (Handles both Register + Login)
userRouter.post("/register",registerUser );
userRouter.post("/login",loginUser );

export default userRouter;