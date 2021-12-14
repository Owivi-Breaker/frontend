<template>
    <div class="selectSaveDiv">
        <img id="logo" name="logo" src="https://www.naiveui.com/assets/naivelogo.93278402.svg" alt="logo" />
        <p class="title">选择存档</p>
        <n-select class="selectSave" placeholder="请选择" v-model:value="choseSave" :options="saveList" v-on:click="GetSave" v-bind:loading="isSelectLoading">
            <template #empty>
                <div class="emptySelectSaveDiv">Oops!什么都没有</div>
            </template>
        </n-select>
        <div class="saveButtonDiv">
            <n-button class="newSaveButton" type="primary" v-on:click="leagueShowModal = true" attr-type="button">新建存档</n-button>
            <n-button class="beginGameButton" type="primary" v-on:click="Enter" attr-type="button">开始游戏</n-button>
        </div>
    </div>
    <n-modal v-model:show="leagueShowModal">
        <n-card class="leagueModalCard" title="新建存档" :bordered="false" size="huge">
            <template #header-extra></template>
            <n-form>
                <n-form-item label="我要玩的联赛：">
                    <n-select class="leagueSelect" v-model:value="leagueValue" :options="leagueOptions" />
                </n-form-item>
                <n-button type="primary" v-on:click="SelectLeagues">下一步</n-button>&nbsp;
                <n-button v-on:click="leagueShowModal = false">关闭</n-button>
            </n-form>
            <template #footer></template>
        </n-card>
    </n-modal>
    <n-modal v-model:show="clubShowModal">
        <n-card class="clubModalCard" title="新建存档" :bordered="false" size="huge">
            <template #header-extra></template>
            <n-layout has-sider>
                <n-layout-sider content-style>
                    <n-scrollbar class="competetionMenuBar">
                        <n-menu :default-value="competitionList[0].label" @update:value="ChangeCompetetion" :collapsed-width="64" :options="competitionList" />
                    </n-scrollbar>
                </n-layout-sider>
                <n-layout>
                    <n-scrollbar class="teamBar">
                        <n-card
                            class="teamCard"
                            v-for="(item, index) in teamList"
                            v-model:title="teamList[index].name"
                            v-on:mouseover="showGoButton = index;"
                            v-on:mouseout="showGoButton = -1;"
                        >
                            <div class="teamInformationDiv">
                                资金：{{ teamList[index].finance }}
                                <br />
                                声望：{{ teamList[index].reputation }}
                                <br />
                            </div>
                            <n-button class="goButton" type="primary" v-show="showGoButton == index" v-on:click="NewSave(index)">就选他！</n-button>
                        </n-card>
                    </n-scrollbar>
                </n-layout>
            </n-layout>
            <template #footer>
                <n-button class="bottomButton" style="right: 120px;" v-on:click="clubShowModal = false; leagueShowModal = true;">返回</n-button>
                <n-button class="bottomButton" style="right: 50px;" v-on:click="clubShowModal = false;">关闭</n-button>
            </template>
        </n-card>
    </n-modal>
    <n-modal v-model:show="loadShowModal" :mask-closable="false">
        <n-card class="loadModalCard" :title="loadTitle" :bordered="true" size="huge">
            <n-spin v-if="!loadComplete" size="medium" />
            <n-icon class="completeCreateSaveIcon" v-if="loadComplete" size="80" color="#18a058">
                <Ios-Checkmark />
            </n-icon>
        </n-card>
    </n-modal>
</template>


<script lang="ts" setup>
import { ref, defineComponent, onMounted } from "vue";
import { Ref } from "@vue/reactivity";
import { storage } from '../utils';
import { useMessage } from "naive-ui";
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
import fiveLeagues from "@/assets/json/five-leagues-list.json";
import superLeagues from "@/assets/json/super-leagues-list.json";
import { Router, useRouter } from "vue-router";
import { IosCheckmark } from '@vicons/ionicons4';
import { getSaveAPI, createSaveAPI } from '@/apis/save'


let leagueOptions: Ref<Array<{ label: string, value: string }>> = ref([
    { label: "五大联赛", value: "五大联赛" },
    { label: "超级联赛", value: "超级联赛" }
]);
let clubShowModal: Ref<boolean> = ref(false);
let showGoButton: Ref<number> = ref(-1);
let loadShowModal: Ref<boolean> = ref(false);
let message: MessageApiInjection = useMessage();
let router: Router = useRouter();
let isSelectLoading: Ref<boolean> = ref(false);
defineComponent({
    components: {
        IosCheckmark
    }
});


/* 获取存档信息 */
let saveList: Ref<Array<object>> = ref([]);
const GetSave = (): void => {
    isSelectLoading.value = true;
    getSaveAPI()
        .then(response => {
            saveList.value = response;
            saveList.value.forEach(function (element: any) {
                element.value = element.id;
                element.label = "时间" + element.time + "，赛季" + element.season;
            });
        })
        .catch(error => {
            switch (error.message) {
                default:
                    message.error("网络错误");
                    break;
            }
        });
    isSelectLoading.value = false;
}
onMounted(
    () => {
        GetSave();
    }
)


// 存储存档id
let choseSave: Ref<any> = ref(null);
const Enter = (): void => {
    if (choseSave.value) {
        storage.set("saveID", choseSave.value);
        router.push({ name: "home" });
    }
}


/* 选择联赛类型 */
let leagueValue: Ref<string> = ref("五大联赛"); // 联赛名
let competitionList: Ref = ref(); // 联赛具体信息
let teamList: Ref<Array<{ name: string, finance: number, reputation: number }>> = ref([]);
let leagueShowModal: Ref<boolean> = ref(false);
const SelectLeagues = (): void => {
    competitionList.value = [];
    if (leagueValue.value === "五大联赛") {
        competitionList.value = fiveLeagues;
    } else {
        competitionList.value = superLeagues;
    }
    for (let i = 0; i < competitionList.value[0].clubs.length; i++) {
        teamList.value[i] = {
            name: competitionList.value[0].clubs[i].name,
            finance: competitionList.value[0].clubs[i].finance,
            reputation: competitionList.value[0].clubs[i].reputation
        };
    }
    leagueShowModal.value = false;
    clubShowModal.value = true;
}
const ChangeCompetetion = (key: any, item: any): void => {
    item.clubs.forEach(function (element: any, index: number) {
        teamList.value[index] = { name: element.name, finance: element.finance, reputation: element.reputation };
    })
}


/* 新建存档 */
let loadTitle: Ref<string> = ref("请稍候");
let loadComplete: Ref<boolean> = ref(false);
const NewSave = (index: number): void => {
    loadShowModal.value = true;
    createSaveAPI({
        type: leagueValue.value === "五大联赛" ? "five_leagues" : "super_leagues",
        player_club_name: teamList.value[index].name
    })
        .then(response => {
            storage.set("saveID", response.id);
            loadComplete.value = true;
            loadTitle.value = "创建成功";
            setTimeout(() => { router.push({ name: "home" }); }, 2000);
        }).catch(error => {
            switch (error.message) {
                case "Request failed with status code 404":
                case "Network Error":
                    message.error("创建失败，网络错误。");
                    break;
                default:
                    message.error("创建失败。");
                    break;
            }
        });
}
</script>


<style>
body {
    background-image: url("../assets/background.png");
}
.selectSaveDiv {
    text-align: center;
    width: 300px;
    height: 290px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
#logo {
    width: 100px;
}
.title {
    color: white;
    font-size: 20px;
}
.saveButtonDiv {
    margin-top: 20px;
    text-align: left;
}
.beginGameButton {
    margin-left: 131px;
}
.selectSave {
    margin-top: 20px;
    text-align: left;
}
.leagueModalCard {
    width: 400px;
}
.leagueSelect {
    display: inline-block;
    width: 200px;
}
.clubModalCard {
    width: 1372px;
    height: 768;
}
.competetionMenuBar {
    max-height: 600px;
}
.teamBar {
    max-height: 600px;
}
.emptySelectSaveDiv {
    width: 300px;
    margin-left: -19px;
}
.teamCard {
    display: inline-block;
    margin: 10px;
    width: 320px;
    height: 180;
}
.teamInformationDiv {
    display: inline-block;
    vertical-align: middle;
}
.goButton {
    margin-left: 100px;
    vertical-align: middle;
}
.bottomButton {
    position: absolute;
    bottom: 15px;
}
.loadModalCard {
    width: 320px;
    height: 180px;
    text-align: center;
}
.completeCreateSaveIcon {
    margin-top: -30px;
}
</style>