<template>
    <div id="detail">
        <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" ref="scroll" :probe-type="3"   @scroll="contentScroll">
            <DetailSwiper :top-images="topImages"/>
            <DetailBaseInfo :goods="goods"/>
            <DetailShopInfo :shop="shop"/>
            <DetailGoodsInfo :detail-info="detailInfo" @imageload="imageload"/>
            <DetailParamInfo ref="params" :paramInfo="paramInfo"/>
            <DetailCommentInfo ref="comment" :commentInfo="commentInfo"/>
            <GoodsList ref="recommend" :goods="recommends"/>
        </scroll>
        <DetailBottomBar @addCart="addToCart"/>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <!--<Toast :message="message" :show="show"/>-->
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import Scroll from "components/common/scroll/Scroll";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import GoodsList from "components/content/goods/GoodsList";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import {mapActions} from 'vuex'
    import {itemLisenerMixin,backTopMixin} from "common/mixin";
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail';

    // import Toast from "components/common/toast/Toast";
    export default {
        name: "Detail",
        data(){
            return{
                iid:null,
                topImages:[],
                goods: {},//商品基本信息
                shop:{},
                detailInfo:{},
                paramInfo:{},
                commentInfo:{},//评论
                recommends:[],
                themeTopYs:[],
                currentIndex:0,
                // message:'',
                // show:false
            }
        },
        methods:{
            ...mapActions(['addCart']),
            imageload(){
                //等所有图片加载完毕重新刷新scroll高度避免滑不下去
                this.$refs.scroll.refresh()
                //每次都将数组清空避免一直往位置坐标数组里重复注入数据
                this.themeTopYs=[]
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            },
            titleClick(index){
                this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
            },
            contentScroll(position){
                let length = this.themeTopYs.length
                const positionY= -position.y
            //以下是做滚到相应坐标后导航栏自动变化为对应的导航
                for(let i=0;i<length-1;i++){
                    if(this.currentIndex!==i&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]){
                        this.currentIndex = i
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }
                if(positionY>=this.themeTopYs[this.themeTopYs.length-1]){
                    this.currentIndex = this.themeTopYs.length-1
                    this.$refs.nav.currentIndex = this.currentIndex
                }

            //返回顶部按钮的显示
                this.isShowBackTop = (-position.y)>1000

            },
            addToCart(){
                //获取购物车需要展示的信息
                const product={}
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.realPrice
                product.iid = this.iid


                //将商品通过vuex加入购物车组件
                // this.$store.dispatch('addCart',product).then(res=>{
                //     console.log(res)
                // })

                //使用mapActions调用vuex的actions
                this.addCart(product).then(res=>{
                    // this.show = true
                    // this.message = res
                    // setTimeout(()=>{
                    //     this.show = false
                    //     this.message = ''
                    // },1500)

                    //封装Toast弹窗
                    this.$toast.show(res,1500)
                })
            }
        },
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar,
        },
        created() {
            //<keep-alive>会导致不会再次执行created
            //得在keepalive中设置排除Detail组件
            // <keep-alive exclude="Detail">
            //请求商品ID
            this.iid=this.$route.params.iid
            //根据iid请求详情数据
            getDetail(this.iid).then(res=>{
                //将数据封装为data
                const data = res.result;
                //获取顶部图片轮播数据
                this.topImages = data.itemInfo.topImages;
                //获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
                //获取店铺信息
                this.shop =new Shop(data.shopInfo)
                //保存详情数据
                this.detailInfo = data.detailInfo
                //商品参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
                //评论信息
                if(data.rate.cRate!==0){
                    this.commentInfo = data.rate.list[0]
                }
            })
            //请求推荐数据
            getRecommend().then(res=>{
                this.recommends = res.data.list
            })
        },
        mixins:[itemLisenerMixin,backTopMixin],
        mounted(){
            //通过mixin混入
        },
        destroyed() {
            this.$bus.$off('itemImgLoad',this.itemImgListener)
        }
    }
</script>

<style scoped>
    #detail{
        position: relative;
        /*top: 0;*/
        z-index: 12;
        background-color: #fff;
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        z-index: 11;
        background-color: #fff;
    }
    .content{
        /*position: absolute;*/
        /*margin-top: 44px;*/
        /*top: 44px;*/
        height: calc(100% - 48px - 49px)
    }

</style>