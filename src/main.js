// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import MyServerHttp from '../src/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/css/reset.css';
import router from './router'
import moment from 'moment';

Vue.use(ElementUI);
Vue.use(MyServerHttp);

Vue.config.productionTip = false

//全局过滤器 ----- 处理日期
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
