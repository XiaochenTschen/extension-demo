import * as vscode from 'vscode';
import { LoginViewProvider } from './views/LoginViewProvider';
import { VPContainerViewProvider } from './views/VPContainerViewProvider';
import { UpdateViewProvider } from './views/UpdateViewProvider';
import { User } from './User';
import { ApiClient } from './ApiClient';
import { AuthService } from './services/AuthService';
import { ContainerService } from './services/ContainerServices';
import { MyTreeViewProvider } from './views/MyTreeviewProvider';
import { TreeviewService } from './services/TreeviewService';
import { MyTreeViewItem } from './views/MyTreeview/myTreeviewItem';

export function activate(context: vscode.ExtensionContext) {
    const user = new User();
    const apiClient = new ApiClient(user);
    const authService = new AuthService(apiClient, user);
    const containerService = new ContainerService(apiClient);
    const loginView = new LoginViewProvider(context, user, authService);
    const myTreeview = new MyTreeViewProvider(context);
    const containerView = new VPContainerViewProvider(context, containerService);
    const updateView = new UpdateViewProvider(context);
    const treeviewService = new TreeviewService();

    const obj = [
        {
            name: "Alice",
            age: 30,
            address: {
                city: "New York",
                zip: "10001"
            },
            subject: [
                {
                    name: "Math",
                    score: 95
                },
                {
                    name: "English",
                    score: 85
                }
            ]
        },
        {
            name: "Bob",
            age: 25,
            address: {
                city: "Los Angeles",
                zip: "90001"
            }
        },
        {
            name: "Charlie",
            age: 35,
            address: {
                city: "Chicago",
                zip: "60601"
            }
        }
    ];

    const treeitems = treeviewService.jsonToTreeitems(obj);
    myTreeview.updateItems(treeitems);

    // login webview
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('loginView', loginView)
    );

    // mytreeview
    context.subscriptions.push(
        vscode.window.registerTreeDataProvider('myTreeview', myTreeview)
    );

    // vp container treeview
    context.subscriptions.push(
        vscode.window.registerTreeDataProvider('VPContainerView', containerView)
    );

    // update webview
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('updateView', updateView)
    );

}

export function deactivate() {}