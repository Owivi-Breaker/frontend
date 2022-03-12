<template>
    <n-divider title-placement="center">布局模式</n-divider>
    <n-space justify="space-between">
        <layout-checkbox
            v-for="item in theme.layout.modeList"
            :key="item.value"
            :checked="item.value === theme.layout.mode"
            :label="item.label"
            :mode="item.value"
            @click="theme.setLayoutMode(item.value)"
        />
    </n-space>
</template>

<script lang="ts" setup>
import {useThemeStore} from '@/store';
import {LayoutCheckbox} from './components';

const theme = useThemeStore();
</script>
<style scoped></style>
