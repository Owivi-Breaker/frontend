<template>
    <n-layout position="absolute">
        <Header />
        <n-layout has-sider position="absolute" style="top: 64px">
            <Sidebar />
            <n-layout content-style="padding: 10px;" :native-scrollbar="false">
                <Viewer />
            </n-layout>
        </n-layout>
    </n-layout>
</template>
<script lang="ts" setup>
import { Sidebar } from "./";
import { Header } from "./";
import { Viewer } from "@/components";
import { defineComponent, onMounted } from "vue";
import { getDateAPI } from "@/apis/user";
import { getPlayersByClubAPI, getPlayerTotalGameDataAPI } from "@/apis/player";
// import Footer from './Footer.vue'
import { useStore } from "@/stores/store";
import { getSaveMeAPI } from "@/apis/save";
defineComponent({ Sidebar, Header, Viewer });
const store = useStore();
onMounted(() => {
    getDateAPI()
        .then((response) => {
            store.Date = response.date;
        })
        .catch((_error: {}) => {});
    getSaveMeAPI()
        .then((response) => {
            let gameSeason: number = response.season;
            getPlayersByClubAPI({ club_id: 1, is_player_club: true })
                .then((response) => {
                    store.playerData = response;
                    store.perfData = [];
                    for (let i: number = 0; i < store.playerData.length; i++) {
                        getPlayerTotalGameDataAPI({
                            player_id: store.playerData[i].id,
                            start_season: gameSeason,
                            end_season: gameSeason,
                        })
                            .then((response) => {
                                response["姓名"] = store.playerData[i]["姓名"] ? store.playerData[i]["姓名"] : store.playerData[i]["translated_name"];
                                store.perfData.push(response);
                            })
                            .catch((_error: {}) => {});
                    }
                    store.capaLoading = false;
                    store.perfLoading = false;
                })
                .catch((_error: {}) => {});
        })
        .catch((_error: {}) => {});
});
</script>
