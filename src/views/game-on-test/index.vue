<template>
    <div class="p-6">
        <div class="flex gap-6">
            <div class="w-1/3 flex flex-col gap-6">
                <!-- 左球场 -->
                <Field pos="left"></Field>
                <!-- 左表格 -->
                <div>
                    <TeamData :club="homeTeam" :player-info="homePlayerInfo"></TeamData>
                </div>
            </div>

            <div class="w-1/3">
                <div class="flex flex-col gap-6">
                    <!-- 比分 -->
                    <GameStatus
                        v-if="totalData['game_info']"
                        :computer-team-info="totalData['computer_team_info']"
                        :home-club-id="totalData['game_info']['home_club_id']"
                        :player-team-info="totalData['player_team_info']"
                        :turns="totalData['game_info']['turns']"
                        :cur-attacker="totalData['game_info']['cur_attacker']"
                    ></GameStatus>
                    <!-- 战术选择 -->
                    <TacticalSelector :is-self-turn="isSelfTurn" v-if="!isLoading"></TacticalSelector>
                    <div class="s-card p-6">
                        <!-- 解说 -->
                        <div class="flex flex-col gap-3 items-start">
                            <div v-for="script in newCommentaryList" class="flex items-center gap-2">
                                <div
                                    class="text-primary bg-primary-active rounded-full py-1 px-2"
                                >{{ script.time }}</div>
                                <div v-if="script.content.includes('球进')">
                                    <icon-ic:sharp-sports-soccer class="text-primary" />
                                </div>
                                <div class>{{ script.content }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- 战术统计 -->
                    <TacticalStatistic
                        :computer-team-info="totalData['computer_team_info']"
                        :player-team-info="totalData['player_team_info']"
                    ></TacticalStatistic>
                    <!-- 解说 -->
                    <div class="s-card p-6 h-128 3xl:h-160">
                        <n-scrollbar ref="nScrollBarRef">
                            <n-timeline>
                                <n-timeline-item
                                    v-for="(item, key) in commentaryList"
                                    :color="getColor(item.level, '', 1, 5)"
                                    :time="item.time"
                                    :title="item.content"
                                ></n-timeline-item>
                            </n-timeline>
                        </n-scrollbar>
                    </div>
                </div>
            </div>

            <div class="w-1/3 flex flex-col gap-6">
                <!-- 右球场 -->
                <Field pos="right"></Field>
                <!-- 右表格 -->
                <div>
                    <TeamData :club="foreignTeam" :player-info="foreignPlayerInfo"></TeamData>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, nextTick, ref, Ref, watch, onMounted } from "vue";
import { ScrollbarInst } from "naive-ui";
import {
    GameStatus,
    TacticalSelector,
    TacticalStatistic,
    TeamData,
    Field
} from "@/components/GameOn";
import { getColor } from "@/utils/colorMap";
import { useStore } from "@/stores/store";
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import { gamePveNextTurnAPI, gamePveShowGameInfoAPI } from '@/apis/gamePve';
import { getClubByIdAPI } from '@/apis/club';
import { useRouterPush } from '@/composables';


const { routerPush } = useRouterPush();
const store = useStore();


const isLoading: Ref<boolean> = ref(true);


let timer: NodeJS.Timeout | null = null;
onMounted(() => {
    gamePveShowGameInfoAPI()
        .then((response: any) => {
            if (response.game_info.turns > 51) {
                if (timer) {
                    clearInterval(timer);
                }
                routerPush({ name: 'game-result' });
                return;
            }
            const temp = response;
            if (store.clubNameId[temp.player_team_info.club_id]) {
                temp.player_team_info.name = store.clubNameId[temp.player_team_info.club_id];
                if (store.clubNameId[temp.computer_team_info.club_id]) {
                    temp.computer_team_info.name = store.clubNameId[temp.computer_team_info.club_id];
                    store.gamePveData = temp;
                } else {
                    getClubByIdAPI({ club_id: temp.computer_team_info.club_id })
                        .then((response: any) => {
                            temp.computer_team_info.name = response.name;
                            store.clubNameId[temp.computer_team_info.club_id] = response.name;
                            store.gamePveData = temp;
                        })
                        .catch((_error: any) => {
                        });
                }
            } else {
                getClubByIdAPI({ club_id: temp.player_team_info.club_id })
                    .then((response: any) => {
                        temp.player_team_info.name = response.name;
                        store.clubNameId[temp.player_team_info.club_id] = response.name;
                        if (store.clubNameId[temp.computer_team_info.club_id]) {
                            temp.computer_team_info.name = store.clubNameId[temp.computer_team_info.club_id];
                            store.gamePveData = temp;
                        } else {
                            getClubByIdAPI({ club_id: temp.computer_team_info.club_id })
                                .then((response: any) => {
                                    temp.computer_team_info.name = response.name;
                                    store.clubNameId[temp.computer_team_info.club_id] = response.name;
                                    store.gamePveData = temp;
                                })
                                .catch((_error: any) => {
                                });
                        }
                    })
                    .catch((_error: any) => {
                    });
            }
            isLoading.value = false
        })
        .catch((_error: any) => {
        });
})


const totalData: ComputedRef = computed(() => {
    return store.gamePveData;
});

const isSelfTurn: ComputedRef = computed(() => {
    return store.gamePveData.game_info.cur_attacker === store.gamePveData.game_info.player_club_id
});


// 主场队伍比赛信息
const homeTeam: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (
        totalData.value.game_info.home_club_id === totalData.value.player_team_info.club_id
    ) {
        return totalData.value.player_team_info;
    }
    return totalData.value.computer_team_info;
});

// 客场队伍比赛信息
const foreignTeam: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (
        totalData.value.game_info.home_club_id !== totalData.value.player_team_info.club_id
    ) {
        return totalData.value.player_team_info;
    }
    return totalData.value.computer_team_info;
});

// 主场球员比赛信息
const homePlayerInfo: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (
        totalData.value.game_info.home_club_id === totalData.value.player_team_info.club_id
    ) {
        return totalData.value.player_players_info;
    }
    return totalData.value.computer_players_info;
});

// 客场球员比赛信息
const foreignPlayerInfo: ComputedRef = computed(() => {
    if (!totalData.value.game_info) {
        return null;
    }
    if (
        totalData.value.game_info.home_club_id !== totalData.value.player_team_info.club_id
    ) {
        return totalData.value.player_players_info;
    }
    return totalData.value.computer_players_info;
});

// 解说
const nScrollBarRef: Ref<ScrollbarInst | null> = ref(null);
const commentaryList: ComputedRef = computed(() => {
    const result = new Array<any>();
    if (totalData.value.game_info) {
        const scriptList: Array<string> = totalData.value.game_info.script.split("\n\n");
        for (let i: number = 0; i < scriptList.length; i++) {
            const subScriptList: Array<string> = scriptList[i].split("\n");
            if (i === scriptList.length - 1) {
                subScriptList.pop();
                continue;
                // break???
            }
            for (let j: number = 0; j <= subScriptList.length - 1; j++) {
                const item: Array<string> = subScriptList[j].split("@");
                if (item[1].length <= 2) {
                    result.push({
                        content: item[0],
                        time: "",
                        level: item[1],
                    });
                } else {
                    result.push({
                        content: item[0],
                        time: item[1],
                        level: item[2],
                    });
                }
            }
        }

    }
    return result;
});

const newCommentaryList: ComputedRef = computed(() => {
    const result = new Array<any>();
    if (totalData.value.game_info) {
        const scriptList: Array<string> = totalData.value.game_info.new_script.split("\n\n");

        for (let i: number = 0; i < scriptList.length; i++) {
            const subScriptList: Array<string> = scriptList[i].split("\n");
            for (let j: number = 0; j < subScriptList.length; j++) {
                if (!subScriptList[j]) {
                    // 为什么最后会有个空字符串？？？为什么script就没有？？？
                    continue
                }
                const item: Array<string> = subScriptList[j].split("@");

                if (item[1].length <= 2) {
                    result.push({
                        content: item[0],
                        time: "",
                        level: item[1],
                    });
                } else {
                    result.push({
                        content: item[0],
                        time: item[1],
                        level: item[2],
                    });
                }
            }
        }
    }
    console.log('11111111')
    console.log(result)
    return result;
});

watch(
    // 每次解说更新后都要滚到底端
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

// 球场相关函数

defineExpose({
    getColor,
    homeTeam,
    foreignTeam,
    homePlayerInfo,
    foreignPlayerInfo,
    commentaryList,
    totalData,
});
</script>
