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
            <el-aside class="aside" width="200px">Aside</el-aside>
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
.container{
    height: 100%;
}

/* 主页面头部 */
.header{
    background-color: #b3c0d1;
}

/* 主页面侧边 */
.aside{
    background-color: #d3dce6;
}

/* 主页面主体内容 */
.main{
    background-color: #e9eef3;
}

/* 主页面头部文字 */
.middle{
    text-align: center;
}

/* 主页面头部退出标签 */
.loginout{
    line-height: 60px;
    text-decoration: none;
}
</style>