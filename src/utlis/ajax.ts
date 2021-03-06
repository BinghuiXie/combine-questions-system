import { SESSION_ID_KEY } from '@/common/constants';
import axios from 'axios';
import Storage from './localStorage';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { catchException } from './error';

const storage = new Storage();
const baseURL = 'http://47.114.146.52:8080';

axios.interceptors.request.use(
    config => {
        const sessionId = storage.get(SESSION_ID_KEY);
        if(config.method == 'post'){
            config.params = {};
        }
        if(sessionId) {
            config.headers.Authorization = sessionId;
        }
        return config;
    },
    error => {
        // TODO: 错误处理
    }
)

export default class AJAX {

    @catchException(true)
    public async get<T>(url: string, data?: any, config?: AxiosRequestConfig) {
        const mergedConfig = { ...config, params: data};
        return await axios.get<T>( baseURL + url, mergedConfig);
    }

    @catchException(true)
    public async post<T>(url: string, data: any, config?: AxiosRequestConfig) {
        const mergedConfig = { ...config, params: data};
        return await axios.post<T>( baseURL + url, data, mergedConfig);
    }
}
