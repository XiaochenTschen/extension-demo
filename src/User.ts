export class User {
    private username: string;
    private password: string;
    private token: string | null;
  
    constructor(username: string = '', password: string = '') {
      this.username = username;
      this.password = password;
      this.token = null;
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
}
  