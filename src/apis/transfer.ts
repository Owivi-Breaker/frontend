import http from '@/utils/http';

const makeOfferByUserAPI = (params: { target_player_id: number, offer_price: number }) => {
    return http.get('/transfer/make-offer-by-user', params);
};
const getOnSalePlayersAPI = (params: { offset: number, limit: number, attri: string, order: number }) => {
    return http.get('/transfer/get-on-sale-players', params);
};
const getPlayersByAttriAPI = (params: { offset: number, limit: number, attri: string, value: string }) => {
    return http.get('/transfer/get-players-by-attri', params);
};
export {makeOfferByUserAPI, getOnSalePlayersAPI,getPlayersByAttriAPI};
