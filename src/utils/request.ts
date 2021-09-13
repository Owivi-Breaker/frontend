import axios from 'axios'
// 新建一个axios实例service
const service = axios.create(
    {
        // baseURL: process.env.VUE_APP_BASE_API,
        baseURL: 'http://localhost:8000/api/v1',
        //baseURL: 'http://192.168.1.105:8000/api',
        timeout: 6 * 1000
    }
)

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 发送请求前做的一些处理,数据转化,配置请求头,设置token,设置loading等,根据需求去添加


        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

// 响应拦截器
service.interceptors.response.use(
    // 对响应数据做处理
    response => {
        const res = response.data;
        console.log('拦截响应: ')
        console.log(res)
        if (response.status !== 200) {
            console.log('Error!');
        }
        return res; // 只将数据返回
    },
    error => {
        /*异常处理开始*/
        if (error && error.response) {
            // 1.公共错误处理
            // 2.根据响应码具体处理
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求'
                    break;
                case 401:
                    error.message = '未授权，请重新登录'
                    break;
                case 403:
                    error.message = '拒绝访问'
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源'
                    // window.location.href = "/NotFound"
                    break;
                case 405:
                    error.message = '请求方法未允许'
                    break;
                case 408:
                    error.message = '请求超时'
                    break;
                case 500:
                    error.message = '服务器端出错'
                    break;
                case 501:
                    error.message = '网络未实现'
                    break;
                case 502:
                    error.message = '网络错误'
                    break;
                case 503:
                    error.message = '服务不可用'
                    break;
                case 504:
                    error.message = '网络超时'
                    break;
                case 505:
                    error.message = 'http版本不支持该请求'
                    break;
                default:
                    error.message = `连接错误${error.response.status}`
            }
        }
        else {
            // 超时处理
            if (JSON.stringify(error).includes('timeout')) {
                console.log('服务器响应超时，请刷新当前页');
            }
            error.message = '连接服务器失败';
        }

        /*异常处理结束*/
        return Promise.resolve(error.response)
    }
)

export default service