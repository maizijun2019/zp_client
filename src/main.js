import Vue from 'vue'
import App from './App'
import router from './router'
import store  from './store/index.js'
import gongCan from '../static/js/gongcan.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


Vue.config.productionTip = false
import '../static/css/conf.css'
import '../static/css/bian.css'
import '../static/js/conf.js'
 

import axios from 'axios'


// axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;




import Com from '../static/js/api.js' 
Vue.prototype.Com = Com;
Vue.prototype.gongCan = gongCan;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, 
  router,
  components: { App },
  template: '<App/>'
})