<template>
    <n-h1>球员数据总览</n-h1>
    <n-tabs default-value="capa" size="large" type="card">
        <n-tab-pane name="capa" tab="能力">
            <n-data-table :columns="capaColumns" :data="capaData" :loading="capaLoading" striped />
        </n-tab-pane>
        <n-tab-pane name="perf" tab="表现">
            <n-data-table :columns="perfColumns" :data="perfLoading ? [] : perfData" :loading="perfLoading" striped />
        </n-tab-pane>
    </n-tabs>
</template>
<script lang="ts" setup>
import { getPlayersByClubAPI, getPlayerTotalGameDataAPI } from "@/apis/player";
import { getSaveMeAPI } from "@/apis/save";
import { getColor } from "@/utils/colorMap"
import { h, ref, computed, Ref, ComputedRef } from "vue";
import { NTag } from "naive-ui";

let rawCapaData: Ref = ref([]);
let rawPerfData: Ref = ref([]);
let capaLoading: Ref<boolean> = ref(true);
let perfLoading: Ref<boolean> = ref(true);
let clubId: number;
getSaveMeAPI()
    .then(response => {
        let gameSeason: number = response.season;
        clubId = response.player_club_id;
        getPlayersByClubAPI({ club_id: clubId, is_player_club: true })
            .then(response => {
                rawCapaData.value = response;
                capaLoading.value = false;
                let count = 0;
                for (let i: number = 0; i < rawCapaData.value.length; i++) {
                    let id: number = rawCapaData.value[i].id;
                    getPlayerTotalGameDataAPI({
                        player_id: id,
                        start_season: gameSeason,
                        end_season: gameSeason
                    })
                        .then(response => {
                            response["姓名"] = rawCapaData.value[i]["姓名"] ? rawCapaData.value[i]["姓名"] : rawCapaData.value[i]["translated_name"];
                            rawPerfData.value.push(response);
                            count++;
                            if (count === 24) {
                                perfLoading.value = false;
                            }
                        })
                        .catch((_error: {}) => { });
                }
            }).catch((_error: {}) => { });
    })
    .catch((_error: {}) => { });
let capaData: ComputedRef<any> = computed(() =>
    rawCapaData.value.map((value: any) => {
        value["姓名"] = value["translated_name"];
        delete value["translated_name"];
        value["年龄"] = value["age"];
        delete value["age"];
        value["国籍"] = value["translated_nationality"];
        delete value["translated_nationality"];
        if (value["capa"]) {
            value["射门"] = Math.round(value["capa"]["shooting"]);
            delete value["capa"]["shooting"];
            value["过人"] = Math.round(value["capa"]["dribbling"]);
            delete value["capa"]["dribbling"];
            value["防守"] = Math.round(value["capa"]["interception"]);
            delete value["capa"]["interception"];
            value["体力"] = Math.round(value["capa"]["stamina"]);
            delete value["capa"]["stamina"];
            value["速度"] = Math.round(value["capa"]["pace"]);
            delete value["capa"]["pace"];
            value["守门"] = Math.round(value["capa"]["goalkeeping"]);
            delete value["capa"]["goalkeeping"];
            value["侵略"] = Math.round(value["capa"]["aggression"]);
            delete value["capa"]["aggression"];
            value["任意球"] = Math.round(value["capa"]["free_kick"]);
            delete value["capa"]["free_kick"];
        }
        return value;
    })
);
let perfData: ComputedRef<any> = computed(() =>
    rawPerfData.value.map((value: any) => {
        value["出场"] = value["appearance"];
        delete value["appearance"];
        value["进球"] = value["goals"];
        delete value["goals"];
        value["助攻"] = value["assists"];
        delete value["assists"];
        value["平均评分"] = Math.round(value["final_rating"] * 10) / 10;
        delete value["final_rating"];
        value["传球（总/成功）"] = value["passes"] + "/" + value["pass_success"];
        delete value["passes"];
        delete value["pass_success"];
        value["抢断（总/成功）"] = value["tackles"] + "/" + value["tackle_success"];
        delete value["tackles"];
        delete value["tackle_success"];
        value["过人（总/成功）"] = value["dribbles"] + "/" + value["dribble_success"];
        delete value["dribbles"];
        delete value["dribble_success"];
        value["争顶（总/成功）"] = value["aerials"] + "/" + value["aerial_success"];
        delete value["aerials"];
        delete value["aerial_success"];
        return value;
    })
);

class capaItem {
    title: string;
    key: string;
    fixed: string | null;
    width: number | null;
    align: string;
    render: Function | null;
    sorter: string;

    constructor(title: string) {
        this.title = title;
        this.key = title;
        this.fixed = title === "姓名" ? "left" : null;
        this.width = title === "姓名" ? 150 : null;
        this.align = title === "姓名" || title === "国籍" ? "left" : "center";
        if (title === "年龄") {
            this.render = (row: any) => {
                return h(NTag, { style: { marginRight: "6px" }, type: "info" }, { default: () => row["年龄"] });
            }
        } else {
            this.render = (row: any) => {
                return h("p", {
                    style: {
                        "margin": 0,
                        "color": getColor(row[this.key], "text")
                    },
                }, { default: () => row[this.key] });
            }
        }
        this.sorter = "default";
    }
}

class perfItem {
    title: string;
    key: string;
    fixed: string | null;
    width: number | null;
    align: string;
    render: Function | null;
    sorter: string;

    constructor(title: string) {
        this.title = title;
        this.key = title;
        this.fixed = title === "姓名" ? "left" : null;
        this.width = title === "姓名" ? 150 : null;
        this.align = title === "姓名" ? "left" : "center";
        this.render = (row: any) => {
            return h("p", {
                style: {
                    "margin": 0,
                    "color": getColor(row[this.key], "text")
                },
            }, { default: () => row[this.key] });
        }
        this.sorter = "default";
    }
}

let capaColumns: Array<Object> = [new capaItem("姓名"), new capaItem("年龄"), new capaItem("国籍"), new capaItem("射门"), new capaItem("过人"),
new capaItem("防守"), new capaItem("体力"), new capaItem("速度"), new capaItem("守门"), new capaItem("侵略"), new capaItem("任意球")];
let perfColumns: Array<Object> = [new perfItem("姓名"), new perfItem("出场"), new perfItem("进球"), new perfItem("助攻"), new perfItem("平均评分"),
new perfItem("传球（总/成功）"), new perfItem("抢断（总/成功）"), new perfItem("过人（总/成功）"), new perfItem("争顶（总/成功）")];
</script>
<style>
</style>