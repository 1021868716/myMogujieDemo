<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data() {
            return{
                scroll:null
            }
        },
        methods: {
            scrollTo(x,y,time){
                //我们将原生的scrollTo方法封装一下
                this.scroll && this.scroll.scrollTo(x,y,time)
            },
            refresh(){
                this.scroll && this.scroll.refresh();
            },
            finishPullUp(){
                this.scroll.finishPullUp()
            },
            getScrollY(){
                //保存切换路由时的y值状态方便切回
                return this.scroll?this.scroll.y:0
            }
        },
        props:{
            probeType:{
                type:Number,
                default: 0
            },
            pullUpLoad:{
                type:Boolean,
                default: false
            }
        },
        mounted() {
            //创建BScroll实例对象并绑定到组件属性scroll上
            //只有mounted阶段才能拿到dom元素，之前阶段全部拿不到
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,//允许滚动内容可以发生点击事件
                probeType: this.probeType, //允许实时监听
                pullUpLoad: this.pullUpLoad //允许上拉刷新
            })

            //监听滚动位置并将位置发送出去
            this.scroll.on('scroll',(position)=>{
                this.$emit('scroll',position)
            })
            //上拉加载更多
             this.scroll.on('pullingUp',()=>{
                 //监听到滚动到底部并发送pullingUp事件请求上拉刷新
                 this.$emit('pullingUp')
             })
        }
    }
</script>

<style scoped>

</style>