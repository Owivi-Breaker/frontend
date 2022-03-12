<template>
    <div
        :style="{ width: app.mixSiderFixed ? theme.sider.mixChildMenuWidth + 'px' : '0px' }"
        class="relative h-full transition-width duration-300 ease-in-out"
    >
        <dark-mode-container
            :style="{ width: showDrawer ? theme.sider.mixChildMenuWidth + 'px' : '0px' }"
            class="drawer-shadow absolute-lt flex-col-stretch h-full nowrap-hidden"
        >
            <header :style="{ height: theme.header.height + 'px' }" class="header-height flex-y-center justify-between">
                <h2 class="text-primary pl-8px text-16px font-bold">{{ title }}</h2>
                <div class="px-8px text-16px text-gray-600 cursor-pointer" @click="app.toggleMixSiderFixed">
                    <icon-mdi-pin-off v-if="app.mixSiderFixed"/>
                    <icon-mdi-pin v-else/>
                </div>
            </header>
            <n-scrollbar class="flex-1-hidden">
                <n-menu
                    :expanded-keys="expandedKeys"
                    :indent="18"
                    :options="menus"
                    :value="activeKey"
                    @update:value="handleUpdateMenu"
                    @update:expanded-keys="handleUpdateExpandedKeys"
                />
            </n-scrollbar>
        </dark-mode-container>
    </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import type {MenuOption} from 'naive-ui';
import {DarkModeContainer} from '@/components';
import {useAppStore, useThemeStore} from '@/store';
import {useAppInfo, useRouterPush} from '@/composables';
import {getActiveKeyPathsOfMenus} from '@/utils';
import type {GlobalMenuOption} from '@/interface';

interface Props {
    /** 菜单抽屉可见性 */
    visible: boolean;
    /** 子菜单数据 */
    menus: GlobalMenuOption[];
}

const props = defineProps<Props>();

const route = useRoute();
const app = useAppStore();
const theme = useThemeStore();
const {routerPush} = useRouterPush();

const showDrawer = computed(() => (props.visible && props.menus.length) || app.mixSiderFixed);
const {title} = useAppInfo();

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
        expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, props.menus);
    },
    {immediate: true}
);
</script>
<style scoped>
.drawer-shadow {
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
