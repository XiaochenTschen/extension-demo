import * as vscode from 'vscode';
import * as path from 'path';

export class ContainerItem extends vscode.TreeItem {
  public isRunning: boolean = false;

  constructor(
    public readonly label: string,
    private readonly extensionFolder: string,
    private readonly iconName: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    
    this.updateContexValue();
    this.updateIcon();
  }

  private updateContexValue() {
    this.contextValue = this.isRunning ? "running" : "stopped";
  }

  private updateIcon() {
    const iconFolder = path.join(this.extensionFolder, 'resources', 'icons');
    this.iconPath = {
      light: this.isRunning
        ? vscode.Uri.file(path.join(iconFolder, 'running-light.svg'))
        : vscode.Uri.file(path.join(iconFolder, `${this.iconName}-light.svg`)),
      dark: this.isRunning
        ? vscode.Uri.file(path.join(iconFolder, 'running-dark.svg'))
        : vscode.Uri.file(path.join(iconFolder, `${this.iconName}-dark.svg`)),
    };
  }

  updateStatus(isRunning : boolean) {
    this.isRunning = isRunning;
    this.updateContexValue();
    this.updateIcon();
  }

}
