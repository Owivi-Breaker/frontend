import axios from "axios";
import { storage } from "../utils";
import router from "@/router";
import { LoadingBarApi } from "naive-ui";

// 新建一个axios实例service
const service = axios.create(
    {
        baseURL: import.meta.env.VITE_APP_INTERFACE_URL,
        timeout: 600 * 1000
    }
)

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 发送请求前做的一些处理,数据转化,配置请求头,设置token,设置loading等,根据需求去添加
        // 设置token
        const token = storage.get('token');
        if (token) {
            config.headers['authorization'] = 'Bearer ' + token;
        }

        // 在此统一添加saveId
        const saveId = storage.get('saveId');
        if (saveId) {
            if (config.method === 'post') {
                config.params = {
                    save_id: saveId,
                };
                config.data = {
                    ...config.data
                };
            } else if (config.method === 'get') {
                config.params = {
                    save_id: saveId,
                    ...config.params
                };
            }
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

declare const window: Window & { $message: any, $loadingBar: LoadingBarApi };
// 响应拦截器
service.interceptors.response.use(
    // 对响应数据做处理
    response => {
        const res: object = response.data;
        console.log('DEBUG: 拦截响应👇')
        console.log(res)
        if (response.status !== 200) {
            console.log('Error!');
        }
        return Promise.resolve(res); // 只将数据返回
    },
    error => {
        /*异常处理开始*/
        if (error && error.response) {
            // 1.公共错误处理
            // 2.根据响应码具体处理
            console.log("DEBUG: 错误信息👇")
            console.log(error.response)
            switch (error.response.status) {
                case 400:
                    switch (error.response.data.detail) {
                        case "Email already registered":
                            window.$message.error("注册失败，用户名已存在。");
                            break;
                    }
                    break;
                case 401:
                    storage.remove("token");
                    storage.remove("saveId");
                    switch (error.response.data.detail) {
                        case 'Incorrect username or password':
                            window.$message.error("账号或密码错误");
                            break;
                        case "Could not validate credentials":
                            // token 过期处理
                            //error.message = '未授权或授权失效，请重新登录'
                            window.$message.error("未授权或授权失效，请重新登录");
                            //$vaToast.init({ message: 'Top-right', position: 'top-right' })
                            setTimeout(() => {
                                router.push({ name: "login" });
                            }, 1000);
                            break;
                    }
                    break;

                case 403:
                    //error.message = '拒绝访问'
                    break;
                case 404:
                    window.$message.error("请求错误");
                    break;
                case 405:
                    //error.message = '请求方法未允许'
                    break;
                case 408:
                    //error.message = '请求超时'
                    break;
                case 500:
                    //error.message = '服务器端出错'
                    break;
                case 501:
                    //error.message = '网络未实现'
                    break;
                case 502:
                    //error.message = '网络错误'
                    window.$message.error("网络错误");
                    break;
                case 503:
                    //error.message = '服务不可用'
                    break;
                case 504:
                    //error.message = '网络超时'
                    break;
                case 505:
                    //error.message = 'http版本不支持该请求'
                    break;
                default:
                    //error.message = `连接错误${error.response.status}`
                    console.log(`连接错误${error.response.status}`)
            }
        } else {
            // 超时处理
            if (JSON.stringify(error).includes('timeout')) {
                console.log('服务器响应超时，请刷新当前页');
            }
            //error.message = '连接服务器失败';
        }
        /*异常处理结束*/
        window.$loadingBar.error();
        return Promise.reject(error)
    }
)

export default service