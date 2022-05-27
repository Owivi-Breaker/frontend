<template>
    <div class="s-card px-10 py-12">
        <n-spin class="p-10 flex items-center" v-if="isLoading"></n-spin>
        <div class="grid grid-cols-3" v-if="!isLoading">
            <!-- 左球队 -->
            <div class="flex items-center gap-7 justify-self-center">
                <img
                    class="h-30"
                    :src="'http://shu-huai.cn:13182/chfs/shared/Public/' + teams[0] + '.png'"
                    alt="图片"
                />
                <div class="flex flex-col items-start gap-3">
                    <div class="text-xl font-bold s-underline">{{ teams[0] }}</div>
                    <div class="text-lg text-gray-500">排名 {{ rankList[0] }}</div>
                </div>
            </div>

            <!-- 比赛信息 -->
            <div class="flex flex-col items-center gap-2 justify-self-center">
                <!-- 倒计时 -->
                <div
                    class="flex mb-1 py-2 px-3 items-center rounded-full bg-primary-active text-primary shadow-sm"
                >
                    <svg
                        class="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                        />
                    </svg>
                    <span>{{ distance }}&nbsp;days</span>
                </div>
                <div class="text-lg text-gray-500">{{ nextGameName }}</div>
                <div class="text-gray-500">{{ nextGameDate }}</div>
            </div>

            <!-- 右球队 -->
            <div class="flex items-center gap-7 justify-self-center">
                <div class="flex flex-col items-end gap-3">
                    <div class="text-xl font-bold s-underline">{{ teams[1] }}</div>
                    <div class="text-lg text-gray-500">排名 {{ rankList[1] }}</div>
                </div>
                <img
                    class="h-30"
                    :src="'http://shu-huai.cn:13182/chfs/shared/Public/' + teams[1] + '.png'"
                    alt="图片"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref, Ref, watch} from 'vue';
import {getIncomingGamesAPI} from '@/apis/club';
import {getClubRankAPI, getLeagueMeAPI} from "@/apis/league";
import {useStore} from '@/stores/store';
import {getSaveMeAPI} from '@/apis/save';
import {IncomingGamesInfoResponse, LeagueIdClubRankResponse, LeagueMeResponse, UserSaveMeResponse} from "@/interface";

let store = useStore();
let isLoading: Ref<boolean> = ref(true);
let teams: Ref<Array<string>> = ref(['', '']);
let nextGameName: Ref<string> = ref('');
let nextGameDate: Ref<string> = ref('');
let distance: Ref<number> = ref(0);
let curDate: number;
let rankList: Ref<Array<number>> = ref([0, 0]);
watch(
    () => store.Date,
    (_newValue, _oldValue) => {
        curDate = new Date(store.Date).getTime() / 1000;
        distance.value = (new Date(nextGameDate.value).getTime() / 1000 - curDate) / 24 / 60 / 60;
        store.nextGame.teams = teams.value;
        store.nextGame.distance = distance.value;
        if (distance.value == 0) {
            getIncomingGamesAPI().then((response: IncomingGamesInfoResponse) => {
                nextGameName.value = response[0].game_name;
                nextGameDate.value = response[0].date;
                teams.value[0] = response[0].club1_name;
                teams.value[1] = response[0].club2_name;
                distance.value = (new Date(nextGameDate.value).getTime() / 1000 - curDate) / 24 / 60 / 60;
                store.nextGame.teams = teams.value;
                store.nextGame.distance = distance.value;
            })
                .catch((_error: {}) => {
                });
        }
    }
);
getIncomingGamesAPI().then((response: IncomingGamesInfoResponse) => {
    nextGameName.value = response[0].game_name;
    nextGameDate.value = response[0].date;
    teams.value[0] = response[0].club1_name;
    teams.value[1] = response[0].club2_name;
    curDate = new Date(store.Date).getTime() / 1000;
    distance.value = (new Date(nextGameDate.value).getTime() / 1000 - curDate) / 24 / 60 / 60;
    store.nextGame.teams = teams.value;
    store.nextGame.distance = distance.value;
    getSaveMeAPI().then((response: UserSaveMeResponse) => {
        let gameSeason: number = response.season;
        getLeagueMeAPI().then((response: LeagueMeResponse) => {
            let leagueId: number = response.id;
            for (let i: number = 0; i < teams.value.length; i++) {
                getClubRankAPI({
                    league_id: leagueId,
                    game_season: gameSeason,
                    club_name: teams.value[i]
                }).then((response: LeagueIdClubRankResponse) => {
                    if (response.status == undefined) {
                        rankList.value[i] = response.valueOf();
                    } else {
                        rankList.value[i] = 0;
                    }
                    isLoading.value = false;
                }).catch((_error: {}) => {
                });
            }
        })
    });
}).catch((_error: {}) => {
});
</script>

<style scoped>
</style>
