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
import { ref, onMounted } from "vue";
import { Ref } from "@vue/reactivity";
import { useMessage } from "naive-ui";
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
import { getDateAPI } from "@/apis/user";
import { getSaveAPI } from "@/apis/save";
import { getClubByIdAPI } from "@/apis/club";
let teams: Ref<Array<string>> = ref(["广州恒大", "山东鲁能"]);
let nextGameDate: Ref<string> = ref("2021-12-20");
let distance: Ref<Number> = ref(0);
let message: MessageApiInjection = useMessage();
onMounted(
    () => {
        getDateAPI().then(response => {
            let curDate: number = (new Date(response.date)).getTime() / 1000;
            distance.value = (new Date(nextGameDate.value).getTime() / 1000 - curDate) / 24 / 60 / 60;
        }).catch(error => {
            switch (error.message) {
                default:
                    message.error("网络错误");
                    break;
            }
        });
    }
)
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