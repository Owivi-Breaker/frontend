import http from '@/utils/http';


const getPlayersByClubAPI = (params: { club_id: number, is_player_club?: boolean }) => {
    // 获取指定club_id的所有球员
    return http.get(`/club/${params.club_id}/player`, params)
}
const getPlayersAPI = (params: { skip?: number; limit?: number; }) => {
    // 获取指定club_id的所有球员
    return http.get(`/player`, params)
}
const getPlayerByIdAPI = (params: { player_id: number }) => {
    // 获取指定id的球员信息
    return http.get(`/player/${params.player_id}`, params)
}

interface GameData {
    player_id: number;
    start_season?: number;
    end_season?: number;
}

const getPlayerGameDataAPI = (params: GameData) => {
    // 获取指定id球员的比赛记录
    return http.get(`/player/${params.player_id}/game-data`, params)
}

const getPlayerTotalGameDataAPI = (params: GameData) => {
    // 获取指定id球员的统计比赛信息
    return http.get(`/player/${params.player_id}/total-game-data`, params)
}

export {
    getPlayersByClubAPI, getPlayersAPI,
    getPlayerByIdAPI, getPlayerGameDataAPI,
    getPlayerTotalGameDataAPI
}