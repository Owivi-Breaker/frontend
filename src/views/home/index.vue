<template>
    <n-space>
        <n-button @click="test">
            测试
        </n-button>
    </n-space>
    <n-modal v-model:show="showNegoModal" :closable="false">
        <n-card style="height: 640px;width: 360px;">
            <div style="height: 95%">
                <div>
                    <n-space justify="center">
                        <n-text style="font-size: larger;">{{ negoName }}</n-text>
                    </n-space>
                    <n-scrollbar
                        style="height: 500px; margin-top: 15px;padding-left: 10px; padding-right: 10px; background-color: #f7f7f7">
                        <MessageItem v-for="item in negoHistory" :negoHistory="item"></MessageItem>
                    </n-scrollbar>
                </div>
            </div>
            <n-space justify="space-between">
                <n-input v-model:value="negoWage" style="width: 240px"></n-input>
                <n-button v-on:click="postWage" type="primary">发送</n-button>
            </n-space>
        </n-card>
    </n-modal>
</template>

<script lang="ts" setup>
import {h, ref, Ref} from 'vue'
import {NButton, NotificationApi, NotificationReactive, NSpace, useNotification} from 'naive-ui'
import {getNegotiateListAPI, negotiateWageAPI} from "@/apis/transfer";
import {useStore} from "@/stores/store";
import {getClubByIdAPI} from "@/apis/club";
import {MessageItem} from './components';
import PlayerAvatar from "@/interface";

const notification: NotificationApi = useNotification();
const store = useStore();
let showNegoModal: Ref<boolean> = ref(false);
let negoWage: Ref<string> = ref('');
let negoId: Ref<number> = ref(0);
let negoName: Ref<string> = ref('');
let negoHistory: Ref<Array<any>> = ref([]);
let myName: Ref<string> = ref('');
let hisAvatar: Ref<PlayerAvatar | null> = ref(null);

function postWage(): void {
    console.log(parseInt(negoWage.value));
    negoHistory.value.push({
        isMe: true,
        message: negoWage.value,
        avatar: 'http://lvshuhuai.cn:13127/Public/' + myName.value + '.png',
    });
    negotiateWageAPI({target_player_id: negoId.value, offer_wage: parseInt(negoWage.value)}).then((response: any) => {
        let message: string = "";
        if (response.status === 'success') {
            message = "这是一个合理的薪资，我愿意转入您的俱乐部。";
        } else if (response.status === 'fail') {
            message = "老实说，您开出的价码稍微有点少了，让我再考虑考虑。";
        }
        negoHistory.value.push({
            isMe: false,
            message: message,
            avatar: hisAvatar.value,
        });
    }).catch((_error: any) => {
    });
    negoWage.value = '';
}

function test(): void {
    getNegotiateListAPI()
        .then((response: any) => {
            for (let item in response) {
                let noti: NotificationReactive = notification.create({
                    title: "恭喜您，您的报价被我方接受！",
                    description: response[item].player_info.club_name,
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
                                            noti.destroy();
                                        }
                                    },
                                    '确定'),
                                h(NButton,
                                    {
                                        type: 'primary',
                                        onClick: () => {
                                            showNegoModal.value = true;
                                            negoId.value = response[item].player_info.id;
                                            negoName.value = response[item].player_info.translated_name;
                                            hisAvatar.value = response[item].player_info.avatar;
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
                            src: 'http://lvshuhuai.cn:13127/Public/' + response[item].player_info.club_name + ".png"
                        })
                });
            }
        })
        .catch((_error: {}) => {
        });
}

</script>
