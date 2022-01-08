<template>
    <n-card class="field">
        <draggable v-model="aList"
                   :group="{ name: 'a', put: true }"
                   item-key="id" @end="end">
            <template #item="{ element }">
                <div class="player">{{ element.id }}</div>
            </template>
        </draggable>

        <n-space>
            <div class="player">
                <draggable v-model="cList"
                           :group="{ name: 'a', put: true }"
                           item-key="id">
                    <template #item="{ element }">
                        <div class="player">{{ element.id }}</div>
                    </template>
                </draggable>
            </div>
            <div class="player">
                <draggable v-model="bList"
                           :group="{ name: 'a', put:true }"
                           item-key="id">
                    <template #item="{ element }">
                        <div class="player">{{ element.id }}</div>
                    </template>
                </draggable>
            </div>
            <div class="player"></div>
            <div class="player"></div>
            <div class="player"></div>
        </n-space>

        <n-space>
            <div class="player"></div>
            <div class="player"></div>
        </n-space>

        <n-space>
            <div class="player"></div>
            <div class="player"></div>
            <div class="player"></div>
            <div class="player"></div>
            <div class="player"></div>
        </n-space>

        <n-space>

            <div class="player"></div>
            <div class="player"></div>
        </n-space>

        <n-space>
            <div class="player"></div>
            <div class="player"></div>
            <div class="player"></div>
            <div class="player"></div>
            <div class="player"></div>
        </n-space>

        <n-space>
            <div class="player"></div>
        </n-space>
    </n-card>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable'
import { ref } from "vue";

const aList = ref([
    { id: 1, name: "java程序设计基础" },
    { id: 2, name: "数据结构与算法" },
    { id: 3, name: "数据库原理" },
    { id: 4, name: "软件工程" },
]);

const bList = ref([])
const cList = ref([])

function end({ from, to, oldIndex, newIndex }) {
    console.log(from, to)

    for (let i of from.childNodes) {
        console.log(i.innerText)
    }

    console.log(newIndex, oldIndex)
}


</script>

<style>
.player {
    height: 50px;
    width: 50px;
    background-color: rgba(255, 255, 255, 0.2);

    /*width: 6%;*/
    /*height: 6%;*/
    border-radius: 50%;
    /*background: hsla(0, 0%, 100%, .2);*/
}

.field {
    height: 200px;
    background: rgb(46, 125, 50);
}

.line {
    margin-top: 40px
}
</style>