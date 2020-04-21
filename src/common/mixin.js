import {debounce} from 'common/utils'
import BackTop from "components/content/backTop/BackTop";

export const itemLisenerMixin={
    data(){
        return{
            itemImgListener: null
        }
    },
    mounted(){
        //不能在created里做，mounted阶段才能拿到dom元素
        //监听item的时间总线中的itemImageLoad
        //通过防抖函数对refresh函数进行一层包装避免频繁调用
        const refresh = debounce(this.$refs.scroll.refresh,500)
        this.itemImgListener = ()=>{
            //未添加防抖函数：this.$refs.scroll.refresh()
            refresh()
        }
        this.$bus.$on('itemImgLoad',this.itemImgListener)
    }
}

//将返回顶部按钮代码抽取混入
export const backTopMixin={
    components:{
        BackTop
    },
    data(){
        return{
            isShowBackTop: false,
        }
    },
    methods:{
        backClick(){
            //通过ref属性拿到组件的的我们封装过的scrollTo方法
            this.$refs.scroll.scrollTo(0,0,500)
        }
    }
}