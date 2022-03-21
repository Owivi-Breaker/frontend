<template>
    <div class="relative s-card p-5 overflow-hidden" hoverable size="large" @click="goDetail">
        <div class="relative">
            <div class="text-9xl text-primary-active font-bold absolute right-2 -top-4">
                {{ playerData.top_location }}
            </div>
        </div>
        <n-space :vertical="true">
            <div class="flex items-start gap-10">
                <div class="">
                    <Avataaars :is-circle="false" v-bind="playerData.avatar"
                               class="w-25 h-25 border-6 border-primary-active rounded-full"/>
                </div>
                <div class="">
                    <div class="flex flex-col gap-3">
                        <div class="text-primary text-xl font-semibold">
                            {{ playerData.translated_name }}
                        </div>
                        <div class="grid grid-col-2">
                            <div>
                                <span class="text-gray-500 mr-3">国籍</span>
                                {{ playerData.translated_nationality }}
                            </div>
                            <div>
                                <span class="text-gray-500 mr-3">年龄</span>
                                {{ playerData.age }}岁
                            </div>
                            <div>
                                <span class="text-gray-500 mr-3">能力</span>
                                {{ Math.round(playerData.top_capa * 100) / 100 }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <n-grid cols="3" class="mt-5">
                <n-gi span="3">
                    <CapaProgress :capa-rating="Math.round(playerData.capa.shooting * 100) / 100" capa-name="射门">
                    </CapaProgress>
                    <CapaProgress :capa-rating="Math.round(playerData.capa.passing * 100) / 100" capa-name="传球">
                    </CapaProgress>
                    <CapaProgress :capa-rating="Math.round(playerData.capa.dribbling * 100) / 100" capa-name="过人">
                    </CapaProgress>
                    <CapaProgress :capa-rating="Math.round(playerData.capa.pace * 100) / 100" capa-name="速度">
                    </CapaProgress>
                    <CapaProgress :capa-rating="Math.round(playerData.capa.strength * 100) / 100" capa-name="力量">
                    </CapaProgress>
                    <CapaProgress :capa-rating="Math.round(playerData.capa.interception * 100) / 100" capa-name="拦截">
                    </CapaProgress>
                    <CapaProgress :capa-rating="Math.round(playerData.capa.anticipation * 100) / 100" capa-name="预判">
                    </CapaProgress>
                    <CapaProgress :capa-rating="Math.round(playerData.capa.stamina * 100) / 100" capa-name="体力">
                    </CapaProgress>
                    <CapaProgress :capa-rating="Math.round(playerData.capa.goalkeeping * 100) / 100" capa-name="守门">
                    </CapaProgress>
                </n-gi>
            </n-grid>
        </n-space>
    </div>
</template>
<script lang="ts" setup>
import {Router} from 'vue-router';
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
import {useRouterPush} from '@/composables';
import CapaProgress from '@/components/CapaProgress.vue';
import {PlayerAvatar} from "@/interface";

const {routerPush} = useRouterPush();

const props: any = defineProps<{
    playerData: {
        translated_name: String;
        translated_nationality: String;
        age: number;
        top_capa: number;
        top_location: number;
        capa: {
            shooting: number;
            passing: number;
            dribbling: number;
            pace: number;
            strength: number;
            interception: number;
            anticipation: number;
            stamina: number;
            goalkeeping: number;
        };
        avatar: PlayerAvatar;
    };
}>();
declare const window: Window & { $router: Router };

function goDetail(): void {
    routerPush({path: 'player-page', query: {id: props.playerData.id}});
}
</script>
<style>
</style>
