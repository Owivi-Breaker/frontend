import { AxiosRequestConfig } from 'axios';
import request from './request';

const http = {
  /**
   * methods: 请求
   * @param url 请求地址
   * @param params 请求参数
   */
  get(url: string, params: any) {
    const config: AxiosRequestConfig = {
      method: 'get',
      url
    };
    if (params) config.params = params;
    return request(config);
  },
  post(url: string, params: any) {
    const config: AxiosRequestConfig = {
      method: 'post',
      url
    };
    if (params) config.data = params;
    return request(config);
  },
  put(url: string, params: any) {
    const config: AxiosRequestConfig = {
      method: 'put',
      url
    };
    if (params) config.data = params;
    return request(config);
  },
  delete(url: string, params: any) {
    const config: AxiosRequestConfig = {
      method: 'delete',
      url
    };
    if (params) config.params = params;
    return request(config);
  }
};
// 导出
export default http;
