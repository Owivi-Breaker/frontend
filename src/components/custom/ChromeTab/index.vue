<template>
    <div
        :class="{ 'z-10': isActive, 'z-9': isHover }"
        class="relative flex-y-center h-34px px-24px -mr-18px cursor-pointer"
        @mouseenter="setTrue"
        @mouseleave="setFalse"
    >
        <div class="absolute-lb wh-full overflow-hidden">
            <svg-radius-bg
                :dark-mode="darkMode"
                :is-active="isActive"
                :is-hover="isHover"
                :primary-color="primaryColor"
                class="wh-full"
            />
        </div>
        <span class="relative whitespace-nowrap z-2">
      <slot></slot>
    </span>
        <div v-if="closable" class="pl-18px">
            <icon-close :is-active="isActive" :primary-color="primaryColor" @click="handleClose"/>
        </div>
        <n-divider v-if="!isHover && !isActive" :vertical="true" class="absolute right-0 !bg-[#a4abb8] z-2"/>
    </div>
</template>

<script lang="ts" setup>
import {useBoolean} from '@/hooks';
import IconClose from '../IconClose/index.vue';
import {SvgRadiusBg} from './components';

interface Props {
    /** 激活状态 */
    isActive?: boolean;
    /** 主题颜色 */
    primaryColor?: string;
    /** 是否显示关闭图标 */
    closable?: boolean;
    /** 暗黑模式 */
    darkMode?: boolean;
}

interface Emits {
    /** 点击关闭图标 */
    (e: 'close'): void;
}

withDefaults(defineProps<Props>(), {
    isActive: false,
    primaryColor: '#409EFF',
    closable: true,
    darkMode: false,
    isLast: false
});

const emit = defineEmits<Emits>();

const {bool: isHover, setTrue, setFalse} = useBoolean();

function handleClose(e: MouseEvent) {
    e.stopPropagation();
    emit('close');
}
</script>
<style scoped></style>
