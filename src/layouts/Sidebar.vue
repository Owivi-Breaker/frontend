<template>
  <n-layout-sider :collapsed-width="64" :native-scrollbar="false" :width="240" bordered collapse-mode="width"
                  show-trigger>
    <div class="icon">
      <img alt="logo" class="img" src="https://www.naiveui.com/assets/naivelogo.93278402.svg"/>
    </div>
    <n-divider></n-divider>
    <n-menu :collapsed-icon-size="22" :collapsed-width="64" :options="menuOptions"/>
  </n-layout-sider>
</template>

<script lang="ts" setup>
import {defineComponent, h, ref} from 'vue';
import {RouterLink} from 'vue-router';
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5';
import {NIcon} from 'naive-ui';


const inverted = ref(false)

function renderIcon(icon: any) {
  return () => h(NIcon, null, {default: () => h(icon)})
}

const menuOptions = [
  {
    label: () => h(
        RouterLink,
        {
          to: {
            name: 'home',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        {default: () => '主页'}
    ),
    key: 'main-page',
    icon: renderIcon(BookIcon)
  },
  {
    label: () => h(
        RouterLink,
        {
          to: {
            name: 'player',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        {default: () => '球员'}
    ),
    key: 'player',
    icon: renderIcon(PersonIcon),
  },
  {
    label: () => h(
        RouterLink,
        {
          to: {
            name: 'playerPerform',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        {default: () => '数据'}
    ),
    key: 'playerPerform',
    icon: renderIcon(PersonIcon),
  },
  {
    label: '阵容',
    // () => h(
    //     RouterLink,
    //     {
    //         to: {
    //             name: 'player',
    //             params: {
    //                 lang: 'zh-CN'
    //             }
    //         }
    //     },
    //     { default: () => '阵容' }
    // ),
    key: 'tactics',
    icon: renderIcon(BookIcon)
  },
  {
    label: '赛程',
    key: 'games',
    icon: renderIcon(BookIcon)
  },
  {
    label: '设置',
    key: 'setting',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: '设置1',
        key: 'narrator',
        icon: renderIcon(PersonIcon)
      },
      {
        label: '设置2',
        key: 'sheep-man',
        icon: renderIcon(PersonIcon)
      },
      {
        label: '设置3',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '设置3-1',
            key: 'whisky'
          }
        ]
      },
      {
        label: 'more...',
        key: 'the-past-increases-the-future-recedes'
      }
    ]
  }
]
</script>

<style scoped>
.nav {
  padding: 10px 1px 10px 1px;
  text-align: center;
}

.icon {
  padding: 10px 1px 10px 1px;
  overflow: hidden;
  height: 64px;
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  border-bottom: solid 1px rgb(239, 239, 245);
  transition: 0.25s border-bottom-color;
}

.img {
  width: 75%;
  object-fit: scale-down;
}
</style>