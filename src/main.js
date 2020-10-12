import Vue from 'vue'
import App from './App.vue'

//就是在store.state中添加一个当前route的对象
import { sync } from 'vuex-router-sync'

//自动监听项目运行环境的屏幕尺寸，然后给html设置一个font-size
//比如375px的手机屏幕，它会帮我们给html设置一个font-size:37.5px。
import 'amfe-flexible'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './permission'

Vue.config.productionTip = false

Vue.use(Vant)
sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//通过vue add router  和vue add vuex 去安装，不通过install
//会自动安装 "@vue/cli-plugin-router": "^4.5.6","@vue/cli-plugin-vuex": "^4.5.6",
