import * as vscode from 'vscode';
import { MyTreeViewItem } from './MyTreeView/myTreeviewItem';
import { jsonToTreeElement } from '../Utils/Util';

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

export class MyTreeViewProvider implements vscode.TreeDataProvider<MyTreeViewItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<MyTreeViewItem | undefined> = new vscode.EventEmitter<MyTreeViewItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<MyTreeViewItem | undefined> = this._onDidChangeTreeData.event;

    private items: MyTreeViewItem[] = [];

    constructor(private context: vscode.ExtensionContext) {
        this.items = jsonToTreeElement(obj, MyTreeViewItem);
        context.subscriptions.push(
            vscode.commands.registerCommand('myTreeview.copy', async (item: MyTreeViewItem) => {
                vscode.window.showInformationMessage(`copy item ${item.label}`);
                await vscode.env.clipboard.writeText(item.label as string);
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
