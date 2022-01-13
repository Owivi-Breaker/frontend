<template>
    <n-h2>球员列表</n-h2>
    <n-grid cols="2 l:2 xl:3 2xl:3" responsive="screen" x-gap="20" y-gap="20">
        <n-gi v-for="item in pageData">
            <PlayerCard :playerData="item"></PlayerCard>
        </n-gi>
    </n-grid>
    <n-space class="分页" justify="end">
        <n-pagination v-model:page="pageIndex" :page-count="pageCount" :on-update:page="setPage" />
    </n-space>
</template>
<script lang="ts" setup>
import PlayerCard from '@/components/PlayerCard.vue';
import { onMounted, ref, Ref } from "vue";
import { getPlayersByClubAPI } from "@/apis/player";
let playerData = ref([]);
let pageCount: Ref<number> = ref(0);
let pageIndex: Ref<number> = ref(1);
let pageData: Ref = ref([]);
let pageSize: number = 6;
onMounted(
    () => {
        getPlayersByClubAPI({ club_id: 1, is_player_club: true })
            .then((response) => {
                playerData.value = response;
                pageCount.value = playerData.value.length / pageSize;
                pageData.value = playerData.value.slice(pageSize * (pageIndex.value - 1), pageIndex.value * pageSize);
            }).catch((_error: {}) => { });
    }
)
function setPage(page: number): void {
    pageIndex.value = page;
    pageData.value = playerData.value.slice(pageSize * (pageIndex.value - 1), pageIndex.value * pageSize);
}
</script>
<style>
.分页 {
    padding-top: 10px;
}
</style>