<template>
    <n-layout-header bordered>
        <n-menu mode="horizontal" :inverted="inverted" :options="menuOptions" />
        <span class="curTime">今天是&nbsp;{{ nowTime }}</span>
        <n-button class="exitButton" :bordered="false" v-on:click="showExitModal = true">
            <n-icon size="30">
                <exit-outline />
            </n-icon>
        </n-button>
    </n-layout-header>
    <n-modal v-model:show="showExitModal">
        <n-card class="exitModalCard" title="提示" :bordered="false" size="huge">
            <div class="exitModalContent">即将退出登录，是否继续？</div>
            <n-button class="confirmButton" v-on:click="ExitLogin">确认</n-button>
            <n-button class="returnButton" type="primary" v-on:click="showExitModal = false">返回</n-button>
        </n-card>
    </n-modal>
</template>
<script lang="ts" setup>
import { defineComponent, h, ref } from 'vue';
import { Ref } from "@vue/reactivity";
import { NIcon } from 'naive-ui';
import { BookOutline as BookIcon, ExitOutline, Exit } from '@vicons/ionicons5';
import { Router, useRouter } from "vue-router";
import { storage } from '../utils';
import { getSaveAPI } from '@/apis/save';
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
        label: '且听风吟',
        key: 'hear-the-wind-sing',
        icon: RenderIcon(BookIcon)
    },
    {
        label: '1973年的弹珠玩具',
        key: 'pinball-1973',
        icon: RenderIcon(BookIcon),
        disabled: true,
        children: [
            {
                label: '鼠',
                key: 'rat'
            }
        ]
    },
    {
        label: '寻羊冒险记',
        key: 'a-wild-sheep-chase',
        disabled: true,
        icon: RenderIcon(BookIcon)
    },
];
let nowTime: Ref<string> = ref("");
// 等待接口
getSaveAPI().then(response => {
    console.log(response);
}).catch(error => {
    switch (error.message) {
    }
})
nowTime.value = "2021-12-19";
const ExitLogin = (): void => {
    storage.remove("token");
    storage.remove("saveID");
    router.push({ name: "login" });
}

function RenderIcon(icon: any) {
    return () => h(NIcon, null, { default: () => h(icon) });
}
</script>
<style>
.curTime {
    position: absolute;
    right: 100px;
    margin-top: 10px;
    font-size: 15px;
}
.exitButton {
    position: absolute;
    right: 10px;
    margin-top: 5px;
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