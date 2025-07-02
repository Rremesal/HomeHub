import { Router } from "express";

// Core
import UserController from "../controllers/user.controller.js";

const userRouter = Router();

const userController = new UserController();

userRouter.post("/login", (req, res) => { userController.login(req, res) });
userRouter.get("/me", (req, res) => { userController.getMe(req, res) });
userRouter.post("/logout", (req, res) => { userController.logout(req, res) });

export default userRouter;