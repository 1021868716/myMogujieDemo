// 将方法名定义为常量，方便以后修改
// 以后如果对方法名就行修改，只需要修改这个文件里给常量赋值的方法名
// 其他文件的方法名永远为这个常量的值，无需修改
// 而且可以防止有大量调用方法时写错方法名
export const ADD_COUNTER = 'add_counter'
export const ADD_TO_CART =  'add_to_cart'