const vscode = acquireVsCodeApi();

document.getElementById('LoginButton').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  vscode.postMessage({
    command: 'login',
    username: username,
    password: password
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const eyeOpen = document.getElementById("eye-open");
  const eyeClosed = document.getElementById("eye-closed");

  eyeOpen.addEventListener("click", function () {
    passwordInput.type = "text";
    eyeOpen.classList.add("hidden");
    eyeClosed.classList.remove("hidden");
  });

  eyeClosed.addEventListener("click", function () {
    passwordInput.type = "password";
    eyeClosed.classList.add("hidden");
    eyeOpen.classList.remove("hidden");
  });
});

window.addEventListener('message', event => {
    const message = event.data;
    switch (message.command) {
        case 'setInitialValues':
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            if (message.data.username) {
                usernameInput.value = message.data.username;
            }
            if (message.data.password) {
                passwordInput.value = message.data.password;
            }
            break;
    }
});


