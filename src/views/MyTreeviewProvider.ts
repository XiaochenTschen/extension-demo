import * as vscode from 'vscode';
import { MyTreeViewItem } from './MyTreeview/myTreeviewItem';

export class MyTreeViewProvider implements vscode.TreeDataProvider<MyTreeViewItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<MyTreeViewItem | undefined> = new vscode.EventEmitter<MyTreeViewItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<MyTreeViewItem | undefined> = this._onDidChangeTreeData.event;

  private items: MyTreeViewItem[] = [
    new MyTreeViewItem(["name","Container A"], [new MyTreeViewItem(["id","123"]), new MyTreeViewItem(["description","Sample Data A"]), new MyTreeViewItem(["version","1.0"])]),
    new MyTreeViewItem(["name","Container B"], [new MyTreeViewItem(["id","456"]), new MyTreeViewItem(["description","Sample Data B"]), new MyTreeViewItem(["version","2.0"])]),
  ];

  constructor(private context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("myTreeview.start", (item: MyTreeViewItem) => {
            vscode.window.showInformationMessage(`Starting ${item.label}...`);
        })
    );
  }

  getTreeItem(element: MyTreeViewItem): vscode.TreeItem {
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
}
