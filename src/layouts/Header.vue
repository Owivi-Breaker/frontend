<template>
    <n-layout-header bordered>
        <n-space class="bigSpace" align="center" justify="space-between">
            <n-space align="center" justify="start">
                <n-button v-on:click="goPre" class="returnButton">返回</n-button>
            </n-space>
            <n-space align="center" justify="end">
                <span class="curDate">今天是&nbsp;{{ curDate }}</span>
                <n-button v-on:click="nextDay">明天</n-button>
                <n-button :bordered="false" class="exitButton" v-on:click="showExitModal = true">
                    <n-icon size="30">
                        <exit-outline />
                    </n-icon>
                </n-button>
            </n-space>
        </n-space>
    </n-layout-header>
    <n-modal v-model:show="showExitModal">
        <n-card :bordered="false" class="exitModalCard" size="huge" title="提示">
            <div class="exitModalContent">即将退出登录，是否继续？</div>
            <n-button class="confirmButton" v-on:click="ExitLogin">确认</n-button>
            <n-button class="returnButton" type="primary" v-on:click="showExitModal = false">返回</n-button>
        </n-card>
    </n-modal>
</template>
<script lang="ts" setup>
import { defineComponent, ref, onMounted, Ref } from "vue";
import { ExitOutline, Exit } from "@vicons/ionicons5";
import { Router } from "vue-router";
import { storage } from "../utils";
import { getDateAPI } from "@/apis/user";
import { nextTurnAPI } from "@/apis/nextTurn";
let showExitModal: Ref<boolean> = ref(false);
defineComponent({
    components: {
        ExitOutline,
        Exit
    }
});
let curDate: Ref<string> = ref("");
onMounted(
    () => {
        getDateAPI().then(response => {
            curDate.value = response.date;
        }).catch((_error: {}) => { });
    }
);
declare const window: Window & { $router: Router };
function goPre(): void {
    window.$router.go(-1);
}
function ExitLogin(): void {
    storage.remove("token");
    storage.remove("saveId");
    window.$router.push({ name: "login" });
}
function nextDay(): void {
    nextTurnAPI({ turn_num: 1 }).then(_response => {
        location.reload();
    }).catch((_error: {}) => { });
}
</script>
<style>
.bigSpace {
    height: 60px;
}
.returnButton {
    margin-left: 10px;
}
.curDate {
    font-size: 15px;
}
.exitModalCard {
    width: 300px;
    text-align: center;
}
.exitModalContent {
    font-size: medium;
}
.confirmButton {
    margin-top: 15px;
}
.returnButton {
    margin-left: 15px;
}
</style>