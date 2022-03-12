<template>
    <svg
        height="896"
        version="1.1"
        width="967.8852157128662"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <defs>
            <path
                id="path-2"
                d="M896,448 C1142.6325445712241,465.5747656464056 695.2579309733121,896 448,896 C200.74206902668806,896 5.684341886080802e-14,695.2579309733121 0,448.0000000000001 C0,200.74206902668806 200.74206902668791,5.684341886080802e-14 447.99999999999994,0 C695.2579309733121,0 475,418 896,448Z"
                fill-rule="evenodd"
                opacity="1"
            />
            <linearGradient id="linearGradient-3" x1="0.5" x2="0.5" y1="0" y2="1">
                <stop :stop-color="startColor" offset="0" stop-opacity="1"/>
                <stop :stop-color="endColor" offset="1" stop-opacity="1"/>
            </linearGradient>
        </defs>
        <g opacity="1">
            <use fill="url(#linearGradient-3)" fill-opacity="1" xlink:href="#path-2"/>
        </g>
    </svg>
</template>

<script lang="ts" setup>
interface Props {
    /** 过渡的开始颜色 */
    startColor?: string;
    /** 过渡的结束颜色 */
    endColor?: string;
}

withDefaults(defineProps<Props>(), {
    startColor: '#28aff0',
    endColor: '#120fc4'
});
</script>
<style scoped></style>
