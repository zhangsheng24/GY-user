// 配置编译环境和线上环境之间的切换
const env = process.env

let config = {
  host: "",
  port: "",
  baseUrl: "",
  webRouterIntercept: true, // 登录拦截
  type: env.VUE_APP_TITLE,
  phone: '400-677-2378',
  redirect: 'http://hswglist.jiaoyf.com/dev/client',
  isLogining: true,
  localRedirect: '',
  version: env.VUE_APP_VERSION,  // 版本号
  routerBase: env.BASE_URL // VueRouter base，同nginx配置
}


if (config.type === 'development') {
  config.port = ':8089'
  config.host = 'http://192.168.148.190'
  // config.port = ':8090'
  // config.host = 'http://10.20.1.110'
  // config.port = ':8090'
  // config.host = 'http://10.20.0.100'
} else if (config.type === 'production') {
  config.baseUrl = '/api'
  config.host = 'https://hswglist.jiaoyf.com'
  config.redirect = 'https://hswglist.jiaoyf.com/client'
} else if (config.type === 'test') {
  config.host = 'https://hskj.jiaoyf.com'
  config.baseUrl = '/api'
  config.redirect = 'https://hswglist.jiaoyf.com/test/client'
}
export default config