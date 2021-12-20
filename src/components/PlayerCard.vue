<template>
    <n-card :title="playerData.translated_name" hoverable size="large" style="margin-bottom: 16px;">
        <template #header>
            <n-grid cols="2" x-gap="9">

                <n-gi>
                    <svg class="avatar">
                        <Avataaars/>
                    </svg>
                </n-gi>
                <n-gi>
                    <n-descriptions :column="2" :title="playerData.translated_name" label-placement="left">
                        <n-descriptions-item label="国籍">{{ playerData.translated_nationality }}</n-descriptions-item>
                        <n-descriptions-item label="年龄">{{ playerData.age }}</n-descriptions-item>
                        <n-descriptions-item label="能力">{{ playerData.top_capa }}</n-descriptions-item>
                        <n-descriptions-item label="位置">{{ playerData.top_location }}</n-descriptions-item>
                    </n-descriptions>
                </n-gi>
            </n-grid>
        </template>

        <!--        <div style="margin-bottom: 20px;">-->
        <!--            <n-grid v-show="showOption" cols="4" x-gap="5" y-gap="5">-->
        <!--                <n-gi>-->
        <!--                    <n-statistic :value="92" label="进球"></n-statistic>-->
        <!--                </n-gi>-->
        <!--                <n-gi>-->
        <!--                    <n-statistic label="助攻">34</n-statistic>-->
        <!--                </n-gi>-->
        <!--                <n-gi>-->
        <!--                    <n-statistic :value="72" label="过人"></n-statistic>-->
        <!--                </n-gi>-->
        <!--                <n-gi>-->
        <!--                    <n-statistic label="抢断">28</n-statistic>-->
        <!--                </n-gi>-->
        <!--            </n-grid>-->
        <!--        </div>-->

        <n-grid cols="2" x-gap="0">
            <n-gi>
                <n-h5>射门</n-h5>
            </n-gi>
            <n-gi>
                <n-progress
                    :color="getColor(playerData.capa.shooting)"
                    :percentage="playerData.capa.shooting"
                    fill-border-radius="12px 0 12px 12px"
                    height="10"
                    type="line"
                    unit=""/>
            </n-gi>


            <n-gi>
                <n-h5>传球</n-h5>
            </n-gi>
            <n-gi>
                <n-progress
                    :color="getColor(playerData.capa.passing)"
                    :percentage="playerData.capa.passing"
                    fill-border-radius="12px 0 12px 12px"
                    height="10"
                    type="line"
                    unit=""/>
            </n-gi>

            <n-gi>
                <n-h5>过人</n-h5>
            </n-gi>
            <n-gi>
                <n-progress
                    :color="getColor(playerData.capa.dribbling)"
                    :percentage="playerData.capa.dribbling"
                    fill-border-radius="12px 0 12px 12px"
                    height="10"
                    type="line"
                    unit=""/>
            </n-gi>

            <n-gi>
                <n-h5>速度</n-h5>
            </n-gi>
            <n-gi>
                <n-progress
                    :color="getColor(playerData.capa.pace)"
                    :percentage="playerData.capa.pace"
                    fill-border-radius="12px 0 12px 12px"
                    height="10"
                    type="line"
                    unit=""/>
            </n-gi>
            <n-gi>
                <n-h5>力量</n-h5>
            </n-gi>
            <n-gi>
                <n-progress
                    :color="getColor(playerData.capa.strength)"
                    :percentage="playerData.capa.strength"
                    fill-border-radius="12px 0 12px 12px"
                    height="10"
                    type="line"
                    unit=""/>
            </n-gi>

            <n-gi>
                <n-h5>拦截</n-h5>
            </n-gi>
            <n-gi>
                <n-progress
                    :color="getColor(playerData.capa.interception)"
                    :percentage="playerData.capa.interception"
                    fill-border-radius="12px 0 12px 12px"
                    height="10"
                    type="line"
                    unit=""/>
            </n-gi>

            <n-gi>
                <n-h5>预判</n-h5>
            </n-gi>
            <n-gi>
                <n-progress
                    :color="getColor(playerData.capa.anticipation)"
                    :percentage="playerData.capa.anticipation"
                    fill-border-radius="12px 0 12px 12px"
                    height="10"
                    type="line"
                    unit=""/>
            </n-gi>

            <n-gi>
                <n-h5>体力</n-h5>
            </n-gi>
            <n-gi>
                <n-progress
                    :color="getColor(playerData.capa.stamina)"
                    :percentage="playerData.capa.stamina"
                    fill-border-radius="12px 0 12px 12px"
                    height="10"
                    type="line"
                    unit=""/>
            </n-gi>

            <n-gi>
                <n-h5>守门</n-h5>
            </n-gi>
            <n-gi>
                <n-progress
                    :color="getColor(playerData.capa.goalkeeping)"
                    :percentage="playerData.capa.goalkeeping"
                    fill-border-radius="12px 0 12px 12px"
                    height="10"
                    type="line"
                    unit=""/>
            </n-gi>
        </n-grid>
    </n-card>
</template>
<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import { getColor } from '@/utils/colorMap'


const props = defineProps({
    playerData: Object
})
console.log(props.playerData)
// let playerData = props.playerData

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