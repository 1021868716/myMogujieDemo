<template>
    <Swiper>
        <SwiperItem v-for="item in banners">
            <a href="javascript:">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </SwiperItem>
    </Swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "HomeSwiper",
        data(){
            return{
                isLoad: false
            }
        },
        props:{
            banners:{
                type: Array,
                default(){
                    return []
                }
            }
        },
        components:{
            Swiper,
            SwiperItem
        },
        methods:{
            imageLoad(){
                //只需要监听一次图片加载得到图片已经加载的信息即可
                if(!this.isLoad){
                    this.$emit('swiperImageLoad')
                    this.isLoad = true
                }
            }
        }
    }
</script>

<style scoped>

</style>