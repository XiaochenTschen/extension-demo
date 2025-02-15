import * as vscode from 'vscode';

export class MyTreeViewItem extends vscode.TreeItem {
    children: MyTreeViewItem[] | undefined;
    constructor(
        label: [string, string],
        children?:MyTreeViewItem[]
    ) {
        let collapsibleState = (children === undefined ? vscode.TreeItemCollapsibleState.None :
                                                         vscode.TreeItemCollapsibleState.Expanded);
        super(label[1], collapsibleState);
        this.tooltip = label[0];
        this.children = children;
        if (collapsibleState !== vscode.TreeItemCollapsibleState.None) {
            this.contextValue = "parentItem";
        }
    }
}
