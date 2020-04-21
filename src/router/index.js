import Vue from "vue";
import VueRouter from "vue-router";

//懒加载
const Home = ()=> import('views/home/Home');
const Cart = ()=> import('views/cart/Cart');
const Detail = ()=> import('views/detail/Detail')

Vue.use(VueRouter)

const routes=[
    {
        path:'',
        redirect:'/home'
    },{
        path:'/home',
        component: Home
    },{
        path:'/shopcart',
        component: Cart
    },{
    //动态路由
        path:'/detail/:iid',
        component:Detail
    }
]

const router =new VueRouter({
    routes
   // mode:'history'
})

export default router