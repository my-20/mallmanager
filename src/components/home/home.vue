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
				<!-- :router="true"开启路由模式 -->
				<el-menu :router="true" :unique-opened="true">

					<el-submenu :index="''+itme1.order" v-for="(itme1,index) in menus" :key='index'>

						<template slot="title">
							<i class="el-icon-location"></i>
							<span>{{itme1.authName}}</span>
						</template>
						<!-- 这里的路由不能随便写，应该由返回的path决定 -->
						<el-menu-item :index="itme2.path" v-for="(itme2,index) in itme1.children" :key='index'>
							<i class="el-icon-location"></i>
							<span>{{itme2.authName}}</span>
						</el-menu-item>

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
		data() {
			return {
				menus: []
			}
		},
		//beforeCreate此时组件的选项对象还未创建，el 和 data 并未初始化，因此无法访问methods， data， computed等上的方法和数据。
		//在这里获取token，判断是否登录，登录vue继续渲染，否则停止渲染，跳回登录页面
		// beforeCreate() {
		// 	//获取token
		// 	const token = localStorage.getItem('token')
		// 	if (!token) {
		// 		//token 没有->转跳登录页面
		// 		this.$router.push({
		// 			name: 'login'
		// 		})
		// 	}
		// 	//if token 有->继续渲染组件
		// },
		created() {
			this.getMenus();
		},
		methods: {
			//获取菜单列表
			async getMenus() {
				const res = await this.$http.get('menus');
				//console.log(res);
				this.menus = res.data.data;
			},
			handleSignout() {
				//1.清除token
				localStorage.clear();
				//2.提示
				this.$message.success('退出成功');
				//3.跳转登录页面
				this.$router.push({
					name: 'login'
				});
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
