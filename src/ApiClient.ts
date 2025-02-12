import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as vscode from 'vscode';
import { User } from './User';

export class ApiClient {
  private axiosInstance: AxiosInstance;
  private user: User;

  constructor(user: User) {
    this.user = user;

    this.axiosInstance = axios.create({
      baseURL: 'https://your-server.com/api',
      timeout: 5000,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.user.isAuthorized()) {
          config.headers['Authorization'] = `Bearer ${this.user.getUserToken()}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // GET
  async get<T>(endpoint: string, params = {}): Promise<T | null> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error: any) {
      vscode.window.showErrorMessage(`GET Failed: ${error.message}`);
      return null;
    }
  }

  // POST
  async post<T>(endpoint: string, data: any): Promise<T | null> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error: any) {
      vscode.window.showErrorMessage(`POST Failed: ${error.message}`);
      return null;
    }
  }

  // DELETE
  async delete<T>(endpoint: string): Promise<T | null> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(endpoint);
      return response.data;
    } catch (error: any) {
      vscode.window.showErrorMessage(`DELETE Failed: ${error.message}`);
      return null;
    }
  }
}
