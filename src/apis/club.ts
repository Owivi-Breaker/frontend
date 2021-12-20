import http from '@/utils/http';
const getClubsAPI = () => {
    return http.get("/club", null);
}
const getClubByIdAPI = (params: { club_id: number }) => {
    return http.get(`/club/${params.club_id}`, null);
}
const getClubsByLeagueAPI = (params: { league_id: number }) => {
    return http.get(`/league/${params.league_id}/club`, null);
}
export { getClubsAPI, getClubByIdAPI, getClubsByLeagueAPI };