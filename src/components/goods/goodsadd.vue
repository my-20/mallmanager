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

		<el-form label-position="top" label-width="80px" :model="form" style="height:300px;">
			<el-scrollbar style="height:100%">
			<el-tabs v-model="active" tab-position="left" >
				<el-tab-pane name="1" label="基本信息">
					<el-form-item label="商品名称">
						<el-input v-model="form.goods_name"></el-input>
					</el-form-item>
					<el-form-item label="商品价格">
						<el-input v-model="form.goods_price"></el-input>
					</el-form-item>
					<el-form-item label="商品重量">
						<el-input v-model="form.goods_weight"></el-input>
					</el-form-item>
					<el-form-item label="商品数量">
						<el-input v-model="form.goods_number"></el-input>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane name="2" label="商品参数"></el-tab-pane>
				<el-tab-pane name="3" label="商品属性"></el-tab-pane>
				<el-tab-pane name="4" label="商品图片"></el-tab-pane>
				<el-tab-pane name="5" label="商品内容"></el-tab-pane>
			</el-tabs>
			</el-scrollbar>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				active: "1",
				form: {
					gods_name:'',
					goods_cat:'',
					goods_price:'',
					goods_numDer:'',
					goods_weight: '',
					goods_introduce: '',
					pics:'',
					attrs:''
				}

			}
		}
	}
</script>

<style>
</style>
