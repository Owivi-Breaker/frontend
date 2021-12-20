<template>
  <div class="loginDiv">
    <img id="logo" name="logo" src="https://www.naiveui.com/assets/naivelogo.93278402.svg" alt="logo"/>
    <p id="title">登录</p>
    <n-form id="form" :show-label="false" :model="formValue" :rules="rules" ref="formRef">
      <n-form-item label="用户名" path="username">
        <n-input class="roundInput" v-model:value="formValue.username" placeholder="用户名"/>
      </n-form-item>
      <n-form-item label="密码" path="password">
        <n-input class="roundInput" v-model:value="formValue.password" placeholder="密码" @keyup.enter="PostLogin"
                 type="password"/>
      </n-form-item>
      <n-form-item>
        <n-checkbox v-model:checked="needSave">记住我</n-checkbox>
      </n-form-item>
      <n-form-item>
        <n-button class="roundButton" type="primary" v-on:click="PostLogin" attr-type="button">进入OwiviOsa</n-button>
      </n-form-item>
    </n-form>
    <div>
      还没有账号？
      <a id="registerLink" href="/register">点我注册</a>
    </div>
  </div>
</template>
<script lang="ts" setup>
import qs from "qs";
import {ref, onMounted} from "vue";
import {Ref} from "@vue/reactivity";
import {Router, useRouter} from "vue-router";
import {storage} from "@/utils";
import {MessageApiInjection, MessageOptions} from "naive-ui/lib/message/src/MessageProvider";
import {useMessage} from "naive-ui";
import {loginAPI} from "@/apis/login"


let formValue: Ref<{ username: string; password: string; }> = ref({username: "", password: ""});
let message: MessageApiInjection = useMessage();


let rules: object = {
  username: {
    required: true,
    validator(rule: any, value: string) {
      if (!value) {
        return new Error("请输入邮箱或手机号。");
      } else if (!/^(\w+@(\w+\.)+\w+)|([0-9]{11})|(\w+)$/.test(value)) {
        return new Error("请输入正确的邮箱或手机号。");
      }
      return true;
    },
    trigger: "blur"
  },
  password: {
    required: true,
    message: "请输入密码。",
    trigger: ["input", "blur"]
  }
};


/* 自动填入cookie中的账号密码 */
const GetCookie = (): void => {
  if (document.cookie.length > 0) {
    let cookie: string[] = document.cookie.split("; ");
    cookie.forEach(function (element): void {
      let result: string[] = element.split("=");
      if (result[0] === "username") {
        formValue.value.username = result[1];
      } else if (result[0] === "password") {
        formValue.value.password = result[1];
      }
    });
  }
}
onMounted(
    () => {
      storage.remove("token");
      storage.remove("saveID");
      GetCookie();
    }
);
/* 登录模块 */
let formRef: Ref = ref(null); // 登录信息表格
let needSave: Ref<boolean> = ref(true); // 是否记住账号密码
let router: Router = useRouter();
const SetCookie = (username: string, password: string, exdays: number): void => {
  let exdate: Date = new Date();
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
  window.document.cookie = "username" + "=" + username + ";path=/;expires=" + exdate.toUTCString();
  window.document.cookie = "password" + "=" + password + ";path=/;expires=" + exdate.toUTCString();
}
const PostLogin = (): void => {
  SetCookie('', '', -1);
  formRef.value.validate((errors: boolean) => {
    if (!errors) {
      loginAPI(
          qs.stringify({
            username: formValue.value.username,
            password: formValue.value.password
          }))
          .then((response: { access_token: string; }) => {
            message.success("登录成功");
            let token: string = response.access_token;
            storage.set("token", token);
            if (needSave.value) {
              SetCookie(formValue.value.username, formValue.value.password, 7);
            }
            setTimeout(() => {
              router.push({name: "selectSave"});
            }, 1000);
          }).catch((error: { message: MessageOptions; response: { data: { detail: any; }; }; }) => {
        switch (error.message) {
          case "Request failed with status code 404":
          case "Network Error":
            message.error("登录失败，网络错误。");
            break;
          case "Request failed with status code 401":
            switch (error.response.data.detail) {
              case "Incorrect username or password":
                message.error("登录失败，用户名或密码错误。");
                break;
            }
            break;
          default:
            message.error("登录失败: ", error.message);
            break;
        }
      });
    } else {
      message.error("由于未知原因，登陆失败");
    }
  })
}
</script>


<style>
body {
  background-image: url("../assets/background.png");
}

.loginDiv {
  text-align: center;
  width: 300px;
  height: 520px;
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

#title {
  color: white;
  font-size: 20px;
}

#form {
  display: inline-block;
  width: 300px;
}

.roundInput {
  margin-top: 20px;
  width: 300px;
  padding: 5px;
  border-radius: 20px;
}

.roundButton {
  padding: 20px;
  color: white;
  width: 300px;
  border-radius: 20px;
}

label {
  color: white;
}

#registerLink {
  color: #246ace;
}

.n-checkbox {
  margin-left: 15px;
}
</style>