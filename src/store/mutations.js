import {
    ADD_COUNTER,
    ADD_TO_CART
} from "./mutation-types";
//用常量为方法命名，方便日后修改方法名
export default {
    [ADD_COUNTER](state,payload){
        payload.count++
    },
    [ADD_TO_CART](state,payload){
        payload.checked = true
        state.cartList.push(payload)
    }
}