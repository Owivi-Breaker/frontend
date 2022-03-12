<template>
    <n-divider title-placement="center">界面显示</n-divider>
    <n-space size="large" vertical>
        <setting-menu label="面包屑">
            <n-switch :value="theme.header.crumb.visible" @update:value="theme.setHeaderCrumbVisible"/>
        </setting-menu>
        <setting-menu label="面包屑图标">
            <n-switch :value="theme.header.crumb.showIcon" @update:value="theme.setHeaderCrumbIconVisible"/>
        </setting-menu>
        <setting-menu label="多页签">
            <n-switch :value="theme.tab.visible" @update:value="theme.setTabVisible"/>
        </setting-menu>
        <setting-menu label="多页签风格">
            <n-select
                :options="theme.tab.modeList"
                :value="theme.tab.mode"
                class="w-120px"
                size="small"
                @update:value="theme.setTabMode"
            />
        </setting-menu>
        <setting-menu label="页面切换动画">
            <n-switch :value="theme.page.animate" @update:value="theme.setPageIsAnimate"/>
        </setting-menu>
        <setting-menu label="页面切换动画类型">
            <n-select
                :options="theme.page.animateModeList"
                :value="theme.page.animateMode"
                class="w-120px"
                size="small"
                @update:value="theme.setPageAnimateMode"
            />
        </setting-menu>
    </n-space>
</template>

<script lang="ts" setup>
import {useThemeStore} from '@/store';
import SettingMenu from '../SettingMenu/index.vue';

const theme = useThemeStore();
</script>
<style scoped></style>
