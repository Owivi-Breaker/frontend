<template>
   <img id="logo" name="logo" src="https://www.naiveui.com/assets/naivelogo.93278402.svg" alt="logo" />
   <p id="title"></p>
   <n-form id="form" :show-label="false" :model="formValue" :rules="rules" ref="formRef">
       <n-form>
       <n-form-item label="选择存档:">
        <select id="myarchive">
        <option>请选择</option>
        </select>
        </n-form-item>
        </n-form>
        <n-form-item>
         <n-button type="primary"  v-on:click="leagueShowModal = true" attr-type="button">新建存档</n-button>
        </n-form-item>
        <n-form-item>
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
                        <n-menu :default-value="competetionList[0].label" @update:value="ChangeCompetetion" :collapsed-width="64" :options="competetionList" />
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
        <n-card class="loadModalCard" title="请稍候" :bordered="true" size="huge">
            <n-spin size="medium" />
        </n-card>
    </n-modal>
    <n-modal v-model:show="loadShowModal2" :mask-closable="false">
        <n-card  class="loadModalCard2" title="创建成功" :bordered="true" size="huge">
            <n-icon size="80" color="#0e7a0d">
                <Ios-Checkmark/>
            </n-icon>
        </n-card>
    </n-modal>
            <n-button type="primary" v-on:click="Enter" attr-type="button">开始游戏</n-button>
        </n-form-item>
   </n-form>
</template>


<script lang="ts" setup>
import { PlayerCard } from '../components'
import axios from 'axios';
import { ref } from "vue";
import { Ref } from "@vue/reactivity";
import { storage } from '../utils';
import { useMessage } from "naive-ui";
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
import FiveLeagues from "../json/Five Leagues List.json";
import SuperLeagues from "../json/Super Leagues List.json";
import { Router, useRouter } from "vue-router";
import { IosCheckmark } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

let leagueShowModal: Ref<boolean> = ref(false);
let leagueValue: Ref<string> = ref("五大联赛");
let leagueOptions: Ref<Array<{ label: string, value: string }>> = ref([
    { label: "五大联赛", value: "五大联赛" },
    { label: "超级联赛", value: "超级联赛" }
]);
let clubShowModal: Ref<boolean> = ref(false);
let teamList: Ref<Array<{ name: string, finance: number, reputation: number }>> = ref([]);
let showGoButton: Ref<number> = ref(-1);
let competetionList: Ref = ref();
let loadShowModal: Ref<boolean> = ref(false);
let loadShowModal2: Ref<boolean> = ref(false);
let token: string = storage.get("token");
let message: MessageApiInjection = useMessage();
let router: Router = useRouter();
defineComponent({
  components: {
    IosCheckmark
  }
})

function SelectLeagues(): void {
    competetionList.value = [];
    if (leagueValue.value === "五大联赛") {
        competetionList.value = FiveLeagues;
    }
    else {
        competetionList.value = SuperLeagues;
    }
    for (let i = 0; i < competetionList.value[0].clubs.length; i++) {
        teamList.value[i] = {
            name: competetionList.value[0].clubs[i].name,
            finance: competetionList.value[0].clubs[i].finance,
            reputation: competetionList.value[0].clubs[i].reputation
        };
    }
    leagueShowModal.value = false;
    clubShowModal.value = true;
}
function ChangeCompetetion(key: any, item: any): void {
    item.clubs.forEach(function (element: any, index: number) {
        teamList.value[index] = { name: element.name, finance: element.finance, reputation: element.reputation };
    })
}
function HandleTokenError(): void {
    message.error("登录失效，请重新登陆。");
    setTimeout(() => { router.push({ name: "login" }); }, 1000); // 在本地运行时为了先显示登录成功的消息后跳转页面的等待，后期部署删除
}
function NewSave(index: number): void {
    if (!token) {
        HandleTokenError();
        return;
    }
    loadShowModal.value = true;
    axios({
        method: "POST",
        url: "login/users/create-save",
        withCredentials: false,
        headers: { authorization: `Bearer ${token}` },
        data: {
            type: leagueValue.value === "五大联赛" ? "five_leagues" : "super_leagues",
            player_club_name: teamList.value[index].name
        },
    }).then(response =>{if(response.status!=200){
        loadShowModal.value = false; 
        storage.set("saveID", response.data.id);}
        else if(response.status==200)
        {
            loadShowModal.value = true;
            loadShowModal2.value = false;
        }
    }).catch(error => {
        switch (error.message) {
            case "Request failed with status code 404":
            case "Network Error":
                message.error("创建失败，网络错误。");
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
                message.error("创建失败。");
                break;
        }
    })
}     

function GetArchive(): void {
    axios({
        method: "GET",
        url: "/login/users/show-saves",
        headers:{
            authorization:`Bearer ${token}`
        }
    }).then(response => {
        console.log(response)
    })      
}

function Enter(): void {
    setTimeout(() => { router.push({ name: "home" }); }, 1000);
}

</script>


<style>
 body {
    text-align: center;
    padding-top: 150px;
    background-image: url("../assets/背景.png");
}
#logo {
    width: 100px;
}
#form {
    display: inline-block;
    width: 300px;
}
.n-input {
    margin-top: 20px;
    width: 300px;
    padding: 5px;
    border-radius: 20px;
}
.n-button {
    padding: 20px;
    color:white;
    width: 300px;
    border-radius: 20px;
}
label {
    color:white;
}
.n-checkbox {
    margin-left: 15px;
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
.option{
    margin: 100px;
    width: 140px;
    height: 40px;
    border: 1px solid #cccccc;
    position: relative;
}
select{
    border: 1px solid #ffffff;
    width: 300px;
    height: 30px;
}
</style>