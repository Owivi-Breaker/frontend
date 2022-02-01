<template>
    <n-grid cols="3" x-gap="10">
        <n-gi>
            <n-card class="field">
                <!--阵容块-->
                <div v-for="(value, key) in posInfo" v-bind:key="key" :style="value.fieldStyle">
                    <n-space justify="center">
                        <!--阵容槽-->
                        <div
                            v-for="(pos, key) in activePos(key)"
                            :draggable="true"
                            @dragend="dragend"
                            @dragstart="positionDragstart($event, pos)"
                            @drop="positionDrop($event, pos)"
                            @dragover.prevent
                            v-bind:key="key"
                        >
                            <div v-if="position[pos]">
                                <n-popover raw trigger="click">
                                    <template #trigger>
                                        <n-space vertical align="center">
                                            <div style="height: 50px; width: 50px">
                                                <Avataaars :isCircle="false" v-bind="getAvatar(position[pos])" />
                                            </div>
                                            <n-h4>{{ getPlayerDataById(position[pos]).translated_name }}</n-h4>
                                        </n-space>
                                    </template>
                                    <n-card :title="getPlayerDataById(position[pos]).translated_name">
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
                                            <n-descriptions-item label="能力">
                                                {{ getPlayerDataById(position[pos]).location_capa[key] }}
                                            </n-descriptions-item>
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
                    </n-space>
                </div>

                <!--遮罩层-->
                <template v-for="(value, key) in posInfo" v-bind:key="key">
                    <div v-show="value.isMasked" :style="value.maskStyle" class="mask" @drop="fieldDrop($event, key)" @dragover.prevent>
                        <n-h4>{{ key }}</n-h4>
                    </div>
                </template>
            </n-card>
        </n-gi>
        <n-gi>
            <!--选项栏-->
            <n-card>
                <n-scrollbar style="max-height: 800px" x-scrollable>
                    <n-space justify="space-around">
                        <n-popover v-for="(elem, key) in store.playerData" v-bind:key="key" raw trigger="click">
                            <template #trigger>
                                <n-card
                                    :bordered="false"
                                    :draggable="true"
                                    :embedded="isChosen(elem.id)"
                                    size="small"
                                    @dragend="dragend"
                                    @dragstart="selectionDragstart($event, elem)"
                                    @drop="selectionDrop($event, elem)"
                                    @dragover.prevent
                                >
                                    <n-space vertical align="center">
                                        <div style="height: 50px; width: 50px">
                                            <Avataaars :isCircle="false" v-bind="elem.avatar"></Avataaars>
                                        </div>
                                        <n-h4>{{ elem.translated_name }}</n-h4>
                                    </n-space>
                                </n-card>
                            </template>
                            <n-card>
                                <template #header>
                                    <n-h2>{{ elem.translated_name }}</n-h2>
                                </template>
                                <template #header-extra>
                                    <n-progress :circle-gap="5" :percentage="[20, 50]" :stroke-width="10" status="success" style="width: 40px" type="multiple-circle"></n-progress>
                                </template>
                                <n-grid cols="3">
                                    <n-gi span="1">
                                        <div style="display: flex; height: 120px; width: 120px; margin: 0 30px 30px 0">
                                            <Avataaars :isCircle="false" v-bind="elem.avatar"></Avataaars>
                                        </div>
                                    </n-gi>
                                    <n-gi span="2">
                                        <n-descriptions :column="3" label-placement="top">
                                            <n-descriptions-item label="能力">
                                                {{ elem.top_capa }}
                                            </n-descriptions-item>
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
                    </n-space>
                </n-scrollbar>
            </n-card>
        </n-gi>
        <n-gi>
            <n-grid cols="1" y-gap="10">
                <n-gi>
                    <n-card title="战术配置">
                        <n-statistic v-for="(item, key) in tactics" v-bind:key="key">
                            <template #label>{{ item["label"] }}</template>
                            <template #default>
                                <n-slider v-model:value="item.weight" />
                            </template>
                        </n-statistic>
                        <n-space align="center" item-style="display: flex; align-item: center;" justify="end">
                            <n-button type="primary" v-on:click="startGame">开始比赛</n-button>
                            <p style="margin: 0">或</p>
                            <n-button v-on:click="skipGame">跳过比赛</n-button>
                        </n-space>
                    </n-card>
                </n-gi>
            </n-grid>
        </n-gi>
    </n-grid>
</template>

<script lang="ts" setup>
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import { ref, reactive, onMounted, computed, Ref, defineComponent } from "vue";
import { getPlayersByClubAPI } from "@/apis/player";
import { gamePveSkipAPI, gamePveStartAPI, gamePveNextTurnAPI } from "@/apis/gamePve";
import { getClubByIdAPI } from "@/apis/club";
import { useStore } from "@/stores/store";
import { Router } from "vue-router";
defineComponent({ Avataaars });
const store = useStore();
//region 拖曳功能
const posInfo = reactive({
    ST: {
        name: ["ST1", "ST2"],
        isMasked: false,
        activeNum: 0,
        maxNum: 2,
        fieldStyle: {
            position: "absolute",
            left: "30%",
            top: "5%",
            height: "15%",
            width: "40%",
        },
        maskStyle: {
            position: "absolute",
            left: "30%",
            top: "5%",
            height: "15%",
            width: "40%",
        },
    },
    LW: {
        name: ["LW"],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: "absolute",
            left: "0",
            top: "8%",
            height: "15%",
            width: "29%",
        },
        maskStyle: {
            position: "absolute",
            left: "0",
            top: "8%",
            height: "15%",
            width: "29%",
        },
    },
    RW: {
        name: ["RW"],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: "absolute",
            left: "71%",
            top: "8%",
            height: "15%",
            width: "30%",
        },
        maskStyle: {
            position: "absolute",
            left: "71%",
            top: "8%",
            height: "15%",
            width: "30%",
        },
    },
    CAM: {
        name: ["CAM1", "CAM2"],
        isMasked: false,
        activeNum: 0,
        maxNum: 2,
        fieldStyle: {
            position: "absolute",
            left: "30%",
            top: "21%",
            height: "14%",
            width: "40%",
        },
        maskStyle: {
            position: "absolute",
            left: "30%",
            top: "21%",
            height: "14%",
            width: "40%",
        },
    },
    LM: {
        name: ["LM"],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: "absolute",
            left: "0",
            top: "33%",
            height: "14%",
            width: "24%",
        },
        maskStyle: {
            position: "absolute",
            left: "0",
            top: "33%",
            height: "14%",
            width: "24%",
        },
    },
    RM: {
        name: ["RM"],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: "absolute",
            left: "76%",
            top: "33%",
            height: "14%",
            width: "24%",
        },
        maskStyle: {
            position: "absolute",
            left: "76%",
            top: "33%",
            height: "14%",
            width: "24%",
        },
    },
    CM: {
        name: ["CM1", "CM2", "CM3"],
        isMasked: false,
        activeNum: 0,
        maxNum: 3,
        fieldStyle: {
            position: "absolute",
            left: "25%",
            top: "36%",
            height: "14%",
            width: "50%",
        },
        maskStyle: {
            position: "absolute",
            left: "25%",
            top: "36%",
            height: "14%",
            width: "50%",
        },
    },
    CDM: {
        name: ["CDM1", "CDM2"],
        isMasked: false,
        activeNum: 0,
        maxNum: 2,
        fieldStyle: {
            position: "absolute",
            left: "30%",
            top: "51%",
            height: "14%",
            width: "40%",
        },
        maskStyle: {
            position: "absolute",
            left: "30%",
            top: "51%",
            height: "14%",
            width: "40%",
        },
    },
    LB: {
        name: ["LB"],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: "absolute",
            left: "0",
            top: "63%",
            height: "14%",
            width: "24%",
        },
        maskStyle: {
            position: "absolute",
            left: "0",
            top: "63%",
            height: "14%",
            width: "24%",
        },
    },
    RB: {
        name: ["RB"],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: "absolute",
            left: "76%",
            top: "63%",
            height: "14%",
            width: "24%",
        },
        maskStyle: {
            position: "absolute",
            left: "76%",
            top: "63%",
            height: "14%",
            width: "24%",
        },
    },
    CB: {
        name: ["CB1", "CB2", "CB3"],
        isMasked: false,
        activeNum: 0,
        maxNum: 3,
        fieldStyle: {
            position: "absolute",
            left: "25%",
            top: "66%",
            height: "14%",
            width: "50%",
        },
        maskStyle: {
            position: "absolute",
            left: "25%",
            top: "66%",
            height: "14%",
            width: "50%",
        },
    },
    GK: {
        name: ["GK"],
        isMasked: false,
        activeNum: 0,
        maxNum: 1,
        fieldStyle: {
            position: "absolute",
            left: "30%",
            top: "81%",
            height: "14%",
            width: "40%",
        },
        maskStyle: {
            position: "absolute",
            left: "30%",
            top: "81%",
            height: "14%",
            width: "40%",
        },
    },
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
    GK: null,
}) as any;

// 被编入阵容的球员数量
const activePlayerNum = computed(() => {
    let count = 0;
    for (let i in position) {
        if (position[i] != null) {
            count++;
        }
    }
    return count;
});

// 判断该id球员是否被选中
const isChosen = (id: number) => {
    for (let key in position) {
        if (position[key] == id) {
            return true;
        }
    }
    return false;
};
// 将所有未满位置的遮罩层打开
const openMaskNotEmpty = (oriPos: string | null) => {
    for (let key in posInfo) {
        // 大位置
        for (let pos of posInfo[key].name) {
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
        for (let key in posInfo) {
            for (let pos of posInfo[key].name) {
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
    for (let key in posInfo) {
        posInfo[key].isMasked = false;
    }
};

const activePos = (pos: string | number) => {
    // 获取指定大位置的非空小位置
    let posList = posInfo[pos].name;
    return posList.filter((val: string) => {
        return position[val] != null;
    });
};

const selectionDragstart = (event: DragEvent, elem: any) => {
    openMaskNotEmpty(null);
    if (event.dataTransfer && event.target) {
        event.dataTransfer.setData("dragId", elem.id);
        event.dataTransfer.setData("dragCompo", "selection");
    }
};

const selectionDrop = (event: DragEvent, elem: any) => {
    if (event.dataTransfer) {
        let dragCompo = event.dataTransfer.getData("dragCompo");
        if (dragCompo == "selection") {
            // do nothing
            console.log("禁止从选项栏移到选项栏");
        } else if (dragCompo == "position") {
            // 检查大位置区域中是否已有此球员
            for (let key in position) {
                if (position[key] == elem.id) {
                    position[key] = null;
                    break;
                }
            }
            console.log("阵容槽到选项栏");
            let fromPos = event.dataTransfer.getData("pos");
            console.log(`${fromPos} 上的 ${position[fromPos]} 被替换为 ${elem.id}`);
            position[fromPos] = elem.id;
        }
    }
};

const positionDragstart = (event: DragEvent, pos: string) => {
    // 打开所有未满位置的遮罩层
    openMaskNotEmpty(pos);

    if (event.dataTransfer) {
        event.dataTransfer.setData("dragId", position[pos]);
        event.dataTransfer.setData("dragCompo", "position");
        event.dataTransfer.setData("pos", pos);
    }
};

const positionDrop = (event: DragEvent, pos: string) => {
    if (event.dataTransfer) {
        let dragCompo = event.dataTransfer.getData("dragCompo");
        let dragId = event.dataTransfer.getData("dragId");
        if (dragCompo == "selection") {
            if (activePlayerNum.value >= 11) {
                return;
            }
            console.log("选项位到阵容槽");
            for (let key in position) {
                if (position[key] == dragId) {
                    // 保证不出现两个相同球员
                    position[key] = null;
                }
            }
            console.log(`${dragId} 移动到 ${pos} 位置`);
            position[pos] = dragId;
            console.log(position);
        } else if (dragCompo == "position") {
            console.log("阵容槽到阵容槽");
            let fromPos = event.dataTransfer.getData("pos");
            if (fromPos == pos) {
                console.log("没移动");
            } else {
                if (position[pos] == null) {
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
    }
};

const fieldDrop = (event: DragEvent, pos: string | number) => {
    if (event.dataTransfer) {
        let dragCompo = event.dataTransfer.getData("dragCompo");
        let dragId = event.dataTransfer.getData("dragId");
        let fromPos = event.dataTransfer.getData("pos");
        if (dragCompo == "selection") {
            if (activePlayerNum.value >= 11) {
                return;
            }
            // 检查大位置区域中是否已有此球员
            let existKey: string = "";
            for (let key in position) {
                if (position[key] == dragId) {
                    existKey = key;
                    break;
                }
            }
            // 挑选空位 将球员放入
            for (let i = 0; i < posInfo[pos].name.length; i++) {
                let nowPos: string = posInfo[pos].name[i]; // 取出当前遍历到的小位置
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
        } else if (dragCompo == "position") {
            // 挑选空位 将球员放入
            let success = false;
            for (let i = 0; i < posInfo[pos].name.length; i++) {
                let nowPos: string = posInfo[pos].name[i]; // 取出当前遍历到的小位置
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
    for (let p of store.playerData) {
        if (p["id"] == id) {
            return p;
        }
    }
    return null;
};

const getAvatar = (playerId: number | null) => {
    if (playerId == null) {
        return {};
    }
    let playerData: any = getPlayerDataById(playerId);
    if (playerData == null) {
        return {};
    }
    return playerData.avatar;
};
// endregion

// 获取最终阵容
const getUltimateTactic = () => {
    let re = {} as any;
    for (let key in posInfo) {
        re[key] = [];
        for (let pos of posInfo[key].name) {
            if (position[pos] != null) {
                re[key].push(position[pos]);
            }
        }
    }
    let result = {} as any;
    for (let key in re) {
        for (let i: number = 0; i < re[key].length; i++) {
            let id = re[key][i];
            result[id] = key;
        }
    }
    return result;
};
declare const window: Window & { $router: Router; $message: any };
let curTactic: Ref<string> = ref("wing_cross");
let tactics: Ref<Array<any>> = ref([
    {
        label: "下底传中",
        value: "wing_cross",
        weight: 50,
    },
    {
        label: "边路内切",
        value: "under_cutting",
        weight: 50,
    },
    {
        label: "倒三角",
        value: "pull_back",
        weight: 50,
    },
    {
        label: "中路渗透",
        value: "middle_attack",
        weight: 50,
    },
    {
        label: "防守反击",
        value: "counter_attack",
        weight: 50,
    },
]);
function skipGame(): void {
    let lineup: Object = getUltimateTactic();
    if (Object.keys(lineup).length < 11) {
        window.$message.error("阵容不完整，请补充球员");
        return;
    }
    let tactic: any = new Object();
    for (let item in tactics.value) {
        tactic[tactics.value[item].value] = tactics.value[item].weight;
    }
    gamePveSkipAPI({ lineup: lineup, tactic_weight: tactic })
        .then((_response: any) => {
            window.$router.push({ name: "endGame" });
        })
        .catch((_error: any) => {});
}
function startGame(): void {
    let lineup: Object = getUltimateTactic();
    if (Object.keys(lineup).length < 11) {
        window.$message.error("阵容不完整，请补充球员");
        return;
    }
    let tactic: any = new Object();
    for (let item in tactics.value) {
        tactic[tactics.value[item].value] = tactics.value[item].weight;
    }
    gamePveStartAPI({ lineup: lineup, tactic_weight: tactic })
        .then((_response: any) => {
            window.$router.push({ name: "onGame" });
        })
        .catch((_error: any) => {});
}
defineExpose({ getUltimateTactic, getAvatar, getPlayerDataById, dragend, fieldDrop, tactics, curTactic, skipGame, startGame });
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
