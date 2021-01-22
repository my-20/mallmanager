<template>
	<el-card>
		<my-bread level1='商品管理' level2='分类参数'></my-bread>
		</p>
		<el-alert title="只允许为第三级参数设置分类" type="error" :closable="false"></el-alert>
		</p>
		<el-form label-position="left" label-width="80px" style="height:400px;">
			<!-- 级联选择器 -->
			<el-form-item label="商品分类">
				<el-cascader clearable expand-trigger="hover" :options="options" v-model=" selectedOptions" :props="defaultProp"
				 @change="handleChange()"></el-cascader>
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
				},
				//动态参数的数据数组
				arrDyparams: [],
				//静态参数的数据数组
				arrStaticparams: []
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
			},
			// 级联选择器@change触发的方法
			async handleChange() {
				if(this.selectedOptions.length===3){
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
					console.log(this.arrDyparams);
				}else{
					if (this.selectedOptions.length !== 3) {
						//提示
						this.$message.error('请先选择商品分类中的三级分类');
						return;
					}
				}
			}
		}
	}
</script>

<style>
</style>
