import * as vscode from 'vscode';

export class User {
    private username: string;
    private password: string;
    private token: string | null;
  
    constructor(username: string = '', password: string = '') {
        const config = vscode.workspace.getConfiguration('myExtension');
        this.username = username || config.get('username') || '';
        this.password = password || config.get('password') || '';
        this.token = config.get('githubToken') || null;
    }
  
    updateUserName(value: string): void {
      this.username = value;
    }
  
    updatePassword(value: string): void {
      this.password = value;
    }

    updatetoken(token: string): void {
      this.token = token;
    }

    setUserInfo(username: string, token: string) : void {
      this.username = username;
      this.token = token;
    }

    isAuthorized(): boolean {
      if(this.token)
        return true;
      else
        return false;
    }

    getUserToken(): string | null {
      return this.token;
    }
  
    getUserInfo(): string {
      return `User Name: ${this.username}, Password: ${this.password}, Token: ${this.token}`;
    }

    async saveToConfig(): Promise<void> {
        const config = vscode.workspace.getConfiguration('myExtension');
        await config.update('username', this.username, true);
        if (this.token) {
            await config.update('githubToken', this.token, true);
        }
    }

    loadFromConfig(): void {
        const config = vscode.workspace.getConfiguration('myExtension');
        this.username = config.get('username') || this.username;
        this.token = config.get('githubToken') || this.token;
    }

    getLoginInfo(): { username: string; password: string } {
        return {
            username: this.username,
            password: this.password
        };
    }
}
  