import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/rights/rights.vue'
import Role from '../components/rights/role.vue'
import { Message } from 'element-ui';

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes: [{
			name: 'login',
			path: '/login',
			component: Login
		},
		{
			name: 'home',
			path: '/',
			component: Home,
			children: [{
				name: 'users',
				path: 'users',
				component: Users
			},
			{
				name: 'rights',
				path: 'rights',
				component: Rights
			},{
			
				name: 'roles',
				path: 'roles',
				component: Role
			}]
		}
	]
});


// 在路由配置生效之前统一判断token
// 路由守卫在路由配置生效之前
// 路由/导航守卫
router.beforeEach((to,from,next)=>{
	// console.log('到');
	// console.log(to);
	// console.log('来自');
	// console.log(from);
	//如果是登录，直接next放行
	if(to.path==='/login'){
		next();
	}else{
		//如果不是登录
		//判断token
		const token =localStorage.getItem('token');
		if(!token){
			//如果token没有->转跳login
			//this.$router.push({name:'login'});
			router.push({
				name:'login'
			});
			//提示
			Message.error('请先登录');
		}else{
			//如果有token->next放行
			next();
		}
	}
	
})

export default router;