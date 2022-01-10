<template>
    <n-grid cols="2" x-gap="20" y-gap="20">
        <n-gi>
            <n-card>
                <n-grid cols="3" x-gap="9">
                    <n-gi span="1">
                        <n-space justify="start">
                            <n-rate :value="Math.round(playerData.top_capa / 10) / 2" allow-half readonly size="small" />
                            <Avataaars :isCircle="false" height="80%" width="80%" />
                            <n-space>
                                <n-tag v-bind:type="getTagColor(playerData.style_tag.indexOf(item))" v-for="item in playerData.style_tag">{{ item }}</n-tag>
                            </n-space>
                        </n-space>
                    </n-gi>
                    <n-gi span="2">
                        <n-h2>{{ playerData.translated_name }}</n-h2>
                        <n-descriptions :column="3" label-placement="top">
                            <n-descriptions-item label="国籍" label-style="color: grey;">
                                <n-h4>{{ playerData.translated_nationality }}</n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="年龄" label-style="color: grey;">
                                <n-h4>{{ playerData.age }}</n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="号码" label-style="color: grey;">
                                <n-h4>{{ playerData.number }}</n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="位置" label-style="color: grey;">
                                <n-h4>{{ playerData.top_location }}</n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="身价" label-style="color: grey;">
                                <n-h4>{{ playerData.values }}万</n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="周薪" label-style="color: grey;">
                                <n-h4>{{ playerData.wages }}万</n-h4>
                            </n-descriptions-item>
                        </n-descriptions>
                    </n-gi>
                </n-grid>
                <template #footer>
                    <n-divider title-placement="left">赛季数据</n-divider>
                    <n-space justify="space-between">
                        <n-statistic label="出场">26</n-statistic>
                        <n-statistic label="进球">{{ gameData.goals }}</n-statistic>
                        <n-statistic label="助攻">{{ gameData.assists }}</n-statistic>
                        <n-statistic label="平均评分">{{ Math.round(gameData.final_rating * 100) / 100 }}</n-statistic>
                        <n-statistic label="传球成功率">{{ computePassRate }}</n-statistic>
                        <n-statistic label="抢断成功率">{{ computeTackleRate }}</n-statistic>
                        <n-statistic label="过人成功率">{{ computeDribbleRate }}</n-statistic>
                        <n-statistic label="争顶成功率">{{ computeAerialRate }}</n-statistic>
                    </n-space>
                </template>
            </n-card>
        </n-gi>
        <n-gi>
            <n-card title="能力">
                <CapaProgress :capaRating="Math.round(playerData.capa.shooting * 100) / 100" capaName="射门"></CapaProgress>
                <CapaProgress :capaRating="Math.round(playerData.capa.passing * 100) / 100" capaName="传球"></CapaProgress>
                <CapaProgress :capaRating="Math.round(playerData.capa.dribbling * 100) / 100" capaName="过人"></CapaProgress>
                <CapaProgress :capaRating="Math.round(playerData.capa.pace * 100) / 100" capaName="速度"></CapaProgress>
                <CapaProgress :capaRating="Math.round(playerData.capa.strength * 100) / 100" capaName="力量"></CapaProgress>
                <CapaProgress :capaRating="Math.round(playerData.capa.interception * 100) / 100" capaName="拦截"></CapaProgress>
                <CapaProgress :capaRating="Math.round(playerData.capa.anticipation * 100) / 100" capaName="预判"></CapaProgress>
                <CapaProgress :capaRating="Math.round(playerData.capa.stamina * 100) / 100" capaName="体力"></CapaProgress>
                <CapaProgress :capaRating="Math.round(playerData.capa.goalkeeping * 100) / 100" capaName="守门"></CapaProgress>
            </n-card>
        </n-gi>
        <n-gi>
            <n-card v-bind:title="'近' + ratings.length + '场比赛评分'">
                <div :id="ratingChart" style="width: 100%; height: 300%"></div>
            </n-card>
        </n-gi>
        <n-gi>
            <n-card title="各位置出场数">
                <div :id="loNumChart" style="width: 100%; height: 300%"></div>
            </n-card>
        </n-gi>

        <n-gi>
            <n-card title="奖杯陈列室">
                <n-list>
                    <n-list-item>
                        <n-thing title="个人荣誉">
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
            </n-card>
        </n-gi>
        <n-gi>
            <n-card title="球场">
                <PlayGround></PlayGround>
            </n-card>
        </n-gi>
    </n-grid>
</template>
<script lang="ts" setup>
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import CapaProgress from "@/components/CapaProgress.vue";
import * as echarts from "echarts";
import { onMounted, ref, computed, Ref, ComputedRef } from "vue";
import PlayGround from "@/components/PlayGround.vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { getPlayerByIdAPI, getPlayerTotalGameDataAPI } from "@/apis/player";
import { getSaveMeAPI } from "@/apis/save";
let route: RouteLocationNormalizedLoaded = useRoute();
let playerId: number = (Number)(route.query.id);
// 样例数据
let playerData = ref({
    "id": 0,
    "club_id": 0,
    "name": "",
    "translated_name": "",
    "translated_nationality": "",
    "age": 0,
    "number": 0,
    "height": 0,
    "weight": 0,
    "birth_date": " ",
    "wages": 0,
    "values": 0,
    "real_stamina": 0,
    "location_num": {},
    "capa": {
        "shooting": 0,
        "passing": 0,
        "dribbling": 0,
        "interception": 0,
        "pace": 0,
        "strength": 0,
        "aggression": 0,
        "anticipation": 0,
        "free_kick": 0,
        "stamina": 0,
        "goalkeeping": 0
    },
    "top_capa": 0,
    "top_location": "",
    "location_capa": {
        "CM": 29.0,
        "LM": 26.72,
        "RM": 26.72,
        "CAM": 25.48,
        "CDM": 23.5,
        "LW": 22.84,
        "RW": 22.84,
        "LB": 22.2,
        "RB": 22.2,
        "ST": 20.38,
        "CB": 15.5,
        "GK": 13.0
    },
    "style_tag": []
});
let gameData = ref({
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
    let type: Array<string> = ["", "success", "warning", "info", "error"];
    index %= 5;
    return type[index];
}
let computePassRate: ComputedRef<string> = computed(() => {
    return (gameData.value.passes === 0 ? 0 : Math.round(gameData.value.pass_success / gameData.value.passes * 100)) + "%";
});
let computeTackleRate: ComputedRef<string> = computed(() => {
    return (gameData.value.tackles === 0 ? 0 : Math.round(gameData.value.tackle_success / gameData.value.tackles * 100)) + "%";
});
let computeDribbleRate: ComputedRef<string> = computed(() => {
    return (gameData.value.dribbles === 0 ? 0 : Math.round(gameData.value.dribble_success / gameData.value.dribbles * 100)) + "%";
});
let computeAerialRate: ComputedRef<string> = computed(() => {
    return (gameData.value.aerials === 0 ? 0 : Math.round(gameData.value.aerial_success / gameData.value.aerials * 100)) + "%";
});
const getLocationNum = () => {
    // 获取用于饼图的出场位置次数对象
    let loNum = []
    for (let i of Object.entries(playerData.value.location_num)) {
        if (i[1] != 0) {
            loNum.push({ value: i[1], name: i[0].split("_num")[0] });
        }

    }
    return loNum
}


// 出场次数饼图设置
const loNumOption = computed(() => {
    return {
        tooltip: {
            trigger: "item"
        },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: ["35%", "75%"],
                stillShowZeroSum: false,

                data: getLocationNum(),
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            }
        ]
    };
})
let ratings: Ref<Array<Number>> = ref([])

// 比赛评分折线图设置
const ratingOption = computed(() => {
    return {
        xAxis: {
            type: "category",
            data: ["5", "4", "3", "2", "1"]
        },
        yAxis: {
            type: "value"
            //data: ["4", "6", "8", "10"]
        },
        tooltip: {
            trigger: "axis"
        },
        series: [
            {
                data: ratings.value,
                type: "line",
                markPoint: {
                    data: [
                        { type: "max", name: "Max" },
                        { type: "min", name: "Min" }
                    ]
                },
                markLine: {
                    data: [{ type: "average", name: "Avg" }]
                }
            }
        ]
    };
})

const totalGameDataOption = computed(() => {
    return {
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: "bar"
            }
        ]
    };
})
let loNumChart: Ref<string> = ref("Chart" + Date.now() + Math.random());
let ratingChart: Ref<string> = ref("Chart" + Date.now() + Math.random());
onMounted
    (() => {
        getSaveMeAPI().then(response => {
            let gameSeason: number = response.season;
            getPlayerTotalGameDataAPI({ player_id: playerId, start_season: gameSeason, end_season: gameSeason }).then(response => {
                gameData.value = response;
                getPlayerByIdAPI({ player_id: playerId }).then(response => {
                    playerData.value = response;
                    ratings.value = response.recent_ratings;
                    let number: number = ratings.value.length;
                    ratingOption.value.xAxis.data = [];
                    for (let i: number = number; i > 0; i--) {
                        ratingOption.value.xAxis.data.push(i.toString());
                    }
                    let loNumDiv: HTMLElement | null = document.getElementById(loNumChart.value);
                    let ratingDiv: HTMLElement | null = document.getElementById(ratingChart.value);
                    if (ratingDiv != null && loNumDiv != null) {
                        let ratingChart = echarts.init(ratingDiv);
                        ratingChart.setOption(ratingOption.value);
                        let loNumChart = echarts.init(loNumDiv);
                        loNumChart.setOption(loNumOption.value);
                        window.onresize = function () {
                            ratingChart.resize();
                            loNumChart.resize();
                        };
                    }
                }).catch((_error: {}) => { });
            }).catch((_error: {}) => { });
        }).catch((_error: {}) => { });
    })
</script>
<style scoped>
.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>