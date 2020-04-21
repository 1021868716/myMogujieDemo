import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
//安装vuex插件
Vue.use(Vuex)
//创建store对象
const state = {
    cartList:[]//购物车商品数组
}
const store= new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

//导出store对象并挂载到Vue实例上
export default store