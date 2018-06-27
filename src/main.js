import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'

import auth from '@/auth'
Vue.use(auth)

require('./assets/sass/main.scss')
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
