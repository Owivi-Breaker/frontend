<template>
    <div>
        <div :class="{ showDiv: !loadFinished }">
            <div class="flex gap-10 p-10">
                <!-- 瀑布流 -->
                <div class="w-3/5 space-y-10">
                    <!-- 球员介绍卡片 -->
                    <div>
                        <div class="s-card p-10">
                            <div class="flex items-center">
                                <!-- 头像和tag -->
                                <div class="w-1/3">
                                    <div class="flex flex-col gap-5">
                                        <Avataaars
                                            :is-circle="false"
                                            class="w-30 h-30 border-6 border-primary rounded-full"
                                            v-bind="playerData.avatar"
                                        />
                                        <div class="flex flex-wrap gap-3 p-3">
                                            <n-tag
                                                v-for="item in playerData.style_tag"
                                                :type="getTagColor(playerData.style_tag.indexOf(item))"
                                            >{{ item }}</n-tag>
                                        </div>
                                    </div>
                                </div>
                                <!-- 描述 -->
                                <div class="w-2/3">
                                    <div class="flex gap-5 items-center">
                                        <span
                                            class="text-2xl text-primary font-bold mb-6 s-underline"
                                        >{{ playerData.translated_name }}</span>
                                        <div class="p-0">
                                            <n-rate
                                                :value="Math.round(playerData.top_capa / 10) / 2"
                                                allow-half
                                                readonly
                                                size="small"
                                            />
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-3 gap-6">
                                        <div>
                                            <div class="text text-gray-500">国籍</div>
                                            <div>{{ playerData.translated_nationality }}</div>
                                        </div>
                                        <div>
                                            <div class="text text-gray-500">年龄</div>
                                            <div>{{ playerData.age }}</div>
                                        </div>
                                        <div>
                                            <div class="text text-gray-500">号码</div>
                                            <div>{{ playerData.number }}</div>
                                        </div>
                                        <div>
                                            <div class="text text-gray-500">位置</div>
                                            <div>{{ playerData.superior_location.join('、') }}</div>
                                        </div>
                                        <div>
                                            <div class="text text-gray-500">身价</div>
                                            <div>
                                                {{
                                                    playerData.values >= 10000 ? playerData.values / 10000 + '亿' : playerData.values + '万'
                                                }}
                                            </div>
                                        </div>
                                        <div>
                                            <div class="text text-gray-500">周薪</div>
                                            <div>{{ playerData.wages }}万</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- <n-divider title-placement="left">赛季数据</n-divider> -->
                            <div class="relative flex py-5 items-center">
                                <div class="flex-grow border-t border-4 border-primary-active"></div>
                                <span class="text-md flex-shrink mx-4 text-primary">赛季数据</span>
                                <div class="flex-grow border-t border-4 border-primary-active"></div>
                            </div>
                            <n-space justify="space-between">
                                <n-statistic label="出场">{{ gameData.appearance }}</n-statistic>
                                <n-statistic label="进球">{{ gameData.goals }}</n-statistic>
                                <n-statistic label="助攻">{{ gameData.assists }}</n-statistic>
                                <n-statistic label="平均评分">
                                    {{
                                        Math.round(gameData.final_rating * 100) / 100
                                    }}
                                </n-statistic>
                                <n-statistic label="传球成功率">{{ computePassRate }}</n-statistic>
                                <n-statistic label="抢断成功率">{{ computeTackleRate }}</n-statistic>
                                <n-statistic label="过人成功率">{{ computeDribbleRate }}</n-statistic>
                                <n-statistic label="争顶成功率">{{ computeAerialRate }}</n-statistic>
                            </n-space>
                        </div>
                    </div>
                    <!-- 比赛评分折线图 -->
                    <div class>
                        <div class="s-card p-6 3xl:p-10">
                            <div
                                class="text-lg font-semibold text-primary mb-3 s-underline"
                            >{{ '近' + ratings.length + '场比赛评分' }}</div>
                            <div :id="ratingChart" style="width: 100%; height: 300%"></div>
                        </div>
                    </div>
                    <!-- 奖杯陈列室 -->
                    <div class>
                        <div class="s-card p-6">
                            <div class="text-lg font-semibold text-primary mb-3 s-underline">奖杯陈列室</div>
                            <n-list>
                                <n-list-item>
                                    <n-thing title="个人荣誉">
                                        <!-- <div class="bg-primary-active w-full py-0.5 mb-2"></div> -->
                                        2019 金球奖
                                        <br />2018 英超年度最佳球员
                                        <br />2020 西甲最佳射手
                                        <br />2018 英超最佳射手
                                        <br />2017 英超最佳射手
                                        <br />2015 英冠最佳射手
                                        <br />2013 金童奖
                                        <br />
                                    </n-thing>
                                </n-list-item>
                                <n-list-item>
                                    <n-thing title="俱乐部荣誉">
                                        2018 曼彻斯特联 欧冠冠军
                                        <br />2021 巴塞罗那 西甲冠军
                                        <br />2017 曼彻斯特联 英超冠军
                                        <br />2019 巴塞罗那 国王杯冠军
                                        <br />
                                    </n-thing>
                                </n-list-item>
                            </n-list>
                        </div>
                    </div>
                </div>

                <div class="w-2/5 space-y-10">
                    <!-- 能力卡片 -->
                    <div class>
                        <div class="s-card p-10">
                            <div class="s-title mb-3 s-underline">能力</div>
                            <CapaProgress
                                :capa-rating="Math.round(playerData.capa.shooting * 100) / 100"
                                capa-name="射门"
                            ></CapaProgress>
                            <CapaProgress
                                :capa-rating="Math.round(playerData.capa.passing * 100) / 100"
                                capa-name="传球"
                            ></CapaProgress>
                            <CapaProgress
                                :capa-rating="Math.round(playerData.capa.dribbling * 100) / 100"
                                capa-name="过人"
                            ></CapaProgress>
                            <CapaProgress
                                :capa-rating="Math.round(playerData.capa.pace * 100) / 100"
                                capa-name="速度"
                            ></CapaProgress>
                            <CapaProgress
                                :capa-rating="Math.round(playerData.capa.strength * 100) / 100"
                                capa-name="力量"
                            ></CapaProgress>
                            <CapaProgress
                                :capa-rating="Math.round(playerData.capa.interception * 100) / 100"
                                capa-name="拦截"
                            ></CapaProgress>
                            <CapaProgress
                                :capa-rating="Math.round(playerData.capa.anticipation * 100) / 100"
                                capa-name="预判"
                            ></CapaProgress>
                            <CapaProgress
                                :capa-rating="Math.round(playerData.capa.stamina * 100) / 100"
                                capa-name="体力"
                            ></CapaProgress>
                            <CapaProgress
                                :capa-rating="Math.round(playerData.capa.goalkeeping * 100) / 100"
                                capa-name="守门"
                            ></CapaProgress>
                        </div>
                    </div>
                    <!-- 各位置出场数饼图 -->
                    <div>
                        <div class="s-card p-6">
                            <div class="text-lg font-semibold text-primary mb-3 s-underline">各位置出场数</div>
                            <div :id="loNumChart" style="width: 100%; height: 300%"></div>
                        </div>
                    </div>
                </div>

                <!-- <div>
                    <n-card title="球场">
                        <PlayGround></PlayGround>
                    </n-card>
                </div>-->
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, onMounted, Ref, ref } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
import * as echarts from 'echarts';
import CapaProgress from '@/components/CapaProgress.vue';
import PlayGround from '@/components/PlayGround.vue';
import { getPlayerByIdAPI, getPlayerTotalGameDataAPI } from '@/apis/player';
import { getSaveMeAPI } from '@/apis/save';

const loadFinished: Ref<boolean> = ref(false);
const route: RouteLocationNormalizedLoaded = useRoute();
const playerId: number = Number(route.query.id);
// 样例数据
const playerData = ref({
    avatar: {},
    id: 0,
    club_id: 0,
    name: '',
    translated_name: '',
    translated_nationality: '',
    age: 0,
    number: 0,
    height: 0,
    weight: 0,
    birth_date: ' ',
    wages: 0,
    values: 0,
    real_stamina: 0,
    location_num: {},
    capa: {
        shooting: 0,
        passing: 0,
        dribbling: 0,
        interception: 0,
        pace: 0,
        strength: 0,
        aggression: 0,
        anticipation: 0,
        free_kick: 0,
        stamina: 0,
        goalkeeping: 0
    },
    top_capa: 0,
    superior_location: [],
    location_capa: {
        CM: 29.0,
        LM: 26.72,
        RM: 26.72,
        CAM: 25.48,
        CDM: 23.5,
        LW: 22.84,
        RW: 22.84,
        LB: 22.2,
        RB: 22.2,
        ST: 20.38,
        CB: 15.5,
        GK: 13.0
    },
    style_tag: []
});
const gameData = ref({
    appearance: 0,
    action: 0,
    aerial_success: 0,
    aerials: 0,
    assists: 0,
    dribble_success: 0,
    dribbles: 0,
    final_rating: 0,
    goals: 0,
    pass_success: 0,
    passes: 0,
    save_success: 0,
    saves: 0,
    shots: 0,
    tackle_success: 0,
    tackles: 0
});

function getTagColor(index: number): string {
    const type: Array<string> = ['', 'success', 'warning', 'info', 'error'];
    index %= 5;
    return type[index];
}

const computePassRate: ComputedRef<string> = computed(() => {
    return `${gameData.value.passes === 0 ? 0 : Math.round((gameData.value.pass_success / gameData.value.passes) * 100)
        }%`;
});
const computeTackleRate: ComputedRef<string> = computed(() => {
    return `${gameData.value.tackles === 0 ? 0 : Math.round((gameData.value.tackle_success / gameData.value.tackles) * 100)
        }%`;
});
const computeDribbleRate: ComputedRef<string> = computed(() => {
    return `${gameData.value.dribbles === 0 ? 0 : Math.round((gameData.value.dribble_success / gameData.value.dribbles) * 100)
        }%`;
});
const computeAerialRate: ComputedRef<string> = computed(() => {
    return `${gameData.value.aerials === 0 ? 0 : Math.round((gameData.value.aerial_success / gameData.value.aerials) * 100)
        }%`;
});

const getLocationNum = () => {
    // 获取用于饼图的出场位置次数对象
    const loNum = [];
    for (const i of Object.entries(playerData.value.location_num)) {
        if (i[1] != 0) {
            loNum.push({ value: i[1], name: i[0].split('_num')[0] });
        }
    }
    return loNum;
};

// 出场次数饼图设置
const loNumOption = computed(() => {
    return {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['35%', '75%'],
                stillShowZeroSum: false,

                data: getLocationNum(),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
});
const ratings: Ref<Array<Number>> = ref([]);

// 比赛评分折线图设置
const ratingOption = computed(() => {
    return {
        xAxis: {
            type: 'category',
            data: ['5', '4', '3', '2', '1']
        },
        yAxis: {
            type: 'value'
            // data: ["4", "6", "8", "10"]
        },
        tooltip: {
            trigger: 'axis'
        },
        series: [
            {
                data: ratings.value,
                type: 'line',
                markPoint: {
                    data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                    ]
                },
                markLine: {
                    data: [{ type: 'average', name: 'Avg' }]
                }
            }
        ]
    };
});
// What is this??
const totalGameDataOption = computed(() => {
    return {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }
        ]
    };
});

const loNumChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
const ratingChart: Ref<string> = ref(`Chart${Date.now()}${Math.random()}`);
onMounted(() => {
    getSaveMeAPI()
        .then(response => {
            const gameSeason: number = response.season; // TODO 以后写到全局变量里去
            getPlayerTotalGameDataAPI({ player_id: playerId, start_season: gameSeason, end_season: gameSeason })
                .then(response => {
                    gameData.value = response;
                    getPlayerByIdAPI({ player_id: playerId })
                        .then(response => {
                            playerData.value = response;
                            // 初始化图表
                            ratings.value = response.recent_ratings;
                            const number: number = ratings.value.length;
                            ratingOption.value.xAxis.data = [];
                            for (let i: number = number; i > 0; i--) {
                                ratingOption.value.xAxis.data.push(i.toString());
                            }
                            const loNumDiv: HTMLElement | null = document.getElementById(loNumChart.value);
                            const ratingDiv: HTMLElement | null = document.getElementById(ratingChart.value);
                            if (ratingDiv != null && loNumDiv != null) {
                                const ratingChart = echarts.init(ratingDiv);
                                ratingChart.setOption(ratingOption.value);
                                const loNumChart = echarts.init(loNumDiv);
                                loNumChart.setOption(loNumOption.value);
                                window.onresize = function () {
                                    ratingChart.resize();
                                    loNumChart.resize();
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
        .catch((_error: {}) => {
        });
});
</script>
<style scoped>
.showDiv {
    visibility: hidden;
}
</style>
