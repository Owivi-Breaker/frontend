<template>
    <n-grid cols="10" x-gap="10">
        <n-gi span="3">
            <n-card style="min-height: 822px;">
                <n-scrollbar style="max-height: 780px;">
                    <n-timeline>
                        <n-timeline-item
                            v-bind:color="getColor(item.level, '', 1, 5)"
                            v-for="item in commentaryList"
                            v-bind:title="item.content"
                            v-bind:time="item.time"
                        ></n-timeline-item>
                    </n-timeline>
                </n-scrollbar>
            </n-card>
        </n-gi>
        <n-gi span="3">
            <n-grid cols="1" y-gap="10">
                <n-gi>
                    <GameStatus
                        v-bind:turns="totalData['game_info']['turns']"
                        v-bind:homeClubId="totalData['game_info']['home_club_id']"
                        v-bind:playerTeamInfo="totalData['player_team_info']"
                        v-bind:computerTeamInfo="totalData['computer_team_info']"
                    ></GameStatus>
                </n-gi>
                <n-gi>
                    <TacticalSelector></TacticalSelector>
                </n-gi>
                <n-gi>
                    <TacticalStatistic v-bind:playerTeamInfo="totalData['player_team_info']" v-bind:computerTeamInfo="totalData['computer_team_info']"></TacticalStatistic>
                </n-gi>
            </n-grid>
        </n-gi>
        <n-gi span="4">
            <n-grid cols="1" y-gap="10">
                <n-gi v-for="item in teams">
                    <TeamData v-bind:club="item" style="height:406px"></TeamData>
                </n-gi>
            </n-grid>
        </n-gi>
    </n-grid>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, Ref, ref, onMounted } from "vue";
import GameStatus from "@/components/OnGame/GameStatus.vue";
import TeamData from "@/components/OnGame/TeamData.vue";
import TacticalStatistic from "@/components/OnGame/TacticalStatistic.vue";
import TacticalSelector from "@/components/OnGame/TacticalSelector.vue";
import { getColor } from "@/utils/colorMap";
import { useStore } from '@/stores/store';
const store = useStore();
defineComponent({ GameStatus, TeamData, TacticalStatistic, TacticalSelector });
let totalData: ComputedRef = computed(() => {
    console.log(store.gamePveData);
    return store.gamePveData;
});
onMounted(() => {

})
// 解说数据处理
let commentaryList: ComputedRef = computed(() => {
    let scriptList: Array<Object> = totalData.value["game_info"]["script"].split("\n");
    let result = new Array<any>();
    for (let i: number = 0; i < scriptList.length; i++) {
        let unit: number = 90 / 50;
        let minute: string = Math.floor(i * unit).toString();
        let second: string = Math.round((i * unit - Math.floor(i * unit)) * 60).toString();
        if (minute.length < 2) {
            minute = "0" + minute;
        }
        if (second.length < 2) {
            second = "0" + second;
        }
        result.push({ "content": scriptList[i], "time": minute + ":" + second, "level": Math.floor(Math.random() * 5) + 1 });
    }
    for (let i: number = 0; i < result.length; i++) {
        if (result[i]["content"] === "") {
            result.splice(i, i);
        }
    }
    return result;
})
let teams = [
    {
        "id": 1,
        "name": "曼城"
    },
    {
        "id": 2,
        "name": "曼联"
    }
]
</script>