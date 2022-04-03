<template>
    <div>
        <n-scrollbar :x-scrollable="true">
            <n-spin v-if="isLoading" class="p-25 flex iteams-center"></n-spin>
            <div v-if="!isLoading" class="flex justify-around gap-5 py-10">
                <!-- 最佳射手 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars v-bind="bestPlayers.最佳射手.avatar" :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">最佳射手</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>
                        <div class="text-lg font-semibold">{{ bestPlayers.最佳射手.translated_name }}</div>
                        <div class>{{ bestPlayers.进球 }} 粒进球</div>
                    </div>
                </div>
                <!-- 平均评分最高 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars v-bind="bestPlayers.平均评分最高.avatar" :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">平均评分最高</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>
                        <div class="text-lg font-semibold">{{ bestPlayers.平均评分最高.translated_name }}</div>
                        <div class>{{ bestPlayers.评分 }} 分</div>
                    </div>
                </div>
                <!-- 助攻最多 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars v-bind="bestPlayers.助攻最多.avatar" :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">助攻最多</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>

                        <div class="text-lg font-semibold">{{ bestPlayers.助攻最多.translated_name }}</div>
                        <div class>{{ bestPlayers.助攻 }} 次助攻</div>
                    </div>
                </div>
                <!-- 传球成功率最高 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars v-bind="bestPlayers.传球成功率最高.avatar" :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">传球成功率最高</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>
                        <div class="text-lg font-semibold">{{ bestPlayers.传球成功率最高.translated_name }}</div>
                        <div class>{{ Math.round(bestPlayers.传球成功率 * 10000) / 100 }}%</div>
                    </div>
                </div>
                <!-- 拦截成功率最高 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars v-bind="bestPlayers.拦截成功率最高.avatar" :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">拦截成功率最高</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>
                        <div class="text-lg font-semibold">{{ bestPlayers.拦截成功率最高.translated_name }}</div>

                        <div class>{{ Math.round(bestPlayers.拦截成功率 * 10000) / 100 }}%</div>
                    </div>
                </div>
                <!-- 过人成功率最高 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars v-bind="bestPlayers.过人成功率最高.avatar" :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">过人成功率最高</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>
                        <div class="text-lg font-semibold">{{ bestPlayers.过人成功率最高.translated_name }}</div>
                        <div class>{{ Math.round(bestPlayers.过人成功率 * 10000) / 100 }}%</div>
                    </div>
                </div>
            </div>
        </n-scrollbar>
    </div>
</template>
<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
import {ClubMeBestPlayersResponse} from "@/interface/response/club";
import {getBestPlayersAPI} from "@/apis/club";
import {onMounted, ref, Ref} from "vue";

let isLoading: Ref<boolean> = ref(true);
let bestPlayers: Ref<ClubMeBestPlayersResponse | null> = ref(null);
onMounted(() => {
    getBestPlayersAPI().then((response: ClubMeBestPlayersResponse) => {
        bestPlayers.value = response;
        isLoading.value = false;
    }).catch((_error: any) => {
    });
});
</script>
<style scoped>
</style>
