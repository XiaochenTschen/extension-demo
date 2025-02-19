import * as vscode from 'vscode';

export class MyTreeViewItem extends vscode.TreeItem {
    children: MyTreeViewItem[] | undefined;
    constructor(
        label: string,
        tooltip?: string,
        children?:MyTreeViewItem[],
        contextValue?: string
    ) {
        let collapsibleState = (children === undefined ? vscode.TreeItemCollapsibleState.None :
                                                         vscode.TreeItemCollapsibleState.Collapsed);
        super(label, collapsibleState);
        if(tooltip) {
            // this.tooltip = tooltip; /* this is a normal tooltip */
            this.tooltip = new vscode.MarkdownString(tooltip); /* this is a markdown tooltip, which can be copied */
            this.tooltip.isTrusted = true; /* allow the tooltip to be trusted */
        }
        this.children = children;
        if (contextValue) {
            this.contextValue = contextValue;
        }
    }
}
