<template>
	<el-card class="box-card">
		<!-- 面包屑 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 搜索框 -->
		<el-row class="searchRow">
			<el-col>
				<!-- clearable为清除键 -->
				<el-input placeholder="请输入内容" v-model="query" clearable @clear="loadUserList()" class="inputSearch">
					<el-button slot="append" icon="el-icon-search" @click="searchUsers()"></el-button>
				</el-input>
				<el-button type="primary" @click="showAddUserDia()">添加用户</el-button>
			</el-col>
		</el-row>

		<!-- 表格 -->
		<el-table :data="userlist" style="width: 100%">
			<el-table-column type="index" label="#" width="60">
			</el-table-column>
			<el-table-column prop="username" label="姓名" width="100">
			</el-table-column>
			<el-table-column prop="email" label="邮箱">
			</el-table-column>
			</el-table-column>
			<el-table-column prop="mobile" label="电话">
			</el-table-column>
			</el-table-column>



			<el-table-column prop="create_time" label="创建时间">
				<!--如果单元格内显示的内容不是字符串(文本)，需要给被显示的内容外层包裹一个template -->
				<!-- tempLate内部要用数据设置sLot-scope属性,该属性的值是要用数据create_time的数据源userList-->
				<!-- slot-scope的值userlist其实就是el-table绑定的数据userlistuserlist.row->数组中的每个对象 -->
				<!-- sLot-scope 作用:传值
					sLot-scope的值会自动去上一级找最外层标签el-table所绑定的数据userlistsLot-scope="scope”此时"scope "==userlist数组
					scope.row是数组的每个对象
					scope.row.create_time我们要用的数据-->
				<template slot-scope='userlist'>
					{{userlist.row.create_time | fmtdate}}
				</template>
			</el-table-column>



			</el-table-column>
			<el-table-column prop="mg_state" label="用户状态">
				<!-- 由于el-table-column和template是不同的组件数据的作用域不同需要用在 template中需要用slot-scope来接收el-table-column的数据-->
				<template slot-scope='scope'>
					<!-- 用scope.row使用接收的数据 -->
					<el-switch @change="changeMgState(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">

					</el-switch>
				</template>
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
		<!-- 分页 -->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
		 :page-sizes="[2,4,6,8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
		<!-- 弹出添加用户对话框 -->
		<el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
			<el-form :model="form">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input v-model="form.username" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="密 码" :label-width="formLabelWidth">
					<el-input v-model="form.password" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="邮 箱" :label-width="formLabelWidth">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="电 话" :label-width="formLabelWidth">
					<el-input v-model="form.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
				<el-button type="primary" @click="addUser()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 弹出编辑用户对话框 -->
		<el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
			<el-form :model="form">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					<el-input disabled v-model="form.username" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="邮 箱" :label-width="formLabelWidth">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="电 话" :label-width="formLabelWidth">
					<el-input v-model="form.mobile" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
				<el-button type="primary" @click="editUser()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 弹出编辑用户权限对话框 -->
		<el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
			<el-form :model="form">
				<el-form-item label="用户名" :label-width="formLabelWidth">
					{{currUsername}}
				</el-form-item>


				<el-form-item label="角色权限" :label-width="formLabelWidth">
					<!-- 如果seLect的绑定的数据的值和 option的value一样,就会显示该option的Label值 -->
					<el-select v-model="currRoleId">
						<el-option label="请选择" :value="-1"></el-option>
						<el-option :label="item.roleName" :value="item.id" v-for="(item,i) in roles" :key='i'></el-option>
					</el-select>
				</el-form-item>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleRol = false">取 消</el-button>
				<el-button type="primary" @click="setRole()">确 定</el-button>
			</div>
		</el-dialog>

	</el-card>

</template>

<script>
	export default {
		data() {
			return {
				query: '',
				pagenum: 1,
				pagesize: 2,
				total: -1,
				//分配角色
				currRoleId: -1,
				currUsername:'',
				currUserId:-1,
				dialogFormVisibleAdd: false,
				dialogFormVisibleEdit: false,
				dialogFormVisibleRol: false,
				//添加用户表单数据
				form: {
					username: '',
					password: '',
					email: '',
					mobile: ''
				},
				formLabelWidth: '100px',
				userlist: [{}],
				roles:[]
			}
		},
		created() {
			this.getUserList()
		},
		methods: {
			//分配角色->发送请求
			async setRole(){
				const res =await this.$http.put('users/'+this.currUserId+'/role',{rid:this.currRoleId});
				this.dialogFormVisibleRol=false;
				// console.log(res)
			},
			//分配角色
			async showSetUserRoleDia(user) {
				this.currUsername=user.username;
				this.currUserId=user.id;
				//获取所有的角色权限
				const res1 =await this.$http.get('roles');
				this.roles=res1.data.data;
				// console.log(res1)
				
				//获取用户自己的权限id->rid
				const res =await this.$http.get('users/'+user.id);
				//console.log(res)
				this.currRoleId=res.data.data.rid;
				this.dialogFormVisibleRol = true;
			},
			//修改状态
			async changeMgState(user) {
				//发送请求
				const res = await this.$http.put('users/' + user.id + '/state/' + user.mg_state)
				//console.log(res);
				if (res.data.meta.status === 200) {
					//提示
					this.$message.success(res.data.meta.msg);
				} else {
					this.$message.error(res.data.meta.msg);
				}
			},
			//编辑用户 --发送请求
			async editUser() {
				const res = await this.$http.put('users/' + this.form.id + '}', this.form);
				//console.log(res);
				//2.关闭对哈框
				this.dialogFormVisibleEdit = false;
				if (res.data.meta.status === 200) {
					//更新视图
					this.getUserList()
					//提示
					this.$message.success(res.data.meta.msg);
				} else {
					this.$message.error(res.data.meta.msg);
				}
			},
			//编辑用户
			showEditUserDia(user) {
				//获取用户数据赋值给编辑用户表单
				//this.form.username=user.username;
				//this.form.email=user.email;
				//this.form.mobile=user.mobile;
				this.form = user;
				this.dialogFormVisibleEdit = true;

			},
			//删除用户
			showDeleUserMsgBox(userId) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'error'
				}).then(async () => {
					//发送删除的请求 :id
					//把userId以showDelUserMsgBox参数形式传进来
					const res = await this.$http.delete('users/' + userId + '}');
					//console.log(res);
					if (res.data.meta.status === 200) {
						//回到第一页
						this.pagenum = 1
						//更新视图
						this.getUserList()
						//提示
						this.$message({
							type: 'success',
							message: res.data.meta.msg
						});
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//添加用户
			showAddUserDia() {
				//清空表单
				this.form = {};
				this.dialogFormVisibleAdd = true;
			},
			//添加用户 -发送请求
			async addUser() {
				const res = await this.$http.post('users', this.form);
				//console.log(res);
				//2.关闭对哈框
				this.dialogFormVisibleAdd = false;
				const {
					meta: {
						status,
						msg
					},
					data
				} = res.data;
				if (status === 201) {
					//1.提示成功
					this.$message.success(msg);
					//3.更新视图
					this.getUserList();
					//4.清空文本框
					this.form = {};

				} else {

					this.$message.error(msg);
				}
			},
			//清空搜索框 重新获取数据
			loadUserList() {
				this.getUserList()
			},
			//搜索用户
			searchUsers() {

				//因为搜索框绑定了query，这里调用getUserList就行
				this.getUserList()
			},
			//分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pagesize = val;
				this.pagenum = 1;
				this.getUserList();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.pagenum = val;
				this.getUserList()
			},
			async getUserList() {
				//请求数据需要授权的API，必须在请求头中使用Authorization 字段提供 token令牌
				// const AUTH_TOKEN = localStorage.getItem('token')
				// this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
				const res = await this.$http.get('users?query=' + this.query + '&pagenum=' + this.pagenum + '&pagesize=' + this.pagesize)
				//console.log(res)
				const {
					meta: {
						status,
						msg
					},
					data: {
						users,
						total
					}
				} = res.data
				if (status === 200) {
					this.userlist = JSON.parse(JSON.stringify(users))
					this.total = total
					//this.$message.success(msg)

				} else {
					//this.$message.warning(msg)
				}
			}
		}
	}
</script>

<style>
	.box-card {
		height: 100%;
	}

	.inputSearch {
		width: 300px;
	}

	.searchRow {
		margin-top: 20px;
	}
</style>
