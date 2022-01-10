<template>
    <n-grid cols="2" x-gap="20" y-gap="20">
        <n-gi>
            <n-card>
                <n-grid cols="3" x-gap="9">
                    <n-gi span="1">
                        <n-space justify="start">
                            <n-rate :default-value="4.5" allow-half readonly size="small" />
                            <Avataaars :isCircle="false" height="80%" width="80%" />
                            <n-space>
                                <n-tag type="success">{{ playerData.style_tag[0] }}</n-tag>
                                <n-tag type="info">{{ playerData.style_tag[1] }}</n-tag>
                                <n-tag type="warning">{{ playerData.style_tag[2] }}</n-tag>
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
                                <n-h4>10</n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="位置" label-style="color: grey;">
                                <n-h4>{{ (location).join(", ") }}</n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="身价" label-style="color: grey;">
                                <n-h4>{{ 9300 }} 万</n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="周薪" label-style="color: grey;">
                                <n-h4>{{ 42.5 }} 万</n-h4>
                            </n-descriptions-item>
                        </n-descriptions>
                    </n-gi>
                </n-grid>
                <template #footer>
                    <n-divider title-placement="left">赛季数据</n-divider>
                    <n-space justify="space-between">
                        <n-statistic label="出场">26</n-statistic>
                        <n-statistic label="进球">13</n-statistic>
                        <n-statistic label="助攻">6</n-statistic>
                        <n-statistic label="平均评分">7.9</n-statistic>
                        <n-statistic label="传球成功率">83%</n-statistic>
                        <n-statistic label="过人成功率">61%</n-statistic>
                        <n-statistic label="争顶成功率">48%</n-statistic>
                    </n-space>
                </template>
            </n-card>
        </n-gi>
        <n-gi>
            <n-card title="能力">
                <CapaProgress :capaRating="playerData.capa.shooting" capaName="射门"></CapaProgress>
                <CapaProgress :capaRating="playerData.capa.passing" capaName="传球"></CapaProgress>
                <CapaProgress :capaRating="playerData.capa.dribbling" capaName="过人"></CapaProgress>
                <CapaProgress :capaRating="playerData.capa.pace" capaName="速度"></CapaProgress>
                <CapaProgress :capaRating="playerData.capa.strength" capaName="力量"></CapaProgress>
                <CapaProgress :capaRating="playerData.capa.interception" capaName="拦截"></CapaProgress>
                <CapaProgress :capaRating="playerData.capa.anticipation" capaName="预判"></CapaProgress>
                <CapaProgress :capaRating="playerData.capa.stamina" capaName="体力"></CapaProgress>
                <CapaProgress :capaRating="playerData.capa.goalkeeping" capaName="守门"></CapaProgress>
            </n-card>
        </n-gi>
        <n-gi>
            <n-card title="近五场比赛评分">
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
import Avataaars from "vuejs-avataaars/src/Avataaars.vue"
import CapaProgress from "@/components/CapaProgress.vue"
import * as echarts from "echarts"
import { onMounted, ref, reactive, computed, Ref } from "vue";
import PlayGround from "@/components/PlayGround.vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { getPlayerByIdAPI, getPlayerGameDataAPI } from "@/apis/player";
import { getSaveMeAPI } from "@/apis/save";
let route: RouteLocationNormalizedLoaded = useRoute();
let playerId: number = (Number)(route.query.id);
// 样例数据
let playerData = ref({
    "id": playerId,
    "club_id": 2,
    "name": "chakra",
    "translated_name": "恰克拉",
    "translated_nationality": "爱沙尼亚",
    "age": 31,
    "height": 178,
    "weight": 80,
    "birth_date": "01-04",
    "wages": 0.0,
    "real_stamina": 100.0,
    "location_num": {},
    "capa": {
        "shooting": 89.2,
        "passing": 72.0,
        "dribbling": 85.0,
        "interception": 43.0,
        "pace": 65.0,
        "strength": 43.0,
        "aggression": 11.0,
        "anticipation": 13.0,
        "free_kick": 72.0,
        "stamina": 67.6,
        "goalkeeping": 9.0
    },
    "top_capa": 89.0,
    "top_location": "ST",
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
})
const ratings = ref([7.7, 6.9, 7.4, 9.4, 8.5])
const location = ref(["ST", "CAM", "LW"])
const totalGameData = reactive({
    "final_rating": 7.475,
    "actions": 98,
    "shots": 15,
    "goals": 12,
    "assists": 0,
    "passes": 0,
    "pass_success": 0,
    "dribbles": 20,
    "dribble_success": 11,
    "tackles": 0,
    "tackle_success": 0,
    "aerials": 63,
    "aerial_success": 38,
    "saves": 0,
    "save_success": 0
})

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
        getPlayerByIdAPI({ player_id: playerId }).then(response => {
            playerData.value = response;
            getSaveMeAPI().then(response => {
                let gameSeason: number = response.season;
                getPlayerGameDataAPI({ player_id: playerId, start_season: gameSeason, end_season: gameSeason }).then(response => {
                    console.log(response);
                })
            })
            let loNumDiv: HTMLElement | null = document.getElementById(loNumChart.value);
            let ratingDiv: HTMLElement | null = document.getElementById(ratingChart.value);
            if (loNumDiv != null && ratingDiv != null) {
                let loNumChart = echarts.init(loNumDiv);
                loNumChart.setOption(loNumOption.value);
                let ratingChart = echarts.init(ratingDiv);
                ratingChart.setOption(ratingOption.value);
                window.onresize = function () {
                    loNumChart.resize();
                    ratingChart.resize();
                };
            }
        })

    })
</script>
<style scoped>
.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>