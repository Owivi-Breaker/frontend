<template>
    <dark-mode-container class="global-header flex-y-center h-full">
        <global-logo v-if="showLogo" :show-title="true" :style="{ width: theme.sider.width + 'px' }" class="h-full"/>
        <div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
            <menu-collapse v-if="showMenuCollape"/>
            <global-breadcrumb v-if="theme.header.crumb.visible"/>
        </div>
        <div v-else :style="{ justifyContent: theme.menu.horizontalPosition }"
             class="flex-1-hidden flex-y-center h-full">
            <header-menu/>
        </div>
        <n-space align="center" class="bigSpace mx-5" justify="space-between">
            <n-space align="center" justify="start">
                <!-- logo -->
                <!--<div class="font-bold italic text-2xl">-->
                <!--    <span class="underline decoration-teal-500  decoration-4">TieB</span>reaker-->
                <!--</div>-->
                <n-button class="returnButton" @click="goPre">返回</n-button>
            </n-space>
            <n-space align="center" justify="end">
                <span class="curDate">今天是&nbsp;{{ store.Date }}</span>
                <n-button @click="nextDay">明天</n-button>
                <n-button :bordered="false" class="exitButton" @click="showExitModal = true">
                    <n-icon size="30">
                        <exit-outline/>
                    </n-icon>
                </n-button>
            </n-space>
        </n-space>
        <div class="flex items-center h-full">
            <global-search/>
            <github-site/>
            <full-screen/>
            <theme-mode/>
            <!-- TODO 封装为组件 -->
            <hover-container class="w-40px h-full" tooltip-content="退出">
                <n-button :bordered="false" class="w-35px h-full" @click="showExitModal = true">
                    <icon-mdi:footer class="text-20px"/>
                </n-button>
            </hover-container>
        </div>
    </dark-mode-container>
    <!-- 退出登录模态框 -->
    <div>
        <n-modal v-model:show="showExitModal">
            <n-card :bordered="false" class="exitModalCard" size="huge" title="提示">
                <div class="exitModalContent">即将退出登录，是否继续？</div>
                <n-button class="confirmButton" @click="ExitLogin">确认</n-button>
                <n-button class="returnButton" type="primary" @click="showExitModal = false">返回</n-button>
            </n-card>
        </n-modal>
    </div>
    <!-- 即将进入比赛模态框 -->
    <n-modal v-model:show="showGameModal">
        <n-card class="willGameCard" title="即将进行比赛">
            <template #header>即将进行比赛</template>
            <template #default>
                <n-grid :cols="21" x-gap="12" y-gap="12">
                    <n-gi span="10">
                        <div class="firstTeam">
                            <img
                                :src="'http://s1.s100.vip:13127/Public/' + store.nextGame.teams[0] + '.png'"
                                alt="图片"
                                class="teamAvatar"
                            />
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
                            <img
                                :src="'http://s1.s100.vip:13127/Public/' + store.nextGame.teams[1] + '.png'"
                                alt="图片"
                                class="teamAvatar"
                            />
                        </div>
                    </n-gi>
                    <n-gi span="21">
                        <n-space justify="end">
                            <n-button @click="showGameModal = false">还没准备好</n-button>
                            <n-button type="primary" @click="nextDay">现在开始！</n-button>
                        </n-space>
                    </n-gi>
                </n-grid>
            </template>
        </n-card>
    </n-modal>
    <Transfer v-if="needTransfer"></Transfer>
</template>

<script lang="ts" setup>
import {defineComponent, onBeforeUnmount, onMounted, Ref, ref} from 'vue';
import {Router} from 'vue-router';
import {ExitOutline} from '@vicons/ionicons5';
import key from 'Keymaster';
import {DarkModeContainer} from '@/components';
import {useThemeStore} from '@/store';
import {useRouterPush} from '@/composables';
import {storage} from '@/utils';
import type {GlobalHeaderProps} from '@/interface';
import {getDateAPI} from '@/apis/user';
import {nextTurnAPI} from '@/apis/nextTurn';
import {useStore} from '@/stores/store';
import {getIncomingGamesAPI} from '@/apis/club';
import GlobalSearch from '../GlobalSearch/index.vue';
import GlobalLogo from '../GlobalLogo/index.vue';
import {FullScreen, GithubSite, GlobalBreadcrumb, HeaderMenu, MenuCollapse, ThemeMode, Transfer} from './components';

const {routerPush, routerBack} = useRouterPush();

defineProps<{
    showLogo: GlobalHeaderProps['showLogo'];
    /** 显示头部菜单 */
    showHeaderMenu: GlobalHeaderProps['showHeaderMenu'];
    /** 显示菜单折叠按钮 */
    showMenuCollape: GlobalHeaderProps['showMenuCollape'];
}>();

const theme = useThemeStore();

const store = useStore();

onMounted(() => {
    key('space', function () {
        nextDay();
        return false;
    });
});

onBeforeUnmount(() => {
    key.unbind('space');
});

const showExitModal: Ref<boolean> = ref(false);
defineComponent({
    components: {
        ExitOutline
    }
});

declare const window: Window & { $router: Router };

function goPre(): void {
    routerBack();
}

function ExitLogin(): void {
    storage.remove('token');
    storage.remove('saveId');
    routerPush({name: 'login'});
}

const showGameModal: Ref<boolean> = ref(false);

function nextDay(): void {
    if (store.nextGame.distance === 1 && !showGameModal.value) {
        showGameModal.value = true;
        return;
    }
    needTransfer.value = false;
    nextTurnAPI()
        .then((response: any) => {
                if (response.state === 'pve') {
                    showGameModal.value = false;
                    routerPush({name: 'gamePrepare'});
                }
                getDateAPI()
                    .then((response: { date: any }) => {
                        store.Date = response.date;
                        store.nextGame.distance--;
                        needTransfer.value = true;
                        if (store.nextGame.distance == 0) {
                            getIncomingGamesAPI()
                                .then((response: any) => {
                                    const nextGameDate = response[0].date;
                                    const teams = new Array<string>(2);
                                    teams[0] = response[0].club1_name;
                                    teams[1] = response[0].club2_name;
                                    store.nextGame.distance =
                                        (new Date(nextGameDate).getTime() / 1000 - new Date(store.Date).getTime() / 1000) / 24 / 60 / 60;
                                    store.nextGame.teams = teams;
                                })
                                .catch((_error: {}) => {
                                });
                        }
                    })
                    .catch((_error: {}) => {
                    });
            }
        )
        .catch((_error: {}) => {
        });
}

let needTransfer: Ref<boolean> = ref(true);
defineExpose({ExitLogin, goPre, nextDay, showExitModal, showGameModal});
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
