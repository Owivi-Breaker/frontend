// 这个文件主要用来解决response.data的类型报错问题
// 报错例：Property 'access_token' does not exist on type ‘AxiosResponse＜any＞
declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>;
    }
}
