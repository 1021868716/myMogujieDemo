//home.js是Home组件专用的发送网络请求的api文件
import {request} from './request'

export function getHomeMultidata(){
    return request({
        url:"/home/multidata"
    })
}

export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}