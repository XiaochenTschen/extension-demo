import * as vscode from 'vscode';
import { MyTreeViewItem } from './MyTreeview/myTreeviewItem';

export class MyTreeViewProvider implements vscode.TreeDataProvider<MyTreeViewItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<MyTreeViewItem | undefined> = new vscode.EventEmitter<MyTreeViewItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<MyTreeViewItem | undefined> = this._onDidChangeTreeData.event;

    private items: MyTreeViewItem[] = [];

    constructor(private context: vscode.ExtensionContext) {
        context.subscriptions.push(
            vscode.commands.registerCommand('myTreeview.start', (item: MyTreeViewItem) => {
                // 获取该条目下的所有子项
                if (item.children) {
                    // 假设我们要获取 name 的 tooltip
                    const nameItem = item.children.find(child => child.label === 'name');
                    if (nameItem && nameItem.tooltip) {
                        vscode.window.showInformationMessage(`Selected name: ${nameItem.tooltip}`);
                    }
                }
            })
        );
    }

    getTreeItem(element: MyTreeViewItem): vscode.TreeItem {
        /*
        // 例子1：动态修改图标
        element.iconPath = element.children 
            ? new vscode.ThemeIcon("folder")
            : new vscode.ThemeIcon("file");

        // 例子2：动态修改描述
        element.description = `(${new Date().toLocaleTimeString()})`;

        // 例子3：根据条件添加高亮
        if (element.label.toString().includes("重要")) {
            element.resourceUri = vscode.Uri.parse(`important-${element.label}`);
        }
        */
        return element;
    }

    getChildren(element?: MyTreeViewItem | undefined): vscode.ProviderResult<MyTreeViewItem[]> {
        if (element === undefined) {
            return this.items;
        }
        return element.children;
    }


    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    public updateItems(newItems: MyTreeViewItem[]): void {
        this.items = newItems;
        this.refresh();
    }

    public addItem(item: MyTreeViewItem): void {
        this.items.push(item);
        this.refresh();
    }

    public clearItems(): void {
        this.items = [];
        this.refresh();
    }

    findItem(predicate: (item: MyTreeViewItem) => boolean): MyTreeViewItem | undefined {
        const searchInTree = (items: MyTreeViewItem[]): MyTreeViewItem | undefined => {
            for (const item of items) {
                if (predicate(item)) {
                    return item;
                }
                if (item.children && item.children.length > 0) {
                    const found = searchInTree(item.children);
                    if (found) {
                        return found;
                    }
                }
            }
            return undefined;
        };

        return searchInTree(this.items);
    }
}
