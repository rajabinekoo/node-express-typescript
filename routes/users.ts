import express, { Router } from "express";
import { requestHandler } from "../middlewares/request.handler";
import { userController } from "../controllers/users";
const userRouter: Router = express.Router();

userRouter.get("/", requestHandler(userController.getUsers));
userRouter.post("/", requestHandler(userController.createUser));

export default userRouter;
