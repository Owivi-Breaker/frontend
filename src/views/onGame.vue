<template>
    <n-grid cols="10" x-gap="10">
        <n-gi span="3">
            <n-card>
                <n-scrollbar style="max-height: 780px;">
                    <n-timeline>
                        <n-timeline-item
                            v-bind:color="getColor(item.level, '', 1, 5)"
                            v-for="item in commentaryList"
                            v-bind:title="item.content"
                            v-bind:time="item.time"
                        ></n-timeline-item>
                    </n-timeline>
                </n-scrollbar>
            </n-card>
        </n-gi>
        <n-gi span="3">
            <n-grid cols="1" y-gap="10">
                <n-gi>
                    <GameStatus></GameStatus>
                </n-gi>
                <n-gi>
                    <TacticalSelector></TacticalSelector>
                </n-gi>
            </n-grid>
        </n-gi>
        <n-gi span="4">
            <n-grid cols="1" y-gap="10">
                <n-gi v-for="item in teams">
                    <TeamData v-bind:club="item" style="height:403px"></TeamData>
                </n-gi>
                <n-gi></n-gi>
            </n-grid>
        </n-gi>
    </n-grid>
</template>
<script lang="ts" setup>
import { Ref, ref } from "vue";
import GameStatus from "@/components/OnGame/GameStatus.vue";
import TeamData from "@/components/OnGame/TeamData.vue";
import TacticalSelector from "@/components/TacticalSelector.vue";
import { getColor } from "@/utils/colorMap"
let commentaryList: Ref<Array<any>> = ref([
    { "content": "比赛开始！", "time": "00:00", "level": 1 },
    { "content": "切尔西尝试中路渗透", "time": "00:00", "level": 5 },
    { "content": "球员们尝试争顶", "time": "00:00", "level": 2 },
    { "content": "谢内尔迪抢到球权", "time": "00:00", "level": 2 },
    { "content": "谢内尔迪起脚打门！", "time": "00:00", "level": 1 },
    { "content": "球进啦！切尔西 1:0 莱斯特城", "time": "00:00", "level": 2 },
    { "content": "莱斯特城尝试下底传中", "time": "00:00", "level": 1 },
    { "content": "德尔霍夫斯基过掉了奇切利尼", "time": "00:00", "level": 3 },
    { "content": "德尔霍夫斯基一脚起球传中", "time": "00:00", "level": 2 },
    { "content": "切尔西抢到球权", "time": "00:00", "level": 1 },
    { "content": "切尔西尝试防守反击", "time": "00:00", "level": 3 },
    { "content": "莱斯特城持球", "time": "00:00", "level": 5 },
    { "content": "莱斯特城尝试倒三角传球", "time": "00:00", "level": 3 },
    { "content": "伊伦费尔德拿球，尝试过人", "time": "00:00", "level": 3 },
    { "content": "伊伦费尔德尝试内切", "time": "00:00", "level": 1 },
    { "content": "伊伦费尔德过掉了克姆纳", "time": "00:00", "level": 1 },
    { "content": "伊伦费尔德倒三角传中", "time": "00:00", "level": 3 },
    { "content": "瓦纳莱斯蒂起脚打门！", "time": "00:00", "level": 4 },
    { "content": "梅索兹发挥神勇，扑出这脚劲射", "time": "00:00", "level": 1 },
    { "content": "切尔西尝试中路渗透", "time": "00:00", "level": 3 },
    { "content": "球员们尝试争顶", "time": "00:00", "level": 1 },
    { "content": "瓦纳莱斯蒂将球解围", "time": "00:00", "level": 5 },
    { "content": "球员们尝试争顶", "time": "00:00", "level": 3 },
    { "content": "进攻方仍然持球", "time": "00:00", "level": 4 },
    { "content": "切尔西尝试下底传中", "time": "00:00", "level": 2 },
    { "content": "卡尔扎拉诺过掉了兹米亚尼亚茨", "time": "00:00", "level": 1 },
    { "content": "卡尔扎拉诺一脚起球传中", "time": "00:00", "level": 4 },
    { "content": "莱斯特城抢到球权", "time": "00:00", "level": 2 },
    { "content": "莱斯特城尝试中路渗透", "time": "00:00", "level": 1 },
    { "content": "比赛结束！ 切尔西 4:3 莱斯特城", "time": "00:00", "level": 5 },
    { "content": "胜者为切尔西！", "time": "00:00", "level": 2 }
]);
let teams = [
    {
        "id": 1,
        "name": "曼城"
    },
    {
        "id": 2,
        "name": "曼联"
    },
]
</script>