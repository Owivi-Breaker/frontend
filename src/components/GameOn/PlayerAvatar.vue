<template>
    <div>
        <div class="flex flex-col items-center gap-0.5">
            <div
                class="w-13 h-13 border-3 rounded-full"
                :style="{ 'border-color': getColor(props.playerGameData.final_stamina, 'progress', 45, 100) }"
            >
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
    clubName: String,
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

