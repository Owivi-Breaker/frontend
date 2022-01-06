import http from '@/utils/http';
const nextTurnAPI = (params: { turn_num: number }) => {
    return http.get("/next-turn", params)
}
export {
    nextTurnAPI
}