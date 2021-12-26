<template>
    <n-grid cols="2" x-gap="20">
        <n-gi>
            <n-card>

                <n-grid cols="3" x-gap="9">
                    <n-gi span="1">
                        <n-space>
                            <Avataaars
                                :isCircle="false"
                                height="80%"
                                width="80%"/>
                            <n-space>
                                <n-tag type="success">就地反抢</n-tag>
                                <n-tag type="info">拉边</n-tag>
                                <n-tag type="warning">背身拿球</n-tag>
                            </n-space>
                        </n-space>
                    </n-gi>
                    <n-gi span="2">
                        <n-space justify="start">
                            <n-h2>
                                {{ playerData.translated_name }}
                            </n-h2>
                            <n-rate :default-value="3.5" allow-half readonly size="small"/>
                        </n-space>


                        <n-descriptions :column="3" label-placement="top">
                            <n-descriptions-item label="国籍" label-style="color: grey;">
                                <n-h4>{{ playerData.translated_nationality }}</n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="年龄" label-style="color: grey;">
                                <n-h4>
                                    {{ playerData.age }}
                                </n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="能力" label-style="color: grey;">
                                <n-h4>
                                    {{ playerData.top_capa }}
                                </n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="位置" label-style="color: grey;">
                                <n-h4>
                                    {{ (location).join(", ") }}
                                </n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="身价" label-style="color: grey;">
                                <n-h4>
                                    {{ 4300 }} 万
                                </n-h4>
                            </n-descriptions-item>
                            <n-descriptions-item label="周薪" label-style="color: grey;">
                                <n-h4>
                                    {{ 12.5 }} 万
                                </n-h4>
                            </n-descriptions-item>
                        </n-descriptions>
                    </n-gi>
                </n-grid>

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
            <n-card>
                <div id="myEcharts" style="width: 100%; height: 300%"></div>
            </n-card>

        </n-gi>
    </n-grid>

</template>

<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import CapaProgress from "@/components/CapaProgress.vue"
import * as echarts from 'echarts'
import { onMounted, ref, reactive, computed } from "vue";


const playerData = reactive({
    "id": 48,
    "club_id": 2,
    "name": "chakra",
    "translated_name": "恰克拉",
    "translated_nationality": "爱沙尼亚",
    "age": 15,
    "height": 171,
    "weight": 80,
    "birth_date": "01-04",
    "wages": 0.0,
    "real_stamina": 100.0,
    "location_num": {
        "ST_num": 1,
        "CM_num": 23,
        "LW_num": 6,
        "RW_num": 11,
        "CB_num": 0,
        "LB_num": 0,
        "RB_num": 0,
        "GK_num": 0,
        "CAM_num": 3,
        "LM_num": 0,
        "RM_num": 0,
        "CDM_num": 0
    },
    "capa": {
        "shooting": 19.2,
        "passing": 32.0,
        "dribbling": 19.0,
        "interception": 13.0,
        "pace": 25.0,
        "strength": 23.0,
        "aggression": 11.0,
        "anticipation": 13.0,
        "free_kick": 12.0,
        "stamina": 27.6,
        "goalkeeping": 12.0
    },
    "top_capa": 29.0,
    "top_location": "CM",
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
    }
})

const getLocationNum = () => {
    let loNum = []
    for (let i of Object.entries(playerData.location_num)) {
        if (i[1] != 0) {
            loNum.push({ value: i[1], name: i[0] });
        }

    }
    return loNum
}

const ratings = ref([6.7, 7.9, 6.1, 8.8, 6.2])
const location = ref(["CAM", "CM", "ST"])


// 构建图表
type EChartsOption = echarts.EChartsOption;
const pieOption = computed(() => {
    return {
        title: {
            text: '各位置出场数',
            left: 'center',
            top: 'center'
        },
        tooltip: {
            trigger: 'item'
        },

        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['50%', '90%'],
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
})

onMounted(() => {
    let myChart = echarts.init(document.getElementById("myEcharts"));
    myChart.setOption(pieOption.value);
    window.onresize = function () {
        //自适应大小
        myChart.resize();
    };
})


</script>


<style scoped>
.flex {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>