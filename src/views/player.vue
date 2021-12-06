<template>
    <n-h1>球员数据</n-h1>
    <n-data-table :columns="columns" :data="playerData" striped />
</template>

<script lang="ts" setup>
import { getClubPlayerAPI } from '@/api/player';
import { onMounted, h, ref, computed } from 'vue'
import { NTag } from 'naive-ui'


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
let rawPlayerData = ref([])
let showTable = ref(false)
onMounted(
    () => {
        getClubPlayerAPI({ club_id: 1 })
            .then((res) => {
                rawPlayerData.value = res
                showTable.value = true
            })
    }
)

/* 处理球员数据 */
const playerData = computed(() =>
    rawPlayerData.value.map(handleRawPlayerData)
)

const handleRawPlayerData = (value: any) => {
    let a: any = {}

    a['姓名'] = value.translated_name
    a['年龄'] = value.age
    a['国籍'] = value.translated_nationality
    // a['出生日期'] = value.birth_date
    a['射门'] = parseInt(value.shooting)
    a['过人'] = parseInt(value.dribbling)
    a['防守'] = parseInt(value.interception)
    a['速度'] = parseInt(value.pace)
    a['体力'] = parseInt(value.stamina)
    a['守门'] = parseInt(value.goalkeeping)
    a['侵略'] = parseInt(value.aggression)
    a['任意球'] = parseInt(value.free_kick)

    return a
}


</script>