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
                <div class>58/122 - 47.5%</div>
            </div>
            <div class="flex justify-between">
                <div class>倒三角</div>
                <div class>1/24 - 4.2%</div>
            </div>
            <div class="flex justify-between">
                <div class>中路渗透</div>
                <div class>18/65 - 27.6%</div>
            </div>
            <div class="flex justify-between">
                <div class>边路内切</div>
                <div class>4/55 - 7.2%</div>
            </div>
            <div class="flex justify-between">
                <div class>防守反击</div>
                <div class>6/19 - 31.6%</div>
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
import {getPlayerStatisticsAPI, getSeasonGoalStatisticsAPI} from "@/apis/club";
import {ClubMePlayerStatisticsResponse, ClubMeSeasonGoalStatisticsResponse} from "@/interface/response/club";
import {onMounted, Ref, ref} from "vue";

let isLoading: Ref<number> = ref(2);
let playerStatistics: Ref<ClubMePlayerStatisticsResponse | null> = ref(null);
let seasonGoalStatistics: Ref<ClubMeSeasonGoalStatisticsResponse | null> = ref(null);
onMounted(() => {
    isLoading.value = 2;
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
});
</script>
<style scoped>
</style>
