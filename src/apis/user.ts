import http from '@/utils/http';


const createUserAPI = (params: any) => {
    return http.post("/login/create-user", params) // api名字改掉
}

export { createUserAPI }