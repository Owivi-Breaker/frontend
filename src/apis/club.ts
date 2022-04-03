import http from '@/utils/http';

const getClubsAPI = () => {
    return http.get('/club', null);
};
const getClubMeAPI = () => {
    return http.get('/club/me', null);
};
const getClubByIdAPI = (params: { club_id: number }) => {
    return http.get(`/club/${params.club_id}`, null);
};
const getClubsByLeagueAPI = (params: { league_id: number }) => {
    return http.get(`/league/${params.league_id}/club`, null);
};
const getIncomingGamesAPI = () => {
    return http.get(`/test/incoming-games-info`, null);
};
const getEstimateFinanceAPI = () => {
    return http.get(`/club/me/estimate-finance`, null);
};
const getBestPlayersAPI = () => {
    return http.get(`/club/me/best-players`, null);
};
const getSeasonFinanceAPI = () => {
    return http.get(`/club/me/season-finance`, null);
};
const getPlayerStatisticsAPI = () => {
    return http.get(`/club/me/player-statistics`, null);
};
const getSeasonGoalStatisticsAPI = () => {
    return http.get(`/club/me/season-goal-statistics`, null);
};
export {
    getClubsAPI,
    getClubMeAPI,
    getClubByIdAPI,
    getClubsByLeagueAPI,
    getIncomingGamesAPI,
    getEstimateFinanceAPI,
    getBestPlayersAPI,
    getSeasonFinanceAPI,
    getPlayerStatisticsAPI,
    getSeasonGoalStatisticsAPI,
};
