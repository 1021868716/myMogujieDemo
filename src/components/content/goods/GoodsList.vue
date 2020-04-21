<template>
    <div class="goods">
        <GoodsListItem v-for="item in goods" :goods-item="item"/>
    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
        props:{
            goods:{
                type:Array,
                default(){
                    return []
                }}
        },
        components:{
            GoodsListItem
        }
    }
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2px;
    }

</style>