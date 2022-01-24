<template>
    <n-popover trigger="hover" placement="top-start">
        <template #trigger>
            <n-space
                class="itemSpace"
                v-bind:class="{ itemSpaceOn: mouseOn }"
                align="center"
                justify="space-between"
                v-on:mouseenter="mouseOn = true;"
                v-on:mouseleave="mouseOn = false;"
            >
                <div class="name">{{ props.player["姓名"] }}</div>
                <div class="stamina">81</div>
                <div class="rating">{{ props.player["平均评分"] }}</div>
                <div class="goal">{{ props.player["进球"] }}</div>
                <div class="assist">{{ props.player["助攻"] }}</div>
                <div class="pass">{{ props.player["传球总"] + " / " + props.player["传球成功"] }}</div>
                <div class="tackle">{{ props.player["抢断总"] + " / " + props.player["抢断成功"] }}</div>
                <div class="dribble">{{ props.player["过人总"] + " / " + props.player["过人成功"] }}</div>
                <div class="aerial">{{ props.player["争顶总"] + " / " + props.player["争顶成功"] }}</div>
            </n-space>
        </template>
        <n-card style="width: 300px; height: 120px;" bordered="false" size="small">
            <n-grid cols="3">
                <n-gi span="1">
                    <div style="text-align: center;">
                        <Avataaars height="50" width="50" />
                        <p>{{ props.player["姓名"] }}</p>
                    </div>
                </n-gi>
                <n-gi span="2"></n-gi>
            </n-grid>
        </n-card>
    </n-popover>
</template>
<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue";
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
let props: any = defineProps({
    player: Object
});
let name: Ref<string> = ref("");
onMounted(() => {
    name.value = props.player["姓名"];
})
let mouseOn: Ref<Boolean> = ref(false)
</script>
<style>
.itemSpace {
    font-size: small;
    border-bottom: 1px solid rgb(239, 239, 245);
    cursor: default;
    padding: 1px;
}
.itemSpaceOn {
    background-color: rgb(244, 251, 255);
}
.name {
    display: inline-block;
    width: 80px;
}
.stamina {
    display: inline-block;
    width: 20px;
}
.rating {
    display: inline-block;
    width: 30px;
}
.goal {
    display: inline-block;
    width: 15px;
}
.assist {
    display: inline-block;
    width: 15px;
}
.pass {
    display: inline-block;
    width: 60px;
}
.tackle {
    display: inline-block;
    width: 60px;
}
.dribble {
    display: inline-block;
    width: 60px;
}
.aerial {
    display: inline-block;
    width: 60px;
}
</style>