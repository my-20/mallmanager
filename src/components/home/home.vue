<template>
	<el-container class='container'>
		<el-header class='header'>
			<el-row>
				<el-col :span="4">
					<div class="grid-content bg-purple">
						<img src="../../assets/1111.jpg" alt="图片无法显示QAQ"/>
					</div>
				</el-col>
				<el-col :span="18" class="middle">
					<h3 class="biaoti">后台管理系统</h3>
				</el-col>
				<el-col :span="2">
					<a href="#" class="loginout">退出</a>
				</el-col>
			</el-row>
		</el-header>
		<el-container>
			<el-aside class='aside' width="200px">Aside</el-aside>
			<el-main class='main'>Main</el-main>
		</el-container>
	</el-container>
</template>

<script>
</script>

<style>
	.biaoti{
		color: #E6A23C;
	}
	.container {
		height: 100%;
	}

	.header {
		background-color: #E32B33;
	}

	.aside {
		background-color: #d3dce6;
	}

	.main {
		background-color: #e9eef3;
	}
	.middle{
		text-align: center;
	}
	.loginout{
		line-height: 60px;
		text-decoration: none;
		color: #E6A23C;
	}
</style>
