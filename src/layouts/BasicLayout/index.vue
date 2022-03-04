<template>
  <soybean-admin-layout
    :mode="mode"
    :min-width="theme.layout.minWidth"
    :fixed-header-and-tab="theme.fixedHeaderAndTab"
    :header-height="theme.header.height"
    :tab-visible="theme.tab.visible"
    :tab-height="theme.tab.height"
    :sider-visible="siderVisible"
    :sider-width="siderWidth"
    :sider-collapsed-width="siderCollapsedWidth"
    :sider-collapse="app.siderCollapse"
    :fixed-footer="theme.footer.fixed"
  >
    <template #header>
      <global-header v-bind="headerProps" />
    </template>
    <template #tab>
      <global-tab />
    </template>
    <template #sider>
      <global-sider />
    </template>
    <global-content />
    <template #footer>
      <global-footer />
    </template>
  </soybean-admin-layout>
  <setting-drawer />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import SoybeanAdminLayout from 'soybean-admin-layout';
import { useAppStore, useThemeStore } from '@/store';
import { useBasicLayout } from '@/composables';
import { getDateAPI } from '@/apis/user';
import { getPlayersByClubAPI, getPlayerTotalGameDataAPI } from '@/apis/player';
import { useStore } from '@/stores/store';
import { getSaveMeAPI } from '@/apis/save';
import { SettingDrawer, GlobalHeader, GlobalTab, GlobalSider, GlobalContent, GlobalFooter } from '../common';

const app = useAppStore();
const theme = useThemeStore();

const { mode, headerProps, siderVisible, siderWidth, siderCollapsedWidth } = useBasicLayout();

const store = useStore();
onMounted(() => {
  getDateAPI()
    .then(response => {
      store.Date = response.date;
    })
    .catch((_error: {}) => {});
  getSaveMeAPI()
    .then(response => {
      const gameSeason: number = response.season;
      getPlayersByClubAPI({ club_id: 1, is_player_club: true })
        .then(response => {
          store.playerData = response;
          store.perfData = [];
          for (let i: number = 0; i < store.playerData.length; i++) {
            getPlayerTotalGameDataAPI({
              player_id: store.playerData[i].id,
              start_season: gameSeason,
              end_season: gameSeason
            })
              .then(response => {
                response['姓名'] = store.playerData[i]['姓名']
                  ? store.playerData[i]['姓名']
                  : store.playerData[i].translated_name;
                store.perfData.push(response);
              })
              .catch((_error: {}) => {});
          }
          store.capaLoading = false;
          store.perfLoading = false;
        })
        .catch((_error: {}) => {});
    })
    .catch((_error: {}) => {});
});
</script>
<style scoped></style>
