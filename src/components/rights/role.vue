<template>
	<el-card>
		<!-- 面包屑 自定义全局组件-->
		<my-bread level1='权限管理' level2='权限列表'></my-bread>

		<el-row class="addrolebtn">
			<el-col>
				<el-button type="warning">添加角色</el-button>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table :data="rolelist" style="width: 100%">
			<el-table-column type="expand" width="50">
				<template slot-scope='scope'>
					<el-row v-for="(item1,i) in scope.row.children" :key='i'>
						<!-- 一级权限 -->
						<el-col :span="4">
							<!-- 传角色id和权限id -->
							<el-tag @close="deleteRight(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
							<i class="el-icon-arrow-right"></i>
						</el-col>
						<el-col :span="20">
							<el-row v-for="(item2,i) in item1.children" :key='i'>
								<!-- 二级权限 -->
								<el-col :span="4">
									<el-tag @close="deleteRight(scope.row,item2.id)" type="success" closable>{{item2.authName}}</el-tag>
									<i class="el-icon-arrow-right"></i>
								</el-col>
								<!-- 三级权限 -->
								<el-col :span="20">
									<el-tag @close="deleteRight(scope.row,item3.id)" closable v-for="(item3,i) in item2.children" :key='i' type="warning">{{item3.authName}}</el-tag>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<span v-if="scope.row.children.length===0">未分配权限</span>
				</template>
			</el-table-column>


			<el-table-column type="index" label="#" width="60">
			</el-table-column>

			<el-table-column prop="roleName" label="角色名称" width="100">
			</el-table-column>

			<el-table-column prop="roleDesc" label="角色描述">
			</el-table-column>

			<el-table-column prop="" label="操作">
				<template slot-scope='scope'>
					<el-row>
						<el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click='showEditUserDia(scope.row)'></el-button>
						<el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDeleUserMsgBox(scope.row.id)"></el-button>
						<el-button size="mini" plain type="success" icon="el-icon-check" circle @click='showSetUserRoleDia(scope.row)'></el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
	</el-card>

</template>

<script>
	export default {
		data() {
			return {
				rolelist: []
			}
		},
		created() {
			this.getRoletlist();
		},
		methods: {
			//取消权限
			//roles/: roleId/rights/:rightId
			// roleId 当前角色的id
			// rightId 要删除的权限id
			async deleteRight(role,rightId){
				const res = await this.$http.delete('roles/'+role.id+'/rights/'+rightId);
				//console.log(res);
				//删除成功返回了200和该角色的剩余权限
				//局部刷新权限信息
				role.children=res.data.data;
				if(res.data.meta.status===200){
					this.$message.success(res.data.meta.msg);
				}else{
					this.$message.error(res.data.meta.msg);
				}
			},
			//获取权限信息
			async getRoletlist() {
				const res = await this.$http.get('roles');
				//console.log(res);
				this.rolelist = res.data.data
			}
		}
	}
</script>

<style>
	.addrolebtn {
		margin-top: 20px;

	}
</style>
