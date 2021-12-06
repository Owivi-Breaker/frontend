<template>
    <va-data-table :items="PlayerData" v-show="showTable">
        <template #header(translated_name)>姓名</template>
        <template #header(translated_nationality)>国籍</template>
        <template #cell()="{ source: age }">{{ age + 100 }}</template>
    </va-data-table>
</template>

<script lang="ts" setup>
import { getClubPlayerAPI } from '@/api/player';
import { onMounted, reactive, ref, computed } from 'vue'


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
const PlayerData = computed(() =>
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