<template>
    <n-card title="梅西">
        <template #header-extra>
            <svg class="avatar">
                <avataaars />
            </svg>
        </template>
        <div>巴塞罗那</div>
        <div>34</div>
        <div>阿根廷</div>
        <template #action>
            <n-collapse>
                <n-collapse-item title="能力" name="1">
                    <div>射门</div>
                    <div>传球</div>
                    <div>过人</div>
                </n-collapse-item>
            </n-collapse>
        </template>
    </n-card>
</template>
<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import { CashOutline as CashIcon, WineOutline as WineIcon } from "@vicons/ionicons5"
import { defineComponent } from 'vue';
</script>

<style>
.avatar {
    width: 80px;
    height: 80px;
    padding: 5px;
}
</style>