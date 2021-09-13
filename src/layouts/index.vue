<template>
    <n-layout position="absolute" has-sider>
        <Sidebar />
        <n-layout>
            <Header />
            <Content />
            <Footer />
        </n-layout>
    </n-layout>
</template>

<script lang="ts" setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import Content from './Content.vue'
import Footer from './Footer.vue'
</script>
