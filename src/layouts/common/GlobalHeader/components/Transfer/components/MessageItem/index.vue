<template>
    <div>
        <div class="item" v-if="negoHistory.isMe">
            <n-space justify="end" align="center">
                <div class="myMessageDiv">
                    <n-text class="myMessage">
                        {{ negoHistory.message }}
                    </n-text>
                </div>
                <img class="itemAva" v-bind:src="negoHistory.avatar" alt="头像">
            </n-space>
        </div>
        <div class="item" v-if="!negoHistory.isMe">
            <n-space justify="begin" align="center">
                <Avataaars class="itemAva" :is-circle="false" v-bind="negoHistory.avatar"/>
                <div class="hisMessageDiv">
                    <n-text class="hisMessage">
                        {{ negoHistory.message }}
                    </n-text>
                </div>
            </n-space>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import {PlayerAvatar} from "@/interface";

const props: any = defineProps<{
    negoHistory: {
        isMe: boolean,
        message: string,
        avatar: string | PlayerAvatar,
    },
}>();
</script>
<style scoped>
.item {
    padding-top: 5px;
    padding-bottom: 5px;
}

.myMessageDiv {
    background-color: deepskyblue;
    max-width: 160px;
    padding: 10px;
    border-radius: 5px;
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-all;
}

.hisMessageDiv {
    background-color: white;
    max-width: 160px;
    padding: 10px;
    border-radius: 5px;
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-all;
}

.myMessage {
    color: white;
}

.hisMessage {
    color: black;
}

.itemAva {
    height: 40px;
    width: 40px;
}

</style>
