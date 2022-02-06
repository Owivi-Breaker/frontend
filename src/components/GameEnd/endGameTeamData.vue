<template>
    <n-space class="itemSpace" align="center" justify="space-between">
        <div class="name">姓名</div>
        <div class="rating">评分</div>
        <div class="pass">传球</div>
        <div class="tackle">抢断</div>
        <div class="dribble">过人</div>
        <div class="aerial">争顶</div>
    </n-space>
    <n-space class="itemSpace" align="center" justify="space-between"
             v-for="(item, key) in props.playerInfo" v-bind:player="item" v-bind:key="key">
        <div class="name">{{ item["player_name"] }}</div>
        <div class="rating">{{ item["final_rating"] }}</div>
        <div class="pass">{{ item["pass_success"] + " / " + item["passes"] }}</div>
        <div class="tackle">{{ item["tackle_success"] + " / " + item["tackles"] }}</div>
        <div class="dribble">{{ item["dribble_success"] + " / " + item["dribbles"] }}</div>
        <div class="aerial">{{ item["aerial_success"] + " / " + item["aerials"] }}</div>
    </n-space>
</template>

<script lang="ts" setup>
import { useStore } from "@/stores/store";

const store = useStore();
let props: any = defineProps({
    playerInfo: Array,
});
defineExpose({ props });
</script>

<style scoped>
.itemSpace {
    font-size: small;
    border: 1px solid rgb(239, 239, 245);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: rgb(247, 247, 250);
    height: 100%;
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0 !important;
}

.name {
    display: inline-block;
    width: 95px;
}

.rating {
    display: inline-block;
    width: 30px;
}

.pass {
    display: inline-block;
    width: 45px;
}

.tackle {
    display: inline-block;
    width: 45px;
}

.dribble {
    display: inline-block;
    width: 45px;
}

.aerial {
    display: inline-block;
    width: 45px;
}
</style>
