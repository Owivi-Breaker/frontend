<template>
    <vertical-sider v-if="!isVerticalMix" class="global-sider"/>
    <vertical-mix-sider v-else class="global-sider"/>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useThemeStore} from '@/store';
import {VerticalMixSider, VerticalSider} from './components';

const theme = useThemeStore();

const isVerticalMix = computed(() => theme.layout.mode === 'vertical-mix');
</script>
<style scoped>
.global-sider {
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
