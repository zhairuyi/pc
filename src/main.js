import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import router from '@/router'
import axios from '@/api'
import Plugs from '@/components'
Vue.prototype.$http = axios
Vue.use(Plugs)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
