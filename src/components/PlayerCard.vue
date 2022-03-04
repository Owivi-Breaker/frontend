<template>
  <n-card class="bigCard" hoverable size="large" @click="goDetail">
    <n-space vertical>
      <n-grid cols="3" x-gap="9">
        <n-gi span="1">
          <Avataaars height="75%" v-bind="playerData.avatar" width="75%" />
        </n-gi>
        <n-gi span="2">
          <n-descriptions :column="2" :title="playerData.translated_name" label-placement="left">
            <n-descriptions-item label="国籍">{{ playerData.translated_nationality }}</n-descriptions-item>
            <n-descriptions-item label="年龄">{{ playerData.age }}</n-descriptions-item>
            <n-descriptions-item label="能力">
              {{ Math.round(playerData.top_capa * 100) / 100 }}
            </n-descriptions-item>
            <n-descriptions-item label="位置">{{ playerData.top_location }}</n-descriptions-item>
          </n-descriptions>
        </n-gi>
      </n-grid>
      <n-grid cols="3">
        <n-gi span="3">
          <CapaProgress :capa-rating="Math.round(playerData.capa.shooting * 100) / 100" capa-name="射门"></CapaProgress>
          <CapaProgress :capa-rating="Math.round(playerData.capa.passing * 100) / 100" capa-name="传球"></CapaProgress>
          <CapaProgress
            :capa-rating="Math.round(playerData.capa.dribbling * 100) / 100"
            capa-name="过人"
          ></CapaProgress>
          <CapaProgress :capa-rating="Math.round(playerData.capa.pace * 100) / 100" capa-name="速度"></CapaProgress>
          <CapaProgress :capa-rating="Math.round(playerData.capa.strength * 100) / 100" capa-name="力量"></CapaProgress>
          <CapaProgress
            :capa-rating="Math.round(playerData.capa.interception * 100) / 100"
            capa-name="拦截"
          ></CapaProgress>
          <CapaProgress
            :capa-rating="Math.round(playerData.capa.anticipation * 100) / 100"
            capa-name="预判"
          ></CapaProgress>
          <CapaProgress :capa-rating="Math.round(playerData.capa.stamina * 100) / 100" capa-name="体力"></CapaProgress>
          <CapaProgress
            :capa-rating="Math.round(playerData.capa.goalkeeping * 100) / 100"
            capa-name="守门"
          ></CapaProgress>
        </n-gi>
        <!--<n-gi span="1"></n-gi>-->
      </n-grid>
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
import { Router } from 'vue-router';
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
import { useRouterPush } from '@/composables';
import CapaProgress from '@/components/CapaProgress.vue';

const { routerPush } = useRouterPush();

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
    avatar: {
      topType: String;
      hairColor: String;
      accessoriesType: String;
      facialHairType: String;
      clotheType: String;
      clotheColor: String;
      eyebrowType: String;
      eyeType: String;
      mouthType: String;
      skinColor: String;
      facialHairColor: String;
      topColor: String;
    };
  };
}>();
declare const window: Window & { $router: Router };

function goDetail(): void {
  routerPush({ path: 'player-page', query: { id: props.playerData.id } });
}
</script>
<style>
.bigCard {
  cursor: pointer;
}

.avatar {
  width: 80px;
  height: 80px;
  padding: 5px;
}

.display-flex {
  display: flex;
}
</style>
