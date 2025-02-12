import * as vscode from 'vscode';
import { LoginViewProvider } from './views/LoginViewProvider';
import { VPContainerViewProvider } from './views/VPContainerViewProvider';
import { ContainerItem } from './views/VPContainerTreeview/ContainerItem';
import { UpdateViewProvider } from './views/UpdateViewProvider';
import { User } from './User';
import { ApiClient } from './ApiClient';
import { AuthService } from './services/AuthService';
import { ContainerService } from './services/ContainerServices';

export function activate(context: vscode.ExtensionContext) {
  const user = new User();
  const apiClient = new ApiClient(user);
  const authService = new AuthService(apiClient, user);
  const containerService = new ContainerService(apiClient);
  const loginView = new LoginViewProvider(context, user, authService);
  const containerView = new VPContainerViewProvider(context, containerService);
  const updateView = new UpdateViewProvider(context);

  // login webview
  context.subscriptions.push(
      vscode.window.registerWebviewViewProvider('loginView', loginView)
  );

  // vp container treeview
  vscode.window.registerTreeDataProvider('VPContainerView', containerView);
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'containerView.run',
      (item: ContainerItem) => {
        vscode.window.showInformationMessage(`Running: ${item.label}`);
        containerView.runItem(item);
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'containerView.stop',
      (item: ContainerItem) => {
        vscode.window.showInformationMessage(`Stopping: ${item.label}`);
        containerView.stopItem(item);
      }
    )
  );

  // update webview
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('updateView', updateView)
  );
}

export function deactivate() {}