<template>
    <!-- 比分组件 -->
    <div class="s-card p-6">
        <div class="flex items-center justify-between">
            <!-- 左队 -->
            <div class="w-1/3 flex flex-col items-center gap-2">
                <img
                    :src="'https://s1.s100.vip:13127/Public/' + leftTeam['name'] + '.png'"
                    alt="图片"
                    class="w-15 h-15"
                />
                <div
                    class="font-semibold text-lg"
                    :class="{ 'underline decoration-primary decoration-4 underline-offset-3': isTurn(leftTeam['club_id']) }"
                    :style="{ 'text-decoration-color': getClubColor(leftTeam['name'], -0.3) }"
                >{{ leftTeam['name'] }}</div>
            </div>
            <!-- 比分和时间 -->
            <div class="flex flex-col gap-3 items-center mt-5">
                <div class="flex items-center gap-2">
                    <div class="font-bold text-2xl">{{ leftTeam['score'] }}</div>
                    <div class="font-bold text-2xl">-</div>
                    <div class="font-bold text-2xl">{{ rightTeam['score'] }}</div>
                </div>
                <div
                    class="s-title rounded-full py-2 px-3 bg-primary-active text-primary"
                >{{ nowTimeMinute }}:{{ nowTimeSecond }}</div>
            </div>

            <!-- 右队 -->
            <div class="w-1/3 flex flex-col items-center gap-2">
                <img
                    :src="'httpw://s1.s100.vip:13127/Public/' + rightTeam['name'] + '.png'"
                    alt="图片"
                    class="w-15 h-15"
                />
                <div
                    class="font-semibold text-lg"
                    :class="{ 'underline decoration-primary decoration-4 underline-offset-3': isTurn(rightTeam['club_id']) }"
                    :style="{ 'text-decoration-color': getClubColor(rightTeam['name'], -0.3) }"
                >{{ rightTeam['name'] }}</div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, ComputedRef } from 'vue';
import { useStore } from "@/stores/store";
import { getColor, getClubColor, clubBg, clubTx, clubBd } from "@/utils/colorMap";
const store = useStore();

const props: any = defineProps({
    turns: Number,
    homeClubId: Number,
    playerTeamInfo: Object,
    computerTeamInfo: Object,
    curAttacker: Number
});

const scripts = [
    { "content": "尤文图斯尝试中路渗透", "time": "17:12", "level": "4" },
    { "content": "球员们尝试争顶", "time": "17:15", "level": "2" },
    { "content": "文肖邦将球解围", "time": "17:17", "level": "5" },
    { "content": "进攻方仍然持球", "time": "17:19", "level": "1" }]

const leftTeam: ComputedRef = computed(() => {
    // 主场队伍作为左队
    if (props.homeClubId === props.playerTeamInfo.club_id) {
        return props.playerTeamInfo;
    }
    return props.computerTeamInfo;
});

const rightTeam: ComputedRef = computed(() => {
    if (props.homeClubId !== props.playerTeamInfo.club_id) {
        return props.playerTeamInfo;
    }
    return props.computerTeamInfo;
});

const nowTimeMinute: ComputedRef = computed(() => {
    return Math.floor(((props.turns - 1) * 90) / 50)
        .toString()
        .padStart(2, '0');
});

const nowTimeSecond: ComputedRef = computed(() => {
    return Math.round((((props.turns - 1) * 90) / 50 - nowTimeMinute.value) * 60)
        .toString()
        .padStart(2, '0');
});

// 判断是否为teamId的回合 用来给当前进攻队伍加下划线
const isTurn = (teamId: Number) => {
    if (teamId == props.curAttacker) {
        return true
    }
    return false
}

defineExpose({ leftTeam, rightTeam, nowTimeMinute, nowTimeSecond });
</script>


<style scoped>
.firstTeam {
    display: flex;
    justify-content: end;
    align-items: Center;
}

.secondTeam {
    display: flex;
    justify-content: start;
    align-items: Center;
}

.teamName {
    font-size: 20px;
}

.gamePoint {
    font-size: 30px;
}

.time {
    text-align: center;
    font-size: 35px;
}

.colon {
    font-size: 30px;
    text-align: center;
}
</style>
