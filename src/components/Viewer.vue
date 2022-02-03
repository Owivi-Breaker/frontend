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
import { useMessage, useLoadingBar, LoadingBarApi } from "naive-ui";
import { Router, useRouter } from "vue-router";
declare const window: Window & { $message: any, $loadingBar: LoadingBarApi, $router: Router };
window.$message = useMessage();
window.$loadingBar = useLoadingBar();
window.$router = useRouter();
</script>