import http from '@/utils/http';
const nextTurnAPI = () => {
    return http.get("/next-turn", null)
}
export {
    nextTurnAPI
}
