<template>
    <n-scrollbar class="flex-1-hidden">
        <n-menu
            :collapsed="app.siderCollapse"
            :collapsed-icon-size="22"
            :collapsed-width="theme.sider.collapsedWidth"
            :expanded-keys="expandedKeys"
            :indent="18"
            :options="routeStore.menus"
            :value="activeKey"
            @update:value="handleUpdateMenu"
            @update:expanded-keys="handleUpdateExpandedKeys"
        />
    </n-scrollbar>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import type {MenuOption} from 'naive-ui';
import {useAppStore, useRouteStore, useThemeStore} from '@/store';
import {useRouterPush} from '@/composables';
import {getActiveKeyPathsOfMenus} from '@/utils';
import type {GlobalMenuOption} from '@/interface';

const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const routeStore = useRouteStore();
const {routerPush} = useRouterPush();

const activeKey = computed(() => route.name as string);
const expandedKeys = ref<string[]>([]);

function handleUpdateMenu(_key: string, item: MenuOption) {
    const menuItem = item as GlobalMenuOption;
    routerPush(menuItem.routePath);
}

function handleUpdateExpandedKeys(keys: string[]) {
    expandedKeys.value = keys;
}

watch(
    () => route.name,
    () => {
        expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, routeStore.menus);
    },
    {immediate: true}
);
</script>
<style scoped></style>
