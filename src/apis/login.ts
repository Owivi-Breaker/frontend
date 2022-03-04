import http from '@/utils/http';

const loginAPI = (params: any) => {
  return http.post('/login', params);
};

const getProtocolAPI = () => {
  return http.get('/test/protocol', null);
};

export { loginAPI, getProtocolAPI };
