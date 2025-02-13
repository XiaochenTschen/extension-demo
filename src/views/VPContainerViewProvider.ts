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
            new ContainerItem("Container A"),
            new ContainerItem("Container B"),
        ];
        this.containerService = containerService;

        context.subscriptions.push(
            vscode.commands.registerCommand(
                'containerView.run',
                (item: ContainerItem) => {
                vscode.window.showInformationMessage(`Running: ${item.label}`);
                this.runItem(item);
                }
            )
        );
    
        context.subscriptions.push(
            vscode.commands.registerCommand(
                'containerView.stop',
                (item: ContainerItem) => {
                vscode.window.showInformationMessage(`Stopping: ${item.label}`);
                this.stopItem(item);
                }
            )
        );

        EventBus.onDidLogin( () => { this.refresh(); } );
    }

    getTreeItem(element: ContainerItem): vscode.TreeItem {
        return element;
    }

    getChildren(): ContainerItem[] {
        const addNewItem = new ContainerItem("Add New Container", true);
        addNewItem.command = { command: "containerTree.addItem", title: "Add New Container" };
        addNewItem.iconPath = new vscode.ThemeIcon("add");

        return [...this.items, addNewItem];
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
