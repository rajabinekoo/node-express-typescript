import { Request, RequestHandler, Response } from "express";
import { userService } from "../services/user";
import { FindAllUsersDto, UserDto } from "../dto/users";

interface IUserController {
  getUsers: RequestHandler;
}

class UserController implements IUserController {
  async getUsers(req: Request, res: Response) {
    const users: FindAllUsersDto = await userService.getAllUsers();
    res.send(users);
  }

  async createUser(req: Request, res: Response) {
    const user: UserDto = await userService.validateBody(req.body);
    res.status(201).send(user);
  }
}

export const userController: UserController = new UserController();
