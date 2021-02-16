<template>
<div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button @click.prevent="handleLogin()" type="primary" class="login-btn">登录</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            formdata: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        //登录请求
        // handleLogin(){
        //     this.$http.post('login',this.formdata).then(res => {
        //         const{
        //             data,
        //             meta:{msg,status}
        //         } = res.data

        //         if(status === 200){
        //             //跳转home页面
        //             this.$router.push({name:'home'})
        //             //提示成功
        //             this.$message.success(msg)
        //         }else{
        //             //提示失败
        //             this.$message.warning(msg)
        //         }
        //     })
        // }

        //使用ES7 async+await
        //希望让异步操作代码，看起来像同步代码
        async handleLogin() {
            const res = await this.$http.post('login', this.formdata)
            const {
                data,
                meta: { msg, status }
            } = res.data

            if (status === 200) {
                //跳转home页面
                this.$router.push({ name: 'home' })
                //提示成功
                this.$message.success(msg)
            } else {
                //提示失败
                this.$message.warning(msg)
            }

        }
    }
}
</script>

<style>
.login-wrap {
    height: 100%;
    background-color: #324152;
    /* 弹性盒布局 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-wrap .login-form {
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
}

.login-wrap .login-btn {
    width: 100%;
}
</style>
