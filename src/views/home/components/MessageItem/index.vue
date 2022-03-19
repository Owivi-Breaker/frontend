<template>
    <div>
        <div v-if="negoHistory.isMe" style="padding-top: 5px;padding-bottom: 5px;">
            <n-space justify="end" align="center">
                <n-text style="background-color: deepskyblue; padding: 10px; color: white; border-radius: 5px">
                    {{ negoHistory.message }}
                </n-text>
                <img v-bind:src="negoHistory.avatar" alt="头像" style="width: 40px">
            </n-space>
        </div>
        <div v-if="!negoHistory.isMe" style="padding-top: 5px;padding-bottom: 5px;">
            <n-space justify="begin" align="center">
                <Avataaars :is-circle="false" v-bind="negoHistory.avatar" style="height: 40px; width: 40px"/>
                <div style="background-color: white; width: 160px; padding: 10px; color: black; border-radius: 5px">
                    <n-text>
                        {{ message }}
                    </n-text>
                </div>
            </n-space>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Avataaars from "vuejs-avataaars/src/Avataaars.vue";
import PlayerAvatar from "@/interface";
import {onMounted, ref, Ref} from "vue";

const props: any = defineProps<{
    negoHistory: {
        isMe: boolean,
        message: string,
        avatar: string | PlayerAvatar,
    },
}>();
let message: Ref<string> = ref("");
onMounted(() => {
    message.value = props.negoHistory.message;
    let temp: string = '';
    for (let i = 0; i < message.value.length; i++) {
        temp += message.value[i];
        if ((i + 1) % 12 === 0) {
            temp += '';
        }
    }
    message.value = temp;
});
</script>

<style scoped>

</style>
