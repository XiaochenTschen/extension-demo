import { ApiClient } from '../ApiClient';

export class ContainerService {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    async getContainerList(): Promise<string[]> {
        const response = await this.apiClient.get<{ containers: string[] }>('/containers');
        return response ? response.containers : [];
    }

    async startContainer(containerId: string): Promise<boolean> {
        const response = await this.apiClient.post<{ success: boolean }>(`/containers/${containerId}/start`, {});
        return response ? response.success : false;
    }

    async stopContainer(containerId: string): Promise<boolean> {
        const response = await this.apiClient.post<{ success: boolean }>(`/containers/${containerId}/stop`, {});
        return response ? response.success : false;
    }
}
