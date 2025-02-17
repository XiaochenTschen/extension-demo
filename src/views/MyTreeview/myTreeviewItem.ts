import * as vscode from 'vscode';

export class MyTreeViewItem extends vscode.TreeItem {
    children: MyTreeViewItem[] | undefined;
    constructor(
        label: string,
        tooltip?: string,
        children?:MyTreeViewItem[]
    ) {
        let collapsibleState = (children === undefined ? vscode.TreeItemCollapsibleState.None :
                                                         vscode.TreeItemCollapsibleState.Expanded);
        super(label, collapsibleState);
        if(tooltip) {
            this.tooltip = tooltip;
        }
        this.children = children;
        if (collapsibleState !== vscode.TreeItemCollapsibleState.None) {
            this.contextValue = "parentItem";
        }
    }
}
