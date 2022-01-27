<template>
    <n-card title="战术配置">
        <n-grid cols="1" y-gap="10">
            <n-gi>
                <n-space align="center" justify="end">
                    <n-switch v-model:value="isAuto">
                        <template #checked>自动进行比赛</template>
                        <template #unchecked>手动设定战术</template>
                    </n-switch>
                </n-space>
            </n-gi>
            <n-gi>
                <n-collapse-transition v-bind:appear="true" v-bind:show="!isAuto">
                    <n-space align="center" item-style="display: flex; align-item: center;" justify="space-between">
                        <p>执行</p>
                        <n-select style="width:300px;" v-model:value="curTactic" v-bind:options="tactics" />
                        <n-button type="primary" v-on:click="goNextTurn">NOW</n-button>
                    </n-space>
                </n-collapse-transition>
            </n-gi>
            <n-gi>
                <n-collapse-transition v-bind:appear="true" v-bind:show="isAuto">
                    <n-statistic v-for="item in tactics">
                        <template #label>{{ item["label"] }}</template>
                        <template #default>
                            <n-slider v-model:value="item.weight" />
                        </template>
                    </n-statistic>
                </n-collapse-transition>
            </n-gi>
        </n-grid>
    </n-card>
</template>
<script lang="ts" setup>
import { Ref, ref, onMounted, watch } from 'vue';
import { gamePveNextTurnAPI } from "@/apis/gamePve";
import { useStore } from '@/stores/store';
import { getClubByIdAPI } from "@/apis/club";
import { Router } from 'vue-router';
const store = useStore();
let isAuto: Ref<boolean> = ref(false);
let curTactic: Ref<string> = ref("wing_cross");
let tactics: Ref<Array<any>> = ref([
    {
        label: '下底传中',
        value: 'wing_cross',
        weight: 50
    },
    {
        label: '边路内切',
        value: 'under_cutting',
        weight: 50
    },
    {
        label: '倒三角',
        value: 'pull_back',
        weight: 50
    },
    {
        label: '中路渗透',
        value: 'middle_attack',
        weight: 50
    },
    {
        label: '防守反击',
        value: 'counter_attack',
        weight: 50
    },
]);
declare const window: Window & { $router: Router };
function goNextTurn(): void {
    gamePveNextTurnAPI({ tactic: curTactic.value }).then((response: any) => {
        if (response["game_info"]["turns"] > 50) {
            window.$router.push({ name: "endGame" });
        }
        let temp = response;
        getClubByIdAPI({ club_id: temp["player_team_info"]["club_id"] }).then((response: any) => {
            temp["player_team_info"]["name"] = response["name"];
            getClubByIdAPI({ club_id: temp["computer_team_info"]["club_id"] }).then((response: any) => {
                temp["computer_team_info"]["name"] = response["name"];
                store.gamePveData = temp;
            }).catch((_error: any) => { });
        }).catch((_error: any) => { });
    }).catch((_error: any) => { });
}
let timer: NodeJS.Timeout = null;
watch(() => isAuto.value, (newVal) => {
    if (newVal) {
        let possibleList: Array<number> = [tactics.value[0].weight, 0, 0, 0, 0];
        for (let i: number = 1; i < tactics.value.length; i++) {
            possibleList[i] = possibleList[i - 1] + tactics.value[i].weight;
        }
        let result: number = Math.round(Math.random() * possibleList[possibleList.length - 1]);
        for (let i: number = 0; i < possibleList.length; i++) {
            if (result < possibleList[i]) {
                curTactic.value = tactics.value[i].value;
                break;
            }
        }
        goNextTurn();
        timer = setInterval(goNextTurn, 1000);
    }
    else {
        clearInterval(timer);
    }
})
</script>