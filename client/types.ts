class User {
  id: number;
  username: string;
  email: string;
}

class FindAllUsersDto {
  count: number;
  users: User[];
}

class CreateUserDto {
  username: string;
  password: string;
  email: string;
}
