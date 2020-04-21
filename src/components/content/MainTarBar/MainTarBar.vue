<template>
    <TabBar>
        <tab-bar-item path="/home" activeColor="pink">
            <img slot="item-icon" src="~assets/img/tabbar/home.svg"/>
            <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg"/>
            <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/shopcart" activeColor="pink">
            <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg"/>
            <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg"/>
            <div slot="item-text">购物车</div>
        </tab-bar-item>
    </TabBar>
</template>

<script>
    import TabBar from "../../common/tabbar/TabBar";
    import TabBarItem from "../../common/tabbar/TabBarItem";
    export default {
        name: "MainTarBar",
        components:{
            TabBar,
            TabBarItem
        }
    }
</script>

<style scoped>

</style>