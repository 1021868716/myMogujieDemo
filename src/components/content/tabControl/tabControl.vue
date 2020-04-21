<template>
    <div class="tab-control">
        <div v-for="(item,index) in titles"
             class="tab-control-item"
             :class="{active: index === currentIndex}"
             @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tabControl",
        props:{
            titles:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return{
                currentIndex:0
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex= index;
                //向父组件传递点击信息，发射自定义事件
                this.$emit('tabClick',index);
            }
        }
    }
</script>

<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        padding: 5px;
        border-bottom: 3px solid var(--color-high-text);
    }

</style>