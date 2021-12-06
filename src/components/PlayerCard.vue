<template>
    <n-card title="梅西" style="margin-bottom: 16px;">
        <template #header-extra>
            <svg class="avatar">
                <Avataaars />
            </svg>
        </template>
        <n-h4>射门</n-h4>
        <n-progress type="line" percentage="20" />
        <n-h4>射门</n-h4>
        <n-progress type="line" percentage="20" />
        <n-h4>射门</n-h4>
        <n-progress type="line" percentage="20" />
        <n-h4>射门</n-h4>
        <n-progress type="line" percentage="20" />
        <!-- <n-grid cols="4" x-gap="5" y-gap="5" v-show="showOption">
            <n-gi>
                <n-statistic label="进球" :value="92"></n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic label="助攻">34</n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic label="过人" :value="72"></n-statistic>
            </n-gi>
            <n-gi>
                <n-statistic label="抢断">28</n-statistic>
            </n-gi>
        </n-grid>-->
    </n-card>
</template>
<script lang="ts" setup>
//import Avataaars from 'vuejs-avataaars'

import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import { CashOutline as CashIcon, WineOutline as WineIcon } from "@vicons/ionicons5"

let showOption = false
</script>

<style>
.avatar {
    width: 80px;
    height: 80px;
    padding: 5px;
}
</style>