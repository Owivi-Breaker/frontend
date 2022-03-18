<template>
    <div>
        <n-grid cols="10" x-gap="20">
            <n-gi span="3">
                <div class="s-card p-6" style="min-height: 822px">
                    <n-scrollbar ref="nScrollBarRef" style="max-height: 780px">
                        <n-timeline>
                            <n-timeline-item
                                v-for="(item, key) in commentaryList"
                                :key="key"
                                :color="getColor(item.level, '', 1, 5)"
                                :time="item.time"
                                :title="item.content"
                            ></n-timeline-item>
                        </n-timeline>
                    </n-scrollbar>
                </div>
            </n-gi>
            <n-gi span="3">
                <div class="flex flex-col gap-6">
                    <div>
                        <!-- 比分组件 -->
                        <GameStatus
                            v-if="totalData['game_info']"
                            :computer-team-info="totalData['computer_team_info']"
                            :home-club-id="totalData['game_info']['home_club_id']"
                            :player-team-info="totalData['player_team_info']"
                            :turns="totalData['game_info']['turns']"
                            :curAttacker="totalData['game_info']['cur_attacker']"
                        ></GameStatus>
                    </div>
                    <div>
                        <TacticalSelector></TacticalSelector>
                    </div>
                    <div>
                        <TacticalStatistic
                            :computer-team-info="totalData['computer_team_info']"
                            :player-team-info="totalData['player_team_info']"
                        ></TacticalStatistic>
                    </div>
                </div>
            </n-gi>
            <n-gi span="4">
                <n-grid cols="1" y-gap="10">
                    <n-gi>
                        <TeamData
                            :club="homeTeam"
                            :player-info="homePlayerInfo"
                            style="height: 406px"
                        ></TeamData>
                    </n-gi>
                    <n-gi>
                        <TeamData
                            :club="foreignTeam"
                            :player-info="foreignPlayerInfo"
                            style="height: 406px"
                        ></TeamData>
                    </n-gi>
                </n-grid>
            </n-gi>
        </n-grid>
    </div>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, nextTick, ref, Ref, watch } from 'vue';
import { ScrollbarInst } from 'naive-ui';
import { GameStatus, TacticalSelector, TacticalStatistic, TeamData } from '@/components/GameOn';
import { getColor } from '@/utils/colorMap';
import { useStore } from '@/stores/store';

const store = useStore();
defineComponent({ GameStatus, TeamData, TacticalStatistic, TacticalSelector });

const totalData: ComputedRef = computed(() => {
    return store.gamePveData;
});

const homeTeam: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (totalData.value.game_info.home_club_id === totalData.value.player_team_info.club_id) {
        return totalData.value.player_team_info;
    }
    return totalData.value.computer_team_info;
});

const foreignTeam: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (totalData.value.game_info.home_club_id !== totalData.value.player_team_info.club_id) {
        return totalData.value.player_team_info;
    }
    return totalData.value.computer_team_info;
});

const homePlayerInfo: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (totalData.value.game_info.home_club_id === totalData.value.player_team_info.club_id) {
        return totalData.value.player_players_info;
    }
    return totalData.value.computer_players_info;
});

const foreignPlayerInfo: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (totalData.value.game_info.home_club_id !== totalData.value.player_team_info.club_id) {
        return totalData.value.player_players_info;
    }
    return totalData.value.computer_players_info;
});

const nScrollBarRef: Ref<ScrollbarInst | null> = ref(null);
const commentaryList: ComputedRef = computed(() => {
    const result = new Array<any>();
    if (totalData.value.game_info) {
        const scriptList: Array<string> = totalData.value.game_info.script.split('\n\n');
        for (let i: number = 0; i < scriptList.length; i++) {
            const subScriptList: Array<string> = scriptList[i].split('\n');
            if (i === scriptList.length - 1) {
                subScriptList.pop();
                continue;
            }
            for (let j: number = 0; j <= subScriptList.length - 1; j++) {
                const item: Array<string> = subScriptList[j].split('@');
                if (item[1].length <= 2) {
                    result.push({
                        content: item[0],
                        time: '',
                        level: item[1]
                    });
                } else {
                    result.push({
                        content: item[0],
                        time: item[1],
                        level: item[2]
                    });
                }
            }
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
