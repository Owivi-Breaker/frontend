<template>
    <hover-container class="w-64px h-full" placement="bottom-end" tooltip-content="重新加载" @click="handleRefresh">
        <icon-mdi-refresh :class="{ 'animate-spin': loading }" class="text-18px"/>
    </hover-container>
</template>

<script lang="ts" setup>
import {HoverContainer} from '@/components';
import {useAppStore} from '@/store';
import {useLoading} from '@/hooks';

const app = useAppStore();
const {loading, startLoading, endLoading} = useLoading();

function handleRefresh() {
    startLoading();
    app.reloadPage();
    setTimeout(() => {
        endLoading();
    }, 1000);
}
</script>
<style scoped></style>
