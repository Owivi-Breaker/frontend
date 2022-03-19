<template>
    <div class="s-card px-10 py-12">
        <div class="grid grid-cols-3">
            <!-- 左球队 -->
            <div class="flex items-center gap-7 justify-self-center">
                <img
                    class="h-30"
                    :src="'http://s1.s100.vip:13127/Public/' + teams[0] + '.png'"
                    alt="图片"
                />
                <div class="flex flex-col items-start gap-3">
                    <div class="text-xl font-bold s-underline">{{ teams[0] }}</div>
                    <div class="text-lg text-gray-500">排名 6</div>
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
                    <div class="text-lg text-gray-500">排名 12</div>
                </div>
                <img
                    class="h-30"
                    :src="'http://s1.s100.vip:13127/Public/' + teams[1] + '.png'"
                    alt="图片"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref, watch } from 'vue';
import { getIncomingGamesAPI } from '@/apis/club';
import { useStore } from '@/stores/store';

const store = useStore();
const isLoading: Ref<boolean> = ref(true);
const teams: Ref<Array<string>> = ref(['', '']);
const nextGameName: Ref<string> = ref('');
const nextGameDate: Ref<string> = ref('');
const distance: Ref<number> = ref(0);
let curDate: number;
watch(
    () => store.Date,
    (_newValue, _oldValue) => {
        curDate = new Date(store.Date).getTime() / 1000;
        distance.value = (new Date(nextGameDate.value).getTime() / 1000 - curDate) / 24 / 60 / 60;
        store.nextGame.teams = teams.value;
        store.nextGame.distance = distance.value;
        if (distance.value == 0) {
            getIncomingGamesAPI()
                .then((response: any) => {
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
getIncomingGamesAPI()
    .then((response: any) => {
        nextGameName.value = response[0].game_name;
        nextGameDate.value = response[0].date;
        teams.value[0] = response[0].club1_name;
        teams.value[1] = response[0].club2_name;
        curDate = new Date(store.Date).getTime() / 1000;
        distance.value = (new Date(nextGameDate.value).getTime() / 1000 - curDate) / 24 / 60 / 60;
        store.nextGame.teams = teams.value;
        store.nextGame.distance = distance.value;
        isLoading.value = false;
    })
    .catch((_error: {}) => {
    });
</script>

<style scoped>
</style>
