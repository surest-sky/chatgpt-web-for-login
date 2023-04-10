<script lang="ts" setup>
import {NModal} from 'naive-ui'
import Login from './login.vue'
import {useUserStore} from "@/store";
import {computed, onMounted, ref, watch} from "vue";
import {fetchSession} from "@/api";
import {SessionResponse} from "@/types/response";

const userStore = useUserStore()
const isLogin = computed(() => {
    return !!userStore.userInfo.token
})
const showModal = ref(!isLogin.value);
watch(isLogin, () => {
    showModal.value = isLogin.value
})

onMounted(async () => {
    const { data } = await fetchSession<SessionResponse>().catch((error) => {
        showModal.value = true
        throw error
    })
    if (data.user) {
        showModal.value = false
        userStore.updateUserInfo(data.user)
    }else {
        showModal.value = true
    }
})

</script>
<template>
    <NModal v-model:show="showModal" preset="dialog" title="用户登录">
        <Login @closeLogin="showModal = false"/>
    </NModal>
</template>