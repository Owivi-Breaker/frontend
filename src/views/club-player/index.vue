<template>
    <div class="p-5">
        <div class="text-xl font-bold text-primary mb-3">球员列表</div>
        <n-spin v-if="!store.playerData.length" class="loading" size="medium" />
        <div class="gap-10 grid grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            <div v-for="(item, key) in store.playerData.slice(start, end)" :key="key">
                <PlayerCard :player-data="item"></PlayerCard>
            </div>
        </div>
        <n-space v-if="store.playerData.length" class="分页" justify="end">
            <n-pagination
                v-model:page="pageIndex"
                :on-update:page="setPage"
                :page-count="Math.ceil(store.playerData.length / pageSize)"
            />
        </n-space>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import PlayerCard from '@/components/PlayerCard.vue';
import { useStore } from '@/stores/store';

const store = useStore();
const pageIndex: Ref<number> = ref(1);
const pageSize: number = 8;
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
