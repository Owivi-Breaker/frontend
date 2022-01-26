<template>
    <n-card title=" ">
        <template #header-extra>
            <img :src="'http://s1.s100.vip:13127/Public/' + name + '.png'" alt="图片" class="teamAvatar" />
        </template>
        <n-scrollbar style="max-height: 280px;">
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
            <PlayerItem v-for="item in perfData" v-bind:player="item"></PlayerItem>
        </n-scrollbar>
    </n-card>
</template>
<script lang="ts" setup>
import { onMounted, Ref, ref, h, computed, ComputedRef } from "vue";
import { getPlayersByClubAPI, getPlayerTotalGameDataAPI } from "@/apis/player";
import { getSaveMeAPI } from "@/apis/save";
import PlayerItem from "@/components/OnGame/PlayerItem.vue";
let props: any = defineProps({
    club: Object
});
let id: Ref<Number> = ref(0);
let name: Ref<string> = ref("");
let rawCapaData: Ref = ref([]);
let rawPerfData: Ref = ref([]);
let capaLoading: Ref<boolean> = ref(true);
let perfLoading: Ref<boolean> = ref(true);
let clubId: number;
getSaveMeAPI().then(response => {
    let gameSeason: number = response.season;
    clubId = response.player_club_id;
    getPlayersByClubAPI({ club_id: clubId, is_player_club: true }).then(response => {
        rawCapaData.value = response;
        capaLoading.value = false;
        let count = 0;
        for (let i: number = 0; i < rawCapaData.value.length; i++) {
            let id: number = rawCapaData.value[i].id;
            getPlayerTotalGameDataAPI({ player_id: id, start_season: gameSeason, end_season: gameSeason }).then(response => {
                response["姓名"] = rawCapaData.value[i]["姓名"] ? rawCapaData.value[i]["姓名"] : rawCapaData.value[i]["translated_name"];
                rawPerfData.value.push(response);
                count++;
                if (count === 24) {
                    perfLoading.value = false;
                }
            }).catch((_error: {}) => { });
        }
    }).catch((_error: {}) => { });
}).catch((_error: {}) => { });
let perfMax: any = {
    "出场": 0,
    "进球": 0,
    "助攻": 0,
    "平均评分": 0,
    "传球总": 0,
    "传球成功": 0,
    "抢断总": 0,
    "抢断成功": 0,
    "过人总": 0,
    "过人成功": 0,
    "争顶总": 0,
    "争顶成功": 0,
};
let perfData: ComputedRef<any> = computed(() =>
    rawPerfData.value.map((value: any) => {
        function deal(key: string, rawKey: string): void {
            value[key] = value[rawKey];
            if (key === "平均评分") {
                value[key] = Math.round(value[key] * 100) / 100;
            }
            if (value[key] > perfMax[key]) {
                perfMax[key] = value[key];
            }
        }
        deal("出场", "appearance");
        deal("进球", "goals");
        deal("助攻", "assists");
        deal("平均评分", "final_rating");
        deal("传球总", "passes");
        deal("传球成功", "pass_success");
        deal("抢断总", "tackles");
        deal("抢断成功", "tackle_success");
        deal("过人总", "dribbles");
        deal("过人成功", "dribble_success");
        deal("争顶总", "aerials");
        deal("争顶成功", "aerial_success");
        return value;
    })
);
onMounted(
    () => {
        id.value = props.club.id;
        name.value = props.club.name;
    }
)
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