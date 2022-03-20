<template>
    <div>
        <n-scrollbar x-scrollable>
            <div class="flex justify-around gap-5 py-10">
                <!-- 最佳射手 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">最佳射手</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>
                        <div class="text-lg font-semibold">弗拉霍维奇</div>
                        <div class>20 粒进球</div>
                    </div>
                </div>
                <!-- 平均评分最高 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">平均评分最高</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>
                        <div class="text-lg font-semibold">佩德里</div>
                        <div class>7.89 分</div>
                    </div>
                </div>
                <!-- 助攻最多 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">助攻最多</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>

                        <div class="text-lg font-semibold">弗朗基德荣</div>
                        <div class>16 次助攻</div>
                    </div>
                </div>
                <!-- 传球成功率最高 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">传球成功率最高</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>
                        <div class="text-lg font-semibold">伊涅斯塔</div>
                        <div class>88%</div>
                    </div>
                </div>
                <!-- 拦截成功率最高 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">拦截成功率最高</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>
                        <div class="text-lg font-semibold">皮克</div>

                        <div class>79%</div>
                    </div>
                </div>
                <!-- 过人成功率最高 -->
                <div class="flex flex-col items-center min-w-40">
                    <div class="-mb-10 z-10 h-20 w-20">
                        <Avataaars :is-circle="false"/>
                    </div>
                    <div
                        class="px-6 pb-5 pt-15 bg-white shadow-md rounded-lg flex flex-col space-y-3"
                    >
                        <div>
                            <div class="text-primary font-semibold">过人成功率最高</div>
                            <div class="bg-primary-active w-full py-0.5"></div>
                        </div>
                        <div class="text-lg font-semibold">梅西</div>
                        <div class>89%</div>
                    </div>
                </div>
            </div>
        </n-scrollbar>
    </div>
</template>
<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
</script>
<style scoped>
</style>
