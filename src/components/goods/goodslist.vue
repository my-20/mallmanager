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
				<el-input placeholder="请输入内容" v-model="query" clearable @clear="loadCommodityList()" class="inputSearch">
					<el-button slot="append" icon="el-icon-search" @click="searchCommodity()"></el-button>
				</el-input>
				<el-button type="primary" @click="showAddUserDia()">添加商品</el-button>
			</el-col>
		</el-row>

		<!-- 表格 -->
		<el-table :data="commoditylist" style="width: 100%">

			<el-table-column type="index" label="#" width="60">
			</el-table-column>

			<el-table-column prop="goods_name" label="商品名称">
			</el-table-column>

			<el-table-column prop="goods_number" label="商品数量">
			</el-table-column>

			<el-table-column prop="goods_price" label="商品价格(元)">
			</el-table-column>

			<el-table-column prop="goods_weight" label="商品重量">
			</el-table-column>

			<el-table-column prop="upd_time" label="创建时间">
				<template slot-scope='commoditylist'>
					{{commoditylist.row.upd_time | fmtdate}}
				</template>
			</el-table-column>

			<el-table-column prop="" label="操作">
				<template slot-scope='scope'>
					<el-row>
						<el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click='showEditCompileDia(scope.row)'></el-button>
						<el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showDeleUserMsgBox(scope.row.id)"></el-button>

					</el-row>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
		 :page-sizes="[4,10,20,30]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>

		<!-- 弹出编辑商品列表对话框 -->
		<el-dialog title="编辑商品" :visible.sync="commodityCompile">
			<el-form :model="form">
				<el-form-item label="商品名称" :label-width="formLabelWidth">
					<el-input  v-model="form.goods_name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="商品价格(元)" :label-width="formLabelWidth">
					<el-input v-model="form.goods_price" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="商品数量" :label-width="formLabelWidth">
					<el-input v-model="form.goods_number" autocomplete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="商品重量" :label-width="formLabelWidth">
					<el-input v-model="form.goods_weight" autocomplete="off"></el-input>
				</el-form-item>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="commodityCompile = false">取 消</el-button>
				<el-button type="primary" @click="editCompile()">确 定</el-button>
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
				pagesize: 4,
				total: -1,
				//弹出编辑商品列表对话框
				commodityCompile: false,
				//商品表单数据
				form: {

				},
				formLabelWidth: '100px',
				commoditylist: [{}]
			}
		},
		created() {
			this.commodityList();
		},
		methods: {
			//编辑商品->发送请求
			async editCompile() {
				const res = await this.$http.put('goods/' + this.form.goods_id + '}', this.form);
				console.log(res);
				//关闭对哈框
				this.commodityCompile = false;
				if (res.data.meta.status === 200) {
					//更新视图
					this.commodityList()
					//提示
					this.$message.success(res.data.meta.msg);
				} else {
					this.$message.error(res.data.meta.msg);
				}
			},
			//编辑商品
			showEditCompileDia(compile) {
				this.form = compile;
				this.commodityCompile = true;
			},
			//搜索
			searchCommodity() {
				this.commodityList();
			},
			//清空搜索框 重新获取数据
			loadCommodityList() {
				this.commodityList();

			},
			//分页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.pagesize = val;
				this.pagenum = 1;
				this.commodityList();
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.pagenum = val;
				this.commodityList();
			},
			async commodityList() {
				const res = await this.$http.get('goods?query=' + this.query + '&pagenum=' + this.pagenum + '&pagesize=' + this.pagesize);
				console.log(res);
				this.commoditylist = JSON.parse(JSON.stringify(res.data.data.goods));
				//console.log(this.commoditylist);
				this.total = res.data.data.total;

			}
		}
	}
</script>

<style>
	.inputSearch {
		width: 300px;
	}
</style>
