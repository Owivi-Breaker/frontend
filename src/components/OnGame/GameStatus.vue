<template>
    <n-card>
        <n-spin style="margin-left: 49%" size="medium" v-if="isLoading" />
        <div v-if="!isLoading">
            <n-grid :cols="21" x-gap="12">
                <n-gi span="10">
                    <div class="firstTeam">
                        <img :src="'http://s1.s100.vip:13127/Public/' + teams[0] + '.png'" alt="图片" class="teamAvatar" />
                        <span class="tenSpan"></span>
                        <span class="teamName">{{ teams[0] }}</span>
                        <span class="fiveSpan"></span>
                        <span class="gamePoint">{{ points[0] }}</span>
                    </div>
                </n-gi>
                <n-gi span="1">
                    <div class="colon">:</div>
                </n-gi>
                <n-gi span="10">
                    <div class="secondTeam">
                        <span class="gamePoint">{{ points[1] }}</span>
                        <span class="tenSpan"></span>
                        <span class="teamName">{{ teams[1] }}</span>
                        <span class="fiveSpan"></span>
                        <img :src="'http://s1.s100.vip:13127/Public/' + teams[1] + '.png'" alt="图片" class="teamAvatar" />
                    </div>
                </n-gi>
            </n-grid>
            <div class="time">{{ nowTime }}</div>
        </div>
    </n-card>
</template>
<script lang="ts" setup>
import { ref, Ref } from "vue";
import { getIncomingGamesAPI } from "@/apis/club";
let isLoading: Ref<boolean> = ref(true);
let teams: Ref<Array<string>> = ref(["", ""]);
let nowTime: Ref<string> = ref("");
let points: Ref<Array<number>> = ref([0, 0]);
getIncomingGamesAPI()
    .then((response) => {
        nowTime.value = "00:00";
        teams.value[0] = response[0].club1_name;
        teams.value[1] = response[0].club2_name;
        isLoading.value = false;
    })
    .catch((_error: {}) => { });
</script>
<style>
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

.teamName {
    font-size: x-large;
}

.gamePoint {
    font-size: 40px;
}

.time {
    text-align: center;
    font-size: 35px;
}

.colon {
    font-size: 40px;
    text-align: center;
}

.tenSpan {
    width: 10%;
}

.fiveSpan {
    width: 5%;
}

.teamAvatar {
    width: 60px;
    height: 60px;
    padding: 5px;
}
</style>
