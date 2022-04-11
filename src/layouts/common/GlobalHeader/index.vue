<template>
    <dark-mode-container class="global-header flex-y-center h-full">
        <global-logo
            v-if="showLogo"
            :show-title="true"
            :style="{ width: theme.sider.width + 'px' }"
            class="h-full"
        />
        <div v-if="!showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
            <menu-collapse v-if="showMenuCollape"/>
            <global-breadcrumb v-if="theme.header.crumb.visible"/>
        </div>
        <div
            v-else
            :style="{ justifyContent: theme.menu.horizontalPosition }"
            class="flex-1-hidden flex-y-center h-full"
        >
            <header-menu/>
        </div>

        <div class="flex items-center h-full">
            <div class="flex items-center text-semobold mr-3 gap-2">
                <div>
                    <icon-ri:calendar-2-fill class="text-20px"/>
                </div>
                {{ store.Date }}
            </div>
            <hover-container class="w-40px h-full" tooltip-content="下一天">
                <n-button :bordered="false" class="w-35px h-full" @click="nextDay">
                    <icon-tabler:track-next class="text-20px"/>
                </n-button>
            </hover-container>
            <!-- <global-search /> -->
            <github-site/>
            <full-screen/>
            <theme-mode/>
            <!-- TODO 封装为组件 -->
            <hover-container class="w-40px h-full" tooltip-content="退出">
                <n-button :bordered="false" class="w-35px h-full" @click="showExitModal = true">
                    <icon-ri:logout-box-r-line class="text-20px"/>
                </n-button>
            </hover-container>
        </div>
    </dark-mode-container>
    <!-- 退出登录模态框 -->
    <div>
        <n-modal v-model:show="showExitModal">
            <div :bordered="false" class="s-card p-8 space-y-7">
                <div class="s-title s-underline text-lg">提示</div>
                <div class="mx-auto text-lg">即将退出登录，是否继续？</div>
                <div class="flex items-center gap-6 justify-end">
                    <n-button @click="ExitLogin">确认</n-button>
                    <n-button type="primary" @click="showExitModal = false">返回</n-button>
                </div>
            </div>
        </n-modal>
    </div>
    <!-- 即将进入比赛模态框 -->
    <n-modal v-model:show="showGameModal">
        <div class="s-card py-7 px-10">
            <div class="s-title s-underline mb-7">即将进行比赛</div>

            <div class="flex items-center gap-12">
                <div class="flex flex-col items-center gap-2">
                    <img
                        :src="'http://shu-huai.cn:13127/Public/' + store.nextGame.teams[0] + '.png'"
                        alt="图片"
                        class="w-12 h-12"
                    />

                    <span class="text-lg font-semibold">{{ store.nextGame.teams[0] }}</span>
                </div>

                <div class="flex flex-col items-center gap-4">
                    <div class="font-semibold text-lg text-primary s-underline">对阵</div>
                </div>

                <div class="flex flex-col items-center gap-2">
                    <img
                        :src="'http://shu-huai.cn:13127/Public/' + store.nextGame.teams[1] + '.png'"
                        alt="图片"
                        class="w-12 h-12"
                    />
                    <span class="text-lg font-semibold">{{ store.nextGame.teams[1] }}</span>
                </div>
            </div>
            <div class="flex justify-end mt-7 gap-3">
                <n-button @click="showGameModal = false">未准备好</n-button>
                <n-button type="primary" @click="nextDay">现在开始</n-button>
            </div>
        </div>
    </n-modal>
    <Transfer v-if="needTransfer"></Transfer>
    <n-modal v-model:show="waiting" :mask-closable="false">
        <n-card :bordered="true" :title="'请稍候'" class="loadModalCard" size="huge">
            <n-spin v-if="waiting" size="large"/>
        </n-card>
    </n-modal>
</template>

<script lang="ts" setup>
import {defineComponent, nextTick, onBeforeUnmount, onMounted, Ref, ref} from 'vue';
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
import GlobalLogo from '../GlobalLogo/index.vue';
import {dealRejectedOffersAPI} from '@/apis/transfer';
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
let needTransfer: Ref<boolean> = ref(true);
let waiting: Ref<boolean> = ref(false);

function nextDay(): void {
    needTransfer.value = false;
    if (store.nextGame.distance === 1 && !showGameModal.value) {
        showGameModal.value = true;
        return;
    }
    dealRejectedOffersAPI().then((_response: any) => {
        nextTurnAPI()
            .then((response: any) => {
                    waiting.value = true;
                    setTimeout(() => {
                        if (response.state === 'pve') {
                            showGameModal.value = false;
                            routerPush({name: 'game-prepare'});
                        }
                        getDateAPI()
                            .then((response: { date: any }) => {
                                store.Date = response.date;
                                store.nextGame.distance--;
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
                                nextTick(() => {
                                    needTransfer.value = true;
                                });
                                console.log(needTransfer.value);
                            })
                            .catch((_error: {}) => {
                            });
                        waiting.value = false;
                    }, 5000);
                }
            )
            .catch((_error: {}) => {
            });
    }).catch((_error: {}) => {
    });
}

defineExpose({ExitLogin, goPre, nextDay, showExitModal, showGameModal});
</script>
<style scoped>
.loadModalCard {
    width: 320px;
    height: 180px;
    text-align: center;
}
</style>
