import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api/axios'
import qs from 'qs'
import api from './api/api'
import Antd from 'ant-design-vue'

import('@/assets/style/normalize.css')
import('@/assets/style/common.less')

Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$api = api
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
