<script lang="ts" setup>
import {NModal,NTabs, NButton,NSpace, NTabPane} from 'naive-ui'
import {onMounted, ref} from 'vue'

const showModal = ref(false);

// eventBus.on('setLoginModal', () => {
//   showModal.value = true
// })
const type = ref('about')

const closeModal = () => {
  const currentAt = parseInt((new Date().getTime() / 1000).toString());
  localStorage.setItem('chatgpt', currentAt.toString());
}

onMounted(() => {
  // const chatgpt = localStorage.getItem('chatgpt')
  // if(!chatgpt) {
  //   showModal.value = true
  //   return;
  // }
  // const newChatgpt = parseInt(chatgpt);
  // const currentAt = parseInt((new Date().getTime() / 1000).toString());
  // // 一个小时弹一次
  // if((currentAt - newChatgpt ) > 60 * 60) {
  //   showModal.value = true
  // }
})

const setLoginModal = () => {
  showModal.value = true
}

defineExpose({ setLoginModal })

</script>
<template>
  <NModal :on-after-leave="closeModal" v-model:show="showModal" preset="dialog" title="非常抱歉">
    <NTabs v-model:value="type">
      <NTabPane  tab="关于" name="about">
        <div class="py-2 space-y-2 rounded-md">
          <p class="text-gray-500 text-sm">非常抱歉, 以这种弹框的形式来打扰您呢， 您或许可以仔细阅读下面的回复</p>
          <div class="text-gray-500 text-sm shadow-sm p-3">
            <p>首先本项目是基于 <a class="underline" href="https://github.com/Chanzhaoyu/chatgpt-web" target="_blank">此github
              项目</a> 演变而来</p>
            <p class="mt-2">我们建立此网站的目的是为了帮助更多的普通用户 体验 chatgpt 的魅力 </p>
            <p class="mt-2">因为无需登录，并且快速稳定，可能近期受到了很多用户的好评，我们对此非常感谢</p>
          </div>
          <div>

            <div class="text-gray-500 text-sm shadow-sm p-3 mt-5">
              <p>但是由于成本的问题，参考 OPENAI 的收费是
                0.002美金/1000token[约500个汉字]）
                <br>
                以及服务器和流量的费用，我们近期可能会开始限制免费版的使用次数</p>
            </div>

            <div class="text-gray-500 text-sm shadow-sm p-3 mt-5">
              <p>当然，我也希望大家可以永远免费体验 AI 的能力，我们也在持续构建 APP端中</p>
              <p>对于尝试体验的用户，我们会继续持续免费一周左右，当然我们也会推出我们的 收费版本（<b>我们不会为此而盈利，核心费用用于
                服务器和OPENAPI官方充值使用</b>）</p>
            </div>

            <div class=" text-sm shadow-sm p-3 mt-5">
              <p class="font-bold" >我们可以帮到您什么？</p>
              <p>- 独立的chatgpt版本，可以部署在您的域名中</p>
              <p>- 为您生成独立的APIKEY, 可以总计享受9999次的用量</p>
              <p>- 还有很多可能，您可以随时联系我们</p>
              <p class="font-bold"  style="font-size: 12px">所有的打赏金额都支付到 独立账户中，全部用于支付服务器成本和研发费用</p>
              <NSpace class="mt-2">
                <NButton type="primary" @click="type = 'contact'">联系我们</NButton>
                <NButton type="primary" @click="type = 'money'">打赏我们</NButton>
              </NSpace>
            </div>

          </div>
        </div>
      </NTabPane>
      <NTabPane tab="打赏我们" name="money">
        <div class="shadow-sm border p-1">
          <div class="text-center mb-5">
            <b>打赏我们</b>
            <p class="text-sm text-gray-500" style="font-size: 12px">请备注邮箱，我们会在24小时内人工回复一份邮件给您</p>
          </div>
          <div class="flex justify-between">
            <img src="https://cdn.surest.cn/pay/1241680069478_.pic.jpg" alt="" class="block w-[100px] h-auto">
            <img src="https://cdn.surest.cn/pay/1251680069479_.pic.jpg" alt="" class="block w-[100px] h-auto">
            <img src="https://cdn.surest.cn/pay/1261680069480_.pic.jpg" alt="" class="block w-[100px] h-auto">
          </div>
        </div>
      </NTabPane>
      <NTabPane tab="联系我们" name="contact">
        <div class="shadow-sm border p-1">
          <div class="text-center mb-5">
            <b>联系我们</b>
            <p class="text-sm text-gray-500" style="font-size: 12px">请备注邮箱，我们会在24小时内人工回复一份邮件给您</p>
          </div>
          <div class="flex justify-center">
            <img src="https://cdn.surest.cn/pay/1341680081730_.pic.jpg" alt="" class="block w-[200px] h-auto">
          </div>
        </div>
      </NTabPane>
    </NTabs>
  </NModal>
</template>