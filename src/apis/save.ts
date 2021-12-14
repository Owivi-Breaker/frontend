import http from '@/utils/http';


const getSaveAPI = () => {
    return http.get("/user/save", null) // api名字改掉
}

const createSaveAPI = (params: any) => {
    return http.post("/user/save", params) // api名字改掉
}

export {getSaveAPI, createSaveAPI}