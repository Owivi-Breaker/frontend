import { defineStore } from 'pinia'
import { ref } from "vue";
import { getPlayersByClubAPI } from "@/apis/player";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the stores across your application
export const useStore = defineStore('main', {
    state: () => {
        return {
            // all these properties will have their type inferred automatically
            Date: "",
            playerData: [],
        }
    },
    getters: {},
    actions: {}
})