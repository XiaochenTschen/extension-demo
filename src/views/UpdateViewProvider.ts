import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class UpdateViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;
    webviewView.webview.options = { enableScripts: true };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
  }

  // 读取 HTML 文件并替换资源路径
  private getHtmlForWebview(webview: vscode.Webview): string {
    const webviewPath = path.join(this.context.extensionPath, 'src','views', 'UpdateWebview');
    const htmlPath = vscode.Uri.file(path.join(webviewPath, 'update.html'));
    const cssUri = webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, 'update.css')));
    const jsUri = webview.asWebviewUri(vscode.Uri.file(path.join(webviewPath, 'update.js')));

    let htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf8');
    htmlContent = htmlContent
      .replace('update.css', cssUri.toString())
      .replace('update.js', jsUri.toString());

    return htmlContent;
  }

  private postMessage(message: any) {
    if (this._view) {
      this._view.webview.postMessage(message);
    }
  }

  public handleMessage(message: any) {
    if (message.command === 'loadFiles') {
      this.loadFiles();
    } else if (message.command === 'startUpload') {
      this.startUpload();
    }
  }

  private async loadFiles() {
    const files = await vscode.workspace.findFiles('**/*.txt'); // 选择特定类型文件
    const fileNames = files.map(file => path.basename(file.fsPath));
    this.postMessage({ command: 'populateDropdown', files: fileNames });
  }

  private async startUpload() {
    for (let progress = 0; progress <= 100; progress += 10) {
      this.postMessage({ command: 'updateProgress', progress });
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    vscode.window.showInformationMessage("Upload Complete!");
  }
}
