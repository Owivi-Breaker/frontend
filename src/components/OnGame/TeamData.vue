<template>
    <n-card v-bind:title="name">
        <template #header-extra>
            <img :src="'http://s1.s100.vip:13127/Public/' + name + '.png'" alt="图片" class="teamAvatar" />
        </template>
        <n-scrollbar style="max-height: 280px;">
            <n-data-table :columns="perfColumns" :data="perfLoading ? [] : perfData" :loading="perfLoading" size="small" />
        </n-scrollbar>
    </n-card>
</template>
<script lang="ts" setup>
import { onMounted, Ref, ref, h, computed, ComputedRef } from "vue";
import { getPlayersByClubAPI, getPlayerTotalGameDataAPI } from "@/apis/player";
import { getSaveMeAPI } from "@/apis/save";
import { getColor } from "@/utils/colorMap"
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
class perfItem {
    title: string;
    key: string;
    fixed: string | null;
    width: number | null;
    align: string;
    render: Function | null;
    sorter: string | Function;
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
            this.sorter = "default";
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
            this.sorter = (a: { [x: string]: number; }, b: { [x: string]: number; }) => a[sumKey + "成功"] - b[sumKey + "成功"];
        }
    }
}
let perfColumns: Array<Object> = [new perfItem("姓名"), new perfItem("出场"), new perfItem("进球"), new perfItem("助攻"), new perfItem("平均评分"),
new perfItem("传球（总/成功）"), new perfItem("抢断（总/成功）"), new perfItem("过人（总/成功）"), new perfItem("争顶（总/成功）")];
onMounted(
    () => {
        id.value = props.club.id;
        name.value = props.club.name;
    }
)
</script>
<style>
.teamAvatar {
    width: 40px;
    height: 40px;
}
</style>