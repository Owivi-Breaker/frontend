<template>
    <n-layout-header bordered>
        <n-space class="bigSpace mx-5" align="center" justify="space-between">
            <n-space align="center" justify="start" >
                <!-- logo -->
                <!--<div class="font-bold italic text-2xl">-->
                <!--    <span class="underline decoration-teal-500  decoration-4">TieB</span>reaker-->
                <!--</div>-->
                <n-button v-on:click="goPre" class="returnButton">返回</n-button>
            </n-space>
            <n-space align="center" justify="end">
                <span class="curDate">今天是&nbsp;{{ store.Date }}</span>
                <n-button v-on:click="nextDay">明天</n-button>
                <n-button :bordered="false" class="exitButton" v-on:click="showExitModal = true">
                    <n-icon size="30">
                        <exit-outline/>
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
    <n-modal v-model:show="showGameModal">
        <n-card class="willGameCard" title="即将进行比赛">
            <template #header> 即将进行比赛</template>
            <template #default>
                <n-grid :cols="21" x-gap="12" y-gap="12">
                    <n-gi span="10">
                        <div class="firstTeam">
                            <img :src="'http://s1.s100.vip:13127/Public/' + store.nextGame.teams[0] + '.png'" alt="图片"
                                 class="teamAvatar"/>
                            <span class="tenSpan"></span>
                            <span class="teamName">{{ store.nextGame.teams[0] }}</span>
                            <span class="fiveSpan"></span>
                            <span class="gamePoint">{{ 0 }}</span>
                        </div>
                    </n-gi>
                    <n-gi span="1">
                        <div class="colon">:</div>
                    </n-gi>
                    <n-gi span="10">
                        <div class="secondTeam">
                            <span class="gamePoint">{{ 0 }}</span>
                            <span class="tenSpan"></span>
                            <span class="teamName">{{ store.nextGame.teams[0] }}</span>
                            <span class="fiveSpan"></span>
                            <img :src="'http://s1.s100.vip:13127/Public/' + store.nextGame.teams[1] + '.png'" alt="图片"
                                 class="teamAvatar"/>
                        </div>
                    </n-gi>
                    <n-gi span="21">
                        <n-space justify="end">
                            <n-button v-on:click="showGameModal = false">还没准备好</n-button>
                            <n-button type="primary" v-on:click="nextDay">现在开始！</n-button>
                        </n-space>
                    </n-gi>
                </n-grid>
            </template>
        </n-card>
    </n-modal>
</template>

<script lang="ts" setup>
import { defineComponent, ref, Ref, onMounted, onBeforeUnmount } from "vue";
import { ExitOutline, Exit } from "@vicons/ionicons5";
import { Router } from "vue-router";
import { storage } from "../utils";
import { getDateAPI } from "@/apis/user";
import { nextTurnAPI } from "@/apis/nextTurn";
import { useStore } from "@/stores/store";
import key from "Keymaster";

const store = useStore();

onMounted(() => {
    key("space", function () {
        nextDay();
        return false;
    });
})

onBeforeUnmount((() => {
    key.unbind("space");
}))

let showExitModal: Ref<boolean> = ref(false);
defineComponent({
    components: {
        ExitOutline,
        Exit,
    },
});

declare const window: Window & { $router: Router };

function goPre(): void {
    window.$router.go(-1);
}

function ExitLogin(): void {
    storage.remove("token");
    storage.remove("saveId");
    window.$router.push({ name: "login" });
}

let showGameModal: Ref<boolean> = ref(false);

function nextDay(): void {
    if (store.nextGame.distance === 1 && showGameModal.value === false) {
        showGameModal.value = true;
        return;
    }
    nextTurnAPI()
        .then((response: any) => {
            if (response.state === "pve") {
                showGameModal.value = false;
                window.$router.push({ name: "gamePrepare" });
            }
            getDateAPI()
                .then((response: { date: any }) => {
                    store.Date = response.date;
                })
                .catch((_error: {}) => {
                });
        })
        .catch((_error: {}) => {
        });
}

defineExpose({ ExitLogin, goPre, nextDay, showExitModal, showGameModal });
</script>

<style scoped>
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

.willGameCard {
    width: 800px;
}

.confirmButton {
    margin-top: 15px;
}

.returnButton {
    margin-left: 15px;
}

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
    font-size: 30px;
}

.gamePoint {
    font-size: 40px;
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
