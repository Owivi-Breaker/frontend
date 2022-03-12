<template>
    <n-modal :show="visible" class="w-640px h-480px" preset="card" @close="handleClose">
        <div class="flex-x-center">
            <n-gradient-text :size="24" type="primary">中国传统颜色</n-gradient-text>
        </div>
        <n-tabs>
            <n-tab-pane v-for="item in traditionColors" :key="item.label" :name="item.label" :tab="item.label">
                <n-grid :cols="8" :x-gap="16" :y-gap="8">
                    <n-grid-item v-for="i in item.data" :key="i.label">
                        <color-checkbox
                            :checked="i.color === theme.themeColor"
                            :color="i.color"
                            class="!w-full !h-36px !rounded-4px"
                            icon-class="text-20px"
                            @click="theme.setThemeColor(i.color)"
                        />
                        <p class="text-center">{{ i.label }}</p>
                    </n-grid-item>
                </n-grid>
            </n-tab-pane>
        </n-tabs>
    </n-modal>
</template>

<script lang="ts" setup>
import {traditionColors} from '@/settings';
import {useThemeStore} from '@/store';
import ColorCheckbox from './ColorCheckbox.vue';

interface Props {
    visible: boolean;
}

interface Emits {
    (e: 'close'): void;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

const theme = useThemeStore();

function handleClose() {
    emit('close');
}
</script>
<style scoped></style>
