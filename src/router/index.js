import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/rights/rights.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			name: 'login',
			path: '/',
			component: Login
		},
		{
			name: 'home',
			path: '/home',
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
			}]
		}
	]
})
