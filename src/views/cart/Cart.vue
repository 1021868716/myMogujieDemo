<template>
    <!--顶部导航-->
    <div class="cart">
        <NavBar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </NavBar>
        <!--商品列表-->
        <CartList/>
        <!--底部汇总-->
        <CartBottomBar/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbar/navbar";
    import CartList from "./childComps/CartList";
    import CartBottomBar from "./childComps/CartBottomBar";
    import {mapGetters} from 'vuex'
    export default {
        name: "Cart",
        computed:{
            //...mapGetters(['cartLength','cartList'])
            ...mapGetters({
                length:'cartLength',
                list:'cartList'
            })
        },
        components:{
            NavBar,
            CartList,
            CartBottomBar
        }
    }
</script>

<style scoped>
.cart{
    height: 100vh;
}
.nav-bar{
    background-color: var(--color-tint);
    color: white;
}
</style>