<template>
    <n-card title=" ">
        <template #header-extra>
            <img :src="'http://s1.s100.vip:13127/Public/' + props.club.name + '.png'" alt="图片" class="teamAvatar" />
        </template>
        <n-scrollbar style="max-height: 280px">
            <n-space class="itemSpace" align="center" justify="space-between">
                <div class="name">姓名</div>
                <div class="stamina">体力</div>
                <div class="rating">实时评分</div>
                <div class="goal">进球</div>
                <div class="assist">助攻</div>
                <div class="pass">传球总 / 传球成功</div>
                <div class="tackle">抢断总 / 抢断成功</div>
                <div class="dribble">过人总 / 过人成功</div>
                <div class="aerial">争顶总 / 争顶成功</div>
            </n-space>
            <PlayerItem v-for="(item, key) in perfData" v-bind:player="item" v-bind:key="key"></PlayerItem>
        </n-scrollbar>
    </n-card>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, defineComponent } from "vue";
import { getPlayerByIdAPI } from "@/apis/player";
import { PlayerItem } from "@/components/OnGame";
import { useStore } from "@/stores/store";
const store = useStore();
defineComponent({ PlayerItem });
let props: any = defineProps({
    club: Object,
    playerInfo: Array,
});
let isGetting: Array<boolean> = [false, false, false, false, false, false, false, false, false, false, false];
let perfData: ComputedRef<any> = computed(() => {
    let result = props.playerInfo;
    for (let i: number = 0; i < props.playerInfo.length; i++) {
        if (store.playerNameId[result[i]["player_id"]] !== undefined || isGetting[i]) {
            result[i]["name"] = store.playerNameId[result[i]["player_id"]];
        } else {
            isGetting[i] = true;
            getPlayerByIdAPI({ player_id: props.playerInfo[i]["player_id"] }).then((response) => {
                result[i]["name"] = response["translated_name"];
                store.playerNameId[result[i]["player_id"]] = response["translated_name"];
            });
        }
    }
    return result;
});
defineExpose({ props, perfData });
</script>

<style scoped>
.teamAvatar {
    width: 40px;
    height: 40px;
}
.itemSpace {
    font-size: small;
    cursor: default;
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
