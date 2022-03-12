<template>
    <div class="h-full">
        <n-card class="shadow-sm rounded-16px" title="富文本插件">
            <div ref="domRef" class="bg-white dark:bg-dark"></div>
            <template #footer>
                <github-link link="https://github.com/wangeditor-team/wangEditor"/>
            </template>
        </n-card>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import WangEditor from 'wangeditor';
import {GithubLink} from '@/components';

const editor = ref<WangEditor>();
const domRef = ref<HTMLElement>();

function renderWangEditor() {
    editor.value = new WangEditor(domRef.value);
    setEditorConfig();
    editor.value.create();
}

function setEditorConfig() {
    editor.value!.config.zIndex = 10;
}

onMounted(() => {
    renderWangEditor();
});
</script>
<style scoped>
:deep(.w-e-toolbar) {
    background: inherit !important;
    border-color: #999 !important;
}

:deep(.w-e-text-container) {
    background: inherit;
    border-color: #999 !important;
}
</style>
