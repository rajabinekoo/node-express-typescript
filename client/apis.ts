const baseUrl = "http://localhost:3000";

const urls = {
  getUsers: () => `${baseUrl}/users`,
  createUser: () => `${baseUrl}/users`,
  updateUserPass: () => `${baseUrl}/users`,
  updateUserInfo: () => `${baseUrl}/users`,
  removeUser: (userId: number) => `${baseUrl}/users/${userId}`,
};

async function getUsers(): Promise<FindAllUsersDto> {
  const response: Response = await fetch(urls.getUsers());
  const jsonData: FindAllUsersDto = await response.json();
  return jsonData;
}

async function createUser(data: CreateUserDto): Promise<User> {
  const response: Response = await fetch(urls.createUser(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const jsonData: User = await response.json();
  return jsonData;
}
