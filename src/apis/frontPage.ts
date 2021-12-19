import http from '@/utils/http';
const getDateAPI = () => {
    return http.get("/front_page/get_date", null);
}
export { getDateAPI };