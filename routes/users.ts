import express, { Router } from "express";
import { requestHandler } from "../middlewares/request.handler";
import { userController } from "../controllers/users";
const userRouter: Router = express.Router();

userRouter.get("/", requestHandler(userController.getUsers));
userRouter.post("/", requestHandler(userController.createUser));
userRouter.delete("/:id", requestHandler(userController.removeUser));
userRouter.patch("/", requestHandler(userController.updateUserPassword));
userRouter.put("/", requestHandler(userController.updateUser));

export default userRouter;
