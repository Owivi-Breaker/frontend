<template>
    <div class="s-card p-6">
        <div class="s-title s-underline">战术配置</div>
        <n-tabs type="line" class="mt-2" @before-leave="handleBeforeLeave">
            <!-- 自动比赛 -->
            <n-tab-pane name="手动" tab="手动">
                <!-- 战术选择框 -->
                <!-- <div>
                    <div class="flex items-center gap-3">
                        <div class>执行</div>
                        <n-select v-model:value="curTactic" :options="tactics" />
                    </div>
                    <n-button type="primary" @click="goNextTurn">{{ nowAndEnd }}</n-button>
                </div>-->

                <div class="flex flex-wrap gap-4 mt-2">
                <!-- 战术按钮 -->
                    <button
                        class="bg-primary rounded-full shadow-md s-underline px-3 py-2 text-lg text-white"
                        v-for="(item, key) in tactics"
                        :key="key"
                        :disabled="!isActive(item['value'])"
                        :class="{
                            'cursor-not-allowed bg-gray-400': !isActive(item['value']),
                            'hover:bg-primary-hover active:bg-primary-pressed focus:outline-none focus:ring focus:ring-primary-press': isActive(item['value'])
                        }"
                        @click="selectTactic(item)"
                    >{{ item['label'] }}</button>
                    <!-- 等待进攻按钮 -->
                    <button
                        :disabled="!isActive('wait')"
                        type="button"
                        :class="{
                            'cursor-not-allowed bg-gray-400': !isActive('wait'),
                            'hover:bg-primary-hover active:bg-primary-pressed focus:outline-none focus:ring focus:ring-primary-press': isActive('wait')
                        }"
                        class="bg-primary rounded-full shadow-md s-underline px-3 py-2 text-lg text-white"
                        @click="selectTactic('wait')"
                    >等待对方进攻</button>
                </div>
            </n-tab-pane>
            <!-- 手动比赛 -->
            <n-tab-pane name="自动" tab="自动">
                <div>
                    <n-switch v-model:value="isAuto">
                        <template #checked>开始</template>
                        <template #unchecked>暂停</template>
                    </n-switch>
                </div>
                <!-- 战术概率滑条 -->
                <div class="flex flex-col items-center">
                    <div>
                        <n-collapse-transition :appear="true" :show="isAuto">
                            <n-statistic v-for="(item, key) in tactics" :key="key">
                                <template #label>{{ item['label'] }}</template>
                                <template #default>
                                    <n-slider v-model:value="item.weight" />
                                </template>
                            </n-statistic>
                        </n-collapse-transition>
                    </div>
                </div>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, Ref, ref, watch } from 'vue';
import { Router } from 'vue-router';
import { useRouterPush } from '@/composables';
import { gamePveNextTurnAPI, gamePveShowGameInfoAPI } from '@/apis/gamePve';
import { useStore } from '@/stores/store';
import { getClubByIdAPI } from '@/apis/club';
import { useMessage } from 'naive-ui';

const message = useMessage()
const { routerPush } = useRouterPush();

const store = useStore();
declare const window: Window & { $router: Router };
const isAuto: Ref<boolean> = ref(false);
const curTactic: Ref<string> = ref('wing_cross');
// TODO 应该作为参数导入
const totalData: ComputedRef = computed(() => {
    return store.gamePveData;
});

// 战术比重列表
const tactics: Ref<Array<any>> = ref([
    {
        label: '下底传中',
        value: 'wing_cross',
        weight: 50
    },
    {
        label: '边路内切',
        value: 'under_cutting',
        weight: 50
    },
    {
        label: '倒三角',
        value: 'pull_back',
        weight: 50
    },
    {
        label: '中路渗透',
        value: 'middle_attack',
        weight: 50
    },
    {
        label: '防守反击',
        value: 'counter_attack',
        weight: 50
    }
]);

let timer: NodeJS.Timeout | null = null;

gamePveShowGameInfoAPI()
    .then((response: any) => {
        if (response.game_info.turns > 51) {
            if (timer) {
                clearInterval(timer);
            }
            routerPush({ name: 'game-result' });
            return;
        }
        const temp = response;
        if (store.clubNameId[temp.player_team_info.club_id]) {
            temp.player_team_info.name = store.clubNameId[temp.player_team_info.club_id];
            if (store.clubNameId[temp.computer_team_info.club_id]) {
                temp.computer_team_info.name = store.clubNameId[temp.computer_team_info.club_id];
                store.gamePveData = temp;
            } else {
                getClubByIdAPI({ club_id: temp.computer_team_info.club_id })
                    .then((response: any) => {
                        temp.computer_team_info.name = response.name;
                        store.clubNameId[temp.computer_team_info.club_id] = response.name;
                        store.gamePveData = temp;
                    })
                    .catch((_error: any) => {
                    });
            }
        } else {
            getClubByIdAPI({ club_id: temp.player_team_info.club_id })
                .then((response: any) => {
                    temp.player_team_info.name = response.name;
                    store.clubNameId[temp.player_team_info.club_id] = response.name;
                    if (store.clubNameId[temp.computer_team_info.club_id]) {
                        temp.computer_team_info.name = store.clubNameId[temp.computer_team_info.club_id];
                        store.gamePveData = temp;
                    } else {
                        getClubByIdAPI({ club_id: temp.computer_team_info.club_id })
                            .then((response: any) => {
                                temp.computer_team_info.name = response.name;
                                store.clubNameId[temp.computer_team_info.club_id] = response.name;
                                store.gamePveData = temp;
                            })
                            .catch((_error: any) => {
                            });
                    }
                })
                .catch((_error: any) => {
                });
        }
    })
    .catch((_error: any) => {
    });

const gameEndId: Ref<number> = ref(0);
const nowAndEnd: ComputedRef = computed(() => {
    return gameEndId.value === 0 ? 'NOW' : '结束比赛';
});

function goNextTurn(): void {
    if (gameEndId.value !== 0) {
        if (timer) {
            clearInterval(timer);
        }
        routerPush({ name: 'game-result', query: { id: gameEndId.value } });
        store.gamePveData = {} as any;
        return;
    }
    if (isAuto.value) {
        // 按概率选战术
        const possibleList: Array<number> = [tactics.value[0].weight, 0, 0, 0, 0];
        for (let i: number = 1; i < tactics.value.length; i++) {
            possibleList[i] = possibleList[i - 1] + tactics.value[i].weight;
        }
        const result: number = Math.round(Math.random() * possibleList[possibleList.length - 1]);
        for (let i: number = 0; i < possibleList.length; i++) {
            if (result < possibleList[i]) {
                curTactic.value = tactics.value[i].value;
                break;
            }
        }
    }
    gamePveNextTurnAPI({ tactic: curTactic.value })
        .then((response: any) => {
            if (response.game_id !== 0) {
                gameEndId.value = response.game_id;
            }
            const temp = response;
            temp.player_team_info.name = store.clubNameId[temp.player_team_info.club_id];
            temp.computer_team_info.name = store.clubNameId[temp.computer_team_info.club_id];
            store.gamePveData = temp;
        })
        .catch((_error: any) => {
        });
}

watch(
    () => isAuto.value,
    newVal => {
        if (newVal) {
            goNextTurn();
            timer = setInterval(goNextTurn, 1000);
        } else if (timer) {
            clearInterval(timer);
        }
    }
);
defineExpose({ isAuto, curTactic, tactics });

// 选项框选择到手动比赛时，将isAuto设否
const handleBeforeLeave = (tabName: string) => {
    if (tabName == '手动') {
        if (isAuto.value) {
            message.info('切换为手动')
        }
        isAuto.value = false

    }
    return true
}

// 手动选择战术的触发函数
const selectTactic = (tactic: any) => {

    if (tactic == 'wait') {
        message.info('等待对方进攻')
        goNextTurn()
    } else {
        curTactic.value = tactic['value']
        message.info('选择了' + tactic['label'] + '战术')
        goNextTurn()
    }
}

// 调整手动战术选择界面按钮的状态
const isActive = (tacticName: String) => {
    if (totalData.value.game_info.cur_attacker == totalData.value.game_info.computer_club_id) {
        // 不是自己的回合
        if (tacticName == 'wait') {
            return true
        }
        return false
    } else {
        // 是自己回合
        if (tacticName == 'wait') {
            return false
        }
        if (tacticName == 'counter_attack' && !totalData.value.game_info.counter_attack_permitted) {
            // 不允许使用防守反击
            return false
        }
        return true
    }
}
</script>
