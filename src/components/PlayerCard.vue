<template>
  <n-card style="margin-bottom: 16px;" title="梅西">
    <template #header-extra>
      <svg class="avatar">
        <Avataaars/>
      </svg>
    </template>
    <div v-for="(key, value) in playerData.capa">
      <div class="display-flex">
        <n-h6>{{ value }}</n-h6>
        <n-progress
            :color="getColor(key)"
            :percentage="key"
            fill-border-radius="12px 0 12px 12px"
            height="10"
            type="line"
            unit=""/>
      </div>

    </div>

    <!-- <n-grid cols="4" x-gap="5" y-gap="5" v-show="showOption">
        <n-gi>
            <n-statistic label="进球" :value="92"></n-statistic>
        </n-gi>
        <n-gi>
            <n-statistic label="助攻">34</n-statistic>
        </n-gi>
        <n-gi>
            <n-statistic label="过人" :value="72"></n-statistic>
        </n-gi>
        <n-gi>
            <n-statistic label="抢断">28</n-statistic>
        </n-gi>
    </n-grid>-->
  </n-card>
</template>
<script lang="ts" setup>
//import Avataaars from 'vuejs-avataaars'
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue'
import getColor from '@/utils/colorMap'

let showOption = false


const playerData = {
  "id": 4,
  "club_id": 1,
  "name": "Lu Xi Fei",
  "translated_name": "路西菲",
  "translated_nationality": "格林纳达",
  "age": 27,
  "height": 172,
  "weight": 78,
  "birth_date": "08-27",
  "wages": 0,
  "real_stamina": 100,
  "ST_num": 0,
  "CM_num": 1,
  "LW_num": 0,
  "RW_num": 0,
  "CB_num": 0,
  "LB_num": 0,
  "RB_num": 0,
  "GK_num": 0,
  "CAM_num": 0,
  "LM_num": 0,
  "RM_num": 0,
  "CDM_num": 0,
  "capa": {
    "shooting": 78,
    "passing": 91,
    "dribbling": 21,
    "interception": 2,
    "pace": 45,
    "strength": 66,
    "aggression": 72,
    "anticipation": 99,
    "free_kick": 58,
    "stamina": 78,
    "goalkeeping": 24,
  },
  "top_capa": 78.1,
  "top_location": "CM",
  "location_capa": {
    "CM": 78.1,
    "CAM": 59.65,
    "LM": 57.4,
    "RM": 57.4,
    "CDM": 51.9,
    "LW": 37.6,
    "RW": 37.6,
    "LB": 33.6,
    "RB": 33.6,
    "ST": 31.55,
    "GK": 27.35,
    "CB": 12.25
  }
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
  align-items: flex-left;
}


</style>