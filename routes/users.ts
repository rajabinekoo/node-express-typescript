import express, { Router } from "express";
import { requestHandler } from "../middlewares/request.handler";
import { getUsers } from "../controller/users";
const userRouter: Router = express.Router();

userRouter.get("/", requestHandler(getUsers));

export default userRouter;
