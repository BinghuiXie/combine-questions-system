import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

const baseURL = '';

export default class AJAX {

    public async get<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        const mergedConfig = { ...config, params: data};
        return await axios.get<T>( baseURL + url, mergedConfig);
    }

    public async post<T>(url: string, data: any, config?: AxiosRequestConfig) {
        const mergedConfig = { ...config, params: data};
        return await axios.post<T>( baseURL + url, data, mergedConfig);
    }
}