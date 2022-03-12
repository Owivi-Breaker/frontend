<template>
    <div>
        <n-h2>球员列表</n-h2>
        <n-spin v-if="!store.playerData.length" class="loading" size="medium"/>
        <n-grid cols="2 l:2 xl:3 2xl:3" responsive="screen" x-gap="20" y-gap="20">
            <n-gi v-for="(item, key) in store.playerData.slice(start, end)" :key="key">
                <PlayerCard :player-data="item"></PlayerCard>
            </n-gi>
        </n-grid>
        <n-space v-if="store.playerData.length" class="分页" justify="end">
            <n-pagination
                v-model:page="pageIndex"
                :on-update:page="setPage"
                :page-count="store.playerData.length / pageSize"
            />
        </n-space>
    </div>
</template>

<script lang="ts" setup>
import {ref, Ref} from 'vue';
import PlayerCard from '@/components/PlayerCard.vue';
import {useStore} from '@/stores/store';

const store = useStore();
const pageIndex: Ref<number> = ref(1);
const pageSize: number = 6;
const start: Ref<number> = ref(pageSize * (pageIndex.value - 1));
const end: Ref<number> = ref(pageIndex.value * pageSize);

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
