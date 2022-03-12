<template>
    <div>
        <n-space :size="16" :vertical="true">
            <top-chart/>
            <data-card/>
            <bottom-part/>
        </n-space>
    </div>
</template>

<script lang="ts" setup>
import {BottomPart, DataCard, TopChart} from './components';</script>
<style scoped></style>
