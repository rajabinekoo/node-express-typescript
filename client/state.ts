class StateManagement {
  public users: User[] = [];
  public count: number = 0;

  constructor() {
    this.init();
  }

  async init() {
    try {
      const newUsers: FindAllUsersDto = await getUsers();
      this.users = newUsers.users;
      this.count = newUsers.count;
      renderTable();
    } catch (error) {}
  }
}

const stateManagement = new StateManagement();
