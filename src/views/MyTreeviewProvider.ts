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
}
