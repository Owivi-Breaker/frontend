import http from '@/utils/http';
const gamePveSkipAPI = (params: any) => {
    return http.post("/game-pve/skip", params);
};
const gamePveStartAPI = (params: any) => {
    return http.post("/game-pve/start", params);
};
const gamePveNextTurnAPI = (params: { tactic: string }) => {
    return http.get('/game-pve/next-turn', params);
};
export { gamePveSkipAPI, gamePveStartAPI, gamePveNextTurnAPI };