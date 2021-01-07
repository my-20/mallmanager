<template>
	<div class="login-wrap">
		<el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
			<h2>用户登录</h2>
			<el-form-item label="用户名">
				<el-input v-model="formdata.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input placeholder="请输入密码" v-model="formdata.password" show-password></el-input>
			</el-form-item>
			<el-button @click.prevent='handleLogin()' class="login-btn" type="primary">登录</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formdata: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			//找到距离异步操作有结果的代码最近的方法 前面加async
			async handleLogin() {
				//找到异步操作有结果的代码前面加await同时接口异步操作的结果res
				const res = await this.$http.post('login', this.formdata)
					console.log(res)
					const {
						data,
						meta: {
							msg,
							status
						} //data获取的是res的data，meta对象获取的是data中的meta对象
					} = res.data
					//登录成功
					if(status === 200){
						//登录成功保存token(方便后续页面验证用户有没有登录，防止用地址栏进行跳转)
						localStorage.setItem('token',data.token)
						//跳转home
						 this.$router.push({name:'home'})
						 this.$message.success(msg);
					}else{
						//登录失败
						this.$message.error(msg);
					}
				
			}
		}
	}
</script>

<style>
	.login-wrap {
		background-color: #324152;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-wrap .login-form {
		width: 400px;
		background-color: #fff;
		border-radius: 5px;
		padding: 30px;
	}

	.login-wrap .login-btn {
		width: 100%;
	}
</style>
