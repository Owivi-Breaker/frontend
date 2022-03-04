<template>
    <n-card v-if="gameResult">
        <n-space justify="space-around" style="text-align: center">
            <img :src="'http://s1.s100.vip:13127/Public/' + gameResult.teams_info[0].club_name + '.png'" alt="图片"
                 class="avatar"/>
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
            <img :src="'http://s1.s100.vip:13127/Public/' + gameResult.teams_info[1].club_name + '.png'" alt="图片"
                 class="avatar"/>
        </n-space>
    </n-card>
    <n-grid x-gap="10" cols="3" style="text-align: center; margin: 10px auto" v-if="gameResult">
        <n-gi>
            <n-card>
                <p>成功率：{{ gameResult.teams_info[0].score }}/{{ gameResult.teams_info[0].attempts }}</p>
                <p>下底传中：{{ gameResult.teams_info[0].wing_cross_success }}/{{ gameResult.teams_info[0].wing_cross }}</p>
                <p>边路内切：{{ gameResult.teams_info[0].under_cutting_success }}/{{
                        gameResult.teams_info[0].under_cutting
                    }}</p>
                <p>倒三角：{{ gameResult.teams_info[0].pull_back_success }}/{{ gameResult.teams_info[0].pull_back }}</p>
                <p>中路渗透：{{ gameResult.teams_info[0].middle_attack_success }}/{{
                        gameResult.teams_info[0].middle_attack
                    }}</p>
                <p>防守反击：{{ gameResult.teams_info[0].counter_attack_success }}/{{
                        gameResult.teams_info[0].counter_attack
                    }}</p>
            </n-card>
            <div style="margin: 10px auto">
                <endGameTeamData v-bind:playerInfo="gameResult.teams_info[0].players_info"
                                 style="height: 406px"></endGameTeamData>
            </div>
        </n-gi>
        <n-gi>
            <n-card v-if="mvpPlayer">
                <img src="../../public/MVP.png" alt="图片" style="height: 40px; width: 80px"/>
                <div>
                    <Avataaars height="80" width="80" v-bind="mvpPlayer.avatar"/>
                    <p>{{ mvpPlayer.translated_name }}</p>
                    <p>{{ mvpPlayer.club_name }}</p>
                </div>
            </n-card>
            <n-card style="margin: 10px auto">
                <div style="overflow: auto">
                    <n-timeline horizontal size="large">
                        <n-timeline-item v-for="(item, index) in gameResult.goal_record" v-bind:key="index"
                                         :title="item.player_name" :content="item.club_name"/>
                    </n-timeline>
                </div>
            </n-card>
            <n-card>
                <n-scrollbar style="max-height: 280px">
                    <n-timeline>
                        <n-timeline-item
                            v-bind:color="getColor(item.level,'',1,5)"
                            v-for="(item, key) in commentaryList"
                            v-bind:title="item.content"
                            v-bind:key="key"
                            v-bind:time="item.time">
                        </n-timeline-item>
                    </n-timeline>
                </n-scrollbar>
            </n-card>
        </n-gi>
        <n-gi>
            <n-card>
                <p>成功率：{{ gameResult.teams_info[1].score }}/{{ gameResult.teams_info[1].attempts }}</p>
                <p>下底传中：{{ gameResult.teams_info[1].wing_cross_success }}/{{ gameResult.teams_info[1].wing_cross }}</p>
                <p>边路内切：{{ gameResult.teams_info[1].under_cutting_success }}/{{
                        gameResult.teams_info[1].under_cutting
                    }}</p>
                <p>倒三角：{{ gameResult.teams_info[1].pull_back_success }}/{{ gameResult.teams_info[1].pull_back }}</p>
                <p>中路渗透：{{ gameResult.teams_info[1].middle_attack_success }}/{{
                        gameResult.teams_info[1].middle_attack
                    }}</p>
                <p>防守反击：{{ gameResult.teams_info[1].counter_attack_success }}/{{
                        gameResult.teams_info[1].counter_attack
                    }}</p>
            </n-card>
            <div style="margin: 10px auto">
                <endGameTeamData v-bind:playerInfo="gameResult.teams_info[1].players_info"
                                 style="height: 406px"></endGameTeamData>
            </div>
        </n-gi>
    </n-grid>
</template>

<script lang="ts" setup>
import {getGameByIdAPI} from "@/apis/game";
import {computed, ComputedRef, defineComponent, ref, Ref} from "vue";
import {endGameTeamData} from "@/components/GameEnd";
import {getPlayerByIdAPI} from "@/apis/player";
import {getColor} from "@/utils/colorMap";
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import {RouteLocationNormalizedLoaded, useRoute} from "vue-router";

defineComponent({endGameTeamData, Avataaars});
let route: RouteLocationNormalizedLoaded = useRoute();
let gameId: number = Number(route.query.id);
let gameResult: Ref = ref();
let mvpPlayer: Ref = ref();

getGameByIdAPI({game_id: gameId})
    .then((response) => {
        gameResult.value = response;
        getPlayerByIdAPI({player_id: response.mvp})
            .then((response) => {
                mvpPlayer.value = response;
            })
            .catch((_error: {}) => {
            });
    })
    .catch((_error: {}) => {
    });
let commentaryList: ComputedRef = computed(() => {
    let result = new Array<any>();
    if (gameResult.value) {
        let scriptList: Array<string> = gameResult.value["script"].split("\n\n");
        for (let i: number = 0; i < scriptList.length; i++) {
            let subScriptList: Array<string> = scriptList[i].split("\n");
            if (i === scriptList.length - 1) {
                subScriptList.pop();
                continue;
            }
            for (let j: number = 0; j <= subScriptList.length - 1; j++) {
                let item: Array<string> = subScriptList[j].split("@");
                if (item[1].length <= 2) {
                    result.push({
                        content: item[0],
                        time: "",
                        level: item[1],
                    });
                } else {
                    result.push({
                        content: item[0],
                        time: item[1],
                        level: item[2],
                    });
                }
            }
        }
    }
    return result;
});
defineExpose({gameResult, mvpPlayer});
</script>

<style scoped>
.avatar {
    width: 130px;
    height: 130px;
    margin: 5px;
}
</style>
