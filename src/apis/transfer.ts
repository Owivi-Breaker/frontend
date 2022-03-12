import http from '@/utils/http';

const getOnSalePlayersAPI = (params: { offset: number, limit: number, attri: string, order: number }) => {
    return http.get('/transfer/get-on-sale-players', params);
};
const makeOfferByUserAPI = (params: { target_player_id: number, offer_price: number }) => {
    return http.get('/transfer/make-offer-by-user', params);
};
export {getOnSalePlayersAPI, makeOfferByUserAPI};
