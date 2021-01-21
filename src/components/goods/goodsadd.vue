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
		<!-- 外层需要表单来传数据发布发起请求 -->
		<el-form label-position="top" label-width="80px" :model="form" style="height:300px;">
			<el-scrollbar style="height:100%">
				<el-tabs @tab-click="tabChange()" v-model="active" tab-position="left">
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
						<!-- 级联选择器 -->
						<el-cascader clearable expand-trigger="hover" :options="options" v-model=" selectedOptions" :props="defaultProp"
						 @change="handleChange"></el-cascader>

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
					gods_name: '',
					goods_cat: '',
					goods_price: '',
					goods_numDer: '',
					goods_weight: '',
					goods_introduce: '',
					pics: '',
					attrs: ''
				},
				// 级联选择器绑定的数据
				options: [],
				//级联选择器默认展示
				selectedOptions: [1, 3, 6],
				//defaultProp把数据转换成options中需要的值
				defaultProp: {
					label: 'cat_name',
					value: 'cat_id',
					children: 'children'
				},
				//动态参数的数据数组
				arrDyparams: []

			}
		},
		created() {
			this.getGoodCate()
		},
		methods: {
			//点击不同的tab时
			async tabChange() {
				//如果点击的是第二个tab 同时 三级分类要有值
				if (this.active === '2') {
					if (this.selectedOptions.length !== 3) {
						//提示
						this.$message.error('请先选择商品的三级分类');
						return;
					}
					//获取数据
					//id->分类
					const res = await this.$http.get('categories/' + this.selectedOptions[2] + '/attributes?sel=many');
					//console.log(res);
					this.arrDyparams=res.data.data;
					console.log(this.arrDyparams)
				}
			},
			// 级联选择器@change触发的方法
			handleChange() {

			},
			//获取三级分类的信息
			async getGoodCate() {
				const res = await this.$http.get(`categories?type=3`);
				//console.log(res);
				this.options = res.data.data;
				//console.log(this.options);
			}
		}
	}
</script>

<style>
</style>
