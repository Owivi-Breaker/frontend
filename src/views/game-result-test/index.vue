<template>
    <div>
       <div class="flex flex-col gap-10">
            <div class="flex flex-row w-full h-1/3 space-x-10" >
                <!-- LNVP -->
                <div class="s-card flex w-1/4" hoverable v-if="mvpPlayer">
                    <div class="flex flex-row w-full space-x-5">
                        <div class="flex flex-col w-1/2 place-items-center p-5 space-y-1">
                            <img alt="图片" src="../../../public/MVP.png" style="height: 40px; width: 80px" />
                            <Avataaars height="80" width="80" v-bind="mvpPlayer.avatar" />
                            <div class="text-primary font-semibold">{{ mvpPlayer.translated_name }}</div>
                            <div class="text-lg text-gray-500">{{ mvpPlayer.club_name }}</div>
                            <div class="text-lg font-semibold">争顶成功率:68%</div>
                        </div>
                        <div class="flex flex-col w-1/2 place-items-center p-5 overflow-hidden space-y-7">
                            <div class="flex text-9xl text-primary-active font-bold">
                                ST
                            </div>
                            <div class="text-4xl font-semibold antialiased text-primary self-auto">
                                10分
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 比分栏目 -->
                <div class="s-card flex justify-around p-5 w-1/2" v-if="gameResult">
                    <div class="flex flex-col">
                        <img
                            :src="'http://s1.s100.vip:13127/Public/' + gameResult.teams_info[0].club_name + '.png'"
                            alt="图片"
                            class="avatar"
                        />
                        <div class="p-2 text-lg font-semibold s-underline place-self-center">{{ gameResult.teams_info[0].club_name }}</div>
                    </div>
                    <div class="text-7xl font-medium text-left p-5">
                        <div>{{ gameResult.teams_info[0].score }}</div>
                    </div>
                    <div class="flex flex-col p-3">
                        <div class="place-self-center text-7xl font-medium">-</div>
                        <div class="text-lg text-gray-500 place-self-center p-3">{{ gameResult.name }} 第 {{ gameResult.season }} 赛季</div>
                        <div class="text-lg text-gray-500 place-self-center p-3">{{ gameResult.date }}</div>
                    </div>
                    <div class="text-7xl font-medium text-right p-5">
                        <div>{{ gameResult.teams_info[1].score }}</div>
                    </div>
                    <div class="flex flex-col">
                        <img
                            :src="'http://s1.s100.vip:13127/Public/' + gameResult.teams_info[1].club_name + '.png'"
                            alt="图片"
                            class="avatar"
                        />
                        <div class="p-2 text-lg font-semibold s-underline place-self-center">{{ gameResult.teams_info[1].club_name }}</div>
                    </div>
                </div>
                
                <!-- RMVP -->
                <div class="s-card flex w-1/4" hoverable v-if="mvpPlayer">
                    <div class="flex flex-row w-full space-x-5">
                        <div class="flex flex-col w-1/2 place-items-center p-5 space-y-1">
                            <img alt="图片" src="../../../public/MVP.png" style="height: 40px; width: 80px" />
                            <Avataaars height="80" width="80" v-bind="mvpPlayer.avatar" />
                            <div class="text-primary font-semibold">{{ mvpPlayer.translated_name }}</div>
                            <div class="text-lg text-gray-500">{{ mvpPlayer.club_name }}</div>
                            <div class="text-lg font-semibold">过人成功率:75%</div>
                        </div>
                        <div class="flex flex-col w-1/2 place-items-center p-5 overflow-hidden space-y-7">
                            <div class="flex text-9xl text-primary-active font-bold">
                                CM
                            </div>
                            <div class="text-4xl font-semibold antialiased text-primary self-auto">
                                8.2分
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- 柱形图 -->
            <div class="flex flex-row w-full space-x-10">
                <!-- 左侧队伍 -->
                <div class="w-1/3">
                    <div class="s-card flex flex-col">
                        <div class="text-lg font-semibold text-primary s-underline p-5">{{ '战术详细' }}</div>
                        <div :id="LtacticalChart" style="width:100%; height:300%"></div>
                    </div>
                </div>
                <!-- 雷达对比 -->
                <div class="w-1/3">
                    <div class="s-card flex flex-col">
                        <div class="text-lg font-semibold text-primary s-underline p-5">{{ '球队雷达图' }}</div>
                        <div :id="capabilityChart" style="width:100%; height:300%"></div>
                    </div>
                </div>
                <!-- 右侧队伍 -->
                <div class="w-1/3">
                    <div class="s-card flex flex-col">
                        <div class="text-lg font-semibold text-primary s-underline p-5">{{ '战术详细' }}</div>
                        <div :id="RtacticalChart" style="width:100%; height:300%"></div>
                    </div>
                </div>
            </div>
            
             <!-- 数据 -->
            <div class="flex flex-row w-full space-x-10">
                <!-- 左侧队伍 -->
                <div class="flex w-1/3">
                    <div class="w-full">
                        <TeamData :club="homeTeam" :player-info="homePlayerInfo"></TeamData>
                    </div>
                </div>
                
                <!-- 时间轴 -->
                <div class="flex w-1/3">
                    <div class="s-card flex flex-col w-full">
                        <div class="text-lg font-semibold text-primary s-underline p-5">{{ '时间轴' }}</div>
                            <n-scrollbar style="max-height: 415px">
                                <n-timeline :icon-size="20" class="place-self-center">
                                    <n-timeline-item color="green" content="比赛开始">
                                    <template #icon>
                                        <n-icon>
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" fill="currentColor"></path><path d="M12.5 7H11v6l5.25 3.15l.75-1.23l-4.5-2.67z" fill="currentColor"></path></svg>
                                        </n-icon>
                                    </template>
                                    </n-timeline-item>
                                    <n-timeline-item color="blue"
                                        v-for="(item, index) in gameResult.goal_record"
                                        :key="index"
                                        :content="item.club_name"
                                        :title="item.player_name"
                                    >
                                    <template #icon>
                                        <n-icon>
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path d="M256,48C141.1,48,48,141.1,48,256c0,114.7,93.3,208,208,208c114.9,0,208-93.1,208-208C464,141.3,370.7,48,256,48zM383.3,128.7c8.5,8.5,16.1,17.7,22.6,27.5c0.7,1,0.9,2.4,0.4,3.5L391.9,201c-0.4,1-1.1,1.9-2.1,2.3l-57.5,26.2c-1.4,0.6-3,0.4-4.2-0.6l-56.6-47.6c-0.9-0.8-1.4-1.9-1.4-3.1v-63.1c0-1.3,0.7-2.6,1.8-3.3l38.4-26.1c1-0.7,2.3-0.9,3.5-0.5C339.6,94.1,363.4,108.8,383.3,128.7z M309.4,426.3c-0.4,1.2-1.4,2.1-2.6,2.4c-16.3,4.8-33.4,7.2-50.8,7.2c-17.5,0-34.5-2.5-50.8-7.2c-1.2-0.4-2.2-1.3-2.6-2.4l-16.4-43c-0.4-1.1-0.3-2.3,0.2-3.3l22.3-42.3c0.7-1.3,2.1-2.1,3.5-2.1h87.5c1.5,0,2.8,0.8,3.5,2.1l22.3,42.3c0.5,1,0.6,2.2,0.2,3.3L309.4,426.3z M242,115.3v63.1c0,1.2-0.5,2.3-1.4,3.1L183.9,229c-1.2,1-2.8,1.2-4.2,0.6l-57.5-26.2c-1-0.5-1.8-1.3-2.1-2.3l-14.4-41.2c-0.4-1.2-0.3-2.5,0.4-3.5c6.5-9.8,14.1-19,22.6-27.5c19.9-19.9,43.7-34.6,69.6-43.3c1.2-0.4,2.5-0.2,3.5,0.5l38.4,26.1C241.3,112.7,242,113.9,242,115.3z M77.7,264.1l36.1-31.2c1.2-1,2.9-1.3,4.3-0.6l52.4,23.8c1.1,0.5,1.9,1.5,2.2,2.7l14.6,57.3c0.2,1,0.1,2-0.3,2.9l-23.2,43.9c-0.7,1.3-2.1,2.2-3.6,2.1l-46-0.6c-1.2,0-2.4-0.6-3.2-1.6c-20.5-27.7-32.5-60.6-34.7-95.4C76.3,266.1,76.8,264.9,77.7,264.1z M348.1,362.8L325,319c-0.5-0.9-0.6-1.9-0.3-2.9l14.6-57.3c0.3-1.2,1.1-2.2,2.2-2.7l52.4-23.8c1.4-0.6,3.1-0.4,4.3,0.6l36.1,31.2c0.9,0.8,1.5,2,1.4,3.3c-2.1,34.8-14.2,67.6-34.7,95.4c-0.7,1-1.9,1.6-3.2,1.6l-46.1,0.6C350.2,364.9,348.8,364.1,348.1,362.8z"></path></svg>
                                        </n-icon>
                                    </template>
                                    </n-timeline-item>
                                    <n-timeline-item type="error" content="比赛结束">
                                    <template #icon>
                                        <n-icon>
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M256 8C119 8 8 119 8 256s111 248 248 248s248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200s-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2l-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2l62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" fill="currentColor"></path></svg>
                                        </n-icon>
                                    </template>
                                    </n-timeline-item>
                                </n-timeline>
                            </n-scrollbar>
                    </div>
                </div>

                <!-- 右侧队伍 -->
                <div class="flex w-1/3">
                    <div class="w-full">
                        <TeamData :club="homeTeam" :player-info="homePlayerInfo"></TeamData>
                    </div>
                </div>
            </div>

            <div class="flex flex-row w-full space-x-10">
                <!-- 左侧队伍阵形 -->
                <div class="flex w-1/3">
                    <div class="w-full">
                        <Field pos="left"></Field>
                    </div>
                </div>
                
                <!-- 解说 -->
                <div class="w-1/3">
                    <div class="s-card flex flex-col w-full">
                        <div class="text-lg font-semibold text-primary s-underline p-5">{{ '比赛解说' }}</div>
                            <n-scrollbar style="max-height: 304px">
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
                </div>

                <!-- 右侧队伍阵形 -->
                <div class="flex w-1/3">
                    <div class="w-full">
                        <Field pos="right"></Field>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, nextTick, ref, Ref, watch, onMounted } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
import { getGameByIdAPI } from '@/apis/game';
import { endGameTeamData } from '@/components/GameEnd';
import { getPlayerByIdAPI } from '@/apis/player';
import { getColor } from '@/utils/colorMap';
import * as echarts from 'echarts';
import { right } from '@antv/g2plot/lib/plots/sankey/sankey';
import { consoleLog } from '@/utils';
import { ScrollbarInst } from "naive-ui";
import {
    GameStatus,
    TacticalSelector,
    TacticalStatistic,
    TeamData,
    Field
} from "@/components/GameOn";
import { useStore } from "@/stores/store";
import { gamePveNextTurnAPI, gamePveShowGameInfoAPI } from '@/apis/gamePve';
import { getClubByIdAPI } from '@/apis/club';
import { useRouterPush } from '@/composables';


defineComponent({ endGameTeamData, Avataaars });
const route: RouteLocationNormalizedLoaded = useRoute();
// const gameId: number = Number(route.query.id);
const gameId: number = 4;
const gameResult: Ref = ref();
const mvpPlayer: Ref = ref();

getGameByIdAPI({ game_id: gameId })
    .then((response:any) => {
        gameResult.value = response;
        getPlayerByIdAPI({ player_id: response.mvp })
            .then((response:any) => {
                mvpPlayer.value = response;
            })
            .catch((_error: {}) => {
            });
    })
    .catch((_error: {}) => {
    });
const commentaryList: ComputedRef = computed(() => {
    const result = new Array<any>();
    if (gameResult.value) {
        const scriptList: Array<string> = gameResult.value.script.split('\n\n');
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

const LtacticalOption = computed(() => {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['控球率', '下底传中', '边路内切', '倒三角', '中路渗透', '防守反击']
        },
        series: [
            {
            name: '成功次数',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [2, 0, 2, 0, 0, 0]
            },
            {
            name: '总次数',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [24, 3, 11, 4, 6, 0]
            }
        ]
    }
});

const RtacticalOption = computed(() => {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            inverse: true
        },
        yAxis: {
            position: 'right',
            type: 'category',
            data: ['控球率', '下底传中', '边路内切', '倒三角', '中路渗透', '防守反击']
        },
        series: [
            {
            name: '成功次数',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [5, 4, 1, 0, 0, 0]
            },
            {
            name: '总次数',
            type: 'bar',
            stack: 'total',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [26, 13, 4, 6, 0, 3]
            }
        ]
    }
});

const capabilityOption = computed(() => {
    return {
        legend: {
            itemGap:50,
            data: ['西汉姆联', '曼彻斯特联']
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        radar: {
            // shape: 'circle',
            indicator: [
            { name: '评分', max: 148.6 },
            { name: '传球', max: 224 },
            { name: '抢断', max: 42 },
            { name: '过人', max: 42 },
            { name: '争顶', max: 90 }
            ]
        },
        series: [
            {
            name: '个人能力',
            type: 'radar',
            data: [
                {
                value: [84.5, 185, 23, 19, 45],
                name: '西汉姆联'
                },
                {
                value: [64.1, 39, 19, 23, 45],
                name: '曼彻斯特联'
                }
            ]
            }
        ]
    }
});


const LtacticalChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
const capabilityChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
const RtacticalChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
onMounted(() => {
    setTimeout(()=>{
        const LtacticalDiv: HTMLElement | null = document.getElementById(LtacticalChart.value);
        const capabilityDiv: HTMLElement | null = document.getElementById(capabilityChart.value);
        const RtacticalDiv: HTMLElement | null = document.getElementById(RtacticalChart.value);
            if (LtacticalDiv && RtacticalDiv && capabilityDiv != null) {
                const LtacticalChart = echarts.init(LtacticalDiv);
                const capabilityChart = echarts.init(capabilityDiv);
                const RtacticalChart = echarts.init(RtacticalDiv);
                LtacticalChart.setOption(LtacticalOption.value);
                capabilityChart.setOption(capabilityOption.value);
                RtacticalChart.setOption(RtacticalOption.value);
                window.onresize = function () {
                    LtacticalChart.resize();
                    capabilityChart.resize();
                    RtacticalChart.resize();
                };
            }
    });
});

defineExpose({ 
    gameResult,
    mvpPlayer,
    getColor,
    homeTeam,
    foreignTeam,
    homePlayerInfo,
    foreignPlayerInfo,
    commentaryList,
    totalData, 
});

</script>

<style scoped>
.avatar {
    width: 130px;
    height: 130px;
    margin: 5px;
}
</style>
