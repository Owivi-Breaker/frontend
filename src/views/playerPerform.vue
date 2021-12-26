<template>
    <n-h1>球员数据</n-h1>
    <n-data-table v-if="!isLoading" :columns="columns" :data="playerData" striped/>
    <n-modal v-model:show="isLoading" :mask-closable="false">
        <n-card :bordered="true" :title="loadTitle" class="loadModalCard" size="huge">
            <n-spin v-if="isLoading" size="medium"/>
            <n-icon v-if="!isLoading" class="completeCreateSaveIcon" color="#18a058" size="80">
                <Ios-Checkmark/>
            </n-icon>
        </n-card>
    </n-modal>
</template>
<script lang="ts" setup>
import { getPlayersByClubAPI } from '@/apis/player';
import { getColor } from "@/utils/colorMap"
import { defineComponent, h, ref, computed } from 'vue';
import { NTag } from 'naive-ui';
import { Ref } from "@vue/reactivity";
import { IosCheckmark } from '@vicons/ionicons4';
// todo get token and return

const columns = [
    {
        title: '姓名',
        key: '姓名'
    },
    {
        title: '年龄',
        key: '年龄',
        render(row: any) {
            return h(
                NTag,
                {
                    style: {
                        marginRight: '6px'
                    },
                    type: 'info'
                },
                {
                    default: () => row['年龄']
                }
            )
        }
    },
    {
        title: '国籍',
        key: '国籍'
    },
    {
        title: '射门',
        key: '射门',
        render(row: any) {
            return h(
                'p',
                {
                    style: {
                        color: getColor(row['射门'], 'text')

                    },
                },
                {
                    default: () => row['射门']
                }
            )
        }
    },
    {
        title: '过人',
        key: '过人',
        render(row: any) {
            return h(
                'p',
                {
                    style: {
                        color: getColor(row['过人'], 'text')
                    },
                },
                {
                    default: () => row['过人']
                }
            )
        }
    },
    {
        title: '防守',
        key: '防守',
        render(row: any) {
            return h(
                'p',
                {
                    style: {
                        color: getColor(row['防守'], 'text')
                    },
                },
                {
                    default: () => row['防守']
                }
            )
        }
    },
    {
        title: '体力',
        key: '体力',
        render(row: any) {
            return h(
                'p',
                {
                    style: {
                        color: getColor(row['体力'], 'text')
                    },
                },
                {
                    default: () => row['体力']
                }
            )
        }
    },
    {
        title: '速度',
        key: '速度',
        render(row: any) {
            return h(
                'p',
                {
                    style: {
                        color: getColor(row['速度'], 'text')
                    },
                },
                {
                    default: () => row['速度']
                }
            )
        }
    },
    {
        title: '守门',
        key: '守门',
        render(row: any) {
            return h(
                'p',
                {
                    style: {
                        color: getColor(row['守门'], 'text')
                    },
                },
                {
                    default: () => row['守门']
                }
            )
        }
    },

    {
        title: '侵略',
        key: '侵略',
        render(row: any) {
            return h(
                'p',
                {
                    style: {
                        color: getColor(row['侵略'], 'text')
                    },
                },
                {
                    default: () => row['侵略']
                }
            )
        }
    },
    {
        title: '任意球',
        key: '任意球',
        render(row: any) {
            return h(
                'p',
                {
                    style: {
                        color: getColor(row['任意球'], 'text')
                    },
                },
                {
                    default: () => row['任意球']
                }
            )
        }
    }
]

let isLoading: Ref<boolean> = ref(true);
let loadTitle: Ref<String> = ref("请稍候");
defineComponent({
    components: {
        IosCheckmark
    }
});

/* 获取球员数据 */
let rawPlayerData: Ref<Array<object>> = ref([]);
getPlayersByClubAPI({ club_id: 1, is_player_club: true })
    .then((response) => {
        rawPlayerData.value = response;
        isLoading.value = false;
    });
/* 处理球员数据 */
const playerData = computed(() =>
    rawPlayerData.value.map(handleRawPlayerData)
)

const handleRawPlayerData = (value: any): object => {
    let result: any = {};
    result['姓名'] = value.translated_name
    result['年龄'] = value.age
    result['国籍'] = value.translated_nationality
    // a['出生日期'] = value.birth_date

    result['射门'] = parseInt(value.capa.shooting)
    result['过人'] = parseInt(value.capa.dribbling)
    result['防守'] = parseInt(value.capa.interception)
    result['速度'] = parseInt(value.capa.pace)
    result['体力'] = parseInt(value.capa.stamina)
    result['守门'] = parseInt(value.capa.goalkeeping)
    result['侵略'] = parseInt(value.capa.aggression)
    result['任意球'] = parseInt(value.capa.free_kick)
    return result;
}
</script>


<style>
.loadModalCard {
    width: 320px;
    height: 180px;
    text-align: center;
}

.completeCreateSaveIcon {
    margin-top: -30px;
}
</style>