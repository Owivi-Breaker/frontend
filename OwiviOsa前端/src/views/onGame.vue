<template>
    <n-grid cols="10" x-gap="10">
        <n-gi span="3">
            <n-card>
                <n-scrollbar style="max-height: 780px;">
                    <n-timeline>
                        <n-timeline-item v-bind:color="getColor(item.level, '', 1, 5)"
                                         v-for="item in commentaryList"
                                         v-bind:title="item.content"
                                         v-bind:time="item.time"></n-timeline-item>
                    </n-timeline>
                </n-scrollbar>
            </n-card>
        </n-gi>
        <n-gi span="3">
            <n-grid cols="1" y-gap="10">
                <n-gi>
                    <GameStatus v-bind:turns="totalData['game_info']['turns']" v-bind:playerTeamInfo="totalData['player_team_info']" v-bind:computerTeamInfo="totalData['computer_team_info']"></GameStatus>
                </n-gi>
                <n-gi>
                    <TacticalSelector></TacticalSelector>
                </n-gi>
                <n-gi>
                    <TacticalStatistic  v-bind:playerTeamInfo="totalData['player_team_info']" v-bind:computerTeamInfo="totalData['computer_team_info']"></TacticalStatistic>
                </n-gi>
            </n-grid>
        </n-gi>
        <n-gi span="4">
            <n-grid cols="1" y-gap="10">
                <n-gi v-for="item in teams">
                    <TeamData v-bind:club="item" style="height:406px"></TeamData>
                </n-gi>
            </n-grid>
        </n-gi>
    </n-grid>
</template>
<script lang="ts" setup>
    import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
    import GameStatus from "@/components/OnGame/GameStatus.vue";
    import TeamData from "@/components/OnGame/TeamData.vue";
    import TacticalStatistic from "@/components/OnGame/TacticalStatistic.vue";
    import TacticalSelector from "@/components/TacticalSelector.vue";
    import { getColor } from "@/utils/colorMap";
    defineComponent({ GameStatus, TeamData, TacticalStatistic, TacticalSelector });
    let totalData: Ref<any> = ref(
        {
            "game_info": {
                "player_club_id": 5,
                "computer_club_id": 3,
                "name": "英超",
                "type": "league",
                "date": "2020-08-14",
                "season": 1,
                "cur_attacker": 5,
                "turns": 10,
                "script": "比赛开始！\n\n阿森纳尝试下底传中\n麦朗妮抢到皮球\n\n利物浦尝试下底传中\n麦朗妮过掉了雅布里安\n麦朗妮一脚起球传中\n阿森纳抢到球权\n\n阿森纳尝试下底传中\n雅布里安一脚起球传中\n利物浦抢到球权\n\n利物浦尝试下底传中\n安茨过掉了贾科亚\n安茨一脚起球传中\n球员们尝试争顶\n捷夫扎亚将球解围\n阿森纳拿到球权\n\n阿森纳尝试下底传中\n贾科亚过掉了安茨\n贾科亚一脚起球传中\n球员们尝试争顶\n比德米德抢到球权\n比德米德起脚打门！\n球进啦！阿森纳 1:0 利物浦\n\n利物浦尝试倒三角传球\n索卡利斯基拿球，尝试过人\n雅布里安抢到皮球\n\n阿森纳尝试倒三角传球\n施特岑穆勒拿球，尝试过人\n安茨抢到皮球\n\n利物浦尝试中路渗透\n球员们尝试争顶\n楚鲁特将球解围\n进攻方仍然持球\n\n利物浦尝试下底传中\n麦朗妮过掉了雅布里安\n麦朗妮一脚起球传中\n球员们尝试争顶\n奥努尔坦抢到球权\n奥努尔坦起脚打门！\n球进啦！阿森纳 1:1 利物浦\n",
                "counter_attack_permitted": true
            },
            "player_team_info": {
                "club_id": 5,
                "name": "阿森纳",
                "isHome": false,
                "score": 1,
                "is_player": true,
                "attempts": 4,
                "wing_cross": 3,
                "wing_cross_success": 1,
                "under_cutting": 0,
                "under_cutting_success": 0,
                "pull_back": 1,
                "pull_back_success": 0,
                "middle_attack": 0,
                "middle_attack_success": 0,
                "counter_attack": 0,
                "counter_attack_success": 0
            },
            "computer_team_info": {
                "club_id": 3,
                "name": "利物浦",
                "isHome": true,
                "score": 2,
                "is_player": false,
                "attempts": 5,
                "wing_cross": 3,
                "wing_cross_success": 2,
                "under_cutting": 0,
                "under_cutting_success": 0,
                "pull_back": 1,
                "pull_back_success": 1,
                "middle_attack": 1,
                "middle_attack_success": 0,
                "counter_attack": 0,
                "counter_attack_success": 0
            },
            "player_players_info": [
                {
                    "player_id": 106,
                    "ori_location": "CM",
                    "real_location": "CB",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 0,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 100
                },
                {
                    "player_id": 107,
                    "ori_location": "CM",
                    "real_location": "CM",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 0,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 100
                },
                {
                    "player_id": 101,
                    "ori_location": "CB",
                    "real_location": "CB",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 3,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 1,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 2,
                    "aerial_success": 1,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 94
                },
                {
                    "player_id": 105,
                    "ori_location": "GK",
                    "real_location": "GK",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 1,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 1,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 97
                },
                {
                    "player_id": 110,
                    "ori_location": "LM",
                    "real_location": "CM",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 1,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 1,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 100
                },
                {
                    "player_id": 112,
                    "ori_location": "ST",
                    "real_location": "ST",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 1,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 1,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 100
                },
                {
                    "player_id": 98,
                    "ori_location": "ST",
                    "real_location": "ST",
                    "real_rating": 7.3,
                    "final_rating": 7.3,
                    "actions": 4,
                    "shots": 1,
                    "goals": 1,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 3,
                    "aerial_success": 3,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 95
                },
                {
                    "player_id": 102,
                    "ori_location": "CB",
                    "real_location": "CB",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 3,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 1,
                    "pass_success": 1,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 2,
                    "aerial_success": 1,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 94
                },
                {
                    "player_id": 108,
                    "ori_location": "RM",
                    "real_location": "CM",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 1,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 1,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 100
                },
                {
                    "player_id": 111,
                    "ori_location": "LB",
                    "real_location": "LB",
                    "real_rating": 6.8,
                    "final_rating": 6.8,
                    "actions": 3,
                    "shots": 0,
                    "goals": 0,
                    "assists": 1,
                    "passes": 1,
                    "pass_success": 1,
                    "dribbles": 1,
                    "dribble_success": 1,
                    "tackles": 1,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 96
                },
                {
                    "player_id": 104,
                    "ori_location": "RB",
                    "real_location": "RB",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 5,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 1,
                    "pass_success": 0,
                    "dribbles": 1,
                    "dribble_success": 0,
                    "tackles": 3,
                    "tackle_success": 1,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 92
                }
            ],
            "computer_players_info": [
                {
                    "player_id": 60,
                    "ori_location": "CM",
                    "real_location": "CB",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 5,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 5,
                    "pass_success": 5,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 99
                },
                {
                    "player_id": 59,
                    "ori_location": "CDM",
                    "real_location": "CM",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 3,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 2,
                    "pass_success": 1,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 1,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 96
                },
                {
                    "player_id": 50,
                    "ori_location": "CM",
                    "real_location": "CM",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 3,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 3,
                    "pass_success": 2,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 98
                },
                {
                    "player_id": 64,
                    "ori_location": "LB",
                    "real_location": "LW",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 5,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 1,
                    "pass_success": 1,
                    "dribbles": 2,
                    "dribble_success": 2,
                    "tackles": 2,
                    "tackle_success": 1,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 91
                },
                {
                    "player_id": 61,
                    "ori_location": "LM",
                    "real_location": "CM",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 1,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 1,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 100
                },
                {
                    "player_id": 49,
                    "ori_location": "ST",
                    "real_location": "ST",
                    "real_rating": 7.3,
                    "final_rating": 7.3,
                    "actions": 5,
                    "shots": 1,
                    "goals": 1,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 4,
                    "aerial_success": 2,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 90
                },
                {
                    "player_id": 56,
                    "ori_location": "GK",
                    "real_location": "GK",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 1,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 1,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 100
                },
                {
                    "player_id": 62,
                    "ori_location": "RB",
                    "real_location": "RB",
                    "real_rating": 6.8,
                    "final_rating": 6.8,
                    "actions": 5,
                    "shots": 0,
                    "goals": 0,
                    "assists": 1,
                    "passes": 2,
                    "pass_success": 1,
                    "dribbles": 2,
                    "dribble_success": 2,
                    "tackles": 1,
                    "tackle_success": 1,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 96
                },
                {
                    "player_id": 52,
                    "ori_location": "CB",
                    "real_location": "CB",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 1,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 1,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 97
                },
                {
                    "player_id": 53,
                    "ori_location": "CB",
                    "real_location": "CB",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 2,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 0,
                    "pass_success": 0,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 2,
                    "aerial_success": 1,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 95
                },
                {
                    "player_id": 57,
                    "ori_location": "RM",
                    "real_location": "RW",
                    "real_rating": 6,
                    "final_rating": 6,
                    "actions": 2,
                    "shots": 0,
                    "goals": 0,
                    "assists": 0,
                    "passes": 2,
                    "pass_success": 2,
                    "dribbles": 0,
                    "dribble_success": 0,
                    "tackles": 0,
                    "tackle_success": 0,
                    "aerials": 0,
                    "aerial_success": 0,
                    "saves": 0,
                    "save_success": 0,
                    "original_stamina": 100,
                    "final_stamina": 100
                }
            ]
        }
    )
    // 解说数据处理
    let commentaryList: ComputedRef = computed(() => {
        let scriptList: Array<Object> = totalData.value["game_info"]["script"].split("\n");
        let result = new Array<any>();
        for (let i: number = 0; i < scriptList.length; i++) {
            let unit: number = 90 / 50;
            let minute: string = Math.floor(i * unit).toString();
            let second: string = Math.round((i * unit - Math.floor(i * unit)) * 60).toString();
            if (minute.length < 2) {
                minute = "0" + minute;
            }
            if (second.length < 2) {
                second = "0" + second;
            }
            result.push({ "content": scriptList[i], "time": minute + ":" + second, "level": Math.floor(Math.random() * 5) + 1 });
        }
        for (let i: number = 0; i < result.length; i++) {
            if (result[i]["content"] === "") {
                result.splice(i, i);
            }
        }
        return result;
    })
    let teams = [
        {
            "id": 1,
            "name": "曼城"
        },
        {
            "id": 2,
            "name": "曼联"
        }
    ]
</script>