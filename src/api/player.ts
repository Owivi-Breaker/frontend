import http from '@/utils/http';


const getClubPlayerAPI = (params: any) => {
    return http.get(`/clubs/${params.club_id}/players`, params) // api名字改掉
}

export { getClubPlayerAPI }