import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

interface User {
    name: string;
    password: string;
}

export class LoginViewProvider implements vscode.WebviewViewProvider {
    private user: User = {name: '', password: ''};
    private _view?: vscode.WebviewView;

    constructor(private readonly context: vscode.ExtensionContext) {
    }

    resolveWebviewView(webviewView: vscode.WebviewView): void {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
            vscode.Uri.file(path.join(this.context.extensionPath, 'src', 'views', 'LoginWebview'))
            ]
        };

        webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);        

        // listen message from webview
        webviewView.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case 'login': {
                    this.user.name = message.username;
                    this.user.password = message.password;

                    vscode.window.showInformationMessage(
                        `Login user: ${this.user.name}, password: ${this.user.password}`
                    );
                    break;
                }
                case 'save-current-input': {
                    this.user.name = message.username;
                    this.user.password = message.password;
                    break;
                }
                case 'load-login-view': {
                    const loginInfo = {username: this.user.name, password: this.user.password};
                    webviewView.webview.postMessage({ 
                        command: 'set-input-value', 
                        data: loginInfo 
                    });
                }
                default:
                    break;
            }
        });

        const previousState = this.context.workspaceState.get("webviewState", {});
        webviewView.webview.postMessage({command: "restoreState", data: previousState});
        console.log(previousState);
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const webviewPath = path.join(this.context.extensionPath, 'src', 'views', 'LoginWebview');

        // get HTML CSS JS Uri
        const htmlPath = vscode.Uri.file(path.join(webviewPath, 'login.html'));
        const cssUri = webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, 'login.css')));
        const jsUri = webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, 'login.js')));
        const codiconCssUri = webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, "codicon.css")));
        const codiconFontUri = webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, "codicon.ttf")));

        // get HTML contents
        let htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf8');
        let codiconCssContent = fs.readFileSync(path.join(webviewPath, 'codicon.css'), 'utf-8');

        codiconCssContent = codiconCssContent.replace(
            /url\(["']?\.\.?\/?codicon\.ttf.*?["']?\)/,
            `url('${codiconFontUri}')`
        );

        // replace path of CSS and JS
        htmlContent = htmlContent
            .replace('login.css', cssUri.toString())
            .replace('login.js', jsUri.toString())
            .replace('codicon.css', codiconCssUri.toString());

        return htmlContent;
    }
}