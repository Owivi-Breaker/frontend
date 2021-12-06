<template>
    <va-data-table :items="v" v-show="showTable">
        <template #cell(age)="{ source: age }">
            <va-chip>{{ age }}</va-chip>
        </template>
    </va-data-table>

    {{ v }}
</template>

<script lang="ts" setup>
import { getClubPlayerAPI } from '@/api/player';
import { onMounted, reactive, ref } from 'vue'

let v = ref([])
let showTable = ref(false)

// interface PlayerConfig {
//     translated_name: string;
//     translated_nationality: string;
//     age: number;
//     shooting: number;
//     passing: number;
//     dribbling: number;
//     interception: number;
//     pace: number;
// }

onMounted(
    () => {
        getClubPlayerAPI({ club_id: 1 })
            .then((res) => {
                v.value = res
                showTable.value = true
            })
    }
)
</script>