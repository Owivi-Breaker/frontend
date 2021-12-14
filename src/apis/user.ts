import http from '@/utils/http';


const createUserAPI = (params: any) => {
    return http.post("/user", params) // api名字改掉
}

export {createUserAPI}