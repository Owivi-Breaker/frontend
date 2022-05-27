<template>
    <div>
        <div :class="{ showDiv: !loadFinished }" class="p-6 flex gap-6" >
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
                                :src="'http://shu-huai.cn:13182/chfs/shared/Public/' + gameResult.teams_info[0].club_name + '.png'"
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
                                :src="'http://shu-huai.cn:13182/chfs/shared/Public/' + gameResult.teams_info[1].club_name + '.png'"
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
const gameResult: Ref = ref({
    "id": 2,
    "season": 1,
    "name": "英超",
    "type": "league",
    "date": "2020-08-14",
    "script": "比赛开始！@00:00@1\n\n莱斯特城尝试中路渗透@00:37@5\n莱斯特城丢失了球权@00:40@4\n\n诺维奇尝试边路内切@01:15@3\n莱斯科菲拿球，尝试过人@01:17@1\n莱斯科菲尝试内切@01:20@4\n克米阻截了莱斯科菲的进攻@01:22@4\n莱斯科菲过掉了拉特贝格尔@01:24@4\n莱斯科菲起脚打门！@01:27@3\n塔拉诺维奇发挥神勇，扑出这脚劲射@01:28@2\n\n莱斯特城尝试下底传中@02:20@4\n西菲过掉了莱斯科菲@02:24@1\n西菲一脚起球传中@02:25@3\n球员们尝试争顶@02:27@2\n贡纳斯特伦将球解围@02:30@2\n诺维奇拿到球权@02:31@1\n\n诺维奇尝试下底传中@03:02@4\n巴勒舍哲一脚起球传中@03:04@5\n莱斯特城抢到球权@03:06@4\n\n莱斯特城尝试倒三角传球@04:02@1\n胡西奇卡拿球，尝试过人@04:06@1\n胡西奇卡尝试内切@04:08@4\n胡西奇卡过掉了帕帕济安@04:09@3\n胡西奇卡倒三角传中@04:12@5\n奇梅里起脚打门！@04:15@4\n球进啦！诺维奇 0:1 莱斯特城@1\n\n诺维奇尝试下底传中@04:47@5\n莱斯科菲一脚起球传中@04:48@2\n莱斯特城抢到球权@04:49@3\n\n莱斯特城尝试下底传中@05:34@4\n胡西奇卡过掉了巴勒舍哲@05:35@2\n胡西奇卡一脚起球传中@05:39@3\n球员们尝试争顶@05:42@1\n朱马穆拉德将球解围@05:46@4\n进攻方仍然持球@05:50@4\n\n莱斯特城尝试中路渗透@06:24@3\n球员们尝试争顶@06:28@4\n莱韦罗尼将球解围@06:32@1\n进攻方仍然持球@06:33@3\n\n莱斯特城尝试中路渗透@07:14@5\n球员们尝试争顶@07:16@1\n卢科瓦茨抢到球权@07:20@1\n卢科瓦茨起脚打门！@07:24@5\n巴拉托尼发挥神勇，扑出这脚劲射@07:28@5\n\n诺维奇尝试防守反击@08:10@5\n莱韦罗尼策动的长传被拦截@08:14@5\n莱斯特城持球@08:16@4\n\n莱斯特城尝试中路渗透@08:42@3\n球员们尝试争顶@08:44@2\n奇梅里抢到球权@08:48@5\n奇梅里起脚打门！@08:49@5\n球进啦！诺维奇 0:2 莱斯特城@5\n奇梅里梅开二度！@1\n\n诺维奇尝试边路内切@09:20@2\n巴勒舍哲拿球，尝试过人@09:23@3\n巴勒舍哲尝试内切@09:27@5\n克米阻截了巴勒舍哲的进攻@09:28@1\n巴勒舍哲过掉了拉特贝格尔@09:31@1\n巴勒舍哲起脚打门！@09:34@4\n球进啦！诺维奇 1:2 莱斯特城@3\n\n莱斯特城尝试倒三角传球@10:09@4\n西菲拿球，尝试过人@10:10@3\n巴勒舍哲抢到皮球@10:13@1\n\n诺维奇尝试边路内切@11:01@3\n巴勒舍哲拿球，尝试过人@11:04@3\n巴勒舍哲尝试内切@11:05@1\n拉特贝格尔阻截了巴勒舍哲的进攻@11:07@3\n班达奥戈阻截了巴勒舍哲的进攻@11:11@4\n\n莱斯特城尝试中路渗透@12:07@1\n球员们尝试争顶@12:09@5\n莱韦罗尼将球解围@12:12@4\n球员们尝试争顶@12:16@4\n进攻方仍然持球@12:18@5\n\n莱斯特城尝试中路渗透@13:16@2\n球员们尝试争顶@13:17@3\n卢科瓦茨抢到球权@13:19@2\n卢科瓦茨起脚打门！@13:22@1\n巴拉托尼发挥神勇，扑出这脚劲射@13:23@3\n\n诺维奇尝试边路内切@14:20@4\n莱斯科菲拿球，尝试过人@14:23@3\n莱斯科菲尝试内切@14:26@5\n莱斯科菲过掉了克米@14:29@5\n莱斯科菲过掉了莫伊罗夫@14:31@5\n莱斯科菲起脚打门！@14:34@3\n塔拉诺维奇发挥神勇，扑出这脚劲射@14:37@4\n\n莱斯特城尝试边路内切@15:07@4\n西菲拿球，尝试过人@15:09@2\n西菲尝试内切@15:12@1\n莱韦罗尼阻截了西菲的进攻@15:14@5\n朱马穆拉德阻截了西菲的进攻@15:18@2\n\n诺维奇尝试边路内切@15:54@4\n巴勒舍哲拿球，尝试过人@15:58@4\n巴勒舍哲尝试内切@16:01@4\n皮什塔尔阻截了巴勒舍哲的进攻@16:02@5\n班达奥戈阻截了巴勒舍哲的进攻@16:06@4\n\n莱斯特城尝试中路渗透@16:34@1\n球员们尝试争顶@16:38@5\n卢科瓦茨抢到球权@16:40@2\n卢科瓦茨起脚打门！@16:44@3\n球进啦！诺维奇 1:3 莱斯特城@4\n\n诺维奇尝试边路内切@17:21@2\n巴勒舍哲拿球，尝试过人@17:23@4\n巴勒舍哲尝试内切@17:24@4\n莫伊罗夫阻截了巴勒舍哲的进攻@17:28@3\n巴勒舍哲过掉了班达奥戈@17:31@1\n巴勒舍哲起脚打门！@17:34@3\n球进啦！诺维奇 2:3 莱斯特城@3\n巴勒舍哲梅开二度！@2\n\n莱斯特城尝试中路渗透@18:24@1\n球员们尝试争顶@18:27@2\n马努列斯库将球解围@18:29@1\n进攻方仍然持球@18:31@1\n\n莱斯特城尝试倒三角传球@19:33@1\n胡西奇卡拿球，尝试过人@19:36@5\n莱斯科菲抢到皮球@19:40@2\n\n诺维奇尝试中路渗透@20:25@2\n球员们尝试争顶@20:27@3\n克米将球解围@20:29@5\n球员们尝试争顶@20:30@1\n进攻方仍然持球@20:32@2\n\n诺维奇尝试下底传中@21:31@3\n巴勒舍哲一脚起球传中@21:33@2\n莱斯特城抢到球权@21:37@2\n\n莱斯特城尝试防守反击@22:12@2\n克米一脚长传，直击腹地@22:15@4\n朱马穆拉德抢到皮球@22:19@2\n克米策动的长传被拦截@22:23@1\n诺维奇持球@22:24@2\n\n诺维奇尝试边路内切@22:51@2\n莱斯科菲拿球，尝试过人@22:53@4\n莱斯科菲尝试内切@22:57@1\n莱斯科菲过掉了克米@22:59@5\n拉特贝格尔阻截了莱斯科菲的进攻@23:01@2\n\n莱斯特城尝试下底传中@24:00@4\n西菲过掉了莱斯科菲@24:04@4\n西菲一脚起球传中@24:07@5\n诺维奇抢到球权@24:11@3\n\n诺维奇尝试中路渗透@24:59@2\n球员们尝试争顶@25:03@1\n温佐抢到球权@25:06@2\n温佐起脚打门！@25:09@4\n塔拉诺维奇发挥神勇，扑出这脚劲射@25:12@3\n\n莱斯特城尝试中路渗透@26:13@3\n球员们尝试争顶@26:15@4\n朱马穆拉德将球解围@26:17@1\n进攻方仍然持球@26:18@3\n\n莱斯特城尝试中路渗透@26:45@1\n球员们尝试争顶@26:46@4\n奇梅里抢到球权@26:49@4\n奇梅里起脚打门！@26:52@2\n球进啦！诺维奇 2:4 莱斯特城@5\n奇梅里帽子戏法！@3\n\n诺维奇尝试下底传中@27:40@4\n莱斯科菲一脚起球传中@27:41@3\n球员们尝试争顶@27:43@1\n莫伊罗夫将球解围@27:46@3\n进攻方仍然持球@27:50@1\n\n诺维奇尝试边路内切@28:10@3\n巴勒舍哲拿球，尝试过人@28:14@3\n巴勒舍哲尝试内切@28:18@1\n巴勒舍哲过掉了克米@28:20@4\n巴勒舍哲过掉了班达奥戈@28:24@4\n巴勒舍哲起脚打门！@28:27@3\n塔拉诺维奇发挥神勇，扑出这脚劲射@28:30@4\n\n莱斯特城尝试倒三角传球@29:37@3\n胡西奇卡拿球，尝试过人@29:41@4\n莱斯科菲抢到皮球@29:45@3\n\n诺维奇尝试防守反击@30:24@1\n巴拉托尼策动的长传被拦截@30:27@5\n莱斯特城持球@30:29@5\n\n莱斯特城尝试防守反击@31:25@4\n克米一脚长传，直击腹地@31:26@2\n贡纳斯特伦抢到皮球@31:28@3\n克米策动的长传被拦截@31:30@1\n诺维奇持球@31:34@4\n\n诺维奇尝试边路内切@32:33@4\n巴勒舍哲拿球，尝试过人@32:34@5\n巴勒舍哲尝试内切@32:35@5\n克米阻截了巴勒舍哲的进攻@32:37@5\n拉特贝格尔阻截了巴勒舍哲的进攻@32:38@4\n\n莱斯特城尝试中路渗透@33:33@3\n球员们尝试争顶@33:36@4\n奇梅里抢到球权@33:37@3\n奇梅里起脚打门！@33:41@5\n球进啦！诺维奇 2:5 莱斯特城@4\n奇梅里大四喜！@5\n\n诺维奇尝试下底传中@34:10@2\n莱斯科菲一脚起球传中@34:12@5\n莱斯特城抢到球权@34:13@4\n\n莱斯特城尝试中路渗透@35:13@3\n球员们尝试争顶@35:15@2\n帕帕济安将球解围@35:17@1\n进攻方仍然持球@35:20@1\n\n莱斯特城尝试中路渗透@36:17@4\n球员们尝试争顶@36:18@3\n朱马穆拉德将球解围@36:21@3\n球员们尝试争顶@36:24@5\n达尔比西抢到球权@36:28@4\n\n诺维奇尝试防守反击@37:10@2\n巴拉托尼一脚长传，直击腹地@37:12@4\n拉特贝格尔抢到皮球@37:14@2\n巴拉托尼策动的长传被拦截@37:16@3\n莱斯特城持球@37:17@2\n\n莱斯特城尝试防守反击@37:42@5\n莫伊罗夫一脚长传，直击腹地@37:43@4\n贡纳斯特伦抢到皮球@37:46@3\n莫伊罗夫策动的长传被拦截@37:49@3\n诺维奇持球@37:52@4\n\n诺维奇尝试下底传中@38:52@5\n莱斯科菲一脚起球传中@38:55@5\n球员们尝试争顶@38:58@2\n皮什塔尔将球解围@39:01@2\n进攻方仍然持球@39:02@3\n\n诺维奇尝试中路渗透@40:11@5\n球员们尝试争顶@40:13@1\n莫伊罗夫将球解围@40:17@2\n进攻方仍然持球@40:18@2\n\n诺维奇尝试中路渗透@41:20@3\n球员们尝试争顶@41:22@2\n克米将球解围@41:25@2\n进攻方仍然持球@41:27@2\n\n诺维奇尝试下底传中@42:04@5\n巴勒舍哲一脚起球传中@42:06@4\n莱斯特城抢到球权@42:07@5\n\n莱斯特城尝试边路内切@42:53@4\n西菲拿球，尝试过人@42:55@2\n西菲过掉了巴勒舍哲@42:58@1\n西菲尝试内切@42:60@5\n帕帕济安阻截了西菲的进攻@43:02@4\n西菲过掉了莱韦罗尼@43:04@1\n西菲起脚打门！@43:07@2\n球进啦！诺维奇 2:6 莱斯特城@5\n\n诺维奇尝试边路内切@44:04@3\n莱斯科菲拿球，尝试过人@44:05@2\n莱斯科菲尝试内切@44:08@3\n拉特贝格尔阻截了莱斯科菲的进攻@44:12@2\n班达奥戈阻截了莱斯科菲的进攻@44:13@4\n\n莱斯特城尝试边路内切@44:51@2\n西菲拿球，尝试过人@44:55@3\n西菲过掉了巴勒舍哲@44:59@4\n西菲尝试内切@45:02@4\n莱韦罗尼阻截了西菲的进攻@45:06@2\n西菲过掉了马努列斯库@45:08@5\n西菲起脚打门！@45:11@1\n球进啦！诺维奇 2:7 莱斯特城@3\n西菲梅开二度！@4\n比赛结束！ 诺维奇 2:7 莱斯特城@90:00@1\n胜者为莱斯特城！@90:00@4\n",
    "mvp": 186,
    "winner_id": 8,
    "goal_record": [
        {
            "player_id": 169,
            "player_name": "奇梅里",
            "turns": 4,
            "club_id": 8,
            "club_name": "莱斯特城"
        },
        {
            "player_id": 169,
            "player_name": "奇梅里",
            "turns": 10,
            "club_id": 8,
            "club_name": "莱斯特城"
        },
        {
            "player_id": 461,
            "player_name": "巴勒舍哲",
            "turns": 11,
            "club_id": 20,
            "club_name": "诺维奇"
        },
        {
            "player_id": 170,
            "player_name": "卢科瓦茨",
            "turns": 19,
            "club_id": 8,
            "club_name": "莱斯特城"
        },
        {
            "player_id": 461,
            "player_name": "巴勒舍哲",
            "turns": 20,
            "club_id": 20,
            "club_name": "诺维奇"
        },
        {
            "player_id": 169,
            "player_name": "奇梅里",
            "turns": 30,
            "club_id": 8,
            "club_name": "莱斯特城"
        },
        {
            "player_id": 169,
            "player_name": "奇梅里",
            "turns": 37,
            "club_id": 8,
            "club_name": "莱斯特城"
        },
        {
            "player_id": 186,
            "player_name": "西菲",
            "turns": 47,
            "club_id": 8,
            "club_name": "莱斯特城"
        },
        {
            "player_id": 186,
            "player_name": "西菲",
            "turns": 49,
            "club_id": 8,
            "club_name": "莱斯特城"
        }
    ],
    "teams_info": [
        {
            "club_id": 20,
            "club_name": "诺维奇",
            "score": 2,
            "players_info": [
                {
                    "player_id": 464,
                    "player_name": "达尔比西",
                    "location": "CAM",
                    "final_rating": 5.8,
                    "actions": 21,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 8,
                    "pass_success": 8,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 3,
                    "aerial_success": 2,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 94,
                    "name": "达尔比西"
                },
                {
                    "player_id": 458,
                    "player_name": "温佐",
                    "location": "ST",
                    "final_rating": 5.8,
                    "actions": 28,
                    "shots": 1,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 2,
                    "dribble_success": 1,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 15,
                    "aerial_success": 9,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 82,
                    "name": "温佐"
                },
                {
                    "player_id": 468,
                    "player_name": "巴拉托尼",
                    "location": "GK",
                    "final_rating": 6.8,
                    "actions": 14,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 2,
                    "pass_success": 1,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 9,
                    "save_success": 2,
                    "original_stamina": 100,
                    "final_stamina": 89,
                    "name": "巴拉托尼"
                },
                {
                    "player_id": 470,
                    "player_name": "莱斯科菲",
                    "location": "LB",
                    "final_rating": 5.8,
                    "actions": 26,
                    "shots": 2,
                    "goals": 0,
                    "assists": 0,
                    "passes": 4,
                    "pass_success": 2,
                    "dribbles": 8,
                    "dribble_success": 4,
                    "tackles": 4,
                    "tackle_success": 2,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 83,
                    "name": "莱斯科菲"
                },
                {
                    "player_id": 466,
                    "player_name": "帕帕济安",
                    "location": "CDM",
                    "final_rating": 4.7,
                    "actions": 43,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 18,
                    "pass_success": 11,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 3,
                    "tackle_success": 2,
                    "aerials": 7,
                    "aerial_success": 2,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 70,
                    "name": "帕帕济安"
                },
                {
                    "player_id": 461,
                    "player_name": "巴勒舍哲",
                    "location": "RB",
                    "final_rating": 7.5,
                    "actions": 29,
                    "shots": 3,
                    "goals": 2,
                    "assists": 0,
                    "passes": 3,
                    "pass_success": 0,
                    "dribbles": 12,
                    "dribble_success": 4,
                    "tackles": 4,
                    "tackle_success": 1,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 74,
                    "name": "巴勒舍哲"
                },
                {
                    "player_id": 460,
                    "player_name": "莱韦罗尼",
                    "location": "CB",
                    "final_rating": 5.3,
                    "actions": 32,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 3,
                    "pass_success": 1,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 5,
                    "tackle_success": 4,
                    "aerials": 15,
                    "aerial_success": 4,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 81,
                    "name": "莱韦罗尼"
                },
                {
                    "player_id": 469,
                    "player_name": "朱马穆拉德",
                    "location": "CB",
                    "final_rating": 6.3,
                    "actions": 40,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 3,
                    "pass_success": 1,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 3,
                    "tackle_success": 3,
                    "aerials": 19,
                    "aerial_success": 11,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 77,
                    "name": "朱马穆拉德"
                },
                {
                    "player_id": 457,
                    "player_name": "夸恩特里",
                    "location": "ST",
                    "final_rating": 3.8,
                    "actions": 14,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 1,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 10,
                    "aerial_success": 3,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 90,
                    "name": "夸恩特里"
                },
                {
                    "player_id": 459,
                    "player_name": "马努列斯库",
                    "location": "CDM",
                    "final_rating": 5.7,
                    "actions": 33,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 15,
                    "pass_success": 9,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 1,
                    "tackle_success": 0,
                    "aerials": 5,
                    "aerial_success": 3,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 90,
                    "name": "马努列斯库"
                },
                {
                    "player_id": 465,
                    "player_name": "贡纳斯特伦",
                    "location": "CDM",
                    "final_rating": 5.4,
                    "actions": 42,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 17,
                    "pass_success": 13,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 2,
                    "tackle_success": 2,
                    "aerials": 6,
                    "aerial_success": 2,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 70,
                    "name": "贡纳斯特伦"
                }
            ],
            "attempts": 24,
            "wing_cross": 7,
            "wing_cross_success": 0,
            "under_cutting": 10,
            "under_cutting_success": 2,
            "pull_back": 0,
            "pull_back_success": 0,
            "middle_attack": 4,
            "middle_attack_success": 0,
            "counter_attack": 3,
            "counter_attack_success": 0
        },
        {
            "club_id": 8,
            "club_name": "莱斯特城",
            "score": 7,
            "players_info": [
                {
                    "player_id": 184,
                    "player_name": "博伊特",
                    "location": "CM",
                    "final_rating": 8.4,
                    "actions": 72,
                    "shots": 0,
                    "goals": 0,
                    "assists": 1,
                    "passes": 40,
                    "pass_success": 29,
                    "dribbles": 1,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 1,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 80,
                    "name": "博伊特"
                },
                {
                    "player_id": 179,
                    "player_name": "皮什塔尔",
                    "location": "CDM",
                    "final_rating": 6.8,
                    "actions": 47,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 21,
                    "pass_success": 17,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 3,
                    "tackle_success": 2,
                    "aerials": 3,
                    "aerial_success": 1,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 77,
                    "name": "皮什塔尔"
                },
                {
                    "player_id": 186,
                    "player_name": "西菲",
                    "location": "LM",
                    "final_rating": 10,
                    "actions": 91,
                    "shots": 2,
                    "goals": 2,
                    "assists": 2,
                    "passes": 41,
                    "pass_success": 27,
                    "dribbles": 11,
                    "dribble_success": 6,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 70,
                    "name": "西菲"
                },
                {
                    "player_id": 176,
                    "player_name": "胡西奇卡",
                    "location": "RM",
                    "final_rating": 8.7,
                    "actions": 55,
                    "shots": 0,
                    "goals": 0,
                    "assists": 2,
                    "passes": 26,
                    "pass_success": 21,
                    "dribbles": 4,
                    "dribble_success": 2,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 84,
                    "name": "胡西奇卡"
                },
                {
                    "player_id": 173,
                    "player_name": "克米",
                    "location": "CB",
                    "final_rating": 5.7,
                    "actions": 34,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 4,
                    "pass_success": 3,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 6,
                    "tackle_success": 3,
                    "aerials": 11,
                    "aerial_success": 7,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 70,
                    "name": "克米"
                },
                {
                    "player_id": 172,
                    "player_name": "拉特贝格尔",
                    "location": "CB",
                    "final_rating": 4.9,
                    "actions": 22,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 7,
                    "tackle_success": 5,
                    "aerials": 7,
                    "aerial_success": 3,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 85,
                    "name": "拉特贝格尔"
                },
                {
                    "player_id": 182,
                    "player_name": "莫伊罗夫",
                    "location": "CB",
                    "final_rating": 5.2,
                    "actions": 16,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 3,
                    "pass_success": 1,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 2,
                    "tackle_success": 1,
                    "aerials": 6,
                    "aerial_success": 3,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 82,
                    "name": "莫伊罗夫"
                },
                {
                    "player_id": 170,
                    "player_name": "卢科瓦茨",
                    "location": "ST",
                    "final_rating": 8.1,
                    "actions": 47,
                    "shots": 3,
                    "goals": 1,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 3,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 25,
                    "aerial_success": 15,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 72,
                    "name": "卢科瓦茨"
                },
                {
                    "player_id": 181,
                    "player_name": "班达奥戈",
                    "location": "CDM",
                    "final_rating": 7.6,
                    "actions": 93,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 48,
                    "pass_success": 36,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 5,
                    "tackle_success": 3,
                    "aerials": 1,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 67,
                    "name": "班达奥戈"
                },
                {
                    "player_id": 169,
                    "player_name": "奇梅里",
                    "location": "ST",
                    "final_rating": 10,
                    "actions": 52,
                    "shots": 4,
                    "goals": 4,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 3,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 26,
                    "aerial_success": 15,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 62,
                    "name": "奇梅里"
                },
                {
                    "player_id": 175,
                    "player_name": "塔拉诺维奇",
                    "location": "GK",
                    "final_rating": 7.6,
                    "actions": 10,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 6,
                    "save_success": 4,
                    "original_stamina": 100,
                    "final_stamina": 92,
                    "name": "塔拉诺维奇"
                }
            ],
            "attempts": 26,
            "wing_cross": 3,
            "wing_cross_success": 0,
            "under_cutting": 3,
            "under_cutting_success": 2,
            "pull_back": 4,
            "pull_back_success": 1,
            "middle_attack": 13,
            "middle_attack_success": 4,
            "counter_attack": 3,
            "counter_attack_success": 0
        }
    ]
});


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

.showDiv {
    visibility: hidden;
}
</style>
