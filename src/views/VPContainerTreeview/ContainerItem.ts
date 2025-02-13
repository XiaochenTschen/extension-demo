import * as vscode from 'vscode';
import * as path from 'path';

export class ContainerItem extends vscode.TreeItem {
    public isRunning: boolean = false;

    constructor(
        public readonly label: string,
        public readonly isSpecialItem: boolean = false,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);

        this.iconPath = new vscode.ThemeIcon("package");
        this.updateContexValue();
    }

    private updateContexValue() {
        if(!this.isSpecialItem)
            this.contextValue = this.isRunning ? "running" : "stopped";
    }

    updateStatus(isRunning : boolean) {
        this.isRunning = isRunning;
        this.updateContexValue();
    }
}
