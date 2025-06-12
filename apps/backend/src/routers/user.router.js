import UserController from "../controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();
const userController = new UserController();

// Auth
userRouter.post("/signup", (req, res) =>  { userController.create(req, res); });
userRouter.post("/signin", (req, res) => { userController.login(req, res); });
userRouter.get("/me", (req, res) => { userController.getMe(req, res); });
userRouter.post("/logout", (req, res) => { userController.logout(req, res); });

userRouter.get("/users", (req, res) => { userController.index(req, res); });
userRouter.post("/users/create", (req, res) => { userController.create(req, res); });
userRouter.delete("/users/:id", (req, res) => { userController.delete(req, res); });

export default userRouter;