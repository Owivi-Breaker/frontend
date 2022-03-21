<template>
    <div class="rounded-lg 3xl:rounded-xl shadow-md p-3 pt-10 bg-primary-active" >
        <n-scrollbar x-scrollable>
            <!-- 前场 -->
            <div class="flex gap-2 justify-around">
                <!-- LW -->
                <div class="w-1/4 h-20">
                    <div class="flex justify-around gap-1">
                        <div v-for="(value, key) in pos['LW']">
                            <PlayerAvatar
                                :club-name="clubName"
                                :player-game-data="value"
                                :player-id="value.player_id"
                            ></PlayerAvatar>
                        </div>
                    </div>
                </div>
                <!-- ST -->
                <div class="h-20">
                    <n-scrollbar x-scrollable>
                        <div class="flex justify-around gap-1">
                            <div v-for="(value, key) in pos['ST']">
                                <PlayerAvatar
                                    :club-name="clubName"
                                    :player-game-data="value"
                                    :player-id="value.player_id"
                                ></PlayerAvatar>
                            </div>
                        </div>
                    </n-scrollbar>
                </div>
                <!-- RW -->
                <div class="w-1/4 h-20">
                    <div class="flex justify-around gap-1">
                        <div v-for="(value, key) in pos['RW']">
                            <PlayerAvatar
                                :club-name="clubName"
                                :player-game-data="value"
                                :player-id="value.player_id"
                            ></PlayerAvatar>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 中场 -->
            <!-- CAM 不可能出现 -->
            <div class="h-20" v-if="pos['CAM']">
                <div class="flex justify-around gap-1">
                    <div v-for="(value, key) in pos['CAM']">
                        <PlayerAvatar
                            :club-name="clubName"
                            :player-game-data="value"
                            :player-id="value.player_id"
                        ></PlayerAvatar>
                    </div>
                </div>
            </div>

            <div class="flex gap-2 justify-around">
                <!-- LM 不会出现 -->
                <div class="w-1/5 h-20">
                    <n-scrollbar x-scrollable>
                        <div class="flex justify-around gap-1">
                            <div v-for="(value, key) in pos['LM']">
                                <PlayerAvatar
                                    :club-name="clubName"
                                    :player-game-data="value"
                                    :player-id="value.player_id"
                                ></PlayerAvatar>
                            </div>
                        </div>
                    </n-scrollbar>
                </div>
                <!-- CM -->
                <div class="h-20">
                    <n-scrollbar x-scrollable>
                        <div class="flex justify-around gap-1">
                            <div v-for="(value, key) in pos['CM']">
                                <PlayerAvatar
                                    :club-name="clubName"
                                    :player-game-data="value"
                                    :player-id="value.player_id"
                                ></PlayerAvatar>
                            </div>
                        </div>
                    </n-scrollbar>
                </div>
                <!-- RM 不会出现 -->
                <div class="w-1/5 h-20">
                    <n-scrollbar x-scrollable>
                        <div class="flex justify-around">
                            <div v-for="(value, key) in pos['RM']">
                                <PlayerAvatar
                                    :club-name="clubName"
                                    :player-game-data="value"
                                    :player-id="value.player_id"
                                ></PlayerAvatar>
                            </div>
                        </div>
                    </n-scrollbar>
                </div>
            </div>
            <!-- CDM 不可能出现 -->
            <div class="h-20" v-if="pos['CDM']">
                <n-scrollbar x-scrollable>
                    <div class="flex justify-around gap-1">
                        <div v-for="(value, key) in pos['CDM']">
                            <PlayerAvatar
                                :club-name="clubName"
                                :player-game-data="value"
                                :player-id="value.player_id"
                            ></PlayerAvatar>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
            <!-- 后场 -->
            <!-- LB -->
            <div class="flex gap-2 justify-around">
                <div class="w-1/5 h-20">
                    <div class="flex justify-around gap-1">
                        <div v-for="(value, key) in pos['LB']">
                            <PlayerAvatar
                                :club-name="clubName"
                                :player-game-data="value"
                                :player-id="value.player_id"
                            ></PlayerAvatar>
                        </div>
                    </div>
                </div>
                <!-- CB -->
                <div class="h-20">
                    <n-scrollbar x-scrollable>
                        <div class="flex justify-around gap-1">
                            <div v-for="(value, key) in pos['CB']">
                                <PlayerAvatar
                                    :club-name="clubName"
                                    :player-game-data="value"
                                    :player-id="value.player_id"
                                ></PlayerAvatar>
                            </div>
                        </div>
                    </n-scrollbar>
                </div>
                <!-- RB -->
                <div class="w-1/5 h-20">
                    <div class="flex justify-around gap-1">
                        <div v-for="(value, key) in pos['RB']">
                            <PlayerAvatar
                                :club-name="clubName"
                                :player-game-data="value"
                                :player-id="value.player_id"
                            ></PlayerAvatar>
                        </div>
                    </div>
                </div>
            </div>
            <!-- GK -->
            <div class="h-20">
                <div class="flex justify-around overflow-x-auto">
                    <div v-for="(value, key) in pos['GK']">
                        <PlayerAvatar
                            :club-name="clubName"
                            :player-game-data="value"
                            :player-id="value.player_id"
                        ></PlayerAvatar>
                    </div>
                </div>
            </div>
        </n-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, onMounted, reactive, ref, watch } from 'vue';
import {
    PlayerAvatar
} from "@/components/GameOn";
import { useStore } from "@/stores/store";
import { getColor, getClubColor, clubBg, clubTx } from "@/utils/colorMap";
const store = useStore();
const props: any = defineProps({
    pos: String
});

const clubName: ComputedRef = computed(() => {
    return props.pos == 'left' ? store.homeTeamInfo.name : store.foreignTeamInfo.name;
});

const pos: ComputedRef = computed(() => {
    return props.pos == 'left' ? store.leftPos : store.rightPos;
});
</script>
