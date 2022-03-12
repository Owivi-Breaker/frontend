<template>
    <div>
        <canvas ref="domRef" class="cursor-pointer" height="40" width="152" @click="getImgCode"></canvas>
    </div>
</template>

<script lang="ts" setup>
import {watch} from 'vue';
import {useImageVerify} from '@/hooks';

interface Props {
    code?: string;
}

interface Emits {
    (e: 'update:code', code: string): void;
}

const props = withDefaults(defineProps<Props>(), {
    code: ''
});

const emit = defineEmits<Emits>();

const {domRef, imgCode, setImgCode, getImgCode} = useImageVerify();

watch(
    () => props.code,
    newValue => {
        setImgCode(newValue);
    }
);
watch(imgCode, newValue => {
    emit('update:code', newValue);
});

defineExpose({getImgCode});
</script>
<style scoped></style>
