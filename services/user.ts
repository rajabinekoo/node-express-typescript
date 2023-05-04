import { Repository } from "typeorm";
import { databaseConnection } from "../database/connection";
import { User } from "../database/entities/user.entity";
import {
  CreateUserDto,
  FindAllUsersDto,
  RemoveUserParams,
  UpdateUserDto,
  UpdateUserPassDto,
  UserResDto,
} from "../dto/users";
import { ValidationError, validate } from "class-validator";
import { AppValidationError } from "../dto";
import { plainToClass } from "class-transformer";
import { hash } from "bcrypt";
import { hashingRounds } from "../configs";

class UserService {
  private userRepository: Repository<User> =
    databaseConnection.getRepository(User);

  async getAllUsers(): Promise<FindAllUsersDto> {
    const result: [User[], number] = await this.userRepository.findAndCount();
    const responseData: FindAllUsersDto = {
      count: result[1],
      users: result[0],
    };
    return plainToClass(FindAllUsersDto, responseData, {
      excludeExtraneousValues: true,
    });
  }

  async validateCreateUserBody(data: CreateUserDto): Promise<CreateUserDto> {
    const body: CreateUserDto = new CreateUserDto();
    body.username = data.username;
    body.password = data.password;
    body.email = data.email;
    const errors: ValidationError[] = await validate(body);
    if (errors.length !== 0) throw new AppValidationError(errors);
    return body;
  }

  async validateUpdatePassBody(
    data: UpdateUserPassDto
  ): Promise<UpdateUserPassDto> {
    const body: UpdateUserPassDto = new UpdateUserPassDto();
    body.id = data.id;
    body.password = data.password;
    const errors: ValidationError[] = await validate(body);
    if (errors.length !== 0) throw new AppValidationError(errors);
    return body;
  }

  async validateUpdateBody(data: UpdateUserDto): Promise<UpdateUserDto> {
    const body: UpdateUserDto = new UpdateUserDto();
    body.id = data.id;
    body.email = data.email;
    body.username = data.username;
    const errors: ValidationError[] = await validate(body);
    if (errors.length !== 0) throw new AppValidationError(errors);
    return body;
  }

  async validateRemoveUserParams(
    data: RemoveUserParams
  ): Promise<RemoveUserParams> {
    const params: RemoveUserParams = new RemoveUserParams();
    params.id = data.id;
    const errors: ValidationError[] = await validate(params);
    if (errors.length !== 0) throw new AppValidationError(errors);
    return params;
  }

  async createUser(data: CreateUserDto): Promise<UserResDto> {
    const body: CreateUserDto = { ...data };
    body.password = await hash(body.password, hashingRounds);
    const result: User = this.userRepository.create(body);
    const user: User = await this.userRepository.save(result);
    return plainToClass(UserResDto, user, { excludeExtraneousValues: true });
  }

  async updateUserPassword(password: string, user: User): Promise<void> {
    const hashPassword = await hash(password, hashingRounds);
    const newUser: User = { ...user, password: hashPassword };
    await this.userRepository.save(newUser);
  }

  async updateUserInfo(data: UpdateUserDto, user: User): Promise<UserResDto> {
    const newUser: User = {
      ...user,
      email: data.email,
      username: data.username,
    };
    const updatedUser: User = await this.userRepository.save(newUser);
    return plainToClass(UserResDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async findUserByUsername(username: string): Promise<User | null | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async findUserByEmail(email: string): Promise<User | null | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  async findUserById(id: number): Promise<User | null | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async removeUserById(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}

export const userService: UserService = new UserService();
