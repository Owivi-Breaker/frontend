<!-- <template>
    <n-card>
        <n-thing>
            <template #avatar>
                <svg class="aa">
                    <avataaars />
                </svg>
            </template>
            <template #header>梅西</template>
            <template #header-extra>
                <n-button circle size="small">
                    <template #icon>
                        <cash-icon />
                    </template>
                </n-button>
            </template>
            货币是为了提高交易效率而用于交换的中介商品。货币有多种形式，如贝壳粮食等自然物、金属纸张等加工品、银行卡信用卡等磁条卡、移动支付加密货币等APP。
            <template
                #footer
            >尾部</template>
            <template #action>
                <n-space>
                    <n-button size="small">
                        <template #icon>
                            <n-icon>
                                <cash-icon />
                            </n-icon>
                        </template>
                        1 块钱
                    </n-button>
                    <n-button size="small">
                        <template #icon>
                            <n-icon>
                                <cash-icon />
                            </n-icon>
                        </template>
                        10 块钱
                    </n-button>
                    <n-button size="small">
                        <template #icon>
                            <n-icon>
                                <wine-icon />
                            </n-icon>
                        </template>
                        100 块钱
                    </n-button>
                </n-space>
            </template>
        </n-thing>
    </n-card>
</template> -->

<template>
    <n-card title="梅西">
        <template #header-extra>
            <svg class="aa">
                <avataaars />
            </svg>
        </template>
    </n-card>
</template>
<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import { CashOutline as CashIcon, WineOutline as WineIcon } from "@vicons/ionicons5"
import { defineComponent } from 'vue';
</script>

<style>
.aa {
    width: 100px;
    height: 100px;
    padding: 5px;
}
</style>