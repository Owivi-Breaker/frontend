<template>
  <div>
    <n-space :vertical="true" :size="16">
      <top-chart />
      <data-card />
      <bottom-part />
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import { TopChart, DataCard, BottomPart } from './components';
</script>
<style scoped></style>
