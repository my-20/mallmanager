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
				<el-input placeholder="请输入内容" v-model="query" class="inputSearch">
					<el-button slot="append" icon="el-icon-search"></el-button>
				</el-input>
				<el-button type="primary">添加用户</el-button>
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
					<el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">

					</el-switch>
				</template>
			</el-table-column>


			<el-table-column prop="" label="操作">
				<template>
					<el-row>
						<el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
						<el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
						<el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination @size-change="handleSizeChange" 
		@current-change="handleCurrentChange" 
		:current-page="pagenum"
		 :page-sizes="[2,4,6,8]" 
		 :page-size="2" 
		 layout="total, sizes, prev, pager, next, jumper" 
		 :total="total">
		</el-pagination>
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
				userlist: [{
					id: 25,
					username: "tige117",
					mobile: "18616358651",
					type: 1,
					email: "tige112@163.com",
					create_time: "2017-11-09T20:36:26.000Z",
					mg_state: true, // 当前用户的状态
					role_name: "炒鸡管理员"
				}]
			}
		},
		created() {
			this.getUserList()
		},
		methods: {
			//分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pagesize=val;
				this.pagenum=1;
				this.getUserList();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.pagenum=val;
				this.getUserList()
			},
			async getUserList() {
				//请求数据需要授权的API，必须在请求头中使用Authorization 字段提供 token令牌
				const AUTH_TOKEN = localStorage.getItem('token')
				this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
				const res = await this.$http.get('users?query=' + this.query + '&pagenum=' + this.pagenum + '&pagesize=' + this.pagesize)
				console.log(res)
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
					this.$message.success(msg)

				} else {
					this.$message.warning(msg)
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
