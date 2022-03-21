<template>
    <div>
        <div class="flex flex-col items-center gap-0.5">
            <div class="w-14 h-14 rounded-full">
                <Avataaars :is-circle="false" v-bind="playerInfo.avatar" />
            </div>
            <div
                class="truncate text-sm text-semibold"
                :style="clubTx(clubName, 0.4)"
            >{{ playerInfo.translated_name }}</div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, onMounted, reactive, ref, watch } from 'vue';
import { getPlayerByIdAPI } from '@/apis/player';
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
import { getColor, getClubColor, clubBg, clubTx } from "@/utils/colorMap";
import { useStore } from "@/stores/store";
const store = useStore();

const props: any = defineProps({
    playerGameData: Object,
    playerId: Number,
});


const clubName: ComputedRef = computed(() => {
    return props.clubName;
});

const playerInfo: any = ref({})

watch(() => props.playerId, (newVal) => {

    getPlayerByIdAPI({ player_id: newVal }).then((response: any) => {
        playerInfo.value = response;
    });
}, {
    deep: true,
    immediate: true
}
)

getPlayerByIdAPI({ player_id: props.playerId }).then((response: any) => {
    playerInfo.value = response;
});


</script>

