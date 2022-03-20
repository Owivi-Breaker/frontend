<template>
    <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden">
        <!-- <system-logo class="w-32px h-32px text-primary" /> -->
        <div
            v-show="!showTitle"
            class="text-2xl font-bold italic text-primary transition duration-300 ease-in-out"
        >
            <span class="underline decoration-teal-500 decoration-4">T</span>
        </div>
        <!-- {{ title }} -->
        <div
            v-show="showTitle"
            class="text-2xl font-bold italic text-primary transition duration-300 ease-in-out"
        >
            <span class="underline decoration-teal-500 decoration-4">TieB</span>reaker
        </div>
    </router-link>
</template>

<script lang="ts" setup>
import { SystemLogo } from '@/components';
import { routePath } from '@/router';
import { useAppInfo } from '@/composables';

interface Props {
    /** 显示名字 */
    showTitle: boolean;
}

defineProps<Props>();

const { title } = useAppInfo();
const routeHomePath = routePath('root');
</script>
<style scoped></style>
