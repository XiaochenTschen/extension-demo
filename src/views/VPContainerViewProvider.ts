import * as vscode from 'vscode';
import { ContainerItem } from './VPContainerTreeview/ContainerItem';
import { ContainerService } from '../services/ContainerServices';
import { EventBus } from '../EventBus';

export class VPContainerViewProvider implements vscode.TreeDataProvider<ContainerItem> {
  private items: ContainerItem[] = [];
  private _onDidChangeTreeData: vscode.EventEmitter<ContainerItem | undefined> = new vscode.EventEmitter<ContainerItem | undefined>();
  readonly onDidChangeTreeData: vscode.Event<ContainerItem | undefined> = this._onDidChangeTreeData.event;
  private containerService: ContainerService;

  constructor(private context: vscode.ExtensionContext, containerService: ContainerService) {
    this.items = [
      new ContainerItem("Container A", this.context.extensionPath, "plug"),
      new ContainerItem("Container B", this.context.extensionPath, "plug"),
    ];
    this.containerService = containerService;

    EventBus.onDidLogin( () => { this.refresh(); } );
  }

  getTreeItem(element: ContainerItem): vscode.TreeItem {
    return element;
  }

  getChildren(): ContainerItem[] {
    return this.items;
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
    console.log("TreeView refresh called ");
  }

  runItem(item: ContainerItem): void {
    item.updateStatus(true);
    this.refresh();
  }

  stopItem(item: ContainerItem): void {
    item.updateStatus(false);
    this.refresh();
  }
}
