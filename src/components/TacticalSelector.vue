<template>
    <n-card title="战术配置">
        <n-grid cols="1" y-gap="10">
            <n-statistic label="下底传中">
                <n-slider v-model:value="downwardPassValue" v-bind:disabled="isAuto" />
            </n-statistic>
            <n-statistic label="边路内切">
                <n-slider v-model:value="edgeCutValue" v-bind:disabled="isAuto" />
            </n-statistic>
            <n-statistic label="倒三角">
                <n-slider v-model:value="invertedTriangleValue" v-bind:disabled="isAuto" />
            </n-statistic>
            <n-statistic label="中路渗透">
                <n-slider v-model:value="middlePenetrationValue" v-bind:disabled="isAuto" />
            </n-statistic>
            <n-statistic label="防守反击">
                <n-slider v-model:value="defensiveCounterattackValue" v-bind:disabled="isAuto" />
            </n-statistic>
            <n-space align="center" justify="end">
                自动进行比赛
                <n-switch v-model:value="isAuto">
                    <template #checked>自动</template>
                    <template #unchecked>手动</template>
                </n-switch>
            </n-space>
        </n-grid>
    </n-card>
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';
let downwardPassValue: Ref<number> = ref(50);
let edgeCutValue: Ref<number> = ref(50);
let invertedTriangleValue: Ref<number> = ref(50);
let middlePenetrationValue: Ref<number> = ref(50);
let defensiveCounterattackValue: Ref<number> = ref(50);
let isAuto: Ref<boolean> = ref(false);
</script>