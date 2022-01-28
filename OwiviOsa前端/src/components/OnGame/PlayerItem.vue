<template>
    <n-popover trigger="hover" placement="top-start">
        <template #trigger>
            <n-space
                class="itemSpace"
                v-bind:class="{ itemSpaceOn: mouseOn }"
                align="center"
                justify="space-between"
                v-on:mouseenter="mouseOn = true"
                v-on:mouseleave="mouseOn = false"
            >
                <div class="name">{{ props.player["name"] }}</div>
                <div class="stamina">{{ props.player["final_stamina"] }}</div>
                <div class="rating">{{ props.player["final_rating"] }}</div>
                <div class="goal">{{ props.player["goals"] }}</div>
                <div class="assist">{{ props.player["assists"] }}</div>
                <div class="pass">{{ props.player["passes"] + " / " + props.player["pass_success"] }}</div>
                <div class="tackle">{{ props.player["tackles"] + " / " + props.player["tackle_success"] }}</div>
                <div class="dribble">{{ props.player["dribbles"] + " / " + props.player["dribble_success"] }}</div>
                <div class="aerial">{{ props.player["aerials"] + " / " + props.player["aerial_success"] }}</div>
            </n-space>
        </template>
        <n-card style="width: 350px; height: 150px" :bordered="false" size="small">
            <div style="margin-left: -25px; margin-right: -25px">
                <n-grid cols="3">
                    <n-gi span="1">
                        <div style="text-align: center">
                            <Avataaars height="50" width="50" />
                            <n-h4 style="margin-top: 0">{{ props.player["姓名"] }}</n-h4>
                        </div>
                    </n-gi>
                    <n-gi span="2">
                        <n-grid cols="2">
                            <n-gi>
                                <n-statistic label="一个数据">{{ 11 }}</n-statistic>
                            </n-gi>
                            <n-gi>
                                <n-statistic label="二个数据">{{ 22 }}</n-statistic>
                            </n-gi>
                            <n-gi>
                                <n-statistic label="三个数据">{{ 33 }}</n-statistic>
                            </n-gi>
                            <n-gi>
                                <n-statistic label="四个数据">{{ 44 }}</n-statistic>
                            </n-gi>
                        </n-grid>
                    </n-gi>
                </n-grid>
            </div>
        </n-card>
    </n-popover>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref, watch } from "vue";
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
defineComponent({ Avataaars });
let props: any = defineProps({
    player: Object,
});
let test: ComputedRef = computed(() => {
    console.log(props.player);
});
let mouseOn: Ref<Boolean> = ref(false);
</script>
<style scoped>
.itemSpace {
    font-size: small;
    border: 1px solid rgb(239, 239, 245);
    border-top: 0;
    cursor: default;
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0 !important;
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