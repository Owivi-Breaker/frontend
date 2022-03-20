<template>
    <div>
        <div class="flex space-x-10 mt-10 ml-14 mr-16">
            <!-- 左边 -->
            <div class="w-2/3">
                <!-- 下一场比赛卡片 -->
                <NextGame></NextGame>
                <!-- 球员表现统计 -->
                <PlayerPerform></PlayerPerform>
                <!-- 杂项统计 -->
                <div class="flex items-start gap-10 mt-5">
                    <!-- 财政 -->
                    <Financial></Financial>
                    <!-- 球员统计 -->
                    <ClubStatistic></ClubStatistic>
                </div>
            </div>
            <!-- 右边 -->
            <div class="w-1/3">
                <!-- 积分榜 -->
                <Scoreboard></Scoreboard>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ClubStatistic, Financial, NextGame, PlayerPerform, Scoreboard } from './components';
import { defineComponent } from "vue";

defineComponent({ ClubStatistic, Financial, NextGame, PlayerPerform, Scoreboard });
</script>
<style scoped>
</style>
