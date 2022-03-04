import http from '@/utils/http';

const nextTurnAPI = () => {
  return http.get('/next-turn', null);
};
const nextTurnHolidayAPI = (params: any) => {
  return http.get('/next-turn/holiday', params);
};
export { nextTurnAPI, nextTurnHolidayAPI };
