<script lang='ts' setup>
import {computed, ref} from 'vue'
import {NAvatar} from 'naive-ui'
import {useUserStore} from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
import {isString} from '@/utils/is'

import Tips from '../Tips/index.vue'

const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)
const systemTip = ref<InstanceType<typeof Tips>>()
const setLoginModal = () => {
    systemTip.value?.setLoginModal()
}

const refresh = () => {
    window.location.reload()
}

</script>

<template>
    <div class="flex items-center overflow-hidden" >
        <template v-if="userInfo.account">
            <div class="w-10 h-10 overflow-hidden rounded-full shrink-0">
                <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
                    <NAvatar
                      :fallback-src="defaultAvatar"
                      :src="userInfo.avatar"
                      round
                      size="large"
                    />
                </template>
                <template v-else>
                    <NAvatar :src="defaultAvatar" round size="large"/>
                </template>
            </div>
            <div class="flex-1 min-w-0 ml-2">
                <p class="overflow-hidden text-sm text-ellipsis whitespace-nowrap">
                    账户名称: <span>{{ userInfo.account }}</span>
                </p>
                <p class="overflow-hidden mt-2 text-xs text-gray-400 text-ellipsis whitespace-nowrap">
                    Token: <span>{{ userInfo.balance }}</span>
                </p>
                <Tips ref="systemTip"/>
            </div>
        </template>
        <template v-else>
            <span @click="refresh()">未登录</span>
        </template>
    </div>
</template>
