<template>
  <van-tabbar
    class="tabbar"
    @change="onChange"
    v-if="isTabUrl"
    active-color="#000"
    inactive-color="#7F8389"
    v-model="activeIndex"
  >
    <van-tabbar-item v-for="(item,index) in navs" :key="index">
      <template #icon>
        <img class="icon" :src="index === activeIndex ? item.activeUrl:item.baseUrl" />
      </template>
      {{item.title}}
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      navs: [
        {
          title: "首页",
          link: "/home",
          baseUrl: require("@/assets/images/ic_home2.png"),
          activeUrl: require("@/assets/images/ic_home1.png")
        },
        {
          title: "全部服务",
          link: "/allService",
          baseUrl: require("@/assets/images/ic_service2.png"),
          activeUrl: require("@/assets/images/ic_service1.png")
        },
        {
          title: "我的",
          link: "/user",
          baseUrl: require("@/assets/images/ic_me2.png"),
          activeUrl: require("@/assets/images/ic_me1.png")
        },
      ],
      linkArr: ["/home", "/allService", "/user"],
    };
  },
  computed:{
      activeIndex:{
          get(){
              //如果当前的页面路由路径和linkArr的匹配，那就返回数组的索引
              return this.linkArr.findIndex(s=>s === this.$route.path)
          },
          set(val){
              return val
          }
      },
      //如果不是首页那三个路径，就移除掉tabbar
      isTabUrl(){
          return this.linkArr.indexOf(this.$route.path) !== -1
      }
  },
  methods:{
      onChange(value){
          this.$router.push(this.navs[value].link)
      }
  }
};
</script>
<style lang="scss" scoped>
@import '@/commons/css/mixin.scss';
.tabbar{
    @include border-1px(rgba(0,0,0,0.1),top,0,solid);
    ::v-deep .van-tabbar-item{
        .van-tabbar-item__icon{
            margin-top: 3px;
            .icon{
                width: 27px;
                height: 27px;
            }
        }
        .van-tabbar-item__text{
            font-size: 10px;
            letter-spacing: 0.15px;
            line-height: 14px;
        }
    }
}
</style>