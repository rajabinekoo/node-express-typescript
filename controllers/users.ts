import { Request, RequestHandler, Response } from "express";
import { userService } from "../services/user";
import {
  FindAllUsersDto,
  CreateUserDto,
  RemoveUserParams,
  UpdateUserPassDto,
  UpdateUserDto,
  UserResDto,
} from "../dto/users";
import { User } from "../database/entities/user.entity";
import { AppError } from "../dto";

interface IUserController {
  getUsers: RequestHandler;
  createUser: RequestHandler;
  removeUser: RequestHandler;
  updateUserPassword: RequestHandler;
  updateUser: RequestHandler;
}

class UserController implements IUserController {
  async getUsers(_req: Request, res: Response) {
    const users: FindAllUsersDto = await userService.getAllUsers();
    res.send(users);
  }

  async createUser(req: Request, res: Response) {
    const body: CreateUserDto = await userService.validateCreateUserBody(
      req.body
    );
    let targetUser: User = await userService.findUserByUsername(body.username);
    if (!!targetUser) throw new AppError("User already exist", 409);
    targetUser = await userService.findUserByEmail(body.email);
    if (!!targetUser) throw new AppError("User already exist", 409);
    const user: User = await userService.createUser(body);
    res.status(201).send(user);
  }

  async removeUser(req: Request, res: Response) {
    const params: RemoveUserParams = await userService.validateRemoveUserParams(
      { id: req.params?.id }
    );
    const targetUser: User = await userService.findUserById(Number(params.id));
    if (!targetUser) throw new AppError("Not found", 404);
    await userService.removeUserById(Number(params.id));
    res.send("removed");
  }

  async updateUserPassword(req: Request, res: Response) {
    const body: UpdateUserPassDto = await userService.validateUpdatePassBody(
      req.body
    );
    const targetUser: User = await userService.findUserById(Number(body.id));
    if (!targetUser) throw new AppError("Not found", 404);
    await userService.updateUserPassword(body.password, targetUser);
    res.send("done");
  }

  async updateUser(req: Request, res: Response) {
    const body: UpdateUserDto = await userService.validateUpdateBody(req.body);
    const targetUser: User = await userService.findUserById(Number(body.id));
    if (!targetUser) throw new AppError("Not found", 404);
    const user: UserResDto = await userService.updateUserInfo(body, targetUser);
    res.send(user);
  }
}

export const userController: UserController = new UserController();
