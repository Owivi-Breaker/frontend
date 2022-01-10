<template>
    <n-card class="nextGameCard" title="下一场比赛-未开始">
        <div class="teams">
            <svg class="avatar">
                <Avataaars />
            </svg>
            <span class="name">{{ teams[0] }}</span>
            <span style="width: 100px;"></span>
            <span class="point">0&nbsp;&nbsp;:&nbsp;&nbsp;0</span>
            <span style="width: 100px;"></span>
            <span class="name">{{ teams[1] }}</span>
            <svg class="avatar">
                <Avataaars />
            </svg>
        </div>
        <div class="gameName">{{ nextGameName }}</div>
        <div class="date">比赛时间&nbsp;{{ nextGameDate }}</div>
        <div class="fromNow">距今还有&nbsp;{{ distance }}&nbsp;天</div>
    </n-card>
</template>
<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import { ref } from "vue";
import { Ref } from "@vue/reactivity";
import { getIncomingGamesAPI } from "@/apis/club";
import { getDateAPI } from '@/apis/user';
let teams: Ref<Array<string>> = ref(["", ""]);
let nextGameName: Ref<string> = ref("");
let nextGameDate: Ref<string> = ref("");
let distance: Ref<Number> = ref(0);
getIncomingGamesAPI().then(response => {
    nextGameName.value = response[0].game_name;
    nextGameDate.value = response[0].date;
    teams.value[0] = response[0].club1_name;
    teams.value[1] = response[0].club2_name;
    getDateAPI().then(response => {
        let curDate: number = (new Date(response.date)).getTime() / 1000;
        distance.value = (new Date(nextGameDate.value).getTime() / 1000 - curDate) / 24 / 60 / 60;
    }).catch((_error: {}) => { });
}).catch((_error: {}) => { });
</script>
<style>
.nextGameCard {
    margin-bottom: 16px;
}
.teams {
    display: flex;
    justify-content: center;
    align-items: Center;
}
.name {
    font-size: xx-large;
}
.point {
    font-size: 50px;
}
.gameName,
.date,
.fromNow {
    text-align: center;
    font-size: large;
}
</style>