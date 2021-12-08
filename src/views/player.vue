<template>
    <n-h1>球员数据</n-h1>
    <n-data-table v-if="!isLoading" :columns="columns" :data="playerData" striped />
    <n-modal v-model:show="isLoading" :mask-closable="false">
        <n-card class="loadModalCard" :title="loadTitle" :bordered="true" size="huge">
            <n-spin v-if="isLoading" size="medium" />
            <n-icon class="completeCreateSaveIcon" v-if="!isLoading" size="80" color="#18a058">
                <Ios-Checkmark />
            </n-icon>
        </n-card>
    </n-modal>
</template>
<script lang="ts" setup>
import { getClubPlayerAPI } from '@/api/player';
import { defineComponent, h, ref, computed } from 'vue';
import { NTag } from 'naive-ui';
import { Ref } from "@vue/reactivity";
import { IosCheckmark } from '@vicons/ionicons4';
// todo get token and return
const judgeColorByRating = (rating: number) => {
    // TODO 颜色
    if (rating >= 90) {
        return '#008000'
    }
    if (rating >= 80) {
        return '#32CD32'
    }
    if (rating >= 70) {
        return '#FFD700'
    }
    if (rating >= 60) {
        return '#FF8C00'
    }
    else {
        return '#FF4500'
    }
}

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
                        color: judgeColorByRating(row['射门'])

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
                        color: judgeColorByRating(row['过人'])
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
                        color: judgeColorByRating(row['防守'])
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
                        color: judgeColorByRating(row['体力'])
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
                        color: judgeColorByRating(row['速度'])
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
        key: '守门'
    },

    {
        title: '侵略',
        key: '侵略'
    },
    {
        title: '任意球',
        key: '任意球'
    }
]

/* 获取球员数据 */
let rawPlayerData: Ref<Array<object>> = ref([]);
let isLoading: Ref<boolean> = ref(true);
let loadTitle: Ref<String> = ref("请稍候");
defineComponent({
    components: {
        IosCheckmark
    }
});
getClubPlayerAPI({ club_id: 1 })
    .then((response) => {
        rawPlayerData.value = response;
        isLoading.value = false;
    });
/* 处理球员数据 */
const playerData = computed(() =>
    rawPlayerData.value.map(handleRawPlayerData)
)
function handleRawPlayerData(value: any): object {
    let result: any = {};
    result['姓名'] = value.translated_name
    result['年龄'] = value.age
    result['国籍'] = value.translated_nationality
    // a['出生日期'] = value.birth_date
    result['射门'] = parseInt(value.shooting)
    result['过人'] = parseInt(value.dribbling)
    result['防守'] = parseInt(value.interception)
    result['速度'] = parseInt(value.pace)
    result['体力'] = parseInt(value.stamina)
    result['守门'] = parseInt(value.goalkeeping)
    result['侵略'] = parseInt(value.aggression)
    result['任意球'] = parseInt(value.free_kick)
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