<template>
    <n-h2>球员列表</n-h2>

    <n-grid cols="2" x-gap="20">
        <n-gi v-for="item in PlayerData" v-if="!isLoading">
            <PlayerCard :playerData="item"></PlayerCard>
        </n-gi>
    </n-grid>
</template>

<script lang="ts" setup>
import PlayerCard from '@/components/PlayerCard.vue';
import { Ref } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { getPlayersByClubAPI } from "@/apis/player";

let isLoading: Ref<boolean> = ref(true);
let PlayerData: Ref<Array<object>> = ref([{'1': 2}]);
onMounted(
    () => {
        getPlayersByClubAPI({club_id: 1})
            .then((response) => {
                PlayerData.value = response;
                isLoading.value = false;
            });
    }
)

// const playerData = {
//     "id": 4,
//     "club_id": 1,
//     "name": "Lu Xi Fei",
//     "translated_name": "路西菲",
//     "translated_nationality": "格林纳达",
//     "age": 27,
//     "height": 172,
//     "weight": 78,
//     "birth_date": "08-27",
//     "wages": 0,
//     "real_stamina": 100,
//     "location_num": {
//         "ST_num": 0,
//         "CM_num": 1,
//         "LW_num": 0,
//         "RW_num": 0,
//         "CB_num": 0,
//         "LB_num": 0,
//         "RB_num": 0,
//         "GK_num": 0,
//         "CAM_num": 0,
//         "LM_num": 0,
//         "RM_num": 0,
//         "CDM_num": 0,
//     },
//     "capa": {
//         "shooting": 78,
//         "passing": 91,
//         "dribbling": 21,
//         "interception": 2,
//         "pace": 45,
//         "strength": 66,
//         "aggression": 72,
//         "anticipation": 99,
//         "free_kick": 58,
//         "stamina": 78,
//         "goalkeeping": 24,
//     },
//     "top_capa": 78.1,
//     "top_location": "CM",
//     "location_capa": {
//         "CM": 78.1,
//         "CAM": 59.65,
//         "LM": 57.4,
//         "RM": 57.4,
//         "CDM": 51.9,
//         "LW": 37.6,
//         "RW": 37.6,
//         "LB": 33.6,
//         "RB": 33.6,
//         "ST": 31.55,
//         "GK": 27.35,
//         "CB": 12.25
//     }
// }
</script>