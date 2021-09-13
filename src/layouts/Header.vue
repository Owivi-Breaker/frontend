<template>
    <n-layout-header bordered>
        <n-menu mode="horizontal" :inverted="inverted" :options="menuOptions" />
    </n-layout-header>
</template>

<script lang="ts" setup>
import { defineComponent, h, ref } from 'vue'
import {
    BookOutline as BookIcon,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui';


const inverted = ref(false)

function renderIcon(icon: any) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
    {
        label: '且听风吟',
        key: 'hear-the-wind-sing',
        icon: renderIcon(BookIcon)
    },
    {
        label: '1973年的弹珠玩具',
        key: 'pinball-1973',
        icon: renderIcon(BookIcon),
        disabled: true,
        children: [
            {
                label: '鼠',
                key: 'rat'
            }
        ]
    },
    {
        label: '寻羊冒险记',
        key: 'a-wild-sheep-chase',
        disabled: true,
        icon: renderIcon(BookIcon)
    },
]


</script>

