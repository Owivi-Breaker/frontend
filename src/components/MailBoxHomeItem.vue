<template>
    <div class="mailContainer" v-bind:class="{ mailContainerBlack: mouseOn }" v-on:click="showDetial()" v-on:mouseenter="mouseEnter()" v-on:mouseleave="mouseOut()">
        <n-grid cols="20" x-gap="10">
            <n-gi span="2">
                <n-space class="mailItem" align="center">
                    <n-icon class="mailIcon" size="30">
                        <mail-outline v-if="!read" />
                        <mail-open-outline v-if="read" />
                    </n-icon>
                </n-space>
            </n-gi>
            <n-gi span="15">
                <n-space class="mailItem" align="center">
                    <n-ellipsis>{{ title }}</n-ellipsis>
                </n-space>
            </n-gi>
            <n-gi span="3">
                <n-space class="mailItem" align="center">
                    <p>{{ time }}</p>
                </n-space>
            </n-gi>
        </n-grid>
    </div>
    <n-modal v-model:show="showModal">
        <n-card style="width: 900px;" v-bind:title="title" :bordered="false" size="huge">
            <n-scrollbar style="max-height: 300px;">
                <div v-html="content"></div>
            </n-scrollbar>
            <template #footer>
                <n-button v-on:click="showModal = false">关闭</n-button>
            </template>
        </n-card>
    </n-modal>
</template>
<script lang="ts" setup>
import { defineComponent, ref, onMounted } from "vue";
import { Ref } from "@vue/reactivity";
import { Mail, MailOutline, MailOpen, MailOpenOutline } from "@vicons/ionicons5";
defineComponent({
    components: {
        Mail,
        MailOutline,
        MailOpen,
        MailOpenOutline
    }
});
let props: any = defineProps({
    mail: Object
});
let id: Ref<Number> = ref(0);
let title: Ref<String> = ref("");
let time: Ref<String> = ref("");
let read: Ref<Boolean> = ref(false);
onMounted(
    () => {
        id.value = props.mail.id;
        title.value = props.mail.title;
        time.value = props.mail.time;
        read.value = props.mail.read;
    }
)
let mouseOn: Ref<Boolean> = ref(false)
function mouseEnter(): void {
    mouseOn.value = true;
}
function mouseOut(): void {
    mouseOn.value = false;
}
let showModal: Ref<Boolean> = ref(false);
let content: Ref<String> = ref("");
function showDetial(): void {
    showModal.value = true;
    // 给后端发getbyID
    content.value = "你好。<br>听说你最近过得很好。<br>再见。<br>";
    // 给后端发get告诉他已读
    read.value = true;
}
</script>
<style>
.mailContainer {
    height: 60px;
    background-color: white;
    margin-bottom: 5px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
}
.mailContainerBlack {
    background-color: aliceblue;
}
.mailItem {
    height: 60px;
}
.mailIcon {
    margin-top: 5px;
}
</style>