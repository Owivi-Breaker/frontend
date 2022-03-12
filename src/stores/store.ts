import {defineStore} from 'pinia';

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
            gamePveData: Object,
            playerNameId: [] as any[],
            clubNameId: [] as any[],
            nextGame: {teams: [], distance: 0} as any
        };
    },
    getters: {},
    actions: {}
});
