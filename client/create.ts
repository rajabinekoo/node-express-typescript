const usernameInput = document.getElementById("create-username-input");
const passowrdInput = document.getElementById("create-password-input");
const emailInput = document.getElementById("create-email-input");

document
  .getElementById("creation-form")
  .addEventListener("submit", async (e: any) => {
    e?.preventDefault?.();
    const username = (<HTMLInputElement>usernameInput).value;
    const password = (<HTMLInputElement>passowrdInput).value;
    const email = (<HTMLInputElement>emailInput).value;
    const data: CreateUserDto = {
      username,
      password,
      email,
    };
    await createUser(data);
    alert("Created!");
    window.location.href = "/";
  });
