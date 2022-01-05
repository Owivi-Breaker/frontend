<template>
    <router-view />
</template>
<script lang="ts" setup>
// import { useLoadingBar } from 'naive-ui'
// import router from '../router'
// todo: route transtion
// const loadingBar = useLoadingBar()
// router.beforeEach(() => loadingBar?.start())
// router.afterEach(() => loadingBar?.finish())
import { useMessage } from 'naive-ui'
declare const window: Window & { $message: any };
window.$message = useMessage();
</script>