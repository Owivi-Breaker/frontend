<template>
    <n-grid cols="2">
        <n-gi>
            <n-card class="field">
                <div
                    v-for="elem in positionGrid"
                    :draggable="!!position[elem.pos]"
                    :style="elem.style"
                    class="player"
                    @dragend="dragend"
                    @dragstart="positionDragstart($event,elem.pos)"
                    @drop="positionDrop($event,elem.pos)"
                    @dragover.prevent
                >
                    <div v-if="position[elem.pos]" class="avatar">
                        <Avataaars :isCircle="false" height="80%" width="80%"/>
                        {{ position[elem.pos] }}
                    </div>
                </div>
            </n-card>
        </n-gi>

        <n-gi>
            <!--选项栏-->
            <n-card>
                <n-scrollbar style="max-height: 800px;" x-scrollable>
                    <n-card v-for="elem in playerData" size="small">
                        <n-grid cols="3" x-gap="9">
                            <n-gi
                                :draggable="true"
                                span="1"
                                @dragend="dragend"
                                @dragstart="selectionDragstart($event, elem)"
                                @drop="selectionDrop($event, elem)"
                                @dragover.prevent>
                                <Avataaars height="75%" width="75%"/>
                            </n-gi>
                            <n-gi span="2">
                                <n-descriptions :column="2" :title="elem.translated_name" label-placement="left">
                                    <n-descriptions-item label="国籍">{{
                                            elem.translated_nationality
                                        }}
                                    </n-descriptions-item>
                                    <n-descriptions-item label="年龄">{{ elem.age }}</n-descriptions-item>
                                    <n-descriptions-item label="能力">{{ elem.top_capa }}</n-descriptions-item>
                                    <n-descriptions-item label="位置">{{ elem.top_location }}</n-descriptions-item>
                                </n-descriptions>
                            </n-gi>
                        </n-grid>
                    </n-card>
                </n-scrollbar>
            </n-card>
        </n-gi>
    </n-grid>


</template>

<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import { ref, reactive, onMounted } from "vue";
import { getPlayersByClubAPI } from "@/apis/player";

const positionGrid = reactive(
    [
        {
            pos: 'LW',
            style: {
                position: 'absolute',
                left: "10%",
                top: "10%"
            }
        },
        {
            pos: 'ST1',
            style: {
                position: 'absolute',
                left: "34%",
                top: "10%"
            }
        },
        {
            pos: 'ST2',
            style: {
                position: 'absolute',
                left: "54%",
                top: "10%"
            }
        },
        {
            pos: 'RW',
            style: {
                position: 'absolute',
                left: "78%",
                top: "10%"
            }
        },
        {
            pos: 'CAM1',
            style: {
                position: 'absolute',
                left: "28%",
                top: "25%"
            }
        },
        {
            pos: 'CAM2',
            style: {
                position: 'absolute',
                left: "44%",
                top: "25%"
            }
        },
        {
            pos: 'CAM3',
            style: {
                position: 'absolute',
                left: "60%",
                top: "25%"
            }
        },
        {
            pos: 'LM',
            style: {
                position: 'absolute',
                left: "10%",
                top: "40%"
            }
        },
        {
            pos: 'CM1',
            style: {
                position: 'absolute',
                left: "28%",
                top: "40%"
            }
        },
        {
            pos: 'CM2',
            style: {
                position: 'absolute',
                left: "44%",
                top: "40%"
            }
        },
        {
            pos: 'CM3',
            style: {
                position: 'absolute',
                left: "60%",
                top: "40%"
            }
        },
        {
            pos: 'RM',
            style: {
                position: 'absolute',
                left: "78%",
                top: "40%"
            }
        },
        {
            pos: 'CDM1',
            style: {
                position: 'absolute',
                left: "28%",
                top: "55%"
            }
        },
        {
            pos: 'CDM2',
            style: {
                position: 'absolute',
                left: "44%",
                top: "55%"
            }
        },
        {
            pos: 'CDM3',
            style: {
                position: 'absolute',
                left: "60%",
                top: "55%"
            }
        },
        {
            pos: 'LB',
            style: {
                position: 'absolute',
                left: "10%",
                top: "70%"
            }
        },
        {
            pos: 'CB1',
            style: {
                position: 'absolute',
                left: "28%",
                top: "70%"
            }
        },
        {
            pos: 'CB2',
            style: {
                position: 'absolute',
                left: "44%",
                top: "70%"
            }
        },
        {
            pos: 'CB3',
            style: {
                position: 'absolute',
                left: "60%",
                top: "70%"
            }
        },
        {
            pos: 'RB',
            style: {
                position: 'absolute',
                left: "78%",
                top: "70%"
            }
        },
        {
            pos: 'GK',
            style: {
                position: 'absolute',
                left: "44%",
                top: "85%"
            }
        },
    ]
)

//region 拖曳功能
const position = reactive({
    LW: null,
    ST1: null,
    ST2: null,
    RW: null,
    CAM1: null,
    CAM2: null,
    CAM3: null,
    LM: null,
    CM1: null,
    CM2: null,
    CM3: null,
    RM: null,
    CDM1: null,
    CDM2: null,
    CDM3: null,
    LB: null,
    CB1: null,
    CB2: null,
    CB3: null,
    RB: null,
    GK: null

}) as any

const aList = ref([
    { id: '1', name: "梅西" },
    { id: '2', name: "C罗" },
    { id: '3', name: "莱万" },
    { id: '4', name: "本泽马" },
]);


const selectionDragstart = (event: DragEvent, elem: any) => {
    if (event.dataTransfer) {
        event.dataTransfer.setData('dragId', elem.id)
        event.dataTransfer.setData('dragCompo', 'selection')
    }

}

const selectionDrop = (event: DragEvent, elem: any) => {
    if (event.dataTransfer) {
        let dragCompo = event.dataTransfer.getData('dragCompo')
        if (dragCompo == 'selection') {
            // do nothing
            console.log('禁止从选项栏移到选项栏')
        } else if (dragCompo == 'position') {
            console.log("阵容槽到选项栏")
            let fromPos = event.dataTransfer.getData('pos')
            console.log(`${fromPos} 上的 ${position[fromPos]} 被替换为 ${elem.id}`)
            position[fromPos] = elem.id
        }
    }
}

const positionDragstart = (event: DragEvent, pos: string) => {
    if (event.dataTransfer) {
        event.dataTransfer.setData('dragId', position[pos])
        event.dataTransfer.setData('dragCompo', 'position')
        event.dataTransfer.setData('pos', pos)
    }
}

const positionDrop = (event: DragEvent, pos: string) => {
    if (event.dataTransfer) {
        let dragCompo = event.dataTransfer.getData('dragCompo')
        let dragId = event.dataTransfer.getData('dragId')
        if (dragCompo == 'selection') {
            console.log("选项位到阵容槽")
            for (let key in position) {
                if (position[key] == dragId) {
                    // 保证不出现两个相同球员
                    position[key] = null
                }
            }
            console.log(`${dragId} 移动到 ${pos} 位置`)
            position[pos] = dragId
            console.log(position)
        } else if (dragCompo == 'position') {
            console.log("阵容槽到阵容槽")
            let fromPos = event.dataTransfer.getData('pos')
            if (fromPos == pos) {
                console.log("没移动")
            } else {
                if (position[pos] == null) {
                    console.log(`${dragId} 从 ${fromPos} 移到 ${pos}`)
                    position[fromPos] = null
                    position[pos] = dragId
                } else {
                    console.log(`${dragId} 与 ${position[pos]} 交换位置 ; ${fromPos} 换到 ${pos}`)
                    position[fromPos] = position[pos]
                    position[pos] = dragId
                }
            }
        }
    }
}


const dragend = (event: DragEvent) => {
    if (event.dataTransfer) {
        event.dataTransfer.clearData()
    }
}

// endregion

// region 获取球员信息
let playerData = ref([]);

onMounted(
    () => {
        getPlayersByClubAPI({ club_id: 1, is_player_club: true })
            .then((response) => {
                playerData.value = response;
            });
    }
)
// endregion
</script>


<style>
.player {
    height: 9%;
    width: 12%;
    background-color: rgba(255, 255, 255, 0.2);


    border-radius: 50%;

}

.field {
    height: 800px;
    background: rgb(46, 125, 50);
}

.selection {
    display: flex;
}

.avatar {
    margin: 0 auto;
}
</style>