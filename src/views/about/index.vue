<template>
    <n-space :size="16" :vertical="true">
        <project-introduction />
        <project-info />
        <pro-dependency />
        <dev-dependency />
    </n-space>
</template>

<script lang="ts" setup>
import { DevDependency, ProDependency, ProjectInfo, ProjectIntroduction } from './components';
</script>
<style scoped></style>
