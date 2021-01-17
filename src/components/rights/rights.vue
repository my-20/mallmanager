<template>
	<el-card>
		<!-- 面包屑 自定义全局组件-->
		<my-bread level1='权限管理' level2='权限列表'></my-bread>
		<!-- 表格 -->



	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				rightlist: []
			}
		},
		created() {
			this.getRightlise();
		},
		methods: {
			async getRightlise() {
				const res = await this.$http.get('rights/list');
				console.log(res);
				this.rightlist = res.data.data
			}
		}
	}
</script>

<style>
</style>
