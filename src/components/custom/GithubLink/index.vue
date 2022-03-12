<template>
    <web-site-link :link="link" label="github地址："/>
</template>

<script lang="ts" setup>
import WebSiteLink from '../WebSiteLink/index.vue';

interface Props {
    /** github链接 */
    link: string;
}

defineProps<Props>();
</script>
<style scoped></style>
