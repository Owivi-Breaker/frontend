<template>
  <n-grid cols="10" x-gap="10">
    <n-gi span="3">
      <n-card style="min-height: 822px">
        <n-scrollbar ref="nScrollBarRef" style="max-height: 780px">
          <n-timeline>
            <n-timeline-item
              v-for="(item, key) in commentaryList"
              :key="key"
              :color="getColor(item.level, '', 1, 5)"
              :title="item.content"
              :time="item.time"
            ></n-timeline-item>
          </n-timeline>
        </n-scrollbar>
      </n-card>
    </n-gi>
    <n-gi span="3">
      <n-grid cols="1" y-gap="10">
        <n-gi>
          <GameStatus
            v-if="totalData['game_info']"
            :turns="totalData['game_info']['turns']"
            :home-club-id="totalData['game_info']['home_club_id']"
            :player-team-info="totalData['player_team_info']"
            :computer-team-info="totalData['computer_team_info']"
          ></GameStatus>
        </n-gi>
        <n-gi>
          <TacticalSelector></TacticalSelector>
        </n-gi>
        <n-gi>
          <TacticalStatistic
            :player-team-info="totalData['player_team_info']"
            :computer-team-info="totalData['computer_team_info']"
          ></TacticalStatistic>
        </n-gi>
      </n-grid>
    </n-gi>
    <n-gi span="4">
      <n-grid cols="1" y-gap="10">
        <n-gi>
          <TeamData :club="homeTeam" :player-info="homePlayerInfo" style="height: 406px"></TeamData>
        </n-gi>
        <n-gi>
          <TeamData :club="foreignTeam" :player-info="foreignPlayerInfo" style="height: 406px"></TeamData>
        </n-gi>
      </n-grid>
    </n-gi>
  </n-grid>
</template>
<script lang="ts" setup>
import { computed, ComputedRef, defineComponent, ref, watch, nextTick, Ref } from 'vue';
import { ScrollbarInst } from 'naive-ui';
import { GameStatus, TeamData, TacticalStatistic, TacticalSelector } from '@/components/GameOn';
import { getColor } from '@/utils/colorMap';
import { useStore } from '@/stores/store';

const store = useStore();
defineComponent({ GameStatus, TeamData, TacticalStatistic, TacticalSelector });
const totalData: ComputedRef = computed(() => {
  return store.gamePveData;
});
const homeTeam: ComputedRef = computed(() => {
  if (!totalData.value.game_info) {
    return null;
  }
  if (totalData.value.game_info.home_club_id === totalData.value.player_team_info.club_id) {
    return totalData.value.player_team_info;
  }
  return totalData.value.computer_team_info;
});
const foreignTeam: ComputedRef = computed(() => {
  if (!totalData.value.game_info) {
    return null;
  }
  if (totalData.value.game_info.home_club_id !== totalData.value.player_team_info.club_id) {
    return totalData.value.player_team_info;
  }
  return totalData.value.computer_team_info;
});
const homePlayerInfo: ComputedRef = computed(() => {
  if (!totalData.value.game_info) {
    return null;
  }
  if (totalData.value.game_info.home_club_id === totalData.value.player_team_info.club_id) {
    return totalData.value.player_players_info;
  }
  return totalData.value.computer_players_info;
});
const foreignPlayerInfo: ComputedRef = computed(() => {
  if (!totalData.value.game_info) {
    return null;
  }
  if (totalData.value.game_info.home_club_id !== totalData.value.player_team_info.club_id) {
    return totalData.value.player_players_info;
  }
  return totalData.value.computer_players_info;
});
const nScrollBarRef: Ref<ScrollbarInst | null> = ref(null);
const commentaryList: ComputedRef = computed(() => {
  const result = new Array<any>();
  if (totalData.value.game_info) {
    const scriptList: Array<string> = totalData.value.game_info.script.split('\n\n');
    for (let i: number = 0; i < scriptList.length; i++) {
      const subScriptList: Array<string> = scriptList[i].split('\n');
      if (i === scriptList.length - 1) {
        subScriptList.pop();
        continue;
      }
      for (let j: number = 0; j <= subScriptList.length - 1; j++) {
        const item: Array<string> = subScriptList[j].split('@');
        if (item[1].length <= 2) {
          result.push({
            content: item[0],
            time: '',
            level: item[1]
          });
        } else {
          result.push({
            content: item[0],
            time: item[1],
            level: item[2]
          });
        }
      }
    }
  }
  return result;
});
watch(
  () => commentaryList.value,
  () => {
    if (nScrollBarRef.value) {
      nextTick(() => {
        nScrollBarRef.value?.scrollTo(0, 10000000);
      });
    }
  },
  { immediate: true }
);
defineExpose({ getColor, homeTeam, foreignTeam, homePlayerInfo, foreignPlayerInfo, commentaryList, totalData });
</script>
