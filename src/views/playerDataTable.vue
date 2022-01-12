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
            value["射门"] = Math.round(value["capa"]["shooting"] * 100) / 100;
            delete value["capa"]["shooting"];
            value["过人"] = Math.round(value["capa"]["dribbling"] * 100) / 100;
            delete value["capa"]["dribbling"];
            value["防守"] = Math.round(value["capa"]["interception"] * 100) / 100;
            delete value["capa"]["interception"];
            value["体力"] = Math.round(value["capa"]["stamina"] * 100) / 100;
            delete value["capa"]["stamina"];
            value["速度"] = Math.round(value["capa"]["pace"] * 100) / 100;
            delete value["capa"]["pace"];
            value["守门"] = Math.round(value["capa"]["goalkeeping"] * 100) / 100;
            delete value["capa"]["goalkeeping"];
            value["侵略"] = Math.round(value["capa"]["aggression"] * 100) / 100;
            delete value["capa"]["aggression"];
            value["任意球"] = Math.round(value["capa"]["free_kick"] * 100) / 100;
            delete value["capa"]["free_kick"];
        }
        return value;
    })
);
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
            delete value[rawKey];
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
        this.align = "left";
        if (title === "年龄") {
            this.render = (row: any) => {
                return h(NTag, { style: { marginRight: "6px" }, type: "info" }, { default: () => row["年龄"] });
            }
        } else {
            this.render = (row: any) => {
                return h("p", { style: { "margin": 0, "color": getColor(row[this.key], "text") } }, { default: () => row[this.key] });
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
        this.align = "left";
        if (title === "姓名" || title === "出场" || title === "进球" || title === "助攻" || title === "平均评分") {
            this.render = (row: any) => {
                return h("p", {
                    style: {
                        "margin": 0,
                        "color": getColor(row[this.key], "text", 0, perfMax[title])
                    },
                }, { default: () => row[this.key] });
            }
        }
        else {
            let sumKey: string = this.key.slice(0, 2);
            this.render = (row: any) => {
                return h("p", {
                    style: {
                        "margin": 0,
                        "color": getColor(row[this.key], "text", 0, perfMax[title])
                    },
                }, {
                    default: () => [
                        h("span", {
                            style: {
                                "margin": 0,
                                "color": getColor(row[sumKey + "总"], "text", 0, perfMax[sumKey + "总"])
                            },
                        }, { default: () => row[sumKey + "总"] }),
                        " / ",
                        h("span", {
                            style: {
                                "margin": 0,
                                "color": getColor(row[sumKey + "成功"], "text", 0, perfMax[sumKey + "成功"])
                            },
                        }, { default: () => row[sumKey + "成功"] })
                    ]
                });
            }
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