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
import { Router, useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
let message: MessageApiInjection = useMessage();
let router: Router = useRouter();
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
function HandleTokenError(): void {
    message.error("登录失效，请重新登陆。");
    setTimeout(() => { router.push({ name: "login" }); }, 1000);
}
</script>