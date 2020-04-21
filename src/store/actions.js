import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-types";

export default {
    addCart(context,payload){
        return new Promise((resolve,reject)=>{
            //context是store数组对象，payload是传入的单个商品对象
            //加入购物车功能
            //判断之前购物车内是否有该商品
            //find方法返回数组中满足回调函数的第一个元素的值，否则返回undefined。
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //回调后oldProduct值为数组中原有的商品对象或undefined
            if(oldProduct){
                //如果该商品存在，数量+1
                context.commit(ADD_COUNTER,oldProduct)
                resolve('当前商品数量+1')
            }else{
                //如果商品不存在（undefined），初始化商品数量为1并加入购物车商品数组
                payload.count = 1
                context.commit(ADD_TO_CART,payload)
                resolve('添加购物车')
            }
        })

    }
}