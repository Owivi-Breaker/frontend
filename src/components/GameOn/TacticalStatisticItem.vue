<template>
    <div class="flex flex-col items-center">
        <div class="flex items-center gap-15">
            <!-- 用props传参更好一点。。。  -->
            <div class>
                {{
                    IsPlayerLeft ? props.player['data'][0] : props.player['data'][1]
                }}
            </div>
            <div class>{{ props.player['title'] }}</div>
            <div class>
                {{
                    IsPlayerLeft ? props.player['data'][1] : props.player['data'][0]
                }}
            </div>
        </div>
        <!-- TODO 对方队伍的颜色 -->
        <n-progress
            :height="10"
            type="line"
            :border-radius="1"
            :color="'primary-active'"
            :percentage="proNumber"
            :rail-color="isZero ? '#78838E' : ''"
            :show-indicator="false"
        ></n-progress>
    </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef } from 'vue';
import { useStore } from '@/stores/store';

const store = useStore();
const totalData: ComputedRef = computed(() => {
    return store.gamePveData;
});

const IsPlayerLeft: ComputedRef = computed(() => {
    if (totalData.value['game_info']['home_club_id'] === totalData.value['player_team_info']['club_id']) {
        return true
    }
    return false
})

const props: any = defineProps({
    player: Object
});

const isZero: ComputedRef = computed(() => {
    return props.player.data[0] + props.player.data[1] === 0;
});

const proNumber: ComputedRef = computed(() => {

    if (IsPlayerLeft.value) {
        return isZero.value ? 0 : (props.player.data[0] / (props.player.data[0] + props.player.data[1])) * 100;
    }
    return isZero.value ? 0 : (props.player.data[1] / (props.player.data[0] + props.player.data[1])) * 100;

});

defineExpose({ proNumber });
</script>

