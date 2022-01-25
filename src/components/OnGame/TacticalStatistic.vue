<template>
    <n-card title="战术统计" style="height:249px;">
        <n-grid cols="1">
            <TacticalStatisticItem v-for="item in datas" v-bind:player="item"></TacticalStatisticItem>
        </n-grid>
    </n-card>
</template>

<script lang="ts" setup>
    import TacticalStatisticItem from "@/components/OnGame/TacticalStatisticItem.vue";
    import { defineComponent, onMounted, Ref, ref, ComputedRef, computed } from "vue";
    defineComponent({ TacticalStatisticItem });
    let rawDatas: Ref<Array<any>> = ref([]);
    let datas: Ref<Array<Object>> = ref([]);
    onMounted(() => {
        rawDatas.value = [
            {
                "attempts": 51,
                "wing_cross": 12,
                "wing_cross_success": 6,
                "under_cutting": 7,
                "under_cutting_success": 3,
                "pull_back": 8,
                "pull_back_success": 7,
                "middle_attack": 17,
                "middle_attack_success": 11,
                "counter_attack": 8,
                "counter_attack_success": 2,
            },
            {
                "attempts": 51,
                "wing_cross": 12,
                "wing_cross_success": 11,
                "under_cutting": 7,
                "under_cutting_success": 5,
                "pull_back": 8,
                "pull_back_success": 3,
                "middle_attack": 6,
                "middle_attack_success": 5,
                "counter_attack": 8,
                "counter_attack_success": 3,
            }
        ];
        let titles = ["下底传中", "边路内切", " 倒三角 ", "中路渗透", "防守反击"];
        let keys = ["wing_cross_success", "under_cutting_success", "pull_back_success", "middle_attack_success", "counter_attack_success"];
        for (let i: number = 0; i < 5; i++) {
            datas.value.push({ "title": titles[i], "data": [rawDatas.value[0][keys[i]], rawDatas.value[1][keys[i]]] });
        }
    });
</script>

<style scoped>
</style>