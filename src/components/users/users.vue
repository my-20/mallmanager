<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <!-- 首页>用户管理>用户列表 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索 -->
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success">添加按钮</el-button>
        </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
            <!-- 如果单元格内显示的内容不是字符串（文本）需要添加template -->
            <!-- 不同组件内的数据时不可以共享的 -->
            <template slot-scope="scope">
                {{scope.row.create_time | fmtdate}}
            </template>
        </el-table-column>
        <el-table-column label="用户状态">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>

        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <el-button size="small" plain type="primary" icon="el-icon-edit" circle></el-button>
                <el-button size="small" plain type="danger" icon="el-icon-delete" circle></el-button>
                <el-button size="small" plain type="success" icon="el-icon-check" circle></el-button>
                
            </template>
        </el-table-column>

    </el-table>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            pagenum: 1,
            pagesize: 2,
            //表格绑定的数据
            userlist: [],
            // 分页相关数据
            total: -1,
            pagenum: 1,
            pagesize: 2

        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        //获取用户信息列表的请求
        async getUserList() {
            //query 查询参数
            // pagenum 当前页码
            // pagesize 每页显示条数

            //需要授权的API 必须在请求头中使用Authorization 字段提供token令牌
            const AUTH_TOKEN = localStorage.getItem('token')
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

            const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res)
            const { meta: { status, msg }, data: { users, total } } = res.data
            if (status === 200) {
                // 给表格数据赋值
                this.userlist = users
                // 给total赋值
                this.total = total
                // 提示
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
    width: 500px;
}

.searchRow {
    margin-top: 20px;
}
</style>
