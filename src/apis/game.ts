import http from '@/utils/http';
const getGameByIdAPI = (params: { game_id: number }) => {
    return http.get(`/game/${params.game_id}`, params);
}

export { getGameByIdAPI };
