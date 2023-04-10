<script lang='ts' setup>
import {computed, watch} from 'vue'
import {NLayout, NLayoutContent} from 'naive-ui'
import {useRouter} from 'vue-router'
import Sider from './sider/index.vue'
import Login from '../components/Login/index.vue'
import {useBasicLayout} from '@/hooks/useBasicLayout'
import {useAppStore, useChatStore} from '@/store'

const router = useRouter()
const appStore = useAppStore()
const chatStore = useChatStore()

router.replace({name: 'Chat', params: {uuid: chatStore.active}})

const {isMobile} = useBasicLayout()

const collapsed = computed(() => appStore.siderCollapsed)


const getMobileClass = computed(() => {
    if (isMobile.value)
        return ['rounded-none', 'shadow-none']
    return ['border', 'rounded-md', 'shadow-md', 'dark:border-neutral-800']
})

const getContainerClass = computed(() => {
    return [
        'h-full',
        {'pl-[260px]': !isMobile.value && !collapsed.value},
    ]
})

watch(router, () => {
    if (isMobile.value)
        appStore.setSiderCollapsed(true)
})
</script>

<template>
    <div :class="[isMobile ? 'p-0' : 'p-4']" class="h-full dark:bg-[#24272e] transition-all">
        <div :class="getMobileClass" class="h-full overflow-hidden">
            <NLayout :class="getContainerClass" class="z-40 transition" has-sider>
                <Sider/>
                <NLayoutContent class="h-full">
                    <RouterView v-slot="{ Component, route }">
                        <component :is="Component" :key="route.fullPath"/>
                    </RouterView>
                </NLayoutContent>
            </NLayout>
        </div>

        <Login ref="loginRef" />
    </div>
</template>
