<template>
    <n-layout has-sider position="absolute">
        <Sidebar/>
        <n-layout>
            <Header/>
            <n-layout-content content-style="padding: 24px; min-height: 85vh">
                <!--                <Content/>-->
                <Viewer/>
            </n-layout-content>
            <Footer/>
        </n-layout>
    </n-layout>
</template>

<script lang="ts" setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { Viewer } from '@/components'
import Content from './Content.vue'
import Footer from './Footer.vue'
</script>
