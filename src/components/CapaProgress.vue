<template>
    <div>
        <!-- <n-grid cols="5">
            <n-gi span="1">
                <n-h5>{{ capaName }}</n-h5>
            </n-gi>
            <n-gi span="4">
                <n-progress
                    :color="getColor(capaRating)"
                    :percentage="Math.round(capaRating)"
                    fill-border-radius="12px 0px 0px 12px"
                    height="10"
                    type="line"
                    unit
                />
            </n-gi>
        </n-grid>-->
        <div class="flex items-center gap-3">
            <div class="text-gray-500 w-1/5">{{ capaName }}</div>

            <n-progress
                :color="getColor(capaRating)"
                :percentage="Math.round(capaRating)"
                fill-border-radius="12px 0px 12px 12px"

                :height="10"
                type="line"
                unit=""
                :show-indicator="false"
            />
            <div class="text-gray-500">{{Math.round(capaRating)}}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getColor } from '@/utils/colorMap';

interface Props {
    capaName: string;
    capaRating: number;
}

const props = withDefaults(defineProps<Props>(), {
    capaName: '',
    capaRating: 0
});

// watch(() => capaRating.value, (newVal) => {
//         capaRating.value = newVal
//     }
// )
</script>
