import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

//toast使我们自己封装的弹窗插件
import toast from 'components/common/toast'
Vue.config.productionTip = false

//我们自己封装的插件toast，use安装时默认会执行插件文件内的install函数
Vue.use(toast)
//解决移动端300延迟
FastClick.attach(document.body)
//图片懒加载插件vue-lazyload
Vue.use(VueLazyLoad,{
    loading: require('./assets/img/common/placeholder.png')//图片还没加载出来时显示的占位图
})

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
    router,
    store
}).$mount('#app')

window.onload=function(){
  this.alert('接口不稳定，如果出现卡顿刷新一下就好，记得打开浏览器移动端调试工具进行浏览哦')
}