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


					<el-tab-pane name="2" label="商品参数">
						<!-- 显示的是该三级分类的商品参数 -->
						<el-form-item :label="item1.attr_name" v-for="(item1,i) in arrDyparams" :key="i">
							<!-- 复选框组 -->
							<el-checkbox-group v-model="item1.attr_vals">
								<el-checkbox border v-for="(item2,i) in item1.attr_vals" :key="i" :label="item2"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-tab-pane>

					<el-tab-pane name="3" label="商品属性">
						<!-- 静态参数的数据 -->
						<el-form-item :label="item.attr_name" v-for="(item,i) in arrStaticparams" :key="i">
							<el-input v-model="item.attr_vals"></el-input>
						</el-form-item>
					</el-tab-pane>

					<el-tab-pane name="4" label="商品图片">
						<el-form-item>
							<el-upload action="http://127.0.0.1:8888/api/private/v1/upload" :headers='headers' :on-preview="handlePreview"
							 :on-remove="handleRemove" :on-success="handleSuccess" list-type="picture">
								<el-button size="small" type="primary">点击上传</el-button>
								<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
							</el-upload>
						</el-form-item>
					</el-tab-pane>


					<el-tab-pane name="5" label="商品内容">
						<el-form-item>
							<!-- 表单元素 -->
							<el-button type="primary">添加商品</el-button>
							<!-- 富文本 -->
							<quill-editor></quill-editor>
						</el-form-item>
					</el-tab-pane>
				</el-tabs>
			</el-scrollbar>
		</el-form>
	</el-card>
</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import {
		quillEditor
	} from 'vue-quill-editor'

	export default {
		components: {
			quillEditor
		},
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
				arrDyparams: [],
				//静态参数的数据数组
				arrStaticparams: [],
				headers: {
					Authorization: localStorage.getItem('token')
				}
			}
		},
		created() {
			this.getGoodCate()
		},
		methods: {
			//图片上传时的相关方法
			//file形参里面是当前操作的图片的相关信息(图片名/图片路径)
			handleSuccess(file) {
				//file.response.data.tmp_path图片临时上传的路径
				console.log("成功");
				console.log(file);
			},
			handleRemove(file) {

			},
			handlePreview(file) {

			},
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
					//id->分类 sel=many表示的是获取动态参数的数据
					const res = await this.$http.get('categories/' + this.selectedOptions[2] + '/attributes?sel=many');
					//console.log(res);
					this.arrDyparams = res.data.data;
					//console.log(this.arrDyparams);
					//this.arrDyparams每个对象.attr_vals字符串->数组->v-for
					this.arrDyparams.forEach(item => {
						//并不是所有的三级分类都有动态参数->""->[]->v-for报错
						// if (item.attr_vals.Length !==O) {
						// item.attr_vaLs = item.attr_vals.trim( ).split( ',')
						//}
						//item.attr_vals里的值为字符串，需要转成对象在遍历，trim()去前后空格，split(',')转换成对象以“，”分割
						item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
					});

				} else if (this.active === '3') {
					if (this.selectedOptions.length !== 3) {
						//提示
						this.$message.error('请先选择商品的三级分类');
						return;
					}
					//获取数据
					//id->分类 sel=only表示的是获取动态参数的数据
					const res = await this.$http.get('categories/' + this.selectedOptions[2] + '/attributes?sel=only');
					//console.log(res);
					this.arrStaticparams = res.data.data;
					//console.log(this.arrStaticparams);
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
