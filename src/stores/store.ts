import { defineStore } from 'pinia';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the stores across your application
export const useStore = defineStore('main', {
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            Date: '',
            playerData: [] as any[],
            perfData: [] as any[],
            capaLoading: true,
            perfLoading: true,
            gamePveData: Object as any,
            playerNameId: [] as any[], // 用于game-on
            clubNameId: [] as any[],
            nextGame: { teams: [], distance: 0 } as any
        };
    },
    getters: {
        // 比赛中左方球队的位置信息
        // TODO 分离比赛用到的变量
        leftPos(state) {
            let pos: any = {};
            let team: string = ''

            if (state.gamePveData.game_info.home_club_id === state.gamePveData.game_info.player_club_id) {
                team = 'player_players_info';
            } else {
                team = 'computer_players_info';
            }

            for (const p of state.gamePveData[team]) {
                if (p.real_location in pos) {
                    pos[p.real_location].push(p)
                } else {
                    pos[p.real_location] = [p]
                }
            }
            return pos;
        },

        rightPos(state) {
            let pos: any = {};
            let team: string = ''

            if (state.gamePveData.game_info.home_club_id === state.gamePveData.game_info.computer_club_id) {
                team = 'player_players_info';
            } else {
                team = 'computer_players_info';
            }

            for (const p of state.gamePveData[team]) {
                if (p.real_location in pos) {
                    pos[p.real_location].push(p)
                } else {
                    pos[p.real_location] = [p]
                }
            }
            return pos;
        },

        homePlayerInfo(state) {
            if (!state.gamePveData.game_info) {
                return null;
            }
            if (
                state.gamePveData.game_info.home_club_id === state.gamePveData.player_team_info.club_id
            ) {
                return state.gamePveData.player_players_info;
            }
            return state.gamePveData.computer_players_info;
        },

        foreignPlayerInfo(state) {
            if (!state.gamePveData.game_info) {
                return null;
            }
            if (
                state.gamePveData.game_info.home_club_id !== state.gamePveData.player_team_info.club_id
            ) {
                return state.gamePveData.player_players_info;
            }
            return state.gamePveData.computer_players_info;
        }


    },
    actions: {}
});
