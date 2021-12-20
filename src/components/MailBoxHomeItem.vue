<template>
    <div class="mailContainer" v-bind:class="{ mailContainerBlack: mouseOn }" @mouseenter="mouseEnter()" @mouseleave="mouseOut()">
        <n-space class="mailItem" align="center" justify="space-between">
            <n-icon class="mailIcon" size="30">
                <mail-outline v-if="read" />
                <mail-open-outline v-if="!read" />
            </n-icon>
            <n-ellipsis style="max-width: 350px;">{{ title }}</n-ellipsis>
            <p>{{ time }}</p>
        </n-space>
    </div>
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
let title: Ref<String> = ref("");
let time: Ref<String> = ref("");
let read: Ref<Boolean> = ref(false);
onMounted(
    () => {
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
</script>
<style>
.mailContainer {
    background-color: white;
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