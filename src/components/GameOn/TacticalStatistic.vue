<template>
    <div class="s-card flex flex-col p-10 gap-4">
        <TacticalStatisticItem v-for="(item, key) in datas" :key="key" :player="item"></TacticalStatisticItem>
    </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, defineComponent } from 'vue';
import { TacticalStatisticItem } from '@/components/GameOn';

const props: any = defineProps({
    playerTeamInfo: Object,
    computerTeamInfo: Object
});

// 0为玩家数据 1为电脑数据
const datas: ComputedRef = computed(() => {
    if (!props.playerTeamInfo || !props.computerTeamInfo) {
        return [];
    }
    const result = new Array<any>();
    const titles = ['总次数','下底传中', '边路内切', ' 倒三角 ', '中路渗透', '防守反击'];
    const keys = [
        'attempts',
        'wing_cross',
        'under_cutting',
        'pull_back',
        'middle_attack',
        'counter_attack'
    ];
    for (let i: number = 0; i < 6; i++) {
        result.push({ title: titles[i], data: [props.playerTeamInfo[keys[i]], props.computerTeamInfo[keys[i]]] });
    }
    return result;
});
defineComponent({ TacticalStatisticItem });
defineExpose({ datas });
</script>

<style scoped></style>
