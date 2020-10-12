import router from '@/router'
import cfg from '@/config'
import api from '@/api'
import {Notify} from 'vant'
import {LgetItem,LsetItem,LreItem} from '@/utils/storage'

//该js的作用是做微信网页授权登录，在入口文件中被引入
//当我们通过http://localhost:8080/dev/client/访问我们的项目的时候，
//全局前置后卫会触发，相当于拦截，只有调用next()才可以根据/根路径访问我们对应的组件
//因此，可以在点击链接访问我们项目的时候进行路由拦截处理，做登录之类的操作，然后再next
router.beforeEach((to,from,next)=>{
    console.log(to)
    //所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，
    //对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，
    //所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复）。
    //也就是说如果是安卓手机需要在用到的js-sdk页面去注入配置信息，如果是ios手机就必须在页面一加载的时候就要注入配置信息

    //用到的时候再来写这

    const jwtToken=LgetItem('jwtToken')
    if(jwtToken){
        next()
    }else{
        if(to.query.code){
            api('webLogin',{
                code:to.query.code,
                type:1
            }).then(res=>{
                //此处就是分享出来的链接中存在参数，拿到之后我们再把它清除,如果是正常访问，并不是分享的链接，那么，oauth2Query
                const oauth2Query=LgetItem('oauth2Query')
                LreItem('oauth2Query')
                LsetItem('jwtToken',res.jwtToken)
                LsetItem('bindPhone',res.flag)
                next({
                    path:to.query.state?decodeURIComponent(to.query.state):'/home',
                    query:oauth2Query,
                    replace:true
                })
            }).catch(err=>{
                Notify({type:'danger',message:err})
            })
        }else{
            //shareClient: 'http://hswglist.jiaoyf.com/dev/client/worker/workerOrder?id=1234',
            //path: "/worker/workerOrder",path字符串里面没有query参数，这样state=${path}就不会因为query参数过长了，解释了下面的那句话，防止了重定向失败
            const path = encodeURIComponent(to.path) // 记录进入的初始路由
            //如果是业主或者工人分享出来的链接，点击访问用户端项目，会传递一些参数，所以需要去做一个接收。
            LsetItem('oauth2Query', to.query) // 如果url里面query太多会造成state过长，授权重定向失败
            //这里以前忽略了一个关于本地存储的问题，当我们点击shareClient地址的时候，在本地存储了oauth2Query，然后有重新打开微信网页授权地址，
            //再重新通过重定向跳转到我们项目的根路径，这里注意，上一次的存储依然还有效，也就是说还有，不管你怎么跳，只要是同一个地址，存的东西都不得清除
            window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxecb7461cb5093dca&redirect_uri=${cfg.redirect}&response_type=code&scope=snsapi_userinfo&state=${path}#wechat_redirect`)
        }
    }
})


//http://localhost:8080/dev/client/ ==>http://localhost:8080/dev/client/home
//访问的是项目地址，相当于是一个html网页，然后又重新打开微信授权这个地址，那么之前项目网页就没得了，相当于打开了一个新的网站
//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxecb7461cb5093dca&redirect_uri=${cfg.redirect}&response_type=code&scope=snsapi_userinfo&state=${path}#wechat_redirect
//点击授权同意,微信授权这个网站重定向到我们指定的地址。又再一次打开我们的项目，此时地址栏会带上code和state参数
//http://hswglist.jiaoyf.com/dev/client/?code=031NLnll2FR2B54RnJol2lE38F3NLnlm&state=%2Fhome
//http://hswglist.jiaoyf.com/dev/client/?code=031NLnll2FR2B54RnJol2lE38F3NLnlm&state=%2Fhome ==>http://hswglist.jiaoyf.com/dev/client/home

router.afterEach(to=>{
    if(to.meta.title){
        document.title=to.meta.title
    }
})