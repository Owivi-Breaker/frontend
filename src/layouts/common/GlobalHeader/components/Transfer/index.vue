<template>
    <n-modal v-model:show="showNegoModal" :mask-closable="negoEnd">
        <n-card class="bigCrad">
            <div class="bigDiv">
                <div>
                    <n-space justify="center">
                        <n-text class="negoName">{{ negoName }}</n-text>
                    </n-space>
                    <n-scrollbar class="messageScroll" ref="nScrollBarRef"
                                 style="height: 500px; margin-top: 15px;padding-left: 10px; padding-right: 10px; background-color: #f7f7f7">
                        <MessageItem v-for="item in negoHistory" :negoHistory="item"></MessageItem>
                    </n-scrollbar>
                </div>
            </div>
            <n-space justify="space-between">
                <n-input class="inputBox" v-model:value="negoWage" @keyup.enter="postWage"></n-input>
                <n-button v-on:click="postWage" type="primary">发送</n-button>
            </n-space>
        </n-card>
    </n-modal>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, h, nextTick, onMounted, onUnmounted, ref, Ref, watch} from 'vue'
import {NButton, NotificationApi, NotificationReactive, NSpace, ScrollbarInst, useNotification} from 'naive-ui'
import {getNegotiateListAPI, getRejectedOffersAPI, negotiateFailedAPI, negotiateWageAPI} from "@/apis/transfer";
import {useStore} from "@/stores/store";
import {getClubByIdAPI} from "@/apis/club";
import {MessageItem} from './components';
import {PlayerAvatar} from "@/interface";

const notification: NotificationApi = useNotification();
const store = useStore();
let showNegoModal: Ref<boolean> = ref(false);
let negoWage: Ref<string> = ref('');
let negoId: Ref<number> = ref(0);
let negoName: Ref<string> = ref('');
let negoHistory: Ref<Array<any>> = ref([]);
let myName: Ref<string> = ref('');
let hisAvatar: Ref<PlayerAvatar | null> = ref(null);
let negoTimes: Ref<number> = ref(0);
let negoEnd: ComputedRef<boolean> = computed(() => negoTimes.value > 2);
declare const window: Window & { $message: any };
onMounted(() => {
    getNegotiateListAPI()
        .then((response: any) => {
            for (let item in response) {
                let noti: NotificationReactive = notification.create({
                    title: "恭喜您，您的报价被我方接受",
                    description: response[item].player_info.club_name,
                    closable: false,
                    content: () => [
                        `我们听说您想购买我们的球员${response[item].player_info.translated_name}。` +
                        `我们的俱乐部经过内部商议，决定接受您报价为${response[item].offer.offer_price}万欧元的购买请求。` +
                        `现在，您需要与${response[item].player_info.translated_name}沟通，了解其个人意愿并确定其在您麾下俱乐部的薪资待遇。`,
                        h(NSpace,
                            {
                                style: {
                                    marginTop: '10px',
                                    marginBottom: '10px'
                                },
                                justify: 'end'
                            },
                            [
                                h(NButton,
                                    {
                                        onClick: () => {
                                            if (showNegoModal.value) {
                                                window.$message.error('请先完成当前的对话');
                                                return;
                                            }
                                            noti.destroy();
                                        }
                                    },
                                    '关闭'),
                                h(NButton,
                                    {
                                        type: 'primary',
                                        onClick: () => {
                                            if (showNegoModal.value) {
                                                window.$message.error('请先完成当前的对话');
                                                return;
                                            }
                                            showNegoModal.value = true;
                                            negoId.value = response[item].player_info.id;
                                            negoName.value = response[item].player_info.translated_name;
                                            hisAvatar.value = response[item].player_info.avatar;
                                            negoHistory.value = [];
                                            negoTimes.value = 0;
                                            getClubByIdAPI({club_id: response[item].offer.buyer_id}).then((response: any) => {
                                                myName.value = response.name;
                                            }).catch((_error: any) => {
                                            });
                                            noti.destroy();
                                        }
                                    },
                                    '联系')
                            ])
                    ],
                    meta: store.Date,
                    avatar: () =>
                        h('img', {
                            src: 'http://shu-huai.cn:13127/Public/' + response[item].player_info.club_name + ".png"
                        })
                });
            }
        })
        .catch((_error: {}) => {
        });
    getRejectedOffersAPI()
        .then((response: any) => {
            for (let item in response) {
                let noti: NotificationReactive = notification.create({
                    title: "我们不愿接受您的报价",
                    description: response[item].player_info.club_name,
                    closable: false,
                    content: () => [
                        `我们听说您想购买我们的球员${response[item].player_info.translated_name}。` +
                        `我们的俱乐部经过内部商议，决定拒绝您报价为${response[item].offer.offer_price}万欧元的购买请求，期待与您的下一次合作。`,
                        h(NSpace,
                            {
                                style: {
                                    marginTop: '10px',
                                    marginBottom: '10px'
                                },
                                justify: 'end'
                            },
                            [
                                h(NButton,
                                    {
                                        onClick: () => {
                                            if (showNegoModal.value) {
                                                window.$message.error('请先完成当前的对话');
                                                return;
                                            }
                                            noti.destroy();
                                        }
                                    },
                                    '关闭')
                            ])
                    ],
                    meta: store.Date,
                    avatar: () =>
                        h('img', {
                            src: 'http://shu-huai.cn:13127/Public/' + response[item].player_info.club_name + ".png"
                        })
                });
            }
        })
        .catch((_error: {}) => {
        });
})
onUnmounted(() => {
    notification.destroyAll();
})

function postWage(): void {
    if (negoWage.value === '') {
        return;
    }
    negoHistory.value.push({
        isMe: true,
        message: negoWage.value,
        avatar: 'http://lvshuhuai.cn:13127/Public/' + myName.value + '.png',
    });
    if (negoEnd.value) {
        negoWage.value = '';
        return;
    }
    negotiateWageAPI({target_player_id: negoId.value, offer_wage: parseFloat(negoWage.value)}).then((response: any) => {
        let message: string = "";
        if (response.status === 'success') {
            message = "这是一个合理的薪资，我愿意转入您的俱乐部。";
            negoTimes.value = 100;
        } else if (response.status === 'fail') {
            negoTimes.value++;
            message = "老实说，您开出的价码稍微有点少了，让我再考虑考虑。";
        }
        negoHistory.value.push({
            isMe: false,
            message: message,
            avatar: hisAvatar.value,
        });
        if (negoTimes.value > 2 && negoTimes.value !== 100) {
            message = "经过考虑，我认为您提出的薪资有点低了，我不太愿意转入您的俱乐部。";
            negotiateFailedAPI({target_id: negoId.value}).then((_response: any) => {
            }).catch((_error: any) => {
            });
            negoHistory.value.push({
                isMe: false,
                message: message,
                avatar: hisAvatar.value,
            });
        }
    }).catch((_error: any) => {
    });
    negoWage.value = '';
}

const nScrollBarRef: Ref<ScrollbarInst | null> = ref(null);
watch(
    () => negoHistory.value.length,
    () => {
        if (nScrollBarRef.value) {
            nextTick(() => {
                nScrollBarRef.value?.scrollTo(0, 10000000);
            });
        }
    },
    {immediate: true}
);
</script>
<style scoped>
.bigCrad {
    height: 640px;
    width: 360px;
}

.bigDiv {
    height: 95%;
}

.negoName {
    font-size: larger;
}

.inputBox {
    width: 240px;
}
</style>
