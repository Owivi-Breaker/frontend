<template>
    <n-grid cols="10" x-gap="10">
        <n-gi span="3">
            <n-card style="min-height: 822px">
                <n-scrollbar style="max-height: 780px" ref="nScrollBarRef">
                    <n-timeline>
                        <n-timeline-item
                            v-bind:color="getColor(item.level, '', 1, 5)"
                            v-for="(item, key) in commentaryList"
                            v-bind:title="item.content"
                            v-bind:time="item.time"
                            v-bind:key="key"
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
                <n-gi>
                    <TeamData v-bind:club="homeTeam" v-bind:playerInfo="homePlayerInfo" style="height: 406px"></TeamData>
                </n-gi>
                <n-gi>
                    <TeamData v-bind:club="foreignTeam" v-bind:playerInfo="foreignPlayerInfo" style="height: 406px"></TeamData>
                </n-gi>
            </n-grid>
        </n-gi>
    </n-grid>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, Ref, ref, onMounted, watch, nextTick } from "vue";
import { GameStatus, TeamData, TacticalStatistic, TacticalSelector } from "@/components/OnGame";
import { getColor } from "@/utils/colorMap";
import { useStore } from "@/stores/store";
import { ScrollbarInst } from "naive-ui";
const store = useStore();
defineComponent({ GameStatus, TeamData, TacticalStatistic, TacticalSelector });
let totalData: ComputedRef = computed(() => {
    return store.gamePveData;
});
onMounted(() => {});
let homeTeam: ComputedRef = computed(() => {
    if (totalData.value.game_info.home_club_id === totalData.value.player_team_info.club_id) {
        return totalData.value.player_team_info;
    } else {
        return totalData.value.computer_team_info;
    }
});
let foreignTeam: ComputedRef = computed(() => {
    if (totalData.value.game_info.home_club_id !== totalData.value.player_team_info.club_id) {
        return totalData.value.player_team_info;
    } else {
        return totalData.value.computer_team_info;
    }
});
let homePlayerInfo: ComputedRef = computed(() => {
    if (totalData.value.game_info.home_club_id === totalData.value.player_team_info.club_id) {
        return totalData.value.player_players_info;
    } else {
        return totalData.value.computer_players_info;
    }
});
let foreignPlayerInfo: ComputedRef = computed(() => {
    if (totalData.value.game_info.home_club_id !== totalData.value.player_team_info.club_id) {
        return totalData.value.player_players_info;
    } else {
        return totalData.value.computer_players_info;
    }
});
const nScrollBarRef = ref<ScrollbarInst | null>(null);
// 解说数据处理
let commentaryList: ComputedRef = computed(() => {
    let scriptList: Array<string> = totalData.value["game_info"]["script"].split("\n\n");
    let result = new Array<any>();
    result.push({
        content: scriptList[0],
        time: "00:00",
        level: 1,
    });
    for (let i: number = 1; i < scriptList.length; i++) {
        let unit: number = (90 / 50) * 60;
        let bottomTime: number = (i - 1) * unit;
        let topTime: number = i * unit;
        let subScriptList: Array<string> = scriptList[i].split("\n");
        if (i === scriptList.length - 1) {
            subScriptList.pop();
        }
        for (let j: number = 0; j < subScriptList.length - 1; j++) {
            let time: number = Math.floor(Math.random() * (topTime - bottomTime) + bottomTime) + 1;
            let minute: string = Math.floor(time / 60)
                .toString()
                .padStart(2, "0");
            let second: string = Math.floor(time % 60)
                .toString()
                .padStart(2, "0");
            result.push({
                content: subScriptList[j],
                time: `${minute}:${second}`,
                level: Math.floor(Math.random() * 5) + 1,
            });
        }
        result.push({
            content: subScriptList[subScriptList.length - 1],
            time: `${Math.floor(topTime / 60)
                .toString()
                .padStart(2, "0")}:${Math.floor(topTime % 60)
                .toString()
                .padStart(2, "0")}`,
            level: Math.floor(Math.random() * 5) + 1,
        });
    }
    return result;
});
watch(
    () => commentaryList.value,
    () => {
        if (nScrollBarRef.value) {
            nextTick(() => {
                nScrollBarRef.value?.scrollTo(0, 10000000);
            });
        }
    },
    { immediate: true }
);
let teams = [
    {
        id: 1,
        name: "曼城",
    },
    {
        id: 2,
        name: "曼联",
    },
];
defineExpose({
    getColor,
    commentaryList,
    totalData,
    teams,
});
</script>