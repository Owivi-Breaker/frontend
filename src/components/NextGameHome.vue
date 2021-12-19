<template>
    <n-card class="nextGameCard" title="下一场比赛-未开始">
        <div class="teams">
            <svg class="avatar">
                <Avataaars />
            </svg>
            <span class="name">{{ teams[0] }}</span>&nbsp;
            <span class="point">0:0</span>&nbsp;
            <span class="name">{{ teams[1] }}</span>
            <svg class="avatar">
                <Avataaars />
            </svg>
        </div>
        <div class="date">比赛时间&nbsp;{{ nextGameDate }}</div>
        <div class="fromNow">距今还有&nbsp;{{ distance }}&nbsp;天</div>
    </n-card>
</template>
<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import { ref } from "vue";
import { Ref } from "@vue/reactivity";
let teams: Ref<Array<string>> = ref(["广州恒大", "山东鲁能"]);
let nextGameDate: Ref<string> = ref("2021-12-20");
let distance: Ref<Number> = ref(0);
let curDate: string = "2021-12-19"; // 等待接口
let oldTime: number = (new Date(curDate)).getTime() / 1000;
distance.value = (new Date(nextGameDate.value).getTime() / 1000 - oldTime) / 24 / 60 / 60;
</script>

<style>
.nextGameCard {
    margin-bottom: 16px;
}
.teams {
    display: flex;
    justify-content: center;
    align-items: Center;
}
.name {
    font-size: xx-large;
}
.point {
    font-size: xx-large;
}
.date,
.fromNow {
    text-align: center;
    font-size: large;
}
</style>