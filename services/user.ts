import { Repository } from "typeorm";
import { databaseConnection } from "../database/connection";
import { User } from "../database/entities/user.entity";
import { CreateUserDto, FindAllUsersDto, UserDto } from "../dto/users";
import { ValidationError, validate } from "class-validator";
import { AppValidationError } from "../dto";

class UserService {
  private userRepository: Repository<User> =
    databaseConnection.getRepository(User);

  async getAllUsers(): Promise<FindAllUsersDto> {
    const result: [User[], number] = await this.userRepository.findAndCount();
    return { count: result[1], users: result[0] } as FindAllUsersDto;
  }

  async validateBody(data: CreateUserDto): Promise<UserDto> {
    const body: CreateUserDto = new CreateUserDto();
    body.username = data.username;
    body.password = data.password;
    body.email = data.email;
    const errors: ValidationError[] = await validate(body);
    if (errors.length !== 0) throw new AppValidationError(errors);
    return body as UserDto;
  }
}

export const userService: UserService = new UserService();
