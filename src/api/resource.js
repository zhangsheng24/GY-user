import home from './modules/home'
import renovation from './modules/renovation'
export default {
    //登录
    webLogin: {
        method: 'post',
        url: '/user/web/login'
    },
    oss: {
        // 获取oss host
        getOssHost: {
            method: 'post',
            url: '/oss/getOssHost'
        },
        // 获取oss上传信息
        ossAccessSign: {
            method: 'post',
            url: '/oss/access_sign'
        }
    },
   ...home,
   ...renovation
}