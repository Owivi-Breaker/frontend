<template>
    <div class="rounded-lg 3xl:rounded-xl shadow-md bg-primary-active p-3 pt-10">
        <!-- 前场 -->
        <div class="flex gap-2 justify-around">
            <!-- LW -->
            <div class="w-1/4 h-20">
                <div class="flex justify-around">
                    <div v-for="(value, key) in pos['LW']">
                        <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                    </div>
                </div>
            </div>
            <!-- ST -->
            <div class="h-20">
                <n-scrollbar x-scrollable>
                    <div class="flex justify-around gap-1">
                        <div v-for="(value, key) in pos['ST']">
                            <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
            <!-- RW -->
            <div class="w-1/4 h-20">
                <div class="flex justify-around">
                    <div v-for="(value, key) in pos['RW']">
                        <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                    </div>
                </div>
            </div>
        </div>
        <!-- 中场 -->
        <!-- CAM 不可能出现 -->
        <div class="h-20" v-if="pos['CAM']">
            <div class="flex justify-around">
                <div v-for="(value, key) in pos['CAM']">
                    <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                </div>
            </div>
        </div>

        <div class="flex gap-2 justify-around">
            <!-- LM -->
            <div class="w-1/4 h-20">
                <n-scrollbar x-scrollable>
                    <div class="flex justify-around">
                        <div v-for="(value, key) in pos['LM']">
                            <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
            <!-- CM -->
            <div class="h-20">
                <n-scrollbar x-scrollable>
                    <div class="flex justify-around gap-1">
                        <div v-for="(value, key) in pos['CM']">
                            <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
            <!-- RM -->
            <div class="w-1/4 h-20">
                <n-scrollbar x-scrollable>
                    <div class="flex justify-around">
                        <div v-for="(value, key) in pos['RM']">
                            <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
        </div>
        <!-- CDM 不可能出现-->
        <div class="h-20" v-if="pos['CDM']">
            <n-scrollbar x-scrollable>
                <div class="flex justify-around">
                    <div v-for="(value, key) in pos['CDM']">
                        <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                    </div>
                </div>
            </n-scrollbar>
        </div>
        <!-- 后场 -->
        <!-- LB -->
        <div class="flex gap-2 justify-around">
            <div class="w-1/5 h-20">
                <div class="flex justify-around overflow-x-auto">
                    <div v-for="(value, key) in pos['LB']">
                        <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                    </div>
                </div>
            </div>
            <!-- CB -->
            <div class="h-20">
                <n-scrollbar x-scrollable>
                    <div class="flex justify-around">
                        <div v-for="(value, key) in pos['CB']">
                            <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
            <!-- RB -->
            <div class="w-1/5 h-20">
                <div class="flex justify-around overflow-x-auto">
                    <div v-for="(value, key) in pos['RB']">
                        <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                    </div>
                </div>
            </div>
        </div>
        <!-- GK -->
        <div class="h-20">
            <div class="flex justify-around overflow-x-auto">
                <div v-for="(value, key) in pos['GK']">
                    <PlayerAvatar :player-id="value.player_id"></PlayerAvatar>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, onMounted, reactive, ref, watch } from 'vue';
import {
    PlayerAvatar
} from "@/components/GameOn";
import { useStore } from "@/stores/store";
const store = useStore();
const props: any = defineProps({
    pos: String
});


const pos: ComputedRef = computed(() => {
    return props.pos == 'left' ? store.leftPos : store.rightPos;
});
</script>
