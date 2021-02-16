<template>
<el-container class="container">
    <el-header class="header">
        <el-row>

            <el-col :span="22" class="middle">
                <h2>电商管理系统</h2>
            </el-col>
            <el-col :span="2">
                <a href="#" class="loginout">退出</a>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <el-aside class="aside" width="200px">
            <el-menu :unique-opened="true">
                <!-- 导航一 -->
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>用户列表</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 导航二 -->
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>角色列表</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>权限列表</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 导航三 -->
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>商品列表</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>分类参数</span>
                    </el-menu-item>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>商品分类</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 导航四 -->
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>订单列表</span>
                    </el-menu-item>
                </el-submenu>
                <!-- 导航五 -->
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>
                    </template>
                    <el-menu-item index="1-1">
                        <i class="el-icon-menu"></i>
                        <span>数据报表</span>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="main">Main</el-main>
    </el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style>
/* 主页面整体 */
.container {
    height: 100%;
}

/* 主页面头部 */
.header {
    background-color: #b3c0d1;
}

/* 主页面侧边 */
.aside {
    background-color: #d3dce6;
}

/* 主页面主体内容 */
.main {
    background-color: #e9eef3;
}

/* 主页面头部文字 */
.middle {
    text-align: center;
}

/* 主页面头部退出标签 */
.loginout {
    line-height: 60px;
    text-decoration: none;
}
</style>
