import http from '@/utils/http';

const makeOfferByUserAPI = (params: { target_player_id: number, offer_price: number }) => {
    return http.get('/transfer/make-offer-by-user', params);
};
const negotiateWageAPI = (params: { target_player_id: number, offer_wage: number }) => {
    return http.get('/transfer/negotiate-wage', params);
};
const getOnSalePlayersAPI = (params: { offset: number, limit: number, attri: string, order: number }) => {
    return http.get('/transfer/get-on-sale-players', params);
};
const getPlayersByAttriAPI = (params: { offset: number, limit: number, attri: string, value: string }) => {
    return http.get('/transfer/get-players-by-attri', params);
};
const getNegotiateListAPI = () => {
    return http.get('/transfer/get-negotiate-list', null);
};
export {makeOfferByUserAPI, negotiateWageAPI, getOnSalePlayersAPI, getPlayersByAttriAPI, getNegotiateListAPI};
