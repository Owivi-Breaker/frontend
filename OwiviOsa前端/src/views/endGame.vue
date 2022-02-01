<template>
    <n-card v-if="gameResult">
        <n-space justify="space-around" style="text-align: center">
            <img :src="'http://s1.s100.vip:13127/Public/' + gameResult.teams_info[0].club_name + '.png'" alt="图片" class="avatar" />
            <div>
                <n-space justify="space-around">
                    <h1 style="width: 200px">{{ gameResult.teams_info[0].club_name }}</h1>
                    <h1>{{ gameResult.teams_info[0].score }}</h1>
                    <h1>:</h1>
                    <h1>{{ gameResult.teams_info[1].score }}</h1>
                    <h1 style="width: 200px">{{ gameResult.teams_info[1].club_name }}</h1>
                </n-space>
                <p>{{ gameResult.name }} 第 {{ gameResult.season }} 赛季</p>
                <p>{{ gameResult.date }}</p>
                <p>MVP：{{ gameResult.mvp }}</p>
                <p>控球率：{{ gameResult.teams_info[0].attempts }}/{{ gameResult.teams_info[1].attempts }}</p>
            </div>
            <img :src="'http://s1.s100.vip:13127/Public/' + gameResult.teams_info[1].club_name + '.png'" alt="图片" class="avatar" />
        </n-space>
    </n-card>
    <n-grid x-gap="10" cols="3" style="text-align: center; margin: 10px auto" v-if="gameResult">
        <n-gi>
            <n-card>
                <p>成功率：{{ gameResult.teams_info[0].score }}/{{ gameResult.teams_info[0].attempts }}</p>
                <p>下底传中：{{ gameResult.teams_info[0].wing_cross_success }}/{{ gameResult.teams_info[0].wing_cross }}</p>
                <p>边路内切：{{ gameResult.teams_info[0].under_cutting_success }}/{{ gameResult.teams_info[0].under_cutting }}</p>
                <p>倒三角：{{ gameResult.teams_info[0].pull_back_success }}/{{ gameResult.teams_info[0].pull_back }}</p>
                <p>中路渗透：{{ gameResult.teams_info[0].middle_attack_success }}/{{ gameResult.teams_info[0].middle_attack }}</p>
                <p>防守反击：{{ gameResult.teams_info[0].counter_attack_success }}/{{ gameResult.teams_info[0].counter_attack }}</p>
            </n-card>
            <n-card style="margin: 20px auto">
                <n-tab-pane name="playersInfo" tab="表现">
                    <n-data-table :columns="columns" :data="perfData" striped />
                </n-tab-pane>
            </n-card>
        </n-gi>
        <n-gi>
            <n-card>
                <n-scrollbar style="max-height: 400px">
                    <n-timeline>
                        <n-timeline-item v-for="(item, key) in gameResult.script.split('\n')" v-bind:key="key" type="success" :content="item" />
                    </n-timeline>
                </n-scrollbar>
            </n-card>
        </n-gi>
        <n-gi>
            <n-card>
                <p>成功率：{{ gameResult.teams_info[1].score }}/{{ gameResult.teams_info[1].attempts }}</p>
                <p>下底传中：{{ gameResult.teams_info[1].wing_cross_success }}/{{ gameResult.teams_info[1].wing_cross }}</p>
                <p>边路内切：{{ gameResult.teams_info[1].under_cutting_success }}/{{ gameResult.teams_info[1].under_cutting }}</p>
                <p>倒三角：{{ gameResult.teams_info[1].pull_back_success }}/{{ gameResult.teams_info[1].pull_back }}</p>
                <p>中路渗透：{{ gameResult.teams_info[1].middle_attack_success }}/{{ gameResult.teams_info[1].middle_attack }}</p>
                <p>防守反击：{{ gameResult.teams_info[1].counter_attack_success }}/{{ gameResult.teams_info[1].counter_attack }}</p>
            </n-card>
            <n-card style="margin: 20px auto">

            </n-card>
        </n-gi>
    </n-grid>
</template>

<script lang="ts" setup>
import { getGameByIdAPI } from "@/apis/game";
import { ref, Ref } from "vue";

let gameResult: Ref = ref();

getGameByIdAPI({ game_id: 4000 })
    .then((response) => {
        gameResult.value = response;
    })
    .catch((_error: {}) => {});
</script>

<style scoped>
.avatar {
    width: 130px;
    height: 130px;
    margin: 5px;
}
</style>
