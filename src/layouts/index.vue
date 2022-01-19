<template>
    <n-layout has-sider position="absolute">
        <Sidebar />
        <n-layout>
            <Header />
            <n-layout-content content-style="padding: 24px; min-height: 85vh">
                <Viewer />
            </n-layout-content>
            <!-- <Footer/> -->
        </n-layout>
    </n-layout>
</template>
<script lang="ts" setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { Viewer } from '@/components'
import { onMounted } from "vue";
import { getDateAPI } from "@/apis/user";
import { getPlayersByClubAPI } from "@/apis/player";
// import Footer from './Footer.vue'
import { useStore } from '@/stores/store'
const store = useStore();
onMounted(
    () => {
        getDateAPI().then(response => {
            store.Date = response.date;
        }).catch((_error: {}) => { });
        getPlayersByClubAPI({ club_id: 1, is_player_club: true }).then((response) => {
            store.playerData = response;
        }).catch((_error: {}) => {
        });
    }
);
</script>
