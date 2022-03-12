<template>
    <n-divider title-placement="center">系统主题</n-divider>
    <n-grid :cols="8" :x-gap="8" :y-gap="12">
        <n-grid-item v-for="color in theme.themeColorList" :key="color" class="flex-x-center">
            <color-checkbox :checked="color === theme.themeColor" :color="color" @click="theme.setThemeColor(color)"/>
        </n-grid-item>
    </n-grid>
    <n-space :vertical="true" class="pt-12px">
        <n-color-picker :show-alpha="false" :value="theme.themeColor" @update-value="theme.setThemeColor"/>
        <n-button :block="true" :type="otherColorBtnType" @click="openModal">更多颜色</n-button>
    </n-space>
    <color-modal :visible="visible" @close="closeModal"/>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {isInTraditionColors} from '@/settings';
import {useThemeStore} from '@/store';
import {useBoolean} from '@/hooks';
import {ColorCheckbox, ColorModal} from './components';

const theme = useThemeStore();

const {bool: visible, setTrue: openModal, setFalse: closeModal} = useBoolean();

const isInOther = computed(() => isInTraditionColors(theme.themeColor));
const otherColorBtnType = computed(() => (isInOther.value ? 'primary' : 'default'));
</script>
<style scoped></style>
