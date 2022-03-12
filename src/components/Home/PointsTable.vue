<template>
    <n-card title="赛季排行榜">
        <n-data-table :columns="columns" :data="pointsData" :loading="isLoading" size="small"/>
    </n-card>
</template>
<script lang="ts" setup>
import {computed, ComputedRef, h, ref} from 'vue';
import {Ref} from '@vue/reactivity';
import {getLeagueMeAPI, getPointsTableByLeagueAPI} from '@/apis/league';
import {getClubsByLeagueAPI} from '@/apis/club';
import {getSaveMeAPI} from '@/apis/save';

const rawPointsData: Ref<Array<object>> = ref([]);
const isLoading: Ref<boolean> = ref(true);
let clubId: number = 0;
getSaveMeAPI()
    .then(response => {
        const gameSeason: number = response.season;
        clubId = response.player_club_id;
        getLeagueMeAPI()
            .then(response => {
                const leagueID: number = response.id;
                getPointsTableByLeagueAPI({league_id: leagueID, game_season: gameSeason})
                    .then(response => {
                        rawPointsData.value = response;
                        if (rawPointsData.value.length === 0) {
                            getClubsByLeagueAPI({league_id: leagueID})
                                .then(response => {
                                    rawPointsData.value = response;
                                })
                                .catch((_error: {}) => {
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
const pointsData: ComputedRef<any> = computed(() =>
    rawPointsData.value.map((value: any) => {
        value['俱乐部'] = value['名称'] ? value['名称'] : value.name;
        delete value['名称'] ? value['名称'] : value.name;
        value['积分'] = value['积分'] ? value['积分'] : 0;
        value[' 胜 '] = value['胜'] ? value['胜'] : 0;
        delete value['胜'] ? value['胜'] : null;
        value[' 平 '] = value['平'] ? value['平'] : 0;
        delete value['平'] ? value['平'] : null;
        value[' 负 '] = value['负'] ? value['负'] : 0;
        delete value['负'] ? value['负'] : null;
        value['净胜'] = value['净胜球'] ? value['净胜球'] : 0;
        delete value['净胜球'] ? value['净胜球'] : null;
        value['胜球'] = value['胜球'] ? value['胜球'] : 0;
        value['输球'] = value['输球'] ? value['输球'] : 0;
        return value;
    })
);

function getTitleColor(item: any): string {
    return clubId === item.id ? 'green' : 'black';
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
        this.fixed = title === '俱乐部' ? 'left' : null;
        this.width = title === '俱乐部' ? 100 : null;
        this.align = title === '俱乐部' ? 'left' : 'center';
        this.render = (row: any) => {
            return h('p', {style: {margin: 0, color: getTitleColor(row)}}, {default: () => row[this.key]});
        };
        this.sorter = 'default';
    }
}

const columns: Array<Object> = [
    new columnItem('俱乐部'),
    new columnItem('积分'),
    new columnItem(' 胜 '),
    new columnItem(' 平 '),
    new columnItem(' 负 '),
    new columnItem('净胜'),
    new columnItem('胜球'),
    new columnItem('输球')
];
</script>
<style></style>
