<template>
    <div class="rounded-lg shadow-md bg-white p-5 w-2/5">
        <div class="text-lg font-semibold text-primary mb-3">财政</div>
        <n-spin v-if="isLoading" class="p-10 flex iteams-center"></n-spin>
        <div v-if="!isLoading" class="flex flex-col">
            <div class="flex justify-between">
                <div class>结余</div>
                <div v-bind:class="{'text-red-700': rowFinance < 0,'text-green-700':rowFinance > 0}">{{ finance }}</div>
            </div>
            <div class="flex justify-between">
                <div class>本赛季利润</div>
                <div v-bind:class="{'text-red-500': rowSeasonFinance < 0,'text-green-500':rowSeasonFinance > 0}">
                    {{ seasonFinance }}
                </div>
            </div>
            <div v-for="(item,key) in estimateFinance">
                <div class="font-semibold mt-4">{{ key }}</div>
                <div class="bg-primary-active w-full py-0.5 mb-2"></div>
                <div v-for="(inItem,key) in item" class="flex justify-between">
                    <div class>{{ key }}</div>
                    <div class>{{ inItem }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {getClubMeAPI, getEstimateFinanceAPI, getSeasonFinanceAPI} from "@/apis/club";
import {ClubMeEstimateFinanceResponse, ClubMeResponse, ClubMeSeasonFinanceResponse} from "@/interface/response/club";
import {computed, ComputedRef, onMounted, ref, Ref} from "vue";

let isLoading: Ref<boolean> = ref(true);
let rowFinance: Ref<number> = ref(0);
let rowSeasonFinance: Ref<number> = ref(0);
let rowData: Ref<ClubMeEstimateFinanceResponse | null> = ref(null);
onMounted(() => {
    getClubMeAPI().then((response: ClubMeResponse) => {
        rowFinance.value = response.finance;
        getSeasonFinanceAPI().then((response: ClubMeSeasonFinanceResponse) => {
            rowSeasonFinance.value = response.valueOf();
            getEstimateFinanceAPI().then((response: ClubMeEstimateFinanceResponse) => {
                rowData.value = response;
                isLoading.value = false;
            }).catch(() => {
            });
        }).catch(() => {
        });
    }).catch(() => {
    });
})
let finance: ComputedRef<string> = computed(() => {
    let finance = Math.round(rowFinance.value * 100) / 100;
    if (finance > 10000) {
        return `€${finance / 10000}亿`;
    } else {
        return `€${finance}万`;
    }
});
let seasonFinance: ComputedRef<string> = computed(() => {
    let finance = Math.round(rowSeasonFinance.value * 100) / 100;
    if (finance > 10000) {
        return `€${finance / 10000}亿`;
    } else {
        return `€${finance}万`;
    }
});
let estimateFinance: ComputedRef = computed(() => {
    for (let item in rowData.value) {
        rowData.value[item] = Math.round(rowData.value[item] * 100) / 100;
    }
    let result: any = {};
    if (rowData.value) {
        result.预计收入 = {
            门票: '€' + rowData.value.门票 + '万/场',
            广告: '€' + rowData.value.广告 + '万',
            转播: '€' + rowData.value.转播 + '万',
            赛事奖金: '€' + rowData.value.赛事奖金 + '万'
        }
        result.预计支出 = {
            球员工资: '€' + rowData.value.球员工资 + '万/周',
            职员工资: '€' + rowData.value.职员工资 + '万/周'
        }
    }
    return result;
})
</script>
<style scoped>
</style>
