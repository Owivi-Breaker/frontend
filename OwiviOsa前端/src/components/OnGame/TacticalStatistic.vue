<template>
    <n-card title="战术统计" style="height:249px;">
        <n-grid cols="1">
            <TacticalStatisticItem v-for="item in datas" v-bind:player="item"></TacticalStatisticItem>
        </n-grid>
    </n-card>
</template>

<script lang="ts" setup>
    import TacticalStatisticItem from "@/components/OnGame/TacticalStatisticItem.vue";
    import { defineComponent, ComputedRef, computed } from "vue";
    let props: any = defineProps({
        playerTeamInfo: Object,
        computerTeamInfo: Object
    });
    let datas: ComputedRef = computed(() => {
        let result = new Array<any>();
        let titles = ["下底传中", "边路内切", " 倒三角 ", "中路渗透", "防守反击"];
        let keys = ["wing_cross_success", "under_cutting_success", "pull_back_success", "middle_attack_success", "counter_attack_success"];
        for (let i: number = 0; i < 5; i++) {
            result.push({ "title": titles[i], "data": [props.playerTeamInfo[keys[i]], props.computerTeamInfo[keys[i]]] });
        }
        return result;
    });
    defineComponent({ TacticalStatisticItem });
    defineExpose({ datas });
</script>

<style scoped>
</style>