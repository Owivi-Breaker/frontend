<template>
    <div>
        <div class="p-6 flex gap-6" :class="{ showDiv: !loadFinished }">
            <!-- 左 -->
            <div class="w-1/3 flex flex-col gap-6">
                <!-- 左球场 -->
                <Field :club-name="gameResult.teams_info[0].club_name" :pos="leftOriPos"></Field>
                <!-- 左侧柱状图 -->
                <div class="s-card p-6">
                    <!-- <div class="text-lg font-semibold text-primary s-underline p-5">{{ '战术详细' }}</div> -->
                    <div :id="LtacticalChart" style="width:100%; height:300%"></div>
                </div>
                <!-- 左表格 -->
                <TeamData
                    :club-name="gameResult.teams_info[0].club_name"
                    :player-info="homePlayerInfo"
                ></TeamData>
            </div>
            <!-- 中 -->
            <div class="w-1/3 flex flex-col gap-6">
                <!-- 比分 -->
                <div class="s-card p-6" v-if="gameResult">
                    <div class="flex items-start justify-between">
                        <!-- 左队 -->
                        <div class="w-1/3 flex flex-col items-center gap-2">
                            <img
                                :src="'http://s1.s100.vip:13127/Public/' + gameResult.teams_info[0].club_name + '.png'"
                                alt="图片"
                                class="w-15 h-15"
                            />
                            <div
                                class="font-semibold text-lg"
                            >{{ gameResult.teams_info[0].club_name }}</div>
                            <!-- 进球纪录 -->

                            <div class="mt-2">
                                <div
                                    class="flex flex-col gap-1.5"
                                    v-for="(item, index) in goalRecord.left"
                                >
                                    <div class="flex items-center">
                                        <icon-ion:md-football
                                            :style="clubTx(gameResult.teams_info[0].club_name)"
                                            class="mr-1"
                                        />
                                        <div class="mr-1">{{ item.player_name }}</div>
                                        <div
                                            class="text-gray-500"
                                        >{{ '(' + Math.round(item.turns * 1.08) + '\')' }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 比分和时间 -->
                        <div class="flex flex-col gap-1 items-center">
                            <div class="text-gray-500">{{ gameFullName }}</div>

                            <div class="flex items-center gap-2">
                                <div class="font-bold text-3xl">{{ gameResult.teams_info[0].score }}</div>
                                <div class="font-bold text-3xl">-</div>
                                <div class="font-bold text-3xl">{{ gameResult.teams_info[1].score }}</div>
                            </div>
                        </div>

                        <!-- 右队 -->
                        <div class="w-1/3 flex flex-col items-center gap-2">
                            <img
                                :src="'http://s1.s100.vip:13127/Public/' + gameResult.teams_info[1].club_name + '.png'"
                                alt="图片"
                                class="w-15 h-15"
                            />
                            <div
                                class="font-semibold text-lg"
                            >{{ gameResult.teams_info[1].club_name }}</div>
                            <div class="mt-2">
                                <div
                                    class="flex flex-col gap-1.5"
                                    v-for="(item, index) in goalRecord.right"
                                >
                                    <div class="flex items-center">
                                        <icon-ion:md-football
                                            :style="clubTx(gameResult.teams_info[1].club_name)"
                                            class="mr-1"
                                        />
                                        <div class="mr-1">{{ item.player_name }}</div>
                                        <div
                                            class="text-gray-500"
                                        >{{ '(' + Math.round(item.turns * 1.08) + '\')' }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-1/3 flex flex-col"></div>
                </div>
                <!-- 雷达对比 -->
                <div class="s-card flex flex-col p-10">
                    <!-- <div
                        class="text-2xl font-semibold text-primary s-underline my-10 mx-auto"
                    >{{ '球队雷达图' }}</div>-->
                    <div :id="capabilityChart" style="width:100%; height:300%"></div>
                </div>
                <!-- MVP -->
                <div class="s-card p-5 flex flex-col items-center" hoverable v-if="mvpPlayer">
                    <div class="flex items-center gap-15">
                        <div class="flex flex-col gap-2 items-center">
                            <div
                                class="font-bold text-3xl text-primary-active"
                                :style="clubTx(mvpPlayer.club_name, -0.8)"
                            >MVP</div>
                            <div>
                                <Avataaars
                                    class="h-25 w-25"
                                    :is-circle="false"
                                    v-bind="mvpPlayer.avatar"
                                />
                            </div>
                            <div
                                class="text-2xl text-primary font-semibold"
                                :style="clubTx(mvpPlayer.club_name)"
                            >{{ mvpPlayer.translated_name }}</div>
                        </div>
                        <div class="text-lg flex flex-col items-start gap-1">
                            <div class="text-lg">{{ mvpPlayer.club_name }}</div>

                            <div
                                class="rounded-full px-2 py-1"
                                :style="clubBg(mvpPlayer.club_name, -0.8)"
                            >
                                <div
                                    :style="clubTx(mvpPlayer.club_name)"
                                >{{ mvpPlayerData.final_rating + ' 分' }}</div>
                            </div>
                            <div>
                                <span
                                    v-for="i of mvpPlayerData.goals"
                                    class="w-5 text-primary"
                                    :style="clubTx(mvpPlayer.club_name)"
                                >
                                    <icon-ion:football />
                                </span>
                            </div>
                            <div>
                                <span
                                    v-for="i in 2"
                                    class="w-5 text-primary"
                                    :style="clubTx(mvpPlayer.club_name)"
                                >
                                    <icon-mdi:shoe-cleat />
                                </span>
                            </div>
                            <div class="font-semibold">{{ getMvpDesc() }}</div>
                        </div>
                    </div>
                </div>

                <!-- 解说 -->
                <div class>
                    <div class="s-card flex flex-col p-10">
                        <!-- <div class="text-lg font-semibold text-primary s-underline p-5">{{ '比赛解说' }}</div> -->
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
            </div>

            <!-- 右 -->
            <div class="w-1/3 flex flex-col gap-6">
                <!-- 右球场 -->
                <Field :club-name="gameResult.teams_info[1].club_name" :pos="rightOriPos"></Field>
                <!-- 右侧柱状图 -->
                <div class="s-card p-6">
                    <!-- <div class="text-lg font-semibold text-primary s-underline p-5">{{ '战术详细' }}</div> -->
                    <div :id="RtacticalChart" style="width:100%; height:300%"></div>
                </div>
                <!-- 右表格 -->
                <TeamData
                    :club-name="gameResult.teams_info[1].club_name"
                    :player-info="foreignPlayerInfo"
                ></TeamData>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Field } from './components';
import { computed, ComputedRef, defineComponent, nextTick, ref, Ref, watch, onMounted } from "vue";
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
import { getGameByIdAPI } from '@/apis/game';
import { endGameTeamData } from '@/components/GameEnd';
import { getPlayerByIdAPI } from '@/apis/player';
import { getColor, getClubColor, clubBg, clubTx } from "@/utils/colorMap";
import * as echarts from 'echarts';
import { right } from '@antv/g2plot/lib/plots/sankey/sankey';
import { consoleLog } from '@/utils';
import { ScrollbarInst } from "naive-ui";
import {
    GameStatus,
    TacticalSelector,
    TacticalStatistic,
    TeamData,
} from "@/components/GameOn";
import { useStore } from "@/stores/store";
import { gamePveNextTurnAPI, gamePveShowGameInfoAPI } from '@/apis/gamePve';
import { getClubByIdAPI } from '@/apis/club';
import { useRouterPush } from '@/composables';
import suffix from 'naive-ui/lib/_internal/suffix';

const loadFinished: Ref<boolean> = ref(false);

defineComponent({ endGameTeamData, Avataaars });
const route: RouteLocationNormalizedLoaded = useRoute();
const gameId: number = Number(route.query.id);
const gameResult: Ref = ref();


// 进球纪录
const goalRecord: ComputedRef = computed(() => {
    let res: any = { 'left': [], 'right': [] };
    for (let r of gameResult.value.goal_record) {
        if (r.club_name == gameResult.value.teams_info[0].club_name) {
            res.left.push(r);
        } else {
            res.right.push(r);
        }
    }
    return res
})

// mvp球员个人信息
const mvpPlayer: Ref = ref();

// mvp是否在左队
const isMvpLeft: ComputedRef = computed(() => {
    if (mvpPlayer.value.club_id === gameResult.value.teams_info[0].club_id) {
        return true;
    } else {
        return false;
    }
})

// 获取mvp数据描述
const getMvpDesc = () => {
    const passPro = mvpPlayerData.value.passes === 0 ? 0 : Math.round((mvpPlayerData.value.pass_success / mvpPlayerData.value.passes) * 100)
    const tacklePro = mvpPlayerData.value.tackles === 0 ? 0 : Math.round((mvpPlayerData.value.tackle_success / mvpPlayerData.value.tackles) * 100)
    const dribblePro = mvpPlayerData.value.dribbles === 0 ? 0 : Math.round((mvpPlayerData.value.dribble_success / mvpPlayerData.value.dribbles) * 100)
    const aerialPro = mvpPlayerData.value.aerials === 0 ? 0 : Math.round((mvpPlayerData.value.aerial_success / mvpPlayerData.value.aerials) * 100)
    const savePro = mvpPlayerData.value.saves === 0 ? 0 : Math.round((mvpPlayerData.value.save_success / mvpPlayerData.value.saves) * 100)

    switch (Math.max(passPro, tacklePro, dribblePro, aerialPro, savePro)) {
        case 0:
            return ''
        case passPro:
            return `${passPro}% 传球成功率`
        case tacklePro:
            return `${tacklePro}% 抢断成功率`
        case dribblePro:
            return `${dribblePro}% 盘带成功率`
        case aerialPro:
            return `${aerialPro}% 过人成功率`
        case savePro:
            return `${savePro}% 扑救成功率`
        default:
            return ''
    }

}

// mvp的比赛数据
const mvpPlayerData: ComputedRef = computed(() => {
    for (const p of gameResult.value.teams_info[0].players_info) {
        if (p.player_id === gameResult.value.mvp) {
            return p;
        }
    }
    for (const p of gameResult.value.teams_info[1].players_info) {
        if (p.player_id === gameResult.value.mvp) {
            return p;
        }
    }
    return {};
})


const leftOriPos: ComputedRef = computed(() => {
    let pos: any = {};
    for (const p of gameResult.value.teams_info[0].players_info) {
        if (p.location in pos) {
            pos[p.location].push(p)
        } else {
            pos[p.location] = [p]
        }
    }
    return pos;
})

const rightOriPos: ComputedRef = computed(() => {
    let pos: any = {};
    for (const p of gameResult.value.teams_info[1].players_info) {
        if (p.location in pos) {
            pos[p.location].push(p)
        } else {
            pos[p.location] = [p]
        }
    }
    return pos;
})

// 主场球员比赛信息
const homePlayerInfo: ComputedRef = computed(() => {
    return gameResult.value.teams_info[0].players_info;
});

// 客场球员比赛信息
const foreignPlayerInfo: ComputedRef = computed(() => {
    return gameResult.value.teams_info[1].players_info;
});

const gameFullName: ComputedRef = computed(() => {
    let suffix = ''
    if (gameResult.value.type.includes('group')) {
        suffix = '小组赛'
    } else if (gameResult.value.type.includes('16to8')) {
        suffix = '1/8淘汰赛';
    } else if (gameResult.value.type.includes('8to4')) {
        suffix = '1/4淘汰赛';
    } else if (gameResult.value.type.includes('4to2')) {
        suffix = '半决赛';
    } else if (gameResult.value.type.includes('2to2')) {
        suffix = '决赛';
    }
    return gameResult.value.name + suffix;
})

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


onMounted(() => {
    getGameByIdAPI({ game_id: gameId })
        .then((response: any) => {
            gameResult.value = response;
            getPlayerByIdAPI({ player_id: response.mvp })
                .then((response: any) => {
                    mvpPlayer.value = response;
                    // 初始化echarts
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
                    loadFinished.value = true;
                })
                .catch((_error: {}) => {
                });
        })
        .catch((_error: {}) => {
        });

})

// 图标配置
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
                color: getClubColor(gameResult.value.teams_info[0].club_name, 0.5),
                name: '成功次数',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: getLeftTeamData()[1]
            },
            {
                color: getClubColor(gameResult.value.teams_info[0].club_name, -0.5),
                name: '总次数',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: getLeftTeamData()[0]
            }
        ]
    }
});

const getLeftTeamData = () => {
    let teamInfo = gameResult.value.teams_info[0]
    return [[
        teamInfo.attempts, teamInfo.wing_cross, teamInfo.under_cutting, teamInfo.pull_back, teamInfo.middle_attack, teamInfo.counter_attack],
    [teamInfo.score, teamInfo.wing_cross_success, teamInfo.under_cutting_success, teamInfo.pull_back_success, teamInfo.middle_attack_success, teamInfo.counter_attack_success]]
}

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
                color: getClubColor(gameResult.value.teams_info[1].club_name, 0.5),
                name: '成功次数',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: getRightTeamData()[1]
            },
            {
                color: getClubColor(gameResult.value.teams_info[1].club_name, -0.5),
                name: '总次数',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: getRightTeamData()[0]
            }
        ]
    }
});

const getRightTeamData = () => {
    let teamInfo = gameResult.value.teams_info[1]
    return [[
        teamInfo.attempts, teamInfo.wing_cross, teamInfo.under_cutting, teamInfo.pull_back, teamInfo.middle_attack, teamInfo.counter_attack],
    [teamInfo.score, teamInfo.wing_cross_success, teamInfo.under_cutting_success, teamInfo.pull_back_success, teamInfo.middle_attack_success, teamInfo.counter_attack_success]]
}

const capabilityOption = computed(() => {
    return {
        legend: {
            itemGap: 50,
            data: [gameResult.value.teams_info[0].club_name,
            gameResult.value.teams_info[1].club_name]
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
                { name: '评分', max: 1 },
                { name: '传球', max: 1 },
                { name: '抢断', max: 1 },
                { name: '过人', max: 1 },
                { name: '争顶', max: 1 }
            ]
        },
        series: [
            {
                color: [getClubColor(gameResult.value.teams_info[0].club_name),
                getClubColor(gameResult.value.teams_info[1].club_name)],
                name: '个人能力',
                type: 'radar',
                data: [
                    {
                        value: LeftPlayersTotalData.value,
                        name: gameResult.value.teams_info[0].club_name
                    },
                    {

                        value: RightPlayersTotalData.value,
                        name: gameResult.value.teams_info[1].club_name
                    }
                ]
            }
        ]
    }
});

const LeftPlayersData: ComputedRef = computed(() => {
    const res = [0, 0, 0, 0, 0]
    for (const p of gameResult.value.teams_info[0].players_info) {
        res[0] += p.final_rating
        res[1] += p.pass_success
        res[2] += p.tackle_success
        res[3] += p.dribble_success
        res[4] += p.aerial_success
    }
    return res
})

const RightPlayersData: ComputedRef = computed(() => {
    const res = [0, 0, 0, 0, 0]
    for (const p of gameResult.value.teams_info[1].players_info) {
        res[0] += p.final_rating
        res[1] += p.pass_success
        res[2] += p.tackle_success
        res[3] += p.dribble_success
        res[4] += p.aerial_success
    }
    return res
})

const LeftPlayersTotalData: ComputedRef = computed(() => {
    const res = [0, 0, 0, 0, 0]
    for (let i = 0; i < 5; i++) {
        if (LeftPlayersData.value[i] + RightPlayersData.value[i] != 0) {
            res[i] = LeftPlayersData.value[i] / (LeftPlayersData.value[i] + RightPlayersData.value[i])
        }
    }
    return res
})

const RightPlayersTotalData: ComputedRef = computed(() => {
    const res = [0, 0, 0, 0, 0]
    for (let i = 0; i < 5; i++) {
        if (LeftPlayersData.value[i] + RightPlayersData.value[i] != 0) {
            res[i] = RightPlayersData.value[i] / (LeftPlayersData.value[i] + RightPlayersData.value[i])
        }
    }
    return res
})


const LtacticalChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
const capabilityChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
const RtacticalChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);




</script>

<style scoped>
.avatar {
    width: 130px;
    height: 130px;
    margin: 5px;
}
</style>
