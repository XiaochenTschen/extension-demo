import * as vscode from 'vscode';
import { MyTreeViewProvider } from './views/MyTreeviewProvider';

export function activate(context: vscode.ExtensionContext) {
	const myTreeview = new MyTreeViewProvider(context);

	context.subscriptions.push(
        vscode.window.registerTreeDataProvider('myTreeview', myTreeview)
    );
}

// This method is called when your extension is deactivated
export function deactivate() {}
