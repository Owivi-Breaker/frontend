<template>
    <n-loading-bar-provider>
        <n-dialog-provider>
            <n-notification-provider>
                <n-message-provider>
                    <slot></slot>
                    <naive-provider-content/>
                </n-message-provider>
            </n-notification-provider>
        </n-dialog-provider>
    </n-loading-bar-provider>
</template>

<script lang="ts" setup>
import {NaiveProviderContent} from './components';</script>
<style scoped></style>
