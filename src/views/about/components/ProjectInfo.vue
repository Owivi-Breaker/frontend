<template>
    <n-card :bordered="false" class="rounded-16px shadow-sm" size="small" title="项目信息">
        <n-descriptions :column="2" bordered label-placement="left" size="small">
            <n-descriptions-item label="版本">
                <n-tag type="primary">{{ version }}</n-tag>
            </n-descriptions-item>
            <n-descriptions-item label="最后编译时间">
                <n-tag type="primary">{{ lastestBuildTime }}</n-tag>
            </n-descriptions-item>
            <n-descriptions-item label="Github地址">
                <a class="text-primary" href="https://github.com/honghuangdc/soybean-admin" target="_blank">Github地址</a>
            </n-descriptions-item>
            <n-descriptions-item label="预览地址">
                <a class="text-primary" href="https://soybean.pro" target="_blank">预览地址</a>
            </n-descriptions-item>
        </n-descriptions>
    </n-card>
</template>

<script lang="ts" setup>
import {pkgJson} from '../model';

const {version} = pkgJson;
const lastestBuildTime = PROJECT_BUILD_TIME;
</script>
<style scoped></style>
