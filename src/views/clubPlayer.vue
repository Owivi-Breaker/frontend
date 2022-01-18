<template>
    <n-h2>球员列表</n-h2>
    <n-spin class="loading" size="medium" v-if="!this.store.playerData.length"/>
    <n-grid cols="2 l:2 xl:3 2xl:3" responsive="screen" x-gap="20" y-gap="20">
        <n-gi v-for="item in this.store.playerData.slice(this.start, this.end)">
            <PlayerCard :playerData="item"></PlayerCard>
        </n-gi>
    </n-grid>
    <n-space v-if="this.store.playerData.length" class="分页" justify="end">
        <n-pagination v-model:page="this.pageIndex" :page-count="this.store.playerData.length / this.pageSize"
                      :on-update:page="setPage"/>
    </n-space>
</template>
<script lang="ts" setup>
import PlayerCard from '@/components/PlayerCard.vue';
import { onMounted, ref, Ref, watch } from "vue";
import { getPlayersByClubAPI } from "@/apis/player";
import { useStore } from '@/stores/store'
import { getIncomingGamesAPI } from "@/apis/club";

const store = useStore();
let pageIndex: Ref<number> = ref(1);
let pageSize: number = 6;
let start: Ref<number> = ref(pageSize * (pageIndex.value - 1));
let end: Ref<number> = ref(pageIndex.value * pageSize);

function setPage(page: number): void {
    pageIndex.value = page;
    start.value = pageSize * (pageIndex.value - 1);
    end.value = pageIndex.value * pageSize;
}
</script>
<style>
.loading {
    margin-left: 48%;
    margin-bottom: 30px;
}

.分页 {
    padding-top: 10px;
}
</style>
