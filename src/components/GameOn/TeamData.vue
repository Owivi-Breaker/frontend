<template>
    <n-scrollbar x-scrollable>
        <div class="s-card pb-3 overflow-x-auto">
            <!-- club logo -->
            <!-- <div class="pb-4">
            <img
                v-if="props.club"
                :src="'http://shu-huai.cn:13127/Public/' + props.club.name + '.png'"
                alt="图片"
                class="teamAvatar"
            />
            </div>-->

            <table class="min-w-full divide-y divide-primary overflow-hidden rounded-lg text-left">
                <thead class="bg-primary-active" :style="clubBg(clubName, -0.7)">
                    <tr class="text-sm">
                        <th class="py-2 px-4" scope="col" v-for="col in cols">{{ col }}</th>
                    </tr>
                </thead>
                <tbody class="divide-y-3 divide-primary-active">
                    <tr
                        v-for="(item, key) in perfData"
                        :key="key"
                        class="whitespace-nowrap text-sm"
                    >
                        <td class="py-2 px-4">
                            <span class="mr-1">{{ item['name'] }}</span>
                            <span
                                v-if="item['goals'] >= 3"
                                class="text-primary"
                                :style="clubTx(clubName)"
                            >
                                <icon-ion:football />
                                <span>{{ item['goals'] }}</span>
                            </span>

                            <span
                                v-if="item['goals'] < 3"
                                v-for="i of item['goals']"
                                class="text-primary"
                                :style="clubTx(clubName)"
                            >
                                <icon-ion:football />
                            </span>

                            <span
                                v-if="item['assists'] >= 3"
                                class="text-primary"
                                :style="clubTx(clubName)"
                            >
                                <icon-mdi:shoe-cleat />
                                <span>{{ item['assists'] }}</span>
                            </span>

                            <span
                                v-if="item['assists'] < 3"
                                v-for="i of item['assists']"
                                class="text-primary"
                                :style="clubTx(clubName)"
                            >
                                <icon-mdi:shoe-cleat />
                            </span>
                        </td>

                        <td>
                            <div
                                :style="{ 'color': getColor(item['final_stamina'], 'text', 45, 100) }"
                            >{{ item['final_stamina'] }}</div>
                        </td>
                        <td>
                            <div
                                :style="{ 'color': getColor(item['final_rating'], 'text', 4, 10) }"
                            >{{ item['final_rating'] }}</div>
                        </td>

                        <td>
                            <span v-if="item['passes'] == 0 && item['pass_success'] == 0">-</span>
                            <span v-if="item['passes'] != 0 || item['pass_success'] != 0">
                                <span>{{ item['pass_success'] }}</span>
                                <span class="text-primary">{{ '/' }}</span>
                                <span>{{ item['passes'] }}</span>
                            </span>
                        </td>

                        <td>
                            <span v-if="item['tackles'] == 0 && item['tackle_success'] == 0">-</span>
                            <span v-if="item['tackles'] != 0 || item['tackle_success'] != 0">
                                <span>{{ item['tackle_success'] }}</span>
                                <span class="text-primary">{{ '/' }}</span>
                                <span>{{ item['tackles'] }}</span>
                            </span>
                        </td>

                        <td>
                            <span v-if="item['dribbles'] == 0 && item['dribble_success'] == 0">-</span>
                            <span v-if="item['dribbles'] != 0 || item['dribble_success'] != 0">
                                <span>{{ item['dribble_success'] }}</span>
                                <span class="text-primary">{{ '/' }}</span>
                                <span>{{ item['dribbles'] }}</span>
                            </span>
                        </td>

                        <td>
                            <span v-if="item['aerials'] == 0 && item['aerial_success'] == 0">-</span>
                            <span v-if="item['aerials'] != 0 || item['aerial_success'] != 0">
                                <span>{{ item['aerial_success'] }}</span>
                                <span class="text-primary">{{ '/' }}</span>
                                <span>{{ item['aerials'] }}</span>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </n-scrollbar>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { getPlayerByIdAPI } from '@/apis/player';
import { PlayerItem } from '@/components/GameOn';
import { useStore } from '@/stores/store';
import { getColor, clubBg, clubTx } from '@/utils/colorMap';

const store = useStore();
defineComponent({ PlayerItem });
const props: any = defineProps({
    playerInfo: Array,
    pos: String,
    clubName: String
});


const clubName: ComputedRef = computed(() => {
    return props.clubName
});


let cols: Array<String> = ['姓名',
    '体力',
    '评分',
    '传球',
    '抢断',
    '过人',
    '争顶'
];

const isGetting: Array<boolean> = [false, false, false, false, false, false, false, false, false, false, false];
// 球员数据
const perfData: ComputedRef = computed(() => {
    if (!props.playerInfo) {
        return [];
    }
    const result = props.playerInfo;
    for (let i: number = 0; i < props.playerInfo.length; i++) {
        if (store.playerNameId[result[i].player_id] !== undefined || isGetting[i]) {
            result[i].name = store.playerNameId[result[i].player_id];
        } else {
            isGetting[i] = true;
            getPlayerByIdAPI({ player_id: props.playerInfo[i].player_id }).then((response: { translated_name: any; }) => {
                result[i].name = response.translated_name;
                store.playerNameId[result[i].player_id] = response.translated_name;
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
