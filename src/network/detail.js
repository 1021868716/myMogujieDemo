import {request} from "./request";

export function getDetail(iid) {
    return request({
        url:'/detail',
        params:{
            //axios框架parmas属性是拼接参数到url上
            iid
        }
    })
}

export class Goods{
    //封装一个GoodsInfo类整合数据
    //es6的class定义一个类并导出
    constructor(itemInfo, columns, services) {
        //constructor是类的构造函数
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop {
    //将商家类数据整合为Shop对象
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}
export function getRecommend() {
    return request({
        url:'/recommend'
    })
}
export class GoodsParam {
    constructor(info, rule) {
        // 注: images可能没有值(某些商品有值, 某些没有值)
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}