import * as vscode from 'vscode';
import { LoginViewProvider } from './views/LoginviewProvider';

export function activate(context: vscode.ExtensionContext) {

	const loginView = new LoginViewProvider(context);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('loginView', loginView)
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
