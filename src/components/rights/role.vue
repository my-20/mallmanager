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
		
		<!-- 修改权限对话框 -->
		<el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
		  <!-- 
		  树形结构 
		  data->数据源[]
		  show-checkbox ->选择框
		  node-key每个节点的唯一标识 通常时data数据源中key名id
		  default-expanded-keys 默认展开「要展开的节点的id]
		  default-checked-keys[要选择的节点的id]
		  props配置项{label, children}
		  label节点的文字标题和children节点的子节点
		  值都来源于data绑定的数据源中的该数据的key名'label'和'children'
		  -->
		  <!-- defaultProps里的值应该去外层treelist中去找 -->
		   <el-tree
		     :data="treelist"
		     show-checkbox
		     node-key="id"
			 default-expand-all
		     :props="defaultProps">
		   </el-tree>
		   
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisibleRight = false">确 定</el-button>
		  </div>
		</el-dialog>
	</el-card>

</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisibleRight:false,
				rolelist: [],
				//树形结构的数据
				treelist:[],
				arrexpend:[],
				//defaultProps里的值应该去外层treelist中去找
				defaultProps:{
					label:'authName',
					children:'children'
				}
			}
		},
		created() {
			this.getRoletlist();
		},
		methods: {
			//修改/分配 权限 -打开对话框
			async showSetUserRoleDia(role){
				//获取树形结构的权限数据
				const res = await this.$http.get('rights/tree')
				console.log(res)
				this.treelist=res.data.data;
				this.dialogFormVisibleRight=true;
				//展开全部树状图
				// var arrtemp1=[];
				// this.treelist.forEach(item1=>{
				// 	arrtemp1.push(item1.id)
				// 	item1.children.forEach(item2=>{
				// 		arrtemp1.push(item2.id)
				// 		item2.children.forEach(item3=>{
				// 			arrtemp1.push(item3.id)
				// 		})
				// 	})
				// });
				// this.arrexpend=arrtemp1;
			},
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
