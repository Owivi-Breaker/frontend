<template>
    <n-divider title-placement="center">界面功能</n-divider>
    <n-space size="large" vertical>
        <setting-menu label="固定头部和多页签">
            <n-switch :value="theme.fixedHeaderAndTab" @update:value="theme.setIsFixedHeaderAndTab"/>
        </setting-menu>
        <setting-menu label="顶部菜单位置">
            <n-select
                :options="theme.menu.horizontalPositionList"
                :value="theme.menu.horizontalPosition"
                class="w-120px"
                size="small"
                @update:value="theme.setHorizontalMenuPosition"
            />
        </setting-menu>
        <setting-menu label="头部高度">
            <n-input-number
                :step="1"
                :value="theme.header.height"
                class="w-120px"
                size="small"
                @update:value="theme.setHeaderHeight"
            />
        </setting-menu>
        <setting-menu label="多页签高度">
            <n-input-number
                :step="1"
                :value="theme.tab.height"
                class="w-120px"
                size="small"
                @update:value="theme.setTabHeight"
            />
        </setting-menu>
        <setting-menu label="多页签缓存">
            <n-switch :value="theme.tab.isCache" @update:value="theme.setTabIsCache"/>
        </setting-menu>
        <setting-menu label="侧边栏展开宽度">
            <n-input-number
                :step="10"
                :value="theme.sider.width"
                class="w-120px"
                size="small"
                @update:value="theme.setSiderWidth"
            />
        </setting-menu>
        <setting-menu label="左侧混合侧边栏展开宽度">
            <n-input-number
                :step="5"
                :value="theme.sider.mixWidth"
                class="w-120px"
                size="small"
                @update:value="theme.setMixSiderWidth"
            />
        </setting-menu>
        <setting-menu label="固定底部">
            <n-switch :value="theme.footer.fixed" @update:value="theme.setFooterIsFixed"/>
        </setting-menu>
    </n-space>
</template>

<script lang="ts" setup>
import {useThemeStore} from '@/store';
import SettingMenu from '../SettingMenu/index.vue';

const theme = useThemeStore();
</script>
<style scoped></style>
