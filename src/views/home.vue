<template>
    <n-grid cols="2" x-gap="12">
        <player-card></player-card>
        <player-card></player-card>
        <player-card></player-card>
        <player-card></player-card>
        <player-card></player-card>
        <player-card></player-card>
        <player-card></player-card>
        <player-card></player-card>
        <player-card></player-card>
    </n-grid>
</template>

<script lang="ts" setup>
import { PlayerCard } from '../components'
import { storage } from '../utils';
let token: string = storage.get("token");
if (!token) {
    HandleTokenError();
}
axios({
    method: "GET",
    url: "/login/users/me",
    headers: {
        authorization: `Bearer ${token}`
    }
}).then(response => {
}).catch(error => {
    switch (error.message) {
        case "Request failed with status code 404":
        case "Network Error":
            message.error("网络错误。");
            break;
        case "Request failed with status code 401":
            switch (error.response.data.detail) {
                case "Could not validate credentials":
                    storage.remove("token");
                    HandleTokenError();
                    break;
            }
            break;
        default:
            message.error("网络错误。");
            break;
    }
})
</script>