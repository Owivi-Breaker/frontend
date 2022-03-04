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
export { getClubsAPI, getClubMeAPI, getClubByIdAPI, getClubsByLeagueAPI, getIncomingGamesAPI };
