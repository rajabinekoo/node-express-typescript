import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { User } from "../database/entities/user.entity";

export class FindAllUsersDto {
  count: number;
  users: User[];
}

export class UserDto {
  username: string;
  password: string;
  email: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty() // required
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsEmail()
  email: string;
}
