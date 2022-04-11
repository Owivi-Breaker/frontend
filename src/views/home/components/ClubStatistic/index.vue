<template>
    <div class="s-card rounded-lg shadow-md bg-white p-5 w-3/5">
        <div class="text-lg font-semibold text-primary mb-3">统计</div>
        <n-spin v-if="isLoading!==0" class="p-30 flex iteams-center"></n-spin>
        <div v-if="isLoading===0" class="flex flex-col">
            <!-- 球员 -->
            <div class="font-semibold mt-4">球员</div>
            <div class="bg-primary-active w-full py-0.5 mb-2"></div>
            <div class="flex justify-between">
                <div class>平均年龄</div>
                <div class>{{ Math.round(playerStatistics.平均年龄 * 100) / 100 }}岁</div>
            </div>
            <div class="flex justify-between">
                <div class>最高工资</div>
                <div>
                    <span class>{{ playerStatistics.最高工资球员 }}</span>
                    <span>-</span>
                    <span class>€{{ Math.round(playerStatistics.最高工资 * 100) / 100 }}万/周</span>
                </div>
            </div>
            <div class="flex justify-between">
                <div class>最低工资</div>
                <div>
                    <span class="after:">{{ playerStatistics.最低工资球员 }}</span>
                    <span>-</span>
                    <span class>€{{ Math.round(playerStatistics.最低工资 * 100) / 100 }}万/周</span>
                </div>
            </div>
            <!-- 战术 -->
            <div class="font-semibold mt-4">战术</div>
            <div class="bg-primary-active w-full py-0.5 mb-2"></div>
            <div class="flex justify-between">
                <div class>下底传中</div>
                <div class>{{ seasonTacticsStatistics.下底传中成功 }}/{{ seasonTacticsStatistics.下底传中 }} -
                    {{ Math.round(seasonTacticsStatistics.下底传中成功率 * 100) / 100 }}%
                </div>
            </div>
            <div class="flex justify-between">
                <div class>倒三角</div>
                <div class>{{ seasonTacticsStatistics.倒三角成功 }}/{{ seasonTacticsStatistics.倒三角 }} -
                    {{ Math.round(seasonTacticsStatistics.倒三角成功率 * 100) / 100 }}%
                </div>
            </div>
            <div class="flex justify-between">
                <div class>中路渗透</div>
                <div class>{{ seasonTacticsStatistics.中路渗透成功 }}/{{ seasonTacticsStatistics.中路渗透 }} -
                    {{ Math.round(seasonTacticsStatistics.中路渗透成功率 * 100) / 100 }}%
                </div>
            </div>
            <div class="flex justify-between">
                <div class>边路内切</div>
                <div class>{{ seasonTacticsStatistics.边路内切成功 }}/{{ seasonTacticsStatistics.边路内切 }} -
                    {{ Math.round(seasonTacticsStatistics.边路内切成功率 * 100) / 100 }}%
                </div>
            </div>
            <div class="flex justify-between">
                <div class>防守反击</div>
                <div class>{{ seasonTacticsStatistics.防守反击成功 }}/{{ seasonTacticsStatistics.防守反击 }} -
                    {{ Math.round(seasonTacticsStatistics.防守反击成功率 * 100) / 100 }}%
                </div>
            </div>
            <!-- 比赛 -->
            <div class="font-semibold mt-4">比赛</div>
            <div class="bg-primary-active w-full py-0.5 mb-2"></div>
            <div class="flex justify-between">
                <div class>进球</div>
                <div class>{{ seasonGoalStatistics.进球 }}</div>
            </div>
            <div class="flex justify-between">
                <div class>失球</div>
                <div class>{{ seasonGoalStatistics.失球 }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {getPlayerStatisticsAPI, getSeasonGoalStatisticsAPI, getSeasonTacticsStatisticsAPI} from "@/apis/club";
import {
    ClubMePlayerStatisticsResponse,
    ClubMeSeasonGoalStatisticsResponse,
    ClubMeSeasonTacticsStatisticsResponse
} from "@/interface/response/club";
import {onMounted, Ref, ref} from "vue";

let isLoading: Ref<number> = ref(3);
let playerStatistics: Ref<ClubMePlayerStatisticsResponse | null> = ref(null);
let seasonGoalStatistics: Ref<ClubMeSeasonGoalStatisticsResponse | null> = ref(null);
let seasonTacticsStatistics: Ref<ClubMeSeasonTacticsStatisticsResponse | null> = ref(null);
onMounted(() => {
    isLoading.value = 3;
    getPlayerStatisticsAPI().then((response: ClubMePlayerStatisticsResponse) => {
        playerStatistics.value = response;
        isLoading.value--;
    }).catch((_error: any) => {
    });
    getSeasonGoalStatisticsAPI().then((response: ClubMeSeasonGoalStatisticsResponse) => {
        seasonGoalStatistics.value = response;
        isLoading.value--;
    }).catch((_error: any) => {
    });
    getSeasonTacticsStatisticsAPI().then((response: ClubMeSeasonTacticsStatisticsResponse) => {
        seasonTacticsStatistics.value = response;
        isLoading.value--;
    }).catch((_error: any) => {
    });
});
</script>
<style scoped>
</style>
