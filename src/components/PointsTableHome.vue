<template>
    <n-card class="pointsTableCard" title="赛季排行榜">
        <n-scrollbar style="height: 400px;">
            <n-data-table :columns="columns" :data="pointsData" :loading="isLoading"
                          :max-height="250"
                          size="small"/>
        </n-scrollbar>
    </n-card>
</template>
<script lang="ts" setup>
import { getLeaguesAPI, getPointsTableByLeagueAPI } from "@/apis/league";
import { getSaveAPI } from "@/apis/save";
import { ref, h, computed, ComputedRef } from 'vue';
import { Ref } from "@vue/reactivity";
import { storage } from '../utils';

let rawPointsData: Ref = ref([]);
let isLoading: Ref<boolean> = ref(true);
let clubId: Ref<number> = ref(0);
getSaveAPI().then(response => {
    let saveID: number = (Number)(storage.get('saveID')) - 1;
    let gameSeason: number = response[saveID].season;
    clubId.value = response[0].player_club_id;
    getLeaguesAPI().then(response => {
        let leagueID: number = response[0].id;
        getPointsTableByLeagueAPI({ league_id: leagueID, game_season: gameSeason }).then(response => {
            rawPointsData.value = response;
            isLoading.value = false;
        }).catch(error => {
            switch (error.message) {
                default:
                    console.log("网络错误");
            }
        });
    });
});
let pointsData: ComputedRef<any> = computed(() =>
    rawPointsData.value.map((value: any) => {
        value["俱乐部"] = value["名称"];
        delete value["名称"];
        value[" 胜 "] = value["胜"];
        delete value["胜"];
        value[" 平 "] = value["平"];
        delete value["平"];
        value[" 负 "] = value["负"];
        delete value["负"];
        value["净胜"] = value["净胜球"];
        delete value["净胜球"];
        return value;
    })
)

function getTitleColor(item: any): string {
    return clubId.value === item["id"] ? "green" : "black";
}

class columnItem {
    title: string;
    key: string;
    fixed: string | null;
    width: number | null;
    align: string;
    render: Function;
    sorter: string;

    constructor(title: string) {
        this.title = title;
        this.key = title;
        this.fixed = title === "俱乐部" ? "left" : null;
        this.width = title === "俱乐部" ? 200 : null;
        this.align = title === "俱乐部" ? "left" : "center";
        this.render = (row: any) => {
            return h('p', { style: { "color": getTitleColor(row) }, }, { default: () => row[this.key] });
        }
        this.sorter = "default";
    }
}

let columns: Array<Object> = [new columnItem("俱乐部"), new columnItem("积分"), new columnItem(" 胜 "), new columnItem(" 平 "), new columnItem(" 负 "),
    new columnItem("净胜"), new columnItem("胜球"), new columnItem("输球")];
</script>
<style>
.pointsTableCard {
    height: 500px;
}
</style>