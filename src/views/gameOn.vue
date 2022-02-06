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
                        v-if="totalData['game_info']"
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
import { computed, ComputedRef, defineComponent, ref, watch, nextTick, Ref } from "vue";
import { GameStatus, TeamData, TacticalStatistic, TacticalSelector } from "@/components/GameOn";
import { getColor } from "@/utils/colorMap";
import { useStore } from "@/stores/store";
import { ScrollbarInst } from "naive-ui";

const store = useStore();
defineComponent({ GameStatus, TeamData, TacticalStatistic, TacticalSelector });
let totalData: ComputedRef = computed(() => {
    return store.gamePveData;
});
let homeTeam: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (totalData.value.game_info.home_club_id === totalData.value.player_team_info.club_id) {
        return totalData.value.player_team_info;
    } else {
        return totalData.value.computer_team_info;
    }
});
let foreignTeam: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (totalData.value.game_info.home_club_id !== totalData.value.player_team_info.club_id) {
        return totalData.value.player_team_info;
    } else {
        return totalData.value.computer_team_info;
    }
});
let homePlayerInfo: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (totalData.value.game_info.home_club_id === totalData.value.player_team_info.club_id) {
        return totalData.value.player_players_info;
    } else {
        return totalData.value.computer_players_info;
    }
});
let foreignPlayerInfo: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (totalData.value.game_info.home_club_id !== totalData.value.player_team_info.club_id) {
        return totalData.value.player_players_info;
    } else {
        return totalData.value.computer_players_info;
    }
});
const nScrollBarRef: Ref<ScrollbarInst | null> = ref(null);
let commentaryList: ComputedRef = computed(() => {
    let result = new Array<any>();
    if (totalData.value["game_info"]) {
        let scriptList: Array<string> = totalData.value["game_info"]["script"].split("\n\n");
        for (let i: number = 0; i < scriptList.length; i++) {
            let subScriptList: Array<string> = scriptList[i].split("\n");
            if (i === scriptList.length - 1) {
                subScriptList.pop();
            }
            for (let j: number = 0; j < subScriptList.length - 1; j++) {
                let item: Array<string> = subScriptList[j].split("@");
                result.push({
                    content: item[0],
                    time: item[1],
                    level: item[2],
                });
            }
            let item: Array<string> = subScriptList[subScriptList.length - 1].split("@");
            result.push({
                content: item[0],
                time: item[1],
                level: item[2],
            });
        }
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
defineExpose({ getColor, homeTeam, foreignTeam, homePlayerInfo, foreignPlayerInfo, commentaryList, totalData });
</script>