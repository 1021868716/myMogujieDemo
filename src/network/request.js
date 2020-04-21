import axios from 'axios'

export function request(config) {
    //创建实例
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000/api/h8',
        timeout: 5000
    })
    instance.interceptors.request.use(
        config=>{
            //console.log(config);
            //拦截函数
            //比如config的一些信息不符合要求
            //比如每次发送请求时都希望在界面中有加载动画
            //比如某些网络请求（比如登陆），必须携带一些信息（token等）
            //就需要在这里拦截
            //这里执行拦截的一些函数
            //执行完操作后继续向服务器发送网络配置
            return config
        },err=>{
            //发送失败函数
            //很少到这里
            console.log(err);
        }
    )
instance.interceptors.response.use(
    res=>{
        //拦截到res先进行处理
        //最后再结果返回客户端
        //console.log(res)
        return res.data
    },err=>{
        console.log(err)
    }
)

    //封装的发送网络请求
    return instance(config)
}

