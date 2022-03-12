<template>
    <dark-mode-container :style="{ height: theme.tab.height + 'px' }" class="global-tab flex-y-center w-full pl-16px">
        <div ref="bsWrapper" class="flex-1-hidden h-full">
            <better-scroll ref="bsScroll" :options="{ scrollX: true, scrollY: false, click: canClick }">
                <tab-detail @scroll="handleScroll"/>
            </better-scroll>
        </div>
        <reload-button/>
    </dark-mode-container>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {useElementBounding} from '@vueuse/core';
import {BetterScroll, DarkModeContainer} from '@/components';
import {useTabStore, useThemeStore} from '@/store';
import {useDeviceInfo} from '@/composables';
import type {ExposeBetterScroll} from '@/interface';
import {ReloadButton, TabDetail} from './components';

const route = useRoute();
const theme = useThemeStore();
const tab = useTabStore();
const deviceInfo = useDeviceInfo();

const bsWrapper = ref<HTMLElement>();
const {width: bsWrapperWidth, left: bsWrapperLeft} = useElementBounding(bsWrapper);

const bsScroll = ref<ExposeBetterScroll>();

const canClick = Boolean(deviceInfo.device.type);

function handleScroll(clientX: number) {
    const currentX = clientX - bsWrapperLeft.value;
    const deltaX = currentX - bsWrapperWidth.value / 2;
    if (bsScroll.value) {
        const {maxScrollX, x: leftX} = bsScroll.value.instance;
        const rightX = maxScrollX - leftX;
        const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);
        bsScroll.value?.instance.scrollBy(update, 0, 300);
    }
}

function init() {
    tab.iniTabStore(route);
}

watch(
    () => route.path,
    () => {
        tab.addTab(route);
        tab.setActiveTab(route.path);
    }
);

// 初始化
init();
</script>
<style scoped>
.global-tab {
    box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
