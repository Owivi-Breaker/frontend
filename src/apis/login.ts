import http from '@/utils/http';


// TODO 已经没有用了，弃之
const testAPI = () => {
    return http.get("/login/users/me", null)
}

const loginAPI = (params: any) => {
    return http.post("/login", params)
}

const getProtocolAPI = () => {
    return http.get('/test/protocol', null)
}

export { testAPI, loginAPI, getProtocolAPI }