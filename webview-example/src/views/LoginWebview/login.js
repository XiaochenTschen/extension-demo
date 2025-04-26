const vscode = acquireVsCodeApi();

console.log('execute login js');

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const eyeOpen = document.getElementById("eye-open");
const eyeClosed = document.getElementById("eye-closed");
const loginButton = document.getElementById("LoginButton");

function saveState() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    vscode.postMessage({
        command: 'save-current-input',
        username: username,
        password: password
    });
}

document.getElementById("username").addEventListener("input", saveState);

document.getElementById("password").addEventListener("input", saveState);

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

loginButton.addEventListener('click', () => {
    console.log('button clicked');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    vscode.postMessage({
        command: 'login',
        username: username,
        password: password
    });
});

window.addEventListener('message', event => {
    const message = event.data;
    switch (message.command) {
        case 'set-input-value':{
            if (message.data.username) {
                usernameInput.value = message.data.username;
            }
            if (message.data.password) {
                passwordInput.value = message.data.password;
            }
            break;
        }
        default:
            break;
    }
});

vscode.postMessage( { command: 'load-login-view' } );

