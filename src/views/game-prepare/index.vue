<template>
    <div class="p-6">
        <div class="grid grid-cols-2 gap-10">
            <!-- 球场 -->
            <div class="relative h-128 3xl:h-160 w-full bg-primary-active rounded-lg shadow-md">
                <!--阵容块-->
                <div v-for="(value, key) in posInfo" :key="key" :style="value.fieldStyle">
                    <div class="flex items-center justify-center gap-4">
                        <!--阵容槽-->
                        <div
                            v-for="(pos, key) in activePos(key)"
                            :key="key"
                            :draggable="true"
                            @dragend="dragend"
                            @dragstart="positionDragstart($event, pos)"
                            @drop="positionDrop($event, pos)"
                            @dragover.prevent
                        >
                            <div v-if="position[pos]">
                                <!-- 阵容槽弹出框 -->
                                <n-popover raw trigger="click">
                                    <!-- 在阵容槽中的人物头像 -->
                                    <template #trigger>
                                        <div class="flex flex-col items-center gap-2">
                                            <div style="height: 50px; width: 50px">
                                                <Avataaars
                                                    :is-circle="false"
                                                    v-bind="getAvatar(position[pos])"
                                                />
                                            </div>
                                            <div
                                                class="text-primary font-semibold"
                                            >{{ getPlayerDataById(position[pos]).translated_name }}</div>
                                        </div>
                                    </template>
                                    <n-card
                                        :title="getPlayerDataById(position[pos]).translated_name"
                                    >
                                        <template #header-extra>
                                            <n-progress
                                                :circle-gap="5"
                                                :percentage="[20, 50]"
                                                :stroke-width="10"
                                                status="success"
                                                style="width: 40px; margin: 0 10px 0 40px"
                                                type="multiple-circle"
                                            ></n-progress>
                                        </template>
                                        <n-descriptions :column="3" label-placement="top">
                                            <n-descriptions-item
                                                label="能力"
                                            >{{ getPlayerDataById(position[pos]).location_capa[key] }}</n-descriptions-item>
                                            <n-descriptions-item label="位置">{{ key }}</n-descriptions-item>
                                            <n-descriptions-item label="占位">bar</n-descriptions-item>
                                            <n-descriptions-item label="占位">bar</n-descriptions-item>
                                            <n-descriptions-item label="占位">bar</n-descriptions-item>
                                            <n-descriptions-item label="占位">bar</n-descriptions-item>
                                        </n-descriptions>
                                    </n-card>
                                </n-popover>
                            </div>
                        </div>
                    </div>
                </div>

                <!--遮罩层-->
                <template v-for="(value, key) in posInfo" :key="key">
                    <div
                        v-show="value.isMasked"
                        :style="value.maskStyle"
                        class="opacity-40 bg-primary rounded-lg shadow-md"
                        @drop="fieldDrop($event, key)"
                        @dragover.prevent
                    >
                        <div class="p-3 text-primary-hover font-semibold text-lg">{{ key }}</div>
                    </div>
                </template>
            </div>

            <!--选项栏-->
            <div class="s-card p-6">
                <div class="s-title s-underline">球员</div>
                <n-scrollbar class="max-h-100 3xl:max-h-150" x-scrollable>
                    <div class="flex flex-wrap gap-5 p-5">
                        <!-- 选项栏弹出框 -->
                        <n-popover
                            v-for="(elem, key) in store.playerData"
                            :key="key"
                            raw
                            trigger="click"
                        >
                            <template #trigger>
                                <!-- 球员 -->
                                <div
                                    :draggable="true"
                                    @dragend="dragend"
                                    @dragstart="selectionDragstart($event, elem)"
                                    @drop="selectionDrop($event, elem)"
                                    @dragover.prevent
                                >
                                    <div class="flex flex-col items-center gap-2">
                                        <div class="w-15 h-15">
                                            <Avataaars
                                                :is-circle="false"
                                                v-bind="elem.avatar"
                                                class="rounded-lg"
                                                :class="{ 'bg-primary-active border-primary-active border-4 ': isChosen(elem.id) }"
                                            ></Avataaars>
                                        </div>
                                        <div
                                            class="text-primary font-semibold"
                                        >{{ elem.translated_name }}</div>
                                    </div>
                                </div>
                            </template>
                            <n-card>
                                <template #header>
                                    <div class="s-title s-underline">{{ elem.translated_name }}</div>
                                </template>
                                <template #header-extra>
                                    <n-progress
                                        :circle-gap="5"
                                        :percentage="[20, 50]"
                                        :stroke-width="10"
                                        status="success"
                                        style="width: 40px"
                                        type="multiple-circle"
                                    ></n-progress>
                                </template>
                                <n-grid cols="3">
                                    <n-gi span="1">
                                        <div
                                            style="display: flex; height: 120px; width: 120px; margin: 0 30px 30px 0"
                                        >
                                            <Avataaars :is-circle="false" v-bind="elem.avatar"></Avataaars>
                                        </div>
                                    </n-gi>
                                    <n-gi span="2">
                                        <n-descriptions :column="3" label-placement="top">
                                            <n-descriptions-item label="能力">{{ elem.top_capa }}</n-descriptions-item>
                                            <n-descriptions-item label="占位">bar</n-descriptions-item>
                                            <n-descriptions-item label="占位">bar</n-descriptions-item>
                                            <n-descriptions-item label="占位">bar</n-descriptions-item>
                                            <n-descriptions-item label="占位">bar</n-descriptions-item>
                                            <n-descriptions-item label="占位">bar</n-descriptions-item>
                                        </n-descriptions>
                                    </n-gi>
                                </n-grid>
                            </n-card>
                        </n-popover>
                    </div>
                </n-scrollbar>
            </div>

            <!-- 战术栏 -->
            <div class="s-card p-10 place-self-start">
                <div class="s-title s-underline mb-4">战术配置</div>
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col" v-for="(item, key) in tactics" :key="key">
                        <div class="font-semibold">{{ item.label }}</div>
                        <n-slider class tooltip v-model:value="item.weight" />
                    </div>
                </div>

                <div class="flex item-center gap-3 justify-end mt-5">
                    <n-button type="primary" @click="startGame">
                        <div class>开始比赛</div>
                    </n-button>

                    <n-button @click="skipGame">
                        <div class="text-primary">跳过比赛</div>
                    </n-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, reactive, Ref, ref } from 'vue';
import { Router } from 'vue-router';
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
import { useRouterPush } from '@/composables';
import { gamePveSkipAPI, gamePveStartAPI } from '@/apis/gamePve';
import { useStore } from '@/stores/store';

const { routerPush } = useRouterPush();

defineComponent({ Avataaars });
const store = useStore();
// region 拖曳功能
const posInfo = reactive({
    ST: {
        name: ['ST1', 'ST2'],
        isMasked: false,
        activeNum: 0,
        maxNum: 2,
        fieldStyle: {
            position: 'absolute',
            left: '30%',
            top: '5%',
            height: '15%',
            width: '40%'
        },
        maskStyle: {
            position: 'absolute',
            left: '30%',
            top: '5%',
            height: '15%',
            width: '40%'
        }
    },
    LW: {
        name: ['LW'],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: 'absolute',
            left: '0',
            top: '8%',
            height: '15%',
            width: '29%'
        },
        maskStyle: {
            position: 'absolute',
            left: '0',
            top: '8%',
            height: '15%',
            width: '29%'
        }
    },
    RW: {
        name: ['RW'],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: 'absolute',
            // left: '70%',
            right: '0',
            top: '8%',
            height: '15%',
            width: '29%'
        },
        maskStyle: {
            position: 'absolute',
            // left: '70%',
            right: '0',
            top: '8%',
            height: '15%',
            width: '29%'
        }
    },
    CAM: {
        name: ['CAM1', 'CAM2'],
        isMasked: false,
        activeNum: 0,
        maxNum: 2,
        fieldStyle: {
            position: 'absolute',
            left: '30%',
            top: '21%',
            height: '14%',
            width: '40%'
        },
        maskStyle: {
            position: 'absolute',
            left: '30%',
            top: '21%',
            height: '14%',
            width: '40%'
        }
    },
    LM: {
        name: ['LM'],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: 'absolute',
            left: '0',
            top: '33%',
            height: '14%',
            width: '24%'
        },
        maskStyle: {
            position: 'absolute',
            left: '0',
            top: '33%',
            height: '14%',
            width: '24%'
        }
    },
    RM: {
        name: ['RM'],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: 'absolute',
            left: '76%',
            top: '33%',
            height: '14%',
            width: '24%'
        },
        maskStyle: {
            position: 'absolute',
            left: '76%',
            top: '33%',
            height: '14%',
            width: '24%'
        }
    },
    CM: {
        name: ['CM1', 'CM2', 'CM3'],
        isMasked: false,
        activeNum: 0,
        maxNum: 3,
        fieldStyle: {
            position: 'absolute',
            left: '25%',
            top: '36%',
            height: '14%',
            width: '50%'
        },
        maskStyle: {
            position: 'absolute',
            left: '25%',
            top: '36%',
            height: '14%',
            width: '50%'
        }
    },
    CDM: {
        name: ['CDM1', 'CDM2'],
        isMasked: false,
        activeNum: 0,
        maxNum: 2,
        fieldStyle: {
            position: 'absolute',
            left: '30%',
            top: '51%',
            height: '14%',
            width: '40%'
        },
        maskStyle: {
            position: 'absolute',
            left: '30%',
            top: '51%',
            height: '14%',
            width: '40%'
        }
    },
    LB: {
        name: ['LB'],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: 'absolute',
            left: '0',
            top: '63%',
            height: '14%',
            width: '24%'
        },
        maskStyle: {
            position: 'absolute',
            left: '0',
            top: '63%',
            height: '14%',
            width: '24%'
        }
    },
    RB: {
        name: ['RB'],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: 'absolute',
            left: '76%',
            top: '63%',
            height: '14%',
            width: '24%'
        },
        maskStyle: {
            position: 'absolute',
            left: '76%',
            top: '63%',
            height: '14%',
            width: '24%'
        }
    },
    CB: {
        name: ['CB1', 'CB2', 'CB3'],
        isMasked: false,
        activeNum: 0,
        maxNum: 3,
        fieldStyle: {
            position: 'absolute',
            left: '25%',
            top: '66%',
            height: '14%',
            width: '50%'
        },
        maskStyle: {
            position: 'absolute',
            left: '25%',
            top: '66%',
            height: '14%',
            width: '50%'
        }
    },
    GK: {
        name: ['GK'],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: 'absolute',
            left: '30%',
            top: '81%',
            height: '14%',
            width: '40%'
        },
        maskStyle: {
            position: 'absolute',
            left: '30%',
            top: '81%',
            height: '14%',
            width: '40%'
        }
    }
}) as any;

const position = reactive({
    LW: null,
    ST1: null,
    ST2: null,
    RW: null,
    CAM1: null,
    CAM2: null,
    LM: null,
    CM1: null,
    CM2: null,
    CM3: null,
    RM: null,
    CDM1: null,
    CDM2: null,
    LB: null,
    CB1: null,
    CB2: null,
    CB3: null,
    RB: null,
    GK: null
}) as any;

// 被编入阵容的球员数量
const activePlayerNum = computed(() => {
    let count = 0;
    for (const i in position) {
        if (position[i] != null) {
            count++;
        }
    }
    return count;
});

// 判断该id球员是否被选中
const isChosen = (id: number) => {
    for (const key in position) {
        if (position[key] == id) {
            return true;
        }
    }
    return false;
};
// 将所有未满位置的遮罩层打开
const openMaskNotEmpty = (oriPos: string | null) => {
    for (const key in posInfo) {
        // 大位置
        for (const pos of posInfo[key].name) {
            // 小位置
            if (position[pos] == null) {
                // 如果有未满的位置，打开遮罩层
                posInfo[key].isMasked = true;
                console.log(`${key} 的遮罩层已打开`);
                break;
            }
        }
    }
    if (oriPos) {
        // 将拖曳源的遮罩层关闭，确保拖曳正常进行
        for (const key in posInfo) {
            for (const pos of posInfo[key].name) {
                if (pos == oriPos && posInfo[key].isMasked == true) {
                    posInfo[key].isMasked = false;
                    console.log(`${key} 由于是拖曳源，因此关闭遮罩层`);
                    break;
                }
            }
        }
    }
};

// 关闭所有遮罩层
const closeAllMask = () => {
    for (const key in posInfo) {
        posInfo[key].isMasked = false;
    }
};

const activePos = (pos: string | number) => {
    // 获取指定大位置的非空小位置
    const posList = posInfo[pos].name;
    return posList.filter((val: string) => {
        return position[val] != null;
    });
};

const selectionDragstart = (event: DragEvent, elem: any) => {
    openMaskNotEmpty(null);
    if (event.dataTransfer && event.target) {
        event.dataTransfer.setData('dragId', elem.id);
        event.dataTransfer.setData('dragCompo', 'selection');
    }
};

const selectionDrop = (event: DragEvent, elem: any) => {
    if (event.dataTransfer) {
        const dragCompo = event.dataTransfer.getData('dragCompo');
        if (dragCompo == 'selection') {
            // do nothing
            console.log('禁止从选项栏移到选项栏');
        } else if (dragCompo == 'position') {
            // 检查大位置区域中是否已有此球员
            for (const key in position) {
                if (position[key] == elem.id) {
                    position[key] = null;
                    break;
                }
            }
            console.log('阵容槽到选项栏');
            const fromPos = event.dataTransfer.getData('pos');
            console.log(`${fromPos} 上的 ${position[fromPos]} 被替换为 ${elem.id}`);
            position[fromPos] = elem.id;
        }
    }
};

const positionDragstart = (event: DragEvent, pos: string) => {
    // 打开所有未满位置的遮罩层
    openMaskNotEmpty(pos);

    if (event.dataTransfer) {
        event.dataTransfer.setData('dragId', position[pos]);
        event.dataTransfer.setData('dragCompo', 'position');
        event.dataTransfer.setData('pos', pos);
    }
};

const positionDrop = (event: DragEvent, pos: string) => {
    if (event.dataTransfer) {
        const dragCompo = event.dataTransfer.getData('dragCompo');
        const dragId = event.dataTransfer.getData('dragId');
        if (dragCompo == 'selection') {
            if (activePlayerNum.value >= 11) {
                return;
            }
            console.log('选项位到阵容槽');
            for (const key in position) {
                if (position[key] == dragId) {
                    // 保证不出现两个相同球员
                    position[key] = null;
                }
            }
            console.log(`${dragId} 移动到 ${pos} 位置`);
            position[pos] = dragId;
            console.log(position);
        } else if (dragCompo == 'position') {
            console.log('阵容槽到阵容槽');
            const fromPos = event.dataTransfer.getData('pos');
            if (fromPos == pos) {
                console.log('没移动');
            } else if (position[pos] == null) {
                console.log(`${dragId} 从 ${fromPos} 移到 ${pos}`);
                position[fromPos] = null;
                position[pos] = dragId;
            } else {
                console.log(`${dragId} 与 ${position[pos]} 交换位置 ; ${fromPos} 换到 ${pos}`);
                position[fromPos] = position[pos];
                position[pos] = dragId;
            }
        }
    }
};

const fieldDrop = (event: DragEvent, pos: string | number) => {
    if (event.dataTransfer) {
        const dragCompo = event.dataTransfer.getData('dragCompo');
        const dragId = event.dataTransfer.getData('dragId');
        const fromPos = event.dataTransfer.getData('pos');
        if (dragCompo == 'selection') {
            if (activePlayerNum.value >= 11) {
                return;
            }
            // 检查大位置区域中是否已有此球员
            let existKey: string = '';
            for (const key in position) {
                if (position[key] == dragId) {
                    existKey = key;
                    break;
                }
            }
            // 挑选空位 将球员放入
            for (let i = 0; i < posInfo[pos].name.length; i++) {
                const nowPos: string = posInfo[pos].name[i]; // 取出当前遍历到的小位置
                if (!position[nowPos]) {
                    // 填充任意一个没有球员的阵容槽
                    position[nowPos] = dragId;
                    console.log(`球员 ${dragId} 经过位置块拖曳到位置 ${nowPos}`);
                    if (existKey) {
                        position[existKey] = null;
                    }
                    break;
                }
            }
        } else if (dragCompo == 'position') {
            // 挑选空位 将球员放入
            let success = false;
            for (let i = 0; i < posInfo[pos].name.length; i++) {
                const nowPos: string = posInfo[pos].name[i]; // 取出当前遍历到的小位置
                if (!position[nowPos]) {
                    // 填充任意一个没有球员的阵容槽
                    position[nowPos] = dragId;
                    console.log(`球员 ${dragId} 从 ${fromPos} 转移到位置 ${nowPos}`);
                    success = true;
                    break;
                }
            }
            if (success) {
                // 删除原位置上的球员
                position[fromPos] = null;
            }
        }
    }
};

const dragend = (event: DragEvent) => {
    closeAllMask();
    if (event.dataTransfer) {
        event.dataTransfer.clearData();
    }
};

// region 获取球员信息
const getPlayerDataById = (id: number) => {
    for (const p of store.playerData) {
        if (p.id == id) {
            return p;
        }
    }
    return null;
};

const getAvatar = (playerId: number | null) => {
    if (playerId == null) {
        return {};
    }
    const playerData: any = getPlayerDataById(playerId);
    if (playerData == null) {
        return {};
    }
    return playerData.avatar;
};
// endregion

// 获取最终阵容
const getUltimateTactic = () => {
    const re = {} as any;
    for (const key in posInfo) {
        re[key] = [];
        for (const pos of posInfo[key].name) {
            if (position[pos] != null) {
                re[key].push(position[pos]);
            }
        }
    }
    const result = {} as any;
    for (const key in re) {
        for (let i: number = 0; i < re[key].length; i++) {
            const id = re[key][i];
            result[id] = key;
        }
    }
    return result;
};
declare const window: Window & { $router: Router; $message: any };
const curTactic: Ref<string> = ref('wing_cross');
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

function skipGame(): void {
    const lineup: Object = getUltimateTactic();
    if (Object.keys(lineup).length < 11) {
        window.$message.error('阵容不完整，请补充球员');
        return;
    }
    const tactic: any = new Object();
    for (const item in tactics.value) {
        tactic[tactics.value[item].value] = tactics.value[item].weight;
    }
    gamePveSkipAPI({ lineup, tactic_weight: tactic })
        .then((_response: any) => {
            // TODO 加id
            routerPush({ name: 'game-result' });
        })
        .catch((_error: any) => {
        });
}

function startGame(): void {
    const lineup: Object = getUltimateTactic();
    if (Object.keys(lineup).length < 11) {
        window.$message.error('阵容不完整，请补充球员');
        return;
    }
    const tactic: any = new Object();
    for (const item in tactics.value) {
        tactic[tactics.value[item].value] = tactics.value[item].weight;
    }
    gamePveStartAPI({ lineup, tactic_weight: tactic })
        .then((_response: any) => {
            routerPush({ name: 'game-on' });
        })
        .catch((_error: any) => {
        });
}

defineExpose({
    getUltimateTactic,
    getAvatar,
    getPlayerDataById,
    dragend,
    fieldDrop,
    tactics,
    curTactic,
    skipGame,
    startGame
});
</script>

<style>
.field {
    height: 600px;
    background: rgb(56, 125, 50);
}

.mask {
    background: #878b99;
    opacity: 0.4;
}
</style>
