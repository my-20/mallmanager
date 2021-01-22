<template>
	<el-card>
		<!-- 面包屑 自定义全局组件-->
		<my-bread level1='权限管理' level2='权限列表'></my-bread>
		</p>
		<!-- 表格 -->
		<el-table :data="rightlist" border style="width: 100%" height="400px">
			<el-table-column type="index" label="#" width="180">
			</el-table-column>
			<el-table-column prop="authName" label="权限名称" width="180">
			</el-table-column>
			<el-table-column prop="path" label="路径">
			</el-table-column>
			
			
			<el-table-column prop="level" label="层级">
				<template slot-scope='scope'>
					<!-- level在数据里是字符串，这里要加引号 -->
					<span v-if="scope.row.level==='0'">一级</span>
					<span v-if="scope.row.level==='1'">二级</span>
					<span v-if="scope.row.level==='2'">三级</span>
				</template>
			</el-table-column>
		</el-table>

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
				//console.log(res);
				this.rightlist = res.data.data
			}
		}
	}
</script>

<style>
</style>
