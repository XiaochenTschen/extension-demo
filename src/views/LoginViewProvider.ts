import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { User } from '../User';
import { AuthService } from '../services/AuthService';
import { EventBus } from '../EventBus';

export class LoginViewProvider implements vscode.WebviewViewProvider {
    private readonly user: User;
    private readonly authService : AuthService;

    constructor(private readonly context: vscode.ExtensionContext, user: User, authService: AuthService) {
        this.user = user;
        this.authService = authService;
    }

    resolveWebviewView(webviewView: vscode.WebviewView): void {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
            vscode.Uri.file(path.join(this.context.extensionPath, 'src', 'views', 'LoginWebview')),
            vscode.Uri.file(path.join(this.context.extensionPath, 'resources', 'icons'))
            ]
        };

        webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

        // listen button click event
        webviewView.webview.onDidReceiveMessage((message) => {
            if (message.command === 'login') {
                this.user.updateUserName(message.username);
                this.user.updatePassword(message.password);
                
                this.authService.getAccessToken(message.username, message.password);

                vscode.window.showInformationMessage(
                `User Data Saved: ${this.user.getUserInfo()}`
                );

                EventBus.emitLogin();
            }
        });
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const iconFolderUri = webview.asWebviewUri(
            vscode.Uri.file(path.join(this.context.extensionPath, 'resources', 'icons'))
        );

        const webviewPath = path.join(this.context.extensionPath, 'src', 'views', 'LoginWebview');

        // get HTML CSS JS Uri
        const htmlPath = vscode.Uri.file(path.join(webviewPath, 'login.html'));
        const cssUri = webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, 'login.css')));
        const jsUri = webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, 'login.js')));

        // get HTML contents
        let htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf8');

        // replace path of CSS and JS
        htmlContent = htmlContent
            .replace('resources/icons/eye-open.svg', `${iconFolderUri}/eye-open.svg`)
            .replace('resources/icons/eye-closed.svg', `${iconFolderUri}/eye-closed.svg`)
            .replace('login.css', cssUri.toString())
            .replace('login.js', jsUri.toString());

        return htmlContent;
    }
}
