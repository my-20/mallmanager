<template>
	<el-card>
		<my-bread level1='商品管理' level2='分类参数'></my-bread>
		</p>
		<el-alert title="只允许为第三级参数设置分类" type="error" :closable="false"></el-alert>
		</p>
		<el-form label-position="left" label-width="80px" style="height:400px;">
			<!-- 级联选择器 -->
			<el-form-item label="商品分类">
				<el-cascader clearable expand-trigger="hover" :options="options" v-model=" selectedOptions" :props="defaultProp"></el-cascader>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				// 级联选择器绑定的数据
				options: [],
				//级联选择器默认展示
				selectedOptions: [],
				//defaultProp把数据转换成options中需要的值
				defaultProp: {
					label: 'cat_name',
					value: 'cat_id',
					children: 'children'
				}
			}
		},
		created() {
			this.getGoodCate();
		},
		methods: {
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
