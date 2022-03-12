<template>
    <n-drawer :show="app.settingDrawerVisible" :width="330" display-directive="show"
              @mask-click="app.closeSettingDrawer">
        <n-drawer-content :native-scrollbar="false" title="主题配置">
            <dark-mode/>
            <layout-mode/>
            <theme-color-select/>
            <page-func/>
            <page-view/>
            <theme-config/>
        </n-drawer-content>
    </n-drawer>
    <drawer-button/>
</template>

<script lang="ts" setup>
import {useAppStore} from '@/store';
import {DarkMode, DrawerButton, LayoutMode, PageFunc, PageView, ThemeColorSelect, ThemeConfig} from './components';

const app = useAppStore();
</script>
<style scoped></style>
