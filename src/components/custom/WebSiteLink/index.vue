<template>
    <p>
        <span>{{ label }}</span>
        <a :href="link" class="text-blue-500" target="_blank">
            {{ link }}
        </a>
    </p>
</template>

<script lang="ts" setup>
interface Props {
    /** 网址名称 */
    label: string;
    /** 网址链接 */
    link: string;
}

defineProps<Props>();
</script>
<style scoped></style>
