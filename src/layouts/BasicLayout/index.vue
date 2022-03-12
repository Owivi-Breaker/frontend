<template>
    <soybean-admin-layout
        :fixed-footer="theme.footer.fixed"
        :fixed-header-and-tab="theme.fixedHeaderAndTab"
        :header-height="theme.header.height"
        :min-width="theme.layout.minWidth"
        :mode="mode"
        :sider-collapse="app.siderCollapse"
        :sider-collapsed-width="siderCollapsedWidth"
        :sider-visible="siderVisible"
        :sider-width="siderWidth"
        :tab-height="theme.tab.height"
        :tab-visible="theme.tab.visible"
    >
        <template #header>
            <global-header v-bind="headerProps"/>
        </template>
        <template #tab>
            <global-tab/>
        </template>
        <template #sider>
            <global-sider/>
        </template>
        <global-content/>
        <template #footer>
            <global-footer/>
        </template>
    </soybean-admin-layout>
    <setting-drawer/>
</template>

<script lang="ts" setup>
import {onMounted} from 'vue';
import SoybeanAdminLayout from 'soybean-admin-layout';
import {useAppStore, useThemeStore} from '@/store';
import {useBasicLayout} from '@/composables';
import {getDateAPI} from '@/apis/user';
import {getPlayersByClubAPI, getPlayerTotalGameDataAPI} from '@/apis/player';
import {useStore} from '@/stores/store';
import {getSaveMeAPI} from '@/apis/save';
import {GlobalContent, GlobalFooter, GlobalHeader, GlobalSider, GlobalTab, SettingDrawer} from '../common';

const app = useAppStore();
const theme = useThemeStore();

const {mode, headerProps, siderVisible, siderWidth, siderCollapsedWidth} = useBasicLayout();

const store = useStore();
onMounted(() => {
    getDateAPI()
        .then(response => {
            store.Date = response.date;
        })
        .catch((_error: {}) => {
        });
    getSaveMeAPI()
        .then(response => {
            const gameSeason: number = response.season;
            getPlayersByClubAPI({club_id: 1, is_player_club: true})
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
                            .catch((_error: {}) => {
                            });
                    }
                    store.capaLoading = false;
                    store.perfLoading = false;
                })
                .catch((_error: {}) => {
                });
        })
        .catch((_error: {}) => {
        });
});
</script>
<style scoped></style>
