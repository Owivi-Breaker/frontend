<template>
  <div>
    <NextGameHome></NextGameHome>
    <n-grid cols="2" x-gap="20">
      <n-gi>
        <MailBoxHome></MailBoxHome>
      </n-gi>
      <n-gi>
        <PointsTableHome></PointsTableHome>
      </n-gi>
    </n-grid>
  </div>
</template>
<script lang="ts" setup>
import NextGameHome from '@/components/Home/NextGame.vue';
import MailBoxHome from '@/components/Home/MailBox.vue';
import PointsTableHome from '@/components/Home/PointsTable.vue';
</script>
<style>
body {
  background-image: none;
}
</style>
