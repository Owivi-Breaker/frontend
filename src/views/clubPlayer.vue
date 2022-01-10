<template>
    <n-h2>球员列表</n-h2>
    <n-grid cols="2 l:2 xl:3 2xl:3" responsive="screen" x-gap="20" y-gap="20">
        <n-gi v-for="item in playerData" v-if="!isLoading">
            <PlayerCard :playerData="item"></PlayerCard>
        </n-gi>
    </n-grid>
</template>
<script lang="ts" setup>
import PlayerCard from '@/components/PlayerCard.vue';
import { onMounted, ref } from "vue";
import { getPlayersByClubAPI } from "@/apis/player";
let isLoading = ref(true);
let playerData = ref([]);
onMounted(
    () => {
        getPlayersByClubAPI({ club_id: 1, is_player_club: true })
            .then((response) => {
                playerData.value = response;
                isLoading.value = false;
            }).catch((_error: {}) => { });
    }
)
</script>