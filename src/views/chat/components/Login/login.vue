<template>
    <NTabs v-model:value="authMode" :disabled="submitLoading" animated class="mt-5" size="large">
        <NTabPane name="register" tab="注册">
            <NForm ref="formInstRef" :model="formValue" :rules="rules">
                <NFormItem label="账号名称" path="account">
                    <NInput v-model:value="formValue.account" placeholder="Enter your account"></NInput>
                </NFormItem>
                <NFormItem label="邮箱" path="email">
                    <NInput v-model:value="formValue.email" placeholder="Enter your email"></NInput>
                </NFormItem>
                <NFormItem label="密码" path="password">
                    <NInput v-model:value="formValue.password" placeholder="Enter your password"
                            type="password"></NInput>
                </NFormItem>
                <NFormItem label="验证码" path="verificationCode">
                    <NSpace>
                        <NInput v-model:value="formValue.verificationCode"
                                placeholder="Enter the verification code"></NInput>
                        <NButton :disabled="verify.disabled" :loading="verify.loading" type="primary"
                                 @click="getVerifyCode">
                            {{ verify.text }}
                        </NButton>
                    </NSpace>
                </NFormItem>
                <NButton :disabled="submitLoading" :loading="submitLoading" type="primary" @click="register">
                    立即注册
                </NButton>
            </NForm>
        </NTabPane>

        <NTabPane name="login" tab="登录">
            <NForm ref="loginRef" :model="loginFormValue" :rules="loginRules">
                <NFormItem label="账号名称/邮箱" path="account">
                    <NInput v-model:value="loginFormValue.account" placeholder="Enter your account"></NInput>
                </NFormItem>
                <NFormItem label="密码" path="password">
                    <NInput v-model:value="loginFormValue.password" placeholder="请输入密码"
                            type="password"></NInput>
                </NFormItem>
                <NButton :disabled="submitLoading" :loading="submitLoading" type="primary" @click="login">
                    立即登录
                </NButton>
            </NForm>
        </NTabPane>
    </NTabs>

</template>


<script lang="ts" setup>
import {ref} from 'vue'
import {fetchVerifyCode} from '@/api'
import {FormInst, NButton, NForm, NFormItem, NInput, NSpace, NTabPane, NTabs, useMessage, FormItemRule} from 'naive-ui'
import {loginApi, registerApi} from "@/api/auth";
import {EmailVerification, LoginBody, RegisterBody} from "@/api/type";
import {Response} from "@/types/response";
import {UserInfo} from "@/store/modules/user/helper";
import {useUserStore} from "@/store";

const ms = useMessage()
const formInstRef = ref<FormInst | null>(null)
const loginRef = ref<FormInst | null>(null)
const formValue = ref({
    email: '',
    password: '',
    verificationCode: '',
    account: '',
})
const loginFormValue = ref({
    password: '',
    account: '',
})

const verify = ref({
    loading: false,
    disabled: false,
    text: '获取验证码'
})
const submitLoading = ref(false)
const userStore = useUserStore()
const authMode = ref('login');
const switchAuthMode = () => {
    authMode.value = authMode.value === 'login' ? 'register' : 'login';
}

const rules = {
    email: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('请输入邮箱')
                } else if (!/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(value)) {
                    return new Error('请输入有效的电子邮件地址')
                }
                return true
            }, key: 'email'
        },
    ],
    password: [
        {required: true, message: '密码是必需的'},
        {min: 6, message: '密码不能少于6个字符'},
        {max: 18, message: '密码不能大于16个字符'},
    ],
    verificationCode: [
        {required: true, message: '需要验证码'},
    ],
    account: [
        {required: true, message: '请输入账号名称'},
    ],
}

const loginRules = {
    password: [
        {required: true, message: '密码是必需的'},
    ],
    account: [
        {required: true, message: '请输入账号名称'},
    ],
}

const register = () => {
    submitLoading.value = true
    formInstRef.value?.validate(async (errors) => {
        if (errors) {
            console.error(errors)
            return
        }
        const response = await registerApi({
            email: formValue.value.email,
            account: formValue.value.account,
            password: formValue.value.password,
            code: parseInt(formValue.value.verificationCode)
        } as RegisterBody).catch(error => {
            ms.error(error.message);
        });
        const {code, message} = response as Response;
        if (code !== 200) {
            ms.error(message)
            return
        }
        formValue.value = {
            email: '',
            password: '',
            verificationCode: '',
            account: '',
        }
        loginFormValue.value.account = formValue.value.account;
        ms.success("注册成功")
        ms.success("请登录")
        switchAuthMode()
    }).finally(() => {
        submitLoading.value = false
    })
}

const login = () => {
    submitLoading.value = true
    loginRef.value?.validate(async (errors) => {
        if (errors) {
            return
        }

        const response = await loginApi({
            account: loginFormValue.value.account,
            password: loginFormValue.value.password,
        } as LoginBody).catch(error => {
            ms.error(error.message);
        });

        const {code, message, data} = response as Response;
        if (code !== 200) {
            ms.error(message)
            return
        }
        console.log('data', data)
        ms.success("登录成功")
        loginSuccess(data as UserInfo)
    }).finally(() => {
        submitLoading.value = false
    })
}

const loginSuccess = (userInfo: UserInfo) => {
    userStore.updateUserInfo(userInfo);
    window.location.reload()
}

const getVerifyCode = async () => {
    formInstRef.value?.validate(async (errors) => {
        if (!errors) {
            verify.value.loading = true;
            verify.value.disabled = true;
            verify.value.text = "请稍后";
            const isSuccess = await fetchVerifyCode({
                email: formValue.value.email,
                scene: 'register'
            } as EmailVerification).finally(() => {
                verify.value.loading = false;
                verify.value.disabled = false;
            }).catch((error) => {
                verify.value.text = "获取验证码";
                console.error(error)
                ms.error(error.message)
            })

            if (!isSuccess) {
                return;
            }

            ms.success("验证码已发送至邮箱")
            setVerifyLoading()
        }
    }, (rule) => {
        console.log('rulerulerule', rule)
        return rule?.key === 'email'
    })
}

const setVerifyLoading = () => {
    verify.value.disabled = true;
    let i = 60;
    const inter = setInterval(() => {
        i--;
        verify.value.text = `${i}秒后重试`;
        if (i === 0) {
            clearInterval(inter);
            verify.value.disabled = false;
            verify.value.text = "获取验证码";
        }
    }, 1000)
}
</script>
