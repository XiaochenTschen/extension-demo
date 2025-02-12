import { ApiClient } from '../ApiClient';
import { User } from '../User';

export class AuthService {
    private apiClient: ApiClient;
    private user: User;

    constructor(apiClient: ApiClient, user: User) {
        this.apiClient = apiClient;
        this.user = user;
    }

    async login(username: string, password: string): Promise<boolean> {
        const response = await this.apiClient.post<{ token: string }>('/login', { username, password });

        if (response && response.token) {
            this.user.setUserInfo(username, response.token);
            return true;
        }
        return false;
    }

    async getAccessToken(username: string, password: string): Promise<boolean> {
        console.log("Called AuthService.getAccessToken");
        return true;
    }
}
