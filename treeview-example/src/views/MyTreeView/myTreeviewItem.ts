import * as vscode from 'vscode';

export class MyTreeViewItem extends vscode.TreeItem {
    children: MyTreeViewItem[] | undefined;
    level: number;
    constructor(
        label: string,
        level: number,
        tooltip?: string,
        children?:MyTreeViewItem[],
        contextValue?: string
    ) {
        let collapsibleState = (children === undefined ? vscode.TreeItemCollapsibleState.None :
                                                         vscode.TreeItemCollapsibleState.Collapsed);
        super(label, collapsibleState);

        this.level = level;

        if(tooltip) {
            this.tooltip = tooltip;
        }

        this.children = children;

        if (contextValue) {
            this.contextValue = contextValue;
        }
    }
}
