<template>
    <div class="bottom-bar ignore">
        <div class="check-content">
            <check-button
                    :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="price">
            合计：{{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去付钱({{checkLength}})
        </div>
    </div>
</template>

<script>
    import checkButton from "components/content/checkButton/checkButton";
    import { mapGetters } from 'vuex'
    export default {
        name: "CartBottomBar",
        components:{
            checkButton
        },
        computed:{
            ...mapGetters(['cartList']),
            totalPrice(){
                return '￥' + this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue,item)=>{
                    return preValue + item.price * item.count
                },0)
            },
            checkLength(){
                return this.cartList.filter(item =>item.checked).length
            },
            isSelectAll(){
                if(this.cartList.length === 0) {return false}
                //0取反为true，非0取反为false
                //return !(this.cartList.filter( => !item.checked).length)
                //undefined取反为true
                return !(this.cartList.find(item => !item.checked))
            }
        },
        methods:{
            checkClick(){
                if(this.isSelectAll){//全部选中时点击变全不选
                    this.cartList.forEach(item=>item.checked = false)
                }else {//部分选中或无选中时点击变全选
                    this.cartList.forEach(item=>item.checked = true)
                }
            },
            calcClick(){
                if(!this.isSelectAll){
                    this.$toast.show('请选择购买的商品',2000)
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-bar{
        position: relative;
        display: flex;
        height: 40px;
        background-color: #eee;
        line-height: 40px;
    }
    .check-content{
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 60px;

    }
    .check-button{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .price{
        margin-left: 20px;
        flex: 1;

    }
    .calculate{
        /*padding-left: 2px;*/
        text-align: center;
        width: 90px;
        background-color: red;
        color: #fff;

    }
</style>