<template>
    <n-card :bordered="false" class="rounded-16px shadow-sm" size="small" title="生产环境依赖">
        <n-descriptions bordered label-placement="left" size="small">
            <n-descriptions-item v-for="item in dependencies" :key="item.name" :label="item.name">
                {{ item.version }}
            </n-descriptions-item>
        </n-descriptions>
    </n-card>
</template>

<script lang="ts" setup>
import {pkgJson} from '../model';

const {dependencies} = pkgJson;
</script>
<style scoped></style>
