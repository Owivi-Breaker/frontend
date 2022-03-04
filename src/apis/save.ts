import http from '@/utils/http';

const getSaveAPI = () => {
  return http.get('/user/save', null);
};
const getSaveMeAPI = () => {
  return http.get('/user/save/me', null);
};
const createSaveAPI = (params: any) => {
  return http.post('/user/save', params);
};
export { getSaveAPI, getSaveMeAPI, createSaveAPI };
