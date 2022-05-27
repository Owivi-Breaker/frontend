<template>
    <div class="z-4 flex justify-center items-center h-screen" :style="{ backgroundColor: bgColor }">
        <div class="z-4 relative s-card p-14">
            <div class="absolute text-4xl font-bold italic text-primary left-8 top-8">
                <span class="underline decoration-teal-500 decoration-6">T</span>
            </div>
            <div class="flex flex-col gap-10">
                <div class="s-title s-underline text-3xl text-center">选择存档</div>
                <n-select
                    v-model:value="choseSave"
                    :loading="isSelectLoading"
                    :options="saveList"
                    class="selectSave"
                    placeholder="请选择"
                    size="large"
                    @click="GetSave"
                >
                    <template #empty>
                        <div class="emptySelectSaveDiv">Oops!什么都没有</div>
                    </template>
                </n-select>
                <div class="flex gap-4">
                    <n-button
                        attr-type="button"
                        class="newSaveButton"
                        type="primary"
                        size="large"
                        @click="leagueShowModal = true"
                    >新建存档
                    </n-button>
                    <n-button
                        attr-type="button"
                        class="beginGameButton"
                        type="primary"
                        size="large"
                        @click="Enter"
                    >开始游戏
                    </n-button>
                </div>
            </div>
        </div>
        <login-bg :theme-color="bgThemeColor"/>
    </div>
    <n-modal v-model:show="leagueShowModal">
        <div class="relative s-card p-14">
            <div class="absolute text-4xl font-bold italic text-primary left-8 top-8">
                <span class="underline decoration-teal-500 decoration-6">T</span>
            </div>
            <div class="flex flex-col gap-10">
                <div class="s-title s-underline text-3xl text-center px-25">新建存档</div>
                <n-select
                    class="w-full"
                    v-model:value="leagueValue"
                    :options="leagueOptions"
                    size="large"
                    placeholder="联赛类型"
                />
                <div class="flex gap-4">
                    <n-button type="primary" @click="SelectLeagues" size="large">继续</n-button>&nbsp;
                    <n-button @click="leagueShowModal = false" size="large">关闭</n-button>
                </div>
            </div>
        </div>
    </n-modal>
    <n-modal v-model:show="clubShowModal">
        <div class="s-card p-8 max-h-200">
            <div class="s-title s-undeline text-2xl mb-5">存档选择</div>
            <div class="flex gap-5">
                <n-scrollbar class="w-1/8 max-h-150">
                    <n-menu
                        :collapsed-width="64"
                        :default-value="competitionList[0].label"
                        :options="competitionList"
                        @update:value="ChangeCompetition"
                    />
                </n-scrollbar>
                <n-scrollbar class="w-7/8 max-h-150">
                    <div class="grid grid-cols-5 gap-10 p-4">
                        <div class="min-w-50" v-for="(item, index) in teamList" :key="index">
                            <img
                                :src="'http://shu-huai.cn:13182/chfs/shared/Public/' + teamList[index].name + '.png'"
                                alt="图片"
                                class="w-25 h-25 -mb-14 mx-auto"
                            />
                            <div class="s-card px-4 pb-4 pt-18">
                                <div class="flex flex-col item-center gap-4">
                                    <div class="s-title s-underline px-5 text-center">{{
                                            teamList[index].name
                                        }}
                                    </div>
                                    <div class="flex flex-col gap-4 items-center">
                                        资金：{{ teamList[index].finance }}
                                        <br/>
                                        声望：{{ teamList[index].reputation }}
                                        <br/>
                                    </div>
                                    <n-button :secondary="true" type="primary" @click="NewSave(index)">选择</n-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
            <n-space style="margin-top: 1%" justify="end">
                <n-button @click="clubShowModal = false; leagueShowModal = true;">
                    返回
                </n-button>
                <n-button @click="clubShowModal = false">
                    关闭
                </n-button>
            </n-space>
        </div>
    </n-modal>
    <n-modal v-model:show="loadShowModal" :mask-closable="false">
        <n-card :bordered="true" :title="loadTitle" class="loadModalCard" size="huge">
            <n-spin v-if="!loadComplete" size="medium"/>
            <n-icon v-if="loadComplete" class="completeCreateSaveIcon" color="#18a058" size="80">
                <Ios-Checkmark/>
            </n-icon>
        </n-card>
    </n-modal>
</template>

<script lang="ts" setup>
import {computed, defineComponent, onMounted, Ref, ref} from 'vue';
import {Router} from 'vue-router';
import {IosCheckmark} from '@vicons/ionicons4';
import {useRouterPush} from '@/composables';
import {getColorPalette, mixColor, storage} from '@/utils';
import superLeagues from '@/assets/json/super-leagues-list.json';
import fiveLeagues from '@/assets/json/five-leagues-list.json';
import {createSaveAPI, getSaveAPI} from '@/apis/save';
import {getClubByIdAPI} from '@/apis/club';
import {useThemeStore} from '@/store';
import {LoginBg} from '../login/components';

const {routerPush} = useRouterPush();
const theme = useThemeStore();
const bgThemeColor = computed(() => (theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor));
const bgColor = computed(() => {
    const COLOR_WHITE = '#ffffff';
    const ratio = theme.darkMode ? 0.5 : 0.2;
    return mixColor(COLOR_WHITE, theme.themeColor, ratio);
});
const leagueOptions: Ref<Array<{ label: string; value: string }>> = ref([
    {label: '五大联赛', value: '五大联赛'},
    {label: '超级联赛', value: '超级联赛'}
]);
const clubShowModal: Ref<boolean> = ref(false);
const showGoButton: Ref<number> = ref(-1);
const loadShowModal: Ref<boolean> = ref(false);
const isSelectLoading: Ref<boolean> = ref(false);
defineComponent({
    components: {
        IosCheckmark
    }
});

/* 获取存档信息 */
const saveList: Ref<Array<object>> = ref([]);
const GetSave = (): void => {
    isSelectLoading.value = true;
    getSaveAPI()
        .then((response: any) => {
            saveList.value = response;
            saveList.value.forEach(function (element: any) {
                element.value = element.id;
                // TODO 卡顿
                getClubByIdAPI({'club_id': element.player_club_id})
                    .then((response: any) => {
                        element.label = `${response.name}，日期 ${element.date}，赛季 ${element.season}`;
                    })
                    .catch((_error: any) => {
                    });
            });
        })
        .catch((_error: {}) => {
        });
    isSelectLoading.value = false;
};
onMounted(() => {
    GetSave();
});

declare const window: Window & { $router: Router };
// 存储存档id
const choseSave: Ref = ref(null);
const Enter = (): void => {
    if (choseSave.value) {
        storage.set('saveId', choseSave.value);
        routerPush('home');
    }
};

/* 选择联赛类型 */
const leagueValue: Ref<string> = ref('五大联赛'); // 联赛名
const competitionList: Ref = ref(); // 联赛具体信息
const teamList: Ref<Array<{ name: string; finance: number; reputation: number }>> = ref([]);
const leagueShowModal: Ref<boolean> = ref(false);
const SelectLeagues = (): void => {
    competitionList.value = [];
    if (leagueValue.value === '五大联赛') {
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
};
const ChangeCompetition = (_key: any, item: any): void => {
    item.clubs.forEach(function (element: any, index: number) {
        teamList.value[index] = {name: element.name, finance: element.finance, reputation: element.reputation};
    });
};

/* 新建存档 */
const loadTitle: Ref<string> = ref('请稍候');
const loadComplete: Ref<boolean> = ref(false);
const NewSave = (index: number): void => {
    loadShowModal.value = true;
    createSaveAPI({
        type: leagueValue.value === '五大联赛' ? 'five_leagues' : 'super_leagues',
        player_club_name: teamList.value[index].name
    })
        .then((response: any) => {
            storage.set('saveId', response.id);
            loadComplete.value = true;
            loadTitle.value = '创建成功';
            // window.$router.push({ name: 'home' });
            routerPush({name: 'home'});
        })
        .catch((_error: {}) => {
        });
};
defineExpose({
    leagueOptions,
    leagueValue,
    competitionList,
    teamList,
    leagueShowModal,
    choseSave,
    showGoButton,
    loadShowModal,
    isSelectLoading,
    GetSave,
    Enter,
    SelectLeagues,
    ChangeCompetition,
    NewSave,
    loadTitle,
    loadComplete,
    clubShowModal
});
</script>
<style>
.beginGameButton {
    margin-left: 131px;
}

.selectSave {
    margin-top: 20px;
    text-align: left;
}

.emptySelectSaveDiv {
    width: 300px;
    margin-left: -19px;
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
