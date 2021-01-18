import axios from 'axios'

const MyHttpServer={}

MyHttpServer.install = (Vue) =>{
	
	axios.defaults.baseURL ='http://127.0.0.1:8888/api/private/v1/'
  // 添加实例方法
  Vue.prototype.$http = axios
};

//请求拦截
//所有的网络请求都会先走这个方法，我们可以在它里面为请求添加一些自定义的类容
axios.interceptors.request.use(
  function(config) {
    // console.group("触发全局请求拦截器");
    // console.log(config);
  if(config.url!=='login'){
	  const AUTH_TOKEN = localStorage.getItem('token')
	  config.headers['Authorization'] = AUTH_TOKEN
  }
    return config
  },
  function(err) {
    return Promise.reject(err);
  }
);

export default MyHttpServer