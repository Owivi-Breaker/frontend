<template>
    <div>
       <div class="flex flex-col gap-10">
            <div class="flex flex-row w-full h-1/3 space-x-10" >
                <!-- 比分栏目 -->
                <div class="s-card flex justify-around p-5 w-4/7" v-if="gameResult">
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
                    <div class="flex flex-col">
                        <div class="place-self-center text-7xl font-medium">-</div>
                        <div class="text-lg text-gray-500 place-self-center">{{ gameResult.name }} 第 {{ gameResult.season }} 赛季</div>
                        <div class="text-lg text-gray-500 place-self-center">{{ gameResult.date }}</div>
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
                
                <!-- MVP对象 -->
                <div class="s-card flex w-1/7">
                    MVP
                </div>

                <!-- 解说 -->
                <div class="s-card flex w-2/7">
                    解说
                </div>
            </div>

            <!-- 柱形图 -->
            <div class="flex flex-row w-full space-x-10">
                <!-- 左侧队伍 -->
                <div class="w-1/3">
                    <div class="s-card flex flex-col">
                        <div class="text-lg font-semibold text-primary s-underline p-4">{{ '战术详细' }}</div>
                        <div :id="LtacticalChart" style="width:100%; height:300%"></div>
                    </div>
                </div>
                <!-- 柱形图对比 -->
                <div class="w-1/3">
                    <div class="s-card flex flex-col">
                        <div class="text-lg font-semibold text-primary s-underline p-4">{{ '战术对比' }}</div>
                        <div :id="contrastChart" style="width:100%; height:300%"></div>
                    </div>
                </div>
                <!-- 右侧队伍 -->
                <div class="w-1/3">
                    <div class="s-card flex flex-col">
                        <div class="text-lg font-semibold text-primary s-underline p-4">{{ '战术详细' }}</div>
                        <div :id="RtacticalChart" style="width:100%; height:300%"></div>
                    </div>
                </div>
            </div>
            
             <!-- 数据 -->
            <div class="flex flex-row w-full space-x-10">
                <!-- 左侧队伍 -->
                <div class="s-card flex w-1/3" v-if="gameResult">
                    <div>
                        <div style="margin: 10px auto">
                            <endGameTeamData
                                :player-info="gameResult.teams_info[0].players_info"
                                style="height: 406px"
                            ></endGameTeamData>
                        </div>
                    </div>
                </div>
                
                <!-- 雷达对比 -->
                <div class="s-card flex w-1/3">
                    <div class="s-card flex flex-col">
                        <div class="text-lg font-semibold text-primary s-underline">{{ '个人能力' }}</div>
                        <div :id="capabilityChart" style="width:300%; height:100%"></div>
                    </div>
                </div>

                <!-- 右侧队伍 -->
                <div class="s-card flex w-1/3" v-if="gameResult">
                    <div>
                        <div style="margin: 10px auto">
                            <endGameTeamData
                                :player-info="gameResult.teams_info[1].players_info"
                                style="height: 406px"
                            ></endGameTeamData>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="s-card w-2/3 p-6 mt-3">
            <div
                class="text-lg font-semibold text-primary mt-3 s-underline"
            >{{ '个人能力' }}</div>
            <div :id="capabilityChart" style="width:100%; height:400%"></div>
        </div>

        <div class="m-3 grid gap-5 grid-cols-3"  v-if="gameResult">
            <div>
                <n-card v-if="mvpPlayer">
                    <img alt="图片" src="../../../public/MVP.png" style="height: 40px; width: 80px" />
                    <div>
                        <Avataaars height="80" v-bind="mvpPlayer.avatar" width="80" />
                        <p>{{ mvpPlayer.translated_name }}</p>
                        <p>{{ mvpPlayer.club_name }}</p>
                    </div>
                </n-card>
                <n-card style="margin: 10px auto">
                    <div style="overflow: auto">
                        <n-timeline horizontal size="large">
                            <n-timeline-item
                                v-for="(item, index) in gameResult.goal_record"
                                :key="index"
                                :content="item.club_name"
                                :title="item.player_name"
                            />
                        </n-timeline>
                    </div>
                </n-card>
                <n-card>
                    <n-scrollbar style="max-height: 280px">
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
                </n-card>
            </div>
        </div> 
    </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, onMounted, ref, Ref } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
import { getGameByIdAPI } from '@/apis/game';
import { endGameTeamData } from '@/components/GameEnd';
import { getPlayerByIdAPI } from '@/apis/player';
import { getColor } from '@/utils/colorMap';
import * as echarts from 'echarts';
import { right } from '@antv/g2plot/lib/plots/sankey/sankey';
import { consoleLog } from '@/utils';


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
defineExpose({ gameResult, mvpPlayer });

const tacticalOption = computed(() => {
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
            data: ['成功率', '下底传中', '边路内切', '倒三角', '中路渗透', '防守反击']
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

const tacticalOption2 = computed(() => {
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
            data: ['成功率', '下底传中', '边路内切', '倒三角', '中路渗透', '防守反击']
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

const contrastOption = computed(() => {
    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'shadow'
            }
        },
        legend: {
            data: ['西汉姆联', '曼彻斯特联', '差值']
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [
            {
            type: 'value'
            }
        ],
        yAxis: [
            {
            type: 'category',
            axisTick: {
                show: false
            },
            data: ['成功率', '下底传中', '边路内切', '倒三角', '中路渗透', '防守反击']
            }
        ],
        series: [
            {
            name: '差值',
            type: 'bar',
            label: {
                show: true,
                position: 'inside'
            },
            emphasis: {
                focus: 'series'
            },
            data: [2, 10, -7, 2, -2, 3]
            },
            {
            name: '西汉姆联',
            type: 'bar',
            stack: 'Total',
            label: {
                show: true,
                position: 'left'
            },
            emphasis: {
                focus: 'series'
            },
            data: [-24, -3, -11, -4, -6, 0]
            },
            {
            name: '曼彻斯特联',
            type: 'bar',
            stack: 'Total',
            label: {
                show: true,
                position: 'right'
            },
            emphasis: {
                focus: 'series'
            },
            data: [26, 13, 4, 6, 4, 3]
            }
        ]
    }
});

const capabilityOption = computed(() => {
    return {
        legend: {
            data: ['西汉姆联', '曼彻斯特联']
        },
        radar: {
            // shape: 'circle',
            indicator: [
            { name: '评分', max: 10 },
            { name: '传球', max: 22 },
            { name: '抢断', max: 12 },
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
                name: '多伊贝尔'
                }
            ]
            }
        ]
    }
});


const LtacticalChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
const RtacticalChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
const contrastChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
const capabilityChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
onMounted(() => {
    setTimeout(()=>{
        const LtacticalDiv: HTMLElement | null = document.getElementById(LtacticalChart.value);
        const RtacticalDiv: HTMLElement | null = document.getElementById(RtacticalChart.value);
        const contrastDiv: HTMLElement | null = document.getElementById(contrastChart.value);
        const capabilityDiv: HTMLElement | null = document.getElementById(capabilityChart.value);
            if (LtacticalDiv && RtacticalDiv && contrastDiv && capabilityDiv != null) {
                const LtacticalChart = echarts.init(LtacticalDiv);
                const RtacticalChart = echarts.init(RtacticalDiv);
                const contrastChart = echarts.init(contrastDiv);
                const capabilityChart = echarts.init(capabilityDiv);
                LtacticalChart.setOption(tacticalOption.value);
                RtacticalChart.setOption(tacticalOption2.value);
                contrastChart.setOption(contrastOption.value);
                capabilityChart.setOption(capabilityOption.value);
                window.onresize = function () {
                    LtacticalChart.resize();
                    RtacticalChart.resize();
                    contrastChart.resize();
                    capabilityChart.resize();
                };
            }
    });
});
</script>

<style scoped>
.avatar {
    width: 130px;
    height: 130px;
    margin: 5px;
}
</style>
