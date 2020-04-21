<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl1"
                     class="tab-control"
                     v-show="isTapFixed"/>
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <HomeSwiper :banners='banners' @swiperImageLoad="swiperImageLoad"/>
            <RecommendView :recommends="recommends"/>
            <FeatureView/>
            <tab-control :titles="['流行','新款','精选']"
                         @tabClick="tabClick"
                          ref="tabControl2"/>
            <goods-list :goods="showGoods"/>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import NavBar from "components/common/navbar/navbar.vue";
    import tabControl from "components/content/tabControl/tabControl";
    import GoodsList from "components/content/goods/GoodsList";
    import Scroll from "components/common/scroll/Scroll";


    import {getHomeMultidata,getHomeGoods} from "network/home";
    import {itemLisenerMixin,backTopMixin} from "common/mixin";

    export default {
        name: "Home",
        components: {
            Scroll,
            HomeSwiper,
            RecommendView,
            FeatureView,
            NavBar,
            tabControl,
            GoodsList
        },
        data(){
            return{
                banners:[],
                recommends:[],
                goods:{
                    'pop':{page:0,list:[]},
                    'new':{page:0,list:[]},
                    'sell':{page:0,list:[]},
                },
                currentType:'pop',
                taboffsetTop:0,
                isTapFixed: false,
                saveY: 0
            }
        },
        methods:{
            /*以下是网络请求方法*/
            //自己定义重名的函数内部调用导入的函数
            getHomeMultidata(){
                getHomeMultidata().then(res =>{
                    //生命周期函数，创建完之后立马发送网络请求
                    //并将服务器返回来的数据保存起来防止拿到的res被垃圾回收
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })},
            getHomeGoods(type){
                const page = this.goods[type].page + 1;
                getHomeGoods(type,page).then(res=>{
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page+=1;
                    //完成上拉加载更多
                    this.$refs.scroll.finishPullUp()
                })
            },
            /*以下是事件监听方法*/
            tabClick(index){
                switch(index){
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break;
                }
                //currentIndex控制被点击的导航按钮变红
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
                },
            contentScroll(position){
                //通过自定义事件获取子组件发送的当前位置
                this.isShowBackTop = (-position.y)>1000
                this.isTapFixed = (-position.y)>this.taboffsetTop
            },
            loadMore(){
                //加载下一页
                this.getHomeGoods(this.currentType)
            },
            swiperImageLoad(){
                //吸顶效果：通过$el获取tabControl组件挂载的元素并获取offsetTop
                //必须等轮播图图片加载完再计算否则轮播图高度不会计算进去导致吸顶失效
                this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
            }
        },
        computed:{
            showGoods(){
                return this.goods[this.currentType].list
            }
        },
        created(){
            //created写主要逻辑，具体方法放入methods处理
            //使用重名函数要加this不然会使用成导入的函数
            this.getHomeMultidata(),
            this.getHomeGoods('pop'),
            this.getHomeGoods('new'),
            this.getHomeGoods('sell')
        },
        mixins:[itemLisenerMixin,backTopMixin],
        mounted() {
            //mixins混入
        },
        activated() {
            //进入生命周期函数
            this.$refs.scroll.scrollTo(0,this.saveY,1)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            //离开生命周期函数
            //1.保存状态
            this.saveY = this.$refs.scroll.getScrollY()
            //2.取消监听全局事件
            this.$bus.$off('itemImgLoad',this.itemImgListener)
        }
    }
</script>

<style scoped>
    /*scoprd是作用域，style只会应用这个组件*/
    #home{
        height: 100vh;
        position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: white;
        /*使用batter-scroll框架实现需要滚动的地方局部滚动*/
        /*所以顶部导航栏无需脱标*/
        /*position: fixed;*/
        /*left: 0;*/
        /*right: 0;*/
        /*top: 0;*/
        /*z-index: 9;*/
    }
    .tab-control{
        position: relative;
        z-index: 9;
    }
    .content{
        overflow: hidden;
        position: absolute;
        bottom: 49px;
        top: 44px;
        left: 0;
        right: 0;
    }
</style>