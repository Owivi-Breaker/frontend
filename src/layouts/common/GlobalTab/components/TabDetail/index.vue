<template>
    <div ref="tabRef" :class="[isChromeMode ? 'flex items-end' : 'flex-y-center']" class="h-full">
        <component
            :is="activeComponent"
            v-for="(item, index) in tab.tabs"
            :key="item.path"
            :class="{ '!mr-0': isChromeMode && index === tab.tabs.length - 1, 'mr-10px': !isChromeMode }"
            :closable="item.path !== tab.homeTab.path"
            :dark-mode="theme.darkMode"
            :is-active="tab.activeTab === item.path"
            :primary-color="theme.themeColor"
            @click="tab.handleClickTab(item.path)"
            @close="tab.removeTab(item.path)"
            @contextmenu="handleContextMenu($event, item.path)"
        >
            {{ item.meta.title }}
        </component>
    </div>
    <context-menu
        v-model:visible="dropdown.visible"
        :current-path="dropdown.currentPath"
        :x="dropdown.x"
        :y="dropdown.y"
    />
</template>

<script lang="ts" setup>
import {computed, nextTick, reactive, ref, watch} from 'vue';
import {useEventListener} from '@vueuse/core';
import {ButtonTab, ChromeTab} from '@/components';
import {useTabStore, useThemeStore} from '@/store';
import {setTabRoutes} from '@/utils';
import {ContextMenu} from './components';

interface Emits {
    (e: 'scroll', clientX: number): void;
}

const emit = defineEmits<Emits>();

const theme = useThemeStore();
const tab = useTabStore();

const isChromeMode = computed(() => theme.tab.mode === 'chrome');
const activeComponent = computed(() => (isChromeMode.value ? ChromeTab : ButtonTab));

// 获取当前激活的tab的clientX
const tabRef = ref<HTMLElement>();

async function getActiveTabClientX() {
    await nextTick();
    if (tabRef.value) {
        const activeTabElement = tabRef.value.children[tab.activeTabIndex];
        const {x, width} = activeTabElement.getBoundingClientRect();
        const clientX = x + width / 2;
        setTimeout(() => {
            emit('scroll', clientX);
        }, 50);
    }
}

const dropdown = reactive({
    visible: false,
    x: 0,
    y: 0,
    currentPath: ''
});

function showDropdown() {
    dropdown.visible = true;
}

function hideDropdown() {
    dropdown.visible = false;
}

function setDropdown(x: number, y: number, currentPath: string) {
    Object.assign(dropdown, {x, y, currentPath});
}

/** 点击右键菜单 */
async function handleContextMenu(e: MouseEvent, path: string) {
    e.preventDefault();
    const {clientX, clientY} = e;
    hideDropdown();
    setDropdown(clientX, clientY, path);
    await nextTick();
    showDropdown();
}

watch(
    () => tab.activeTabIndex,
    () => {
        getActiveTabClientX();
    },
    {
        immediate: true
    }
);

/** 页面离开时缓存多页签数据 */
useEventListener(window, 'beforeunload', () => {
    setTabRoutes(tab.tabs);
});
</script>
<style scoped></style>
