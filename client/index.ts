const tableBody = document.getElementById("usersTableBody");

function rowGenerator(user: User): string {
  return `<tr>
    <th scope="row">${user.id}</th>
    <td>${user.username}</td>
    <td>${user.email}</td>
  </tr>`;
}

function renderTable() {
  const rows = stateManagement.users.map((user) => rowGenerator(user));
  tableBody.innerHTML = rows.join("");
}
