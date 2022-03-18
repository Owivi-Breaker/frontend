<template>
    <div>
        <div class="flex flex-col items-center gap-1">
            <div class="w-10 h-10">
                <Avataaars :is-circle="false" v-bind="playerInfo.avatar" />
            </div>
            <div class="text-primary text-xs truncate">{{ playerInfo.translated_name }}</div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, onMounted, reactive, ref, watch } from 'vue';
import { getPlayerByIdAPI } from '@/apis/player';
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';

const props: any = defineProps({
    playerId: Number
});

const playerInfo: any = ref({})

watch(() => props.playerId, (newVal) => {
    getPlayerByIdAPI({ player_id: newVal }).then((response: any) => {
        playerInfo.value = response;
    });
}
)

getPlayerByIdAPI({ player_id: props.playerId }).then((response: any) => {
    playerInfo.value = response;
});


</script>

