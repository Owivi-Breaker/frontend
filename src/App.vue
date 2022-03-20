<template>
    <div class="dark:text-gray-300">
        <n-config-provider
            :date-locale="dateZhCN"
            :locale="zhCN"
            :theme="theme.naiveTheme"
            :theme-overrides="theme.naiveThemeOverrides"
            class="h-full"
        >
            <naive-provider>
                <router-view />
            </naive-provider>
        </n-config-provider>
    </div>
</template>

<script lang="ts" setup>
import { dateZhCN, zhCN } from 'naive-ui';
import { NaiveProvider } from '@/components';
import { subscribeStore, useThemeStore } from '@/store';

const theme = useThemeStore();

subscribeStore();
</script>

