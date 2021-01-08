<template>
	<el-container class='container'>
		<el-header class='header'>
			<el-row>
				<el-col :span="4">
					<div class="grid-content bg-purple">
						<img src="../../assets/1111.jpg" alt="图片无法显示QAQ" />
					</div>
				</el-col>
				<el-col :span="18" class="middle">
					<h3 class="biaoti">后台管理系统</h3>
				</el-col>
				<el-col :span="2">
					<!-- @click.prevent 阻止事件的默认行为， -->
					<a href="#" @click.prevent="handleSignout()" class="loginout">退出</a> <!-- 阻止a标签跳转，仅执行函数handleSignout -->
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside class='aside' width="200px">
				<!-- 开启路由模式 -->
				<el-menu :router="true" :unique-opened="true" >
					<!-- 1 -->
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/home/users">
								<i class="el-icon-location"></i>
								<span>用户列表</span>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<!-- 2 -->
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>权限管理</span>
						</template>
						<el-menu-item-group>
							
							<el-menu-item index="2-1">
								<i class="el-icon-location"></i>
								<span>角色列表</span>
							</el-menu-item>
							<el-menu-item index="2-2">
								<i class="el-icon-location"></i>
								<span>权限列表</span>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<!-- 3 -->
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item-group>
							
							<el-menu-item index="3-1">
								<i class="el-icon-location"></i>
								<span>商品列表</span>
							</el-menu-item>
							<el-menu-item index="3-2">
								<i class="el-icon-location"></i>
								<span>分类参数</span>
							</el-menu-item>
							<el-menu-item index="3-3">
								<i class="el-icon-location"></i>
								<span>商品分类</span>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<!-- 4 -->
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>订单管理</span>
						</template>
						<el-menu-item-group>
							
							<el-menu-item index="4-1">
								<i class="el-icon-location"></i>
								<span>订单列表</span>
							</el-menu-item>
							<el-menu-item index="4-2">
								<i class="el-icon-location"></i>
								<span>选项2</span>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<!-- 5 -->
					<el-submenu index="5">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>数据统计</span>
						</template>
						<el-menu-item-group>
							
							<el-menu-item index="5-1">
								<i class="el-icon-location"></i>
								<span>选项1</span>
							</el-menu-item>
							<el-menu-item index="5-2">
								<i class="el-icon-location"></i>
								<span>选项2</span>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main class='main'>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	export default {
		//beforeCreate此时组件的选项对象还未创建，el 和 data 并未初始化，因此无法访问methods， data， computed等上的方法和数据。
		//在这里获取token，判断是否登录，登录vue继续渲染，否则停止渲染，跳回登录页面
		beforeCreate() {
			//获取token
			const token = localStorage.getItem('token')
			if (!token) {
				//token 没有->转跳登录页面
				this.$router.push({
					name: 'login'
				})
			}
			//if token 有->继续渲染组件
		},
		methods:{
			handleSignout(){
				//1.清除token
				localStorage.clear()
				//2.提示
				this.$message.success('退出成功')
				//3.跳转登录页面
				this.$router.push({name:'login'})
			}
		}
	}
</script>

<style>
	.biaoti {
		color: #E6A23C;
	}

	.container {
		height: 100%;
	}

	.header {
		background-color: #E32B33;
	}

	.aside {
		background-color: #0000;
	}

	.main {
		background-color: #e9eef3;
	}

	.middle {
		text-align: center;
	}

	.loginout {
		line-height: 60px;
		text-decoration: none;
		color: #E6A23C;
	}
</style>
