var tableBody = document.getElementById("usersTableBody");
function rowGenerator(user) {
    return "<tr>\n    <th scope=\"row\">".concat(user.id, "</th>\n    <td>").concat(user.username, "</td>\n    <td>").concat(user.email, "</td>\n  </tr>");
}
function renderTable() {
    var rows = stateManagement.users.map(function (user) { return rowGenerator(user); });
    tableBody.innerHTML = rows.join("");
}
