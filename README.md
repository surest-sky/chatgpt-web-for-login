## 此项目在 chat-gpt 上, 使用nodejs, 集成了 邮箱发送、和邮箱注册登录模块，可以用来私有部署，并计算可使用的token值

## 来源项目:

https://github.com/Chanzhaoyu/chatgpt-web

## 演示地址

https://gpt.intercom.ink/

## 联系我

wx: surestfeng

## 安装方式

安装方式：同 https://github.com/Chanzhaoyu/chatgpt-web

我和他的区别在于增加了邮箱登录 和 注册，并在前端做了限制 1000个token 上下文会话

### 前端如何限制 1000 token

	src/views/chat/index.vue:120

### 安装sql 

https://github.com/surest-sky/chatgpt-web-for-login/blob/main/docs/install.sql

### 环境配置

.env

		OPENAI_API_KEY=
		
		# 可以使用 qq 邮箱的
		MAIL_FORM=
		MAIL_DRIVER=
		MAIL_HOST=
		MAIL_PORT=
		MAIL_USERNAME=
		MAIL_PASSWORD=
		MAIL_SECURE
		
		# redis 配置
		REDIS_HOST=
		REDIS_PORT=
		REDIS_DB=
		
		# mysql
		DB_CONNECTION=mysql
		DB_HOST=
		DB_PORT=3306
		DB_DATABASE=
		DB_USERNAME=
		DB_PASSWORD=

### 其他常见问题

#### 邮箱配置 

> 这里使用的是 腾讯企业邮

		MAIL_FORM=chenf@surest.cn
		MAIL_DRIVER=smtp
		MAIL_HOST=smtp.exmail.qq.com
		MAIL_PORT=465
		MAIL_USERNAME=chenf@surest.cn
		MAIL_PASSWORD=zE****gBsyg
		MAIL_SECURE=ssl

