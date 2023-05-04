import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from "class-validator";
import { Expose, Type } from "class-transformer";

export class FindAllUsersDto {
  @Expose()
  count: number;
  @Expose()
  @Type(() => UserResDto)
  users: UserResDto[];
}

export class UserResDto {
  @Expose()
  id: number;
  @Expose()
  username: string;
  @Expose()
  email: string;
  password: string;
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

export class RemoveUserParams {
  @IsNumberString()
  @IsNotEmpty() // required
  id: string;
}

export class UpdateUserPassDto {
  @IsNumberString()
  @IsNotEmpty() // required
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UpdateUserDto {
  @IsNumberString()
  @IsNotEmpty() // required
  id: string;

  @IsString()
  @IsNotEmpty() // required
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;
}
