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
            <div style="margin: 10px auto">
                <endGameTeamData v-bind:playerInfo="gameResult.teams_info[0].players_info" style="height: 406px"></endGameTeamData>
            </div>
        </n-gi>
        <n-gi>
            <n-card v-if="mvpPlayer">
                <img src="../../public/MVP.png" alt="图片" style="height: 40px; width: 80px" />
                <div>
                    <Avataaars height="80" width="80" v-bind="mvpPlayer.avatar" />
                    <p>{{ mvpPlayer.translated_name }}</p>
                    <p>{{ mvpPlayer.club_name }}</p>
                </div>
            </n-card>
            <n-card style="margin: 10px auto">
                <div style="overflow: auto">
                    <n-timeline horizontal size="large">
                        <n-timeline-item v-for="(item, index) in gameResult.goal_record" v-bind:key="index" :title="item.player_name" :content="item.club_name" />
                    </n-timeline>
                </div>
            </n-card>
            <n-card>
                <n-scrollbar style="max-height: 280px">
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
            <div style="margin: 10px auto">
                <endGameTeamData v-bind:playerInfo="gameResult.teams_info[1].players_info" style="height: 406px"></endGameTeamData>
            </div>
        </n-gi>
    </n-grid>
</template>

<script lang="ts" setup>
import { getGameByIdAPI } from "@/apis/game";
import { defineComponent, ref, Ref } from "vue";
import { endGameTeamData } from "@/components/GameEnd";
import { getPlayerByIdAPI } from "@/apis/player";
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
defineComponent({ endGameTeamData, Avataaars });
let route: RouteLocationNormalizedLoaded = useRoute();
let gameId: number = Number(route.query.id);
let gameResult: Ref = ref();
let mvpPlayer: Ref = ref();

getGameByIdAPI({ game_id: gameId })
    .then((response) => {
        gameResult.value = response;
        getPlayerByIdAPI({ player_id: response.mvp })
            .then((response) => {
                mvpPlayer.value = response;
            })
            .catch((_error: {}) => {});
    })
    .catch((_error: {}) => {});
defineExpose({ gameResult, mvpPlayer });
</script>

<style scoped>
.avatar {
    width: 130px;
    height: 130px;
    margin: 5px;
}
</style>
