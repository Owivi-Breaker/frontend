<template>
    <div>
        <!-- navbar -->
        <!--<nav class="flex items-center px-6 py-5 justify-between bg-white shadow-md">-->
        <!--    <div class="flex items-center space-x-4">-->
        <!--        &lt;!&ndash; logo &ndash;&gt;-->
        <!--        <div class="font-bold italic text-2xl">-->
        <!--            <span class="underline decoration-teal-500  decoration-4">TieB</span>reaker-->
        <!--        </div>-->
        <!--    </div>-->
        <!--</nav>-->

        <div class="flex space-x-10 mt-10 ml-14 mr-16">
            <!-- 左边 -->
            <div class="w-2/3">
                <!-- 下一场比赛卡片 -->
                <div class="bg-white relative flex flex-col space-y-6 rounded-lg shadow-md">
                    <div class="flex items-center space-x-16 p-10">
                        <!-- 左球队 -->
                        <div class="flex items-center space-x-1 flex-1">
                            <img
                                class="h-20"
                                src="http://s1.s100.vip:13127/Public/%E6%89%98%E7%89%B9%E7%BA%B3%E5%A7%86%E7%83%AD%E5%88%BA.png"
                            />
                            <div class="flex flex-col items-start space-y-2">
                                <div class="text-lg font-semibold">托特纳姆热刺</div>
                                <div class="text-gray-500">排名 6</div>
                            </div>
                        </div>
                        <!-- 比赛信息 -->
                        <div class="flex flex-col items-center space-y-1 flex">
                            <!-- 倒计时 -->
                            <div
                                class=" flex mb-1 py-2 px-3 items-center rounded-full bg-primary-active text-primary shadow-sm"
                            >
                                <svg
                                    class="w-6 h-6 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    />
                                </svg>

                                <span>2 days</span>
                            </div>
                            <div class="text-lg text-gray-500">世界超级联赛</div>
                            <div class="text-gray-500">Aug 08</div>
                        </div>
                        <!-- 右球队 -->
                        <div class="flex items-center space-x-1 flex-1">
                            <div class="flex flex-col items-end space-y-2">
                                <div class="text-lg font-semibold">AC 米兰</div>
                                <div class="text-gray-500">排名 12</div>
                            </div>
                            <img
                                class="h-20"
                                src="http://s1.s100.vip:13127/Public/AC%E7%B1%B3%E5%85%B0.png"
                            />
                        </div>
                    </div>
                </div>

                <!-- 球员表现统计 -->
                <div>
                    <n-scrollbar x-scrollable class>
                        <div class="flex justify-around gap-5 py-10">
                            <!-- 最佳射手 -->
                            <div class="flex flex-col items-center min-w-40">
                                <div class="-mb-10 z-10 h-20 w-20">
                                    <Avataaars :is-circle="false" />
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
                                    <Avataaars :is-circle="false" />
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
                                    <Avataaars :is-circle="false" />
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
                                    <Avataaars :is-circle="false" />
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
                                    <Avataaars :is-circle="false" />
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
                                    <Avataaars :is-circle="false" />
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

                <!-- 杂项统计 -->
                <div class="flex items-start gap-5">
                    <!-- 财政 -->
                    <div class="rounded-lg shadow-md bg-white p-5 mt-10 w-2/5">
                        <div class="text-lg font-semibold text-primary mb-3">财政</div>

                        <div class="flex flex-col">
                            <div class="flex justify-between">
                                <div class>结余</div>
                                <div class="text-green-700">€1.34亿</div>
                            </div>
                            <div class="flex justify-between">
                                <div class>本赛季利润</div>
                                <div class="text-red-500">-€6631万</div>
                            </div>

                            <div class="font-semibold mt-4">预计收入</div>
                            <div class="bg-primary-active w-full py-0.5 mb-2"></div>
                            <div class="flex justify-between">
                                <div class>门票</div>
                                <div class>€480万/场</div>
                            </div>
                            <div class="flex justify-between">
                                <div class>广告</div>
                                <div class>€6400万</div>
                            </div>
                            <div class="flex justify-between">
                                <div class>转播</div>
                                <div class>€5800万</div>
                            </div>
                            <div class="flex justify-between">
                                <div class>赛事奖金</div>
                                <div class>€2300万</div>
                            </div>

                            <div class="font-semibold mt-4">预计支出</div>
                            <div class="bg-primary-active w-full py-0.5 mb-2"></div>
                            <div class="flex justify-between">
                                <div class>球员工资</div>
                                <div class>€127万/周</div>
                            </div>
                            <div class="flex justify-between">
                                <div class>职员工资</div>
                                <div class>€25万/周</div>
                            </div>
                        </div>
                    </div>
                    <!-- 球员统计 -->
                    <div class="rounded-lg shadow-md bg-white p-5 mt-10 w-3/5">
                        <div class="text-lg font-semibold text-primary mb-3">统计</div>
                        <div class="flex flex-col">
                            <!-- 球员 -->
                            <div class="font-semibold mt-4">球员</div>
                            <div class="bg-primary-active w-full py-0.5 mb-2"></div>
                            <div class="flex justify-between">
                                <div class>平均年龄</div>
                                <div class>25.3岁</div>
                            </div>

                            <div class="flex justify-between">
                                <div class>最高工资</div>
                                <div>
                                    <span class>佩德里</span>
                                    <span>-</span>
                                    <span class>€15.8万/周</span>
                                </div>
                            </div>

                            <div class="flex justify-between">
                                <div class>最低工资</div>
                                <div>
                                    <span class="after:">加维</span>
                                    <span>-</span>
                                    <span class>€2.3万/周</span>
                                </div>
                            </div>
                            <!-- 战术 -->
                            <div class="font-semibold mt-4">战术</div>
                            <div class="bg-primary-active w-full py-0.5 mb-2"></div>
                            <div class="flex justify-between">
                                <div class>下底传中</div>
                                <div class>58/122 - 47.5%</div>
                            </div>
                            <div class="flex justify-between">
                                <div class>倒三角</div>
                                <div class>1/24 - 4.2%</div>
                            </div>
                            <div class="flex justify-between">
                                <div class>中路渗透</div>
                                <div class>18/65 - 27.6%</div>
                            </div>
                            <div class="flex justify-between">
                                <div class>边路内切</div>
                                <div class>4/55 - 7.2%</div>
                            </div>
                            <div class="flex justify-between">
                                <div class>防守反击</div>
                                <div class>6/19 - 31.6%</div>
                            </div>
                            <!-- 比赛 -->
                            <div class="font-semibold mt-4">比赛</div>
                            <div class="bg-primary-active w-full py-0.5 mb-2"></div>
                            <div class="flex justify-between">
                                <div class>进球</div>
                                <div class>96</div>
                            </div>
                            <div class="flex justify-between">
                                <div class>失球</div>
                                <div class>32</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右边 -->
            <div class="w-1/3">
                <!-- 积分榜 -->
                <div class="mb-4 bg-white shadow-md rounded-lg p-6">
                    <!-- 描述 -->
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h3 class="text-xl font-semibold text-gray-900">积分榜</h3>
                            <span class="font-semibold text-primary mt-2">英格兰超级联赛</span>
                        </div>
                        <div>
                            <a
                                class="text-sm font-medium text-primary hover:bg-primary-active rounded-lg p-2"
                                href="#"
                            >
                                View
                                more
                            </a>
                        </div>
                    </div>
                    <!-- 积分榜行 -->
                    <div>
                        <div class="overflow-x-auto">
                            <div class="inline-block min-w-full">
                                <div class="shadow overflow-hidden rounded-lg">
                                    <table class="min-w-full divide-y divide-primary">
                                        <thead class="bg-primary-active">
                                            <tr class="text-sm">
                                                <th class="p-2 text-left" scope="col">俱乐部</th>
                                                <th class="p-2 text-left" scope="col">场次</th>
                                                <th class="p-2 text-left" scope="col">胜</th>
                                                <th class="p-2 text-left" scope="col">平</th>
                                                <th class="p-2 text-left" scope="col">负</th>
                                                <th class="p-2 text-left" scope="col">积分</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y-3 divide-primary-active">
                                            <tr
                                                v-for="i in new Array(20)"
                                                class="whitespace-nowrap text-sm"
                                            >
                                                <td class="p-2">曼彻斯特城</td>
                                                <td class="p-2">22</td>
                                                <td class="p-2">18</td>
                                                <td class="p-2">3</td>
                                                <td class="p-2">1</td>
                                                <td class="p-2 font-semibold">56</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Avataaars from 'vuejs-avataaars/src/Avataaars.vue';
</script>
