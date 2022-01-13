<template>
    <n-card class="nextGameCard" title="下一场比赛-未开始">
        <div v-if="!isLoading">
            <n-grid :cols="21" x-gap="12">
                <n-gi span="10">
                    <div class="firstTeam">
                        <img :src="'http://s1.s100.vip:13127/Public/' + teams[0] + '.png'" alt="图片" class="avatar" />
                        <span class="tenSpan"></span>
                        <span class="name">{{ teams[0] }}</span>
                        <span class="fiveSpan"></span>
                        <span class="point">0</span>
                    </div>
                </n-gi>
                <n-gi span="1">
                    <div class="colon">:</div>
                </n-gi>
                <n-gi span="10">
                    <div class="secondTeam">
                        <span class="point">0</span>
                        <span class="tenSpan"></span>
                        <span class="name">{{ teams[1] }}</span>
                        <span class="fiveSpan"></span>
                        <img :src="'http://s1.s100.vip:13127/Public/' + teams[1] + '.png'" alt="图片" class="avatar" />
                    </div>
                </n-gi>
            </n-grid>
            <div class="gameName">{{ nextGameName }}</div>
            <div class="date">比赛时间&nbsp;{{ nextGameDate }}</div>
            <div class="fromNow">距今还有&nbsp;{{ distance }}&nbsp;天</div>
        </div>
    </n-card>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue";
import { getIncomingGamesAPI } from "@/apis/club";
import { getDateAPI } from '@/apis/user';
let isLoading: Ref<boolean> = ref(true);
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
        isLoading.value = false;
    }).catch((_error: {}) => { });
}).catch((_error: {}) => { });
</script>
<style>
.nextGameCard {
    margin-bottom: 16px;
}

.firstTeam {
    display: flex;
    justify-content: end;
    align-items: Center;
}

.secondTeam {
    display: flex;
    justify-content: start;
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

.colon {
    font-size: 50px;
    text-align: center;
}

.tenSpan {
    width: 10%;
}

.fiveSpan {
    width: 5%;
}

.avatar {
    width: 80px;
    height: 80px;
    padding: 5px;
}
</style>