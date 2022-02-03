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

        <div class='flex space-x-10 mt-10 ml-14 mr-16'>
            <!-- 左边 -->
            <div class="w-2/3">
                <!-- 下一场比赛卡片 -->
                <div class='relative flex flex-col space-y-6 bg-white rounded-lg shadow-md'>
                    <!-- 倒计时 -->
                    <div class="mx-auto flex mt-6 p-2 items-center rounded-full bg-neutral-100 text-gray-500 shadow-sm">

                        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
                            </path>
                        </svg>

                        <span>
                            2 days
                        </span>
                    </div>

                    <div class="flex items-center space-x-16 px-10 pb-10 ">
                        <!-- 左球队 -->
                        <div class="flex items-center space-x-1 flex-1">
                            <img class='h-20'
                                 src="http://s1.s100.vip:13127/Public/%E6%89%98%E7%89%B9%E7%BA%B3%E5%A7%86%E7%83%AD%E5%88%BA.png"
                                 alt="">
                            <div class="flex flex-col items-start space-y-2">
                                <div class="text-lg font-semibold">托特纳姆热刺</div>
                                <div class="text-gray-500">排名 6</div>
                            </div>
                        </div>
                        <!-- 比赛信息 -->
                        <div class="flex flex-col items-center space-y-2 flex-1">
                            <div class="text-lg text-gray-500">世界超级联赛</div>
                            <div class='text-gray-500'>Aug 08</div>
                        </div>
                        <!-- 右球队 -->
                        <div class="flex items-center space-x-1 flex-1">
                            <div class="flex flex-col items-end space-y-2">
                                <div class="text-lg font-semibold">AC 米兰</div>
                                <div class="text-gray-500">排名 12</div>
                            </div>
                            <img class='h-20' src="http://s1.s100.vip:13127/Public/AC%E7%B1%B3%E5%85%B0.png" alt="">
                        </div>

                    </div>


                </div>
            </div>
            <!-- 右边 -->
            <div class='w-1/3'>
                <!-- 积分榜 -->
                <div class="mb-4 bg-white shadow-md rounded-lg p-2 sm:p-6 xl:p-8 ">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">积分榜</h3>
                            <span class="font-normal text-gray-500">英格兰超级联赛</span>
                        </div>
                        <div>
                            <a href="#" class="text-sm font-medium text-teal-600 hover:bg-gray-100 rounded-lg p-2">
                                View more</a>
                        </div>
                    </div>
                    <!-- 积分榜 -->
                    <div>
                        <div class="overflow-x-auto">
                            <div class="inline-block min-w-full">
                                <div class="shadow overflow-hidden sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                        <tr class="text-sm text-gray-500">
                                            <th scope="col" class="p-2 text-left font-medium">
                                                俱乐部
                                            </th>
                                            <th scope="col" class="p-2 text-left  font-medium">
                                                场次
                                            </th>
                                            <th scope="col" class="p-2 text-left font-medium">
                                                胜
                                            </th>
                                            <th scope="col" class="p-2 text-left  font-medium">
                                                平
                                            </th>
                                            <th scope="col" class="p-2 text-left  font-medium">
                                                负
                                            </th>
                                            <th scope="col" class="p-2 text-left  font-mediu">
                                                积分
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr class="whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                曼彻斯特城
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50 whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                利物浦
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                莱斯特城
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50 whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                切尔西
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                阿森纳
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50 whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                托特纳姆热刺
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                狼队
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50 whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                托特纳姆热刺
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                狼队
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50 whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                托特纳姆热刺
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                狼队
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50 whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                托特纳姆热刺
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                狼队
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50 whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                托特纳姆热刺
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                狼队
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50 whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                托特纳姆热刺
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                狼队
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50 whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                托特纳姆热刺
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                狼队
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
                                        </tr>
                                        <tr class="bg-gray-50 whitespace-nowrap text-sm">
                                            <td class="p-2 ">
                                                托特纳姆热刺
                                            </td>
                                            <td class="p-2">
                                                22
                                            </td>
                                            <td class="p-2">
                                                18
                                            </td>
                                            <td class="p-2">
                                                3
                                            </td>
                                            <td class="p-2">
                                                1
                                            </td>
                                            <td class="p-2 font-semibold">
                                                56
                                            </td>
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