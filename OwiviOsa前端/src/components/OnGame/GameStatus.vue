<template>
    <n-card>
        <div>
            <n-grid :cols="21" x-gap="12">
                <n-gi span="10">
                    <div class="firstTeam">
                        <img :src="'http://s1.s100.vip:13127/Public/' + leftTeam['name'] + '.png'" alt="图片" class="teamAvatar" />
                        <span class="tenSpan"></span>
                        <span class="teamName">{{ leftTeam["name"] }}</span>
                        <span class="fiveSpan"></span>
                        <span class="gamePoint">{{ leftTeam["score"] }}</span>
                    </div>
                </n-gi>
                <n-gi span="1">
                    <div class="colon">:</div>
                </n-gi>
                <n-gi span="10">
                    <div class="secondTeam">
                        <span class="gamePoint">{{ rightTeam["score"] }}</span>
                        <span class="tenSpan"></span>
                        <span class="teamName">{{ rightTeam["name"] }}</span>
                        <span class="fiveSpan"></span>
                        <img :src="'http://s1.s100.vip:13127/Public/' + rightTeam['name'] + '.png'" alt="图片" class="teamAvatar" />
                    </div>
                </n-gi>
            </n-grid>
            <div class="time">{{ nowTimeMinute }}:{{ nowTimeSecond }}</div>
        </div>
    </n-card>
</template>
<script lang="ts" setup>
import { computed, ComputedRef } from "vue";
let props: any = defineProps({
    turns: Number,
    homeClubId: Number,
    playerTeamInfo: Object,
    computerTeamInfo: Object,
});
let leftTeam: ComputedRef = computed(() => {
    if (props.homeClubId === props.playerTeamInfo.club_id) {
        return props.playerTeamInfo;
    } else {
        return props.computerTeamInfo;
    }
});
let rightTeam: ComputedRef = computed(() => {
    if (props.homeClubId !== props.playerTeamInfo.club_id) {
        return props.playerTeamInfo;
    } else {
        return props.computerTeamInfo;
    }
});
let nowTimeMinute: ComputedRef = computed(() => {
    return Math.floor(((props.turns - 1) * 90) / 50)
        .toString()
        .padStart(2, "0");
});
let nowTimeSecond: ComputedRef = computed(() => {
    return Math.round((((props.turns - 1) * 90) / 50 - nowTimeMinute.value) * 60)
        .toString()
        .padStart(2, "0");
});
defineExpose({ leftTeam, rightTeam, nowTimeMinute, nowTimeSecond });
</script>
<style>
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

.tenSpan {
    width: 5%;
}

.fiveSpan {
    width: 2.5%;
}

.teamAvatar {
    width: 45px;
    height: 45px;
    padding: 5px;
}
</style>
