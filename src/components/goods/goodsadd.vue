<template>

	<el-card>
		<!-- 面包屑 -->
		<my-bread level1='商品管理' level2='商品列表'></my-bread>

		</p>

		<!-- 提示 el-alert -->
		<el-alert title="添加商品信息" type="success" center="" show-icon></el-alert>

		<!-- 步骤条 el-steps-->
		<el-steps :active="1*active" finish-status="success" simple style="margin-top: 20px">
			<el-step title="基本信息"></el-step>
			<el-step title="商品参数"></el-step>
			<el-step title="商品属性"></el-step>
			<el-step title="商品图片"></el-step>
			<el-step title="商品内容"></el-step>
		</el-steps>

		<el-tabs v-model="active" tab-position="left" style="height:200px; ">
			<el-tab-pane label="基本信息" name="1">基本信息</el-tab-pane>
			<el-tab-pane label="商品参数" name="2">商品参数</el-tab-pane>
			<el-tab-pane label="商品属性" name="3">商品属性</el-tab-pane>
			<el-tab-pane label="商品图片" name="4">商品图片</el-tab-pane>
			<el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
		</el-tabs>

	</el-card>
</template>

<script>
	export default {
		data(){
			return{
				active:"1"
			}
		}
	}
</script>

<style>
</style>
