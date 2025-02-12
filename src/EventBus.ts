import * as vscode from 'vscode';

export class EventBus {
    private static _onDidLogin = new vscode.EventEmitter<void>();
    static onDidLogin = EventBus._onDidLogin.event;

    static emitLogin() {
        EventBus._onDidLogin.fire();
    }
}
