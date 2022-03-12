<template>
    <div>
        <div class="searchPanel">
            <n-input class="searchInput" v-model:value="playerName" type="text" placeholder="球员信息">
                <template #prefix>
                    <n-icon size="20">
                        <search-outline></search-outline>
                    </n-icon>
                </template>
            </n-input>
            <n-button class="searchButton" type="primary" @click="search">
                搜索
            </n-button>
        </div>
        <div class="listTable">
            <n-data-table :columns="playerColumns" :data="playerData" :pagination="paginationReactive"
                          :loading="dataLoading" :row-props="rowProps" @update:sorter="resort">
            </n-data-table>
            <n-dropdown
                placement="right"
                trigger="manual"
                :x="mouseX"
                :y="mouseY"
                :options="options"
                :show="showRequest"
                :on-clickoutside="onClickoutside"
            />
            <n-modal v-model:show="showModal">
                <n-card :bordered="false" size="huge" style="width: 400px">
                    <template #header>
                        提交报价
                    </template>
                    <template #default>
                        <n-grid cols="3">
                            <n-gi span="1">
                                <Avataaars height="75%" v-bind="tradeTarget['avatar']" width="75%"/>
                            </n-gi>
                            <n-gi span="2">
                                <div style="display: flex; height: 100%; align-items: center;">
                                    <n-h3>
                                        {{ tradeTarget["姓名"] }}
                                    </n-h3>
                                </div>
                            </n-gi>
                        </n-grid>
                        <n-input-number v-model:value="offerPrice" size="large">
                            <template #prefix>
                                €
                            </template>
                            <template #suffix>
                                万
                            </template>
                        </n-input-number>
                    </template>
                    <template #footer>
                        <n-space align="center" justify="end">
                            <n-button @click="showModal = false">关闭</n-button>
                            <n-button type="primary" @click="makeOffer">发起报价</n-button>
                        </n-space>
                    </template>
                </n-card>
            </n-modal>
        </div>
    </div>
</template>
<script setup lang="ts">
import {Search, SearchOutline} from '@vicons/ionicons5';
import {computed, ComputedRef, defineComponent, h, nextTick, onMounted, reactive, ref, Ref} from "vue";
import {DropdownOption, MessageApi, NButton, NTag} from "naive-ui";
import {getColor} from "@/utils/colorMap";
import {useStore} from '@/stores/store';
import {getOnSalePlayersAPI, makeOfferByUserAPI} from "@/apis/transfer";
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';

defineComponent({Search, SearchOutline, Avataaars});
let store: any = useStore();
let playerName: Ref<String> = ref("");
let pageAmount: number = 0;
let pageSize: number = 10;
let pagePerGet: number = 10;
let rawData: Ref<Array<any>> = ref([]);
let dataLoading: Ref<boolean> = ref(false);
const paginationReactive = reactive({
    page: 1,
    pageSize: pageSize,
    pageCount: pageAmount,
    onChange: (page: number) => {
        if (page >= pageAmount) {
            dataLoading.value = true;
            getOnSalePlayersAPI({
                offset: pageAmount * pageSize,
                limit: pagePerGet * pageSize,
                attri: "id",
                order: 0
            }).then((response: any) => {
                for (let i = 0; i < response.length; i++) {
                    rawData.value.push(response[i]);
                }
                pageAmount += pagePerGet;
                dataLoading.value = false;
            });
        }
        paginationReactive.page = page;
    }
})

function search() {
    console.log(playerName.value);
}

class playerItem {
    title: string;
    key: string;
    fixed: string | null;
    width: number | null;
    align: string;
    render: Function | null;
    sorter: string;

    constructor(title: string) {
        this.title = title;
        this.key = title;
        this.fixed = title === '姓名' ? 'left' : null;
        this.width = title === '姓名' ? 150 : null;
        this.align = 'left';
        if (title === '年龄') {
            this.render = (row: any) => {
                return h(NTag, {style: {marginRight: '6px'}, type: 'info'}, {default: () => row['年龄']});
            };
        } else if (title === '周薪' || title === '身价') {
            this.render = (row: any) => {
                return h(
                    'p',
                    {style: {margin: 0}},
                    {default: () => row[this.key]}
                );
            };
        } else {
            this.render = (row: any) => {
                return h(
                    'p',
                    {style: {margin: 0, color: getColor(row[this.key], 'text')}},
                    {default: () => row[this.key]}
                );
            };
        }
        this.sorter = 'default';
    }
}

const playerColumns: Array<Object> = [
    new playerItem('姓名'),
    new playerItem('年龄'),
    new playerItem('国籍'),
    new playerItem('俱乐部'),
    new playerItem('周薪'),
    new playerItem('身价'),
    new playerItem('位置'),
    new playerItem('射门'),
    new playerItem('传球'),
    new playerItem('过人'),
    new playerItem('抢断'),
    new playerItem('速度'),
    new playerItem('力量'),
    new playerItem('侵略'),
    new playerItem('预判'),
    new playerItem('任意球'),
    new playerItem('体能'),
    new playerItem('守门'),
];
const playerData: ComputedRef = computed(() =>
    rawData.value.map((value: any) => {
        value['姓名'] = value.translated_name;
        value['年龄'] = value.age;
        value['国籍'] = value.translated_nationality;
        value['俱乐部'] = value.club_name;
        value['周薪'] = value.wages;
        value['身价'] = value.values;
        value['位置'] = value.top_location;
        if (value.capa) {
            value['射门'] = Math.round(value.capa.shooting * 100) / 100;
            value['传球'] = Math.round(value.capa.passing * 100) / 100;
            value['过人'] = Math.round(value.capa.dribbling * 100) / 100;
            value['抢断'] = Math.round(value.capa.dribbling * 100) / 100;
            value['速度'] = Math.round(value.capa.pace * 100) / 100;
            value['力量'] = Math.round(value.capa.strength * 100) / 100;
            value['侵略'] = Math.round(value.capa.aggression * 100) / 100;
            value['预判'] = Math.round(value.capa.interception * 100) / 100;
            value['任意球'] = Math.round(value.capa.free_kick * 100) / 100;
            value['体能'] = Math.round(value.capa.stamina * 100) / 100;
            value['守门'] = Math.round(value.capa.goalkeeping * 100) / 100;
        }
        return value;
    })
);
type DataTableSorter = {
    columnKey: string | number
    sorter: 'default' | Function | boolean
    order: 'ascend' | 'descend' | false
}

function resort(sorter: DataTableSorter): void {
    dataLoading.value = true;
    pageAmount = 0;
    paginationReactive.page = 1;
    rawData.value = [];
    let trans: any = {
        '姓名': 'translated_name',
        '年龄': 'age',
        '国籍': 'translated_nationality',
        '俱乐部': 'club_name',
        '周薪': 'wages',
        '身价': 'values',
        '位置': 'top_location',
    };
    let attri: string = trans[sorter.columnKey];
    let order: number;
    if (sorter.order === 'ascend' || !sorter.order) {
        order = 0;
        if (!sorter.order) {
            attri = 'id';
        }
    } else {
        order = 1;
    }
    getOnSalePlayersAPI({
        offset: pageAmount * pageSize,
        limit: pagePerGet * pageSize,
        attri: attri,
        order: order
    }).then((response: any) => {
        rawData.value = response;
        pageAmount += pagePerGet;
        dataLoading.value = false;
    });
}

onMounted(() => {
    dataLoading.value = true;
    getOnSalePlayersAPI({
        offset: pageAmount * pageSize,
        limit: pagePerGet * pageSize,
        attri: "id",
        order: 0
    }).then((response: any) => {
        rawData.value = response;
        pageAmount += pagePerGet;
        dataLoading.value = false;
    });
});
let tradeTarget: Ref = ref(null);
let showModal: Ref<boolean> = ref(false);
const options: DropdownOption[] = [
    {
        label: '请求交易',
        type: 'render',
        render: () => {
            return h(
                NButton,
                {
                    type: 'primary',
                    onClick: () => {
                        showRequest.value = false;
                        showModal.value = true;
                    }
                },
                [h('div', '请求交易')]
            )
        }
    }
];
let showRequest: Ref<boolean> = ref(false);
let mouseX: Ref<number> = ref(0);
let mouseY: Ref<number> = ref(0);

function onClickoutside() {
    showRequest.value = false;
}

let rowProps = (row: any) => {
    return {
        onClick: (event: MouseEvent) => {
            tradeTarget.value = row;
            event.preventDefault();
            showRequest.value = false;
            nextTick().then(() => {
                showRequest.value = true;
                mouseX.value = event.clientX;
                mouseY.value = event.clientY;
            });
        }
    }
}
let offerPrice: Ref<number> = ref(0);
declare const window: Window & { $message: MessageApi; };

function makeOffer(): void {
    makeOfferByUserAPI({
        target_player_id: tradeTarget.value.id,
        offer_price: offerPrice.value
    }).then((_response: any) => {
        window.$message.success('交易请求已发送');
        showModal.value = false;
    }).catch((_error: any) => {
    });
}

defineExpose({playerName, playerColumns, playerData});
</script>
<style scoped>
.searchPanel {
    display: flex;
}

.searchInput {
    align-self: center;
    width: 20%;
}

.searchButton {
    align-self: center;
    margin-left: 10px;
}

.listTable {
    margin-top: 20px;
}

</style>