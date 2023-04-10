<script lang='ts' setup>
import {computed, onMounted, ref} from 'vue'
import {NSpin} from 'naive-ui'
import {fetchChatConfig} from '@/api'
import pkg from '@/../package.json'

interface ConfigState {
    timeoutMs?: number
    reverseProxy?: string
    apiModel?: string
    socksProxy?: string
    httpsProxy?: string
    balance?: string
}


const loading = ref(false)

const config = ref<ConfigState>()


async function fetchConfig() {
    try {
        loading.value = true
        const {data} = await fetchChatConfig<ConfigState>()
        config.value = data
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchConfig()
})
</script>

<template>
    <NSpin :show="loading">
        <div class="p-4 space-y-4">
            <h2 class="text-xl font-bold">
                Version - {{ pkg.version }}
            </h2>
            <div class="p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700 hidden">
                <div>
                    此项目使用的是个人的 API，每天的耗量可能无法支撑网站持续访问，我们后续将支持的功能
                    <ul>
                        <li>- 支持设置自定义 apikey, 服务端不进行存储</li>
                        <li>- 反向代理官方 chatgpt，收费价格更低，速度可能稍慢</li>
                        <li>- 账号体系</li>
                    </ul>
                </div>
                <p>
                    如果你觉得此项目对你有帮助，如果可以的话，可以给予一点赞助，谢谢！
                </p>
                <div class="flex justify-between">
                    <img alt="" class="block w-[150px] h-auto" src="https://cdn.surest.cn/pay/1241680069478_.pic.jpg">
                    <img alt="" class="block w-[150px] h-auto" src="https://cdn.surest.cn/pay/1251680069479_.pic.jpg">
                    <img alt="" class="block w-[150px] h-auto" src="https://cdn.surest.cn/pay/1261680069480_.pic.jpg">
                </div>
            </div>
            <p>{{ $t("setting.api") }}：{{ config?.apiModel ?? '-' }}</p>
            <p>{{ $t("setting.balance") }}：{{ config?.balance ?? '-' }}</p>
            <p>{{ $t("setting.reverseProxy") }}：{{ config?.reverseProxy ?? '-' }}</p>
            <p>{{ $t("setting.timeout") }}：{{ config?.timeoutMs ?? '-' }}</p>
            <p>{{ $t("setting.socks") }}：{{ config?.socksProxy ?? '-' }}</p>
            <p>{{ $t("setting.httpsProxy") }}：{{ config?.httpsProxy ?? '-' }}</p>
        </div>
    </NSpin>
</template>
