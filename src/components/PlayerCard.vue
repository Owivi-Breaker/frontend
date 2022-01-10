<template>
    <n-card hoverable size="large" v-on:click="goDetail">
        <n-space vertical>
            <n-grid cols="3" x-gap="9">
                <n-gi span="1">
                    <Avataaars height="75%" width="75%" />
                </n-gi>
                <n-gi span="2">
                    <n-descriptions :column="2" :title="playerData.translated_name" label-placement="left">
                        <n-descriptions-item label="国籍">{{ playerData.translated_nationality }}</n-descriptions-item>
                        <n-descriptions-item label="年龄">{{ playerData.age }}</n-descriptions-item>
                        <n-descriptions-item label="能力">{{ playerData.top_capa }}</n-descriptions-item>
                        <n-descriptions-item label="位置">{{ playerData.top_location }}</n-descriptions-item>
                    </n-descriptions>
                </n-gi>
            </n-grid>
            <n-grid cols="3">
                <n-gi span="3">
                    <CapaProgress :capaRating="playerData.capa.shooting" capaName="射门"></CapaProgress>
                    <CapaProgress :capaRating="playerData.capa.passing" capaName="传球"></CapaProgress>
                    <CapaProgress :capaRating="playerData.capa.dribbling" capaName="过人"></CapaProgress>
                    <CapaProgress :capaRating="playerData.capa.pace" capaName="速度"></CapaProgress>
                    <CapaProgress :capaRating="playerData.capa.strength" capaName="力量"></CapaProgress>
                    <CapaProgress :capaRating="playerData.capa.interception" capaName="拦截"></CapaProgress>
                    <CapaProgress :capaRating="playerData.capa.anticipation" capaName="预判"></CapaProgress>
                    <CapaProgress :capaRating="playerData.capa.stamina" capaName="体力"></CapaProgress>
                    <CapaProgress :capaRating="playerData.capa.goalkeeping" capaName="守门"></CapaProgress>
                </n-gi>
                <!--<n-gi span="1"></n-gi>-->
            </n-grid>
        </n-space>
    </n-card>
</template>
<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import CapaProgress from "@/components/CapaProgress.vue"
import { Router, useRouter } from 'vue-router';
let props: any = defineProps<{
    playerData: {
        "translated_name": String,
        "translated_nationality": String,
        "age": number,
        "top_capa": number,
        "top_location": number,
        "capa": {
            "shooting": number,
            "passing": number,
            "dribbling": number,
            "pace": number,
            "strength": number,
            "interception": number,
            "anticipation": number,
            "stamina": number,
            "goalkeeping": number,
        }
    }
}>();
let router: Router = useRouter();
function goDetail(): void {
    console.log(props.playerData)
    router.push({ name: "player-page" });
}
</script>
<style>
.avatar {
    width: 80px;
    height: 80px;
    padding: 5px;
}

.display-flex {
    display: flex;
}
</style>