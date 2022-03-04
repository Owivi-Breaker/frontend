import http from '@/utils/http';

const createUserAPI = (params: any) => {
  return http.post('/user', params);
};
const getDateAPI = () => {
  return http.get('/user/save/date', null);
};
export { createUserAPI, getDateAPI };
