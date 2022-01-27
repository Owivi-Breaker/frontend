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
            <div class="time">{{ nowTime }}:00</div>
        </div>
    </n-card>
</template>
<script lang="ts" setup>
    import { computed, ComputedRef } from "vue";
    let props: any = defineProps({
        turns: Number,
        playerTeamInfo: Object,
        computerTeamInfo: Object
    });
    let leftTeam: ComputedRef = computed(() => {
        return props.playerTeamInfo["isHome"] ? props.playerTeamInfo : props.computerTeamInfo;
    });
    let rightTeam: ComputedRef = computed(() => {
        return props.playerTeamInfo["isHome"] ? props.computerTeamInfo : props.playerTeamInfo;
    });
    let nowTime: ComputedRef = computed(() => {
        return props.turns * 90 / 50;
    });
    defineExpose({ leftTeam, rightTeam, nowTime });
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
        font-size: x-large;
    }

    .gamePoint {
        font-size: 40px;
    }

    .time {
        text-align: center;
        font-size: 35px;
    }

    .colon {
        font-size: 40px;
        text-align: center;
    }

    .tenSpan {
        width: 10%;
    }

    .fiveSpan {
        width: 5%;
    }

    .teamAvatar {
        width: 60px;
        height: 60px;
        padding: 5px;
    }
</style>
