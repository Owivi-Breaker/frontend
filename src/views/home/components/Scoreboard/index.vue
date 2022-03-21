<template>
    <div class="mb-4 bg-white shadow-md rounded-lg p-6">
        <div class="flex items-center justify-between">
            <div class="s-title s-underline text-xl mb-6">{{ leagueName }}</div>

            <!-- <div>
                <a
                    class="text-sm font-medium text-primary hover:bg-primary-active rounded-lg p-2"
                    href="#"
                >
                    View
                    more
                </a>
            </div>-->
        </div>
        <div>
            <div class="overflow-x-auto">
                <div class="inline-block min-w-full">
                    <div class="overflow-hidden rounded-lg">
                        <table class="min-w-full divide-y divide-primary">
                            <thead class="bg-primary-active">
                                <tr class="text-sm">
                                    <th
                                        class="p-2 text-left"
                                        scope="col"
                                        v-for="item in title"
                                    >{{ item }}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y-3 divide-primary-active" v-if="!isLoading">
                                <tr
                                    v-for="item in pointsData"
                                    class="whitespace-nowrap text-sm"
                                    :class="{ 'bg-primary-active': item['我的'] }"
                                >
                                    <td
                                        class="p-2"
                                        v-bind:class="{ 'text-primary': item['我的'] }"
                                    >{{ item['名称'] }}</td>
                                    <td
                                        class="p-2"
                                        v-bind:class="{ 'text-primary': item['我的'] }"
                                    >{{ item['胜'] }}</td>
                                    <td
                                        class="p-2"
                                        v-bind:class="{ 'text-primary': item['我的'] }"
                                    >{{ item['平'] }}</td>
                                    <td
                                        class="p-2"
                                        v-bind:class="{ 'text-primary': item['我的'] }"
                                    >{{ item['负'] }}</td>
                                    <td
                                        class="p-2"
                                        v-bind:class="{ 'text-primary': item['我的'] }"
                                    >{{ item['净胜球'] }}</td>
                                    <td
                                        class="p-2 font-semibold"
                                        :class="{ 'text-primary': item['我的'] }"
                                    >
                                        {{
                                            item['积分']
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                            <!-- 加载中的表格 -->
                            <tbody class="divide-y-3 divide-primary-active" v-if="isLoading">
                                <tr>
                                    <td :colspan="title.length">
                                        <n-spin
                                            class="p-5 flex items-center"
                                            v-bind:show="isLoading"
                                        ></n-spin>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, ref, Ref } from 'vue';
import { getLeagueMeAPI, getPointsTableByLeagueAPI } from '@/apis/league';
import { getClubsByLeagueAPI } from '@/apis/club';
import { getSaveMeAPI } from '@/apis/save';

const rawPointsData: Ref<Array<object>> = ref([]);
const isLoading: Ref<boolean> = ref(true);
let clubId: number = 0;
let leagueName: Ref<String> = ref('');
getSaveMeAPI()
    .then((response: any) => {
        const gameSeason: number = response.season;
        clubId = response.player_club_id;
        getLeagueMeAPI()
            .then((response: any) => {
                const leagueID: number = response.id;
                leagueName.value = response.name;
                getPointsTableByLeagueAPI({ league_id: leagueID, game_season: gameSeason })
                    .then((response: any) => {
                        rawPointsData.value = response;
                        if (rawPointsData.value.length === 0) {
                            getClubsByLeagueAPI({ league_id: leagueID })
                                .then((response: any) => {
                                    rawPointsData.value = response;
                                    isLoading.value = false;
                                })
                                .catch((_error: {}) => {
                                    isLoading.value = false;
                                });
                        }
                        isLoading.value = false;
                    })
                    .catch((_error: {}) => {
                    });
            })
            .catch((_error: {}) => {
            });
    })
    .catch((_error: {}) => {
    });
const title: Array<string> = ['俱乐部', '胜', '平', '负', '净胜球', '积分'];
const pointsData: ComputedRef = computed(() =>
    rawPointsData.value.map((val: any) => {
        for (let item in title) {
            if (val[title[item]] === undefined) {
                if (title[item] === '俱乐部') {
                    val['俱乐部'] = val.name;
                } else {
                    val[title[item]] = 0;
                }
            }
        }
        val['我的'] = val['id'] === clubId;
        console.log(val)
        return val;
    })
);
</script>
<style scoped>
</style>
