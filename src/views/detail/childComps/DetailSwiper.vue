<template>
<!--    <div class="detail-swiper">-->
<!--        <swiper class="swiper-item">-->
<!--            <swiper-item v-for="item in topImages">-->
<!--                <img :src="item" alt="">-->
<!--            </swiper-item>-->
<!--        </swiper>-->
<!--    </div>-->
    <swiper class="detail-swiper">
        <swiper-item class="swiper-item" v-for="item in topImages">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>


<script>
    import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
    export default {
        name: "DetailSwiper",
        components: {
            Swiper,
            SwiperItem
        },
        props:{
            topImages: {
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .swiper-item{
        height: 300px;
        overflow: hidden;
    }
    .detail-swiper{
        height: 300px;
        overflow: hidden;
    }
</style>