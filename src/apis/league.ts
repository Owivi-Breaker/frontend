import http from '@/utils/http';

const getLeaguesAPI = () => {
    return http.get('/league', null);
};
const getLeagueMeAPI = () => {
    return http.get('/league/me', null);
};
const getLeagueByIdAPI = (params: { league_id: number }) => {
    return http.get(`/league/${params.league_id}`, null);
};
const getPointsTableByLeagueAPI = (params: { league_id: number; game_season: number }) => {
    // 获取某联赛某赛季的积分榜
    return http.get(`/league/${params.league_id}/points-table`, params);
};
const getClubRankAPI = (params: { league_id: number; game_season: number; club_name: string }) => {
    return http.get(`/league/${params.league_id}/club-rank`, params);
};
const getPlayerChartByLeagueAPI = (params: { league_id: number; game_season: number }) => {
    // 获取某联赛某赛季的球员数据表
    return http.get(`/league/${params.league_id}/player-chart`, params);
};
export {
    getLeaguesAPI,
    getLeagueByIdAPI,
    getPointsTableByLeagueAPI,
    getPlayerChartByLeagueAPI,
    getClubRankAPI,
    getLeagueMeAPI
};
