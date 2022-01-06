<template>
    <n-layout-header bordered>
        <n-space align="center" justify="space-between">
            <n-menu :inverted="inverted" :options="menuOptions" mode="horizontal"/>
            <n-space align="center" justify="end">
                <n-button v-on:click="nextDay">明天</n-button>
                <span class="curDate">今天是&nbsp;{{ curDate }}</span>
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
</template>
<script lang="ts" setup>
import { defineComponent, h, ref, onMounted } from "vue";
import { Ref } from "@vue/reactivity";
import { NIcon } from "naive-ui";
import { BookOutline as BookIcon, ExitOutline, Exit } from "@vicons/ionicons5";
import { Router, useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { MessageApiInjection, MessageOptions } from "naive-ui/lib/message/src/MessageProvider";
import { storage } from "../utils";
import { getDateAPI } from "@/apis/user";
import { nextTurnAPI } from "@/apis/nextTurn";

let inverted: Ref<boolean> = ref(false);
let showExitModal: Ref<boolean> = ref(false);
let router: Router = useRouter();
defineComponent({
    components: {
        ExitOutline,
        Exit
    }
});
let menuOptions: Array<object> = [
    {
        label: "且听风吟",
        key: "hear-the-wind-sing",
        icon: RenderIcon(BookIcon)
    },
    {
        label: "1973年的弹珠玩具",
        key: "pinball-1973",
        icon: RenderIcon(BookIcon),
        disabled: true,
        children: [
            {
                label: "鼠",
                key: "rat"
            }
        ]
    },
    {
        label: "寻羊冒险记",
        key: "a-wild-sheep-chase",
        disabled: true,
        icon: RenderIcon(BookIcon)
    },
];
let curDate: Ref<string> = ref("");
let message: MessageApiInjection = useMessage();
onMounted(
    () => {
        getDateAPI().then(response => {
            curDate.value = response.date;
        }).catch(error => {
            switch (error.message) {
                default:
                    message.error("网络错误");
                    break;
            }
        });
    }
)
const ExitLogin = (): void => {
    storage.remove("token");
    storage.remove("saveID");
    router.push({ name: "login" });
}

function RenderIcon(icon: any) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

function nextDay(): void {
    nextTurnAPI({ turn_num: 1 }).then(
    ).catch((error: { message: MessageOptions; response: { data: { detail: any; }; }; }) => {
        message.error("网络错误。");
    });
}
</script>
<style>
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