<template>
    <div>
        <n-space :size="16" :vertical="true">
            <workbench-header/>
            <workbench-main/>
        </n-space>
    </div>
</template>
<script lang="ts" setup>
import {WorkbenchHeader, WorkbenchMain} from './components';</script>
<style scoped></style>
