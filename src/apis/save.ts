import http from '@/utils/http';




const getSaveAPI = () => {
    return http.get("/login/users/show-saves", null) // api名字改掉
}

const createSaveAPI = (params: any) => {
    return http.post("/login/users/create-save", params) // api名字改掉
}

export { getSaveAPI, createSaveAPI }