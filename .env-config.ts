/** 请求环境配置 */
type ServiceEnv = Record<Service.HttpEnv,
    {
        /** 请求环境 */
        env: Service.HttpEnv;
        /** 请求地址 */
        url: string;
    }>;

/** 请求的环境 */
export const serviceEnv: ServiceEnv = {
    test: {
        env: 'test',
        url: 'http://localhost:8080/api/v1'
    },
    prod: {
        env: 'prod',
        url: 'http://lvshuhuai.cn:35881/api/v1'
    }
};
