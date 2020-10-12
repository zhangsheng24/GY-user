<template>
  <div class="home">
    <div class="home-box">
      <section class="area">
        <div class="location">
          <span>宜宾</span>
          <van-icon name="arrow-down" />
        </div>
        <van-search
          v-model="value"
          clearable
          clear-trigger="focus"
          class="search"
          shape="round"
          placeholder="水电改造"
        />
        <div class="banner">
          <img src="@/assets/images/banner.png" alt />
        </div>
      </section>
      <section class="navBox">
        <div class="navs">
          <van-grid :border="false">
            <van-grid-item @click="navClick(item)" v-for="(item, index) in navs" :key="index">
              <div class="iconBox">
                <van-image width="32" height="32" :src="ossHost + item.icon" />
              </div>
              <span class="title">{{ item.menuName }}</span>
            </van-grid-item>
          </van-grid>
        </div>
      </section>
      <section class="recommend">
        <div class="title">优秀师傅推荐</div>
        <ul class="recommend-items">
          <li v-for="(item, index) in recommend" :key="index">
            <van-image
              width="80px"
              height="80px"
              error-icon="manager-o"
              :src="item.headerImage"
            ></van-image>
            <div class="name">
              {{ item.username }}
              <img class="v" src="@/assets/images/v.png" alt="" />
            </div>
            <van-rate v-model="item.score" :size="15" readonly color="#ffd21e" void-icon="star" void-color="#eee" />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      value: "",
      navs: [],
      recommend: [],
    };
  },
  computed: {
    ...mapGetters(["ossHost"]),
  },
  created() {
    this.getNav();
    this.getRecommend();
  },
  methods: {
    getNav() {
      api("home.findAll").then((res) => {
        this.navs = res;
      });
    },
    getRecommend() {
      api("home.recommend", {
        pageNo: 0,
        pageSize: 10,
      }).then((res) => {
        if (res.count > 0) {
          res.data.forEach((item) => {
            if (item.headerImage.indexOf("http") === -1) {
              item.headerImage = this.ossHost + item.headerImage;
            }
          });
          this.recommend = res.data;
        }
      });
    },
    navClick(item){
      if(item.url){
        if(item.url.indexOf('http') === -1){
          this.$router.push(item.url)
        }else{
          window.location.href=item.url
        }
      }else{
        this.$toast('该功能暂未上线')
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/commons/css/mixin.scss";
.home {
  width: 100vw;
  min-height: 100vh;
  .home-box {
    padding-bottom: calc(50px + constant(safe-area-inset-bottom));
    padding-bottom: calc(50px + env(safe-area-inset-bottom));
    .area {
      position: relative;
      padding: 0 15px 100px;
      display: flex;
      font-size: 15px;
      background: #2cbda4;
      margin-bottom: 30px;
      .location {
        span {
          line-height: 54px;
          color: #fff;
        }
        .van-icon-arrow-down {
          color: #fff;
          padding-left: 4px;
        }
      }
      .van-search {
        flex: 1;
        background-color: transparent;
      }
      .banner {
        position: absolute;
        bottom: -30px;
        width: 100%;
        text-align: center;
        left: 0;
        z-index: 1;
        > img {
          width: 345px;
          border-radius: 8px;
        }
      }
    }
    .navBox {
      padding: 20px 15px;
      .navs {
        border-radius: 8px;
        box-shadow: 0 0 5px #f4f4f4;
        background: #fff;
        position: relative;
        @include border-1px(#ebedf0, "all", 10px, solid);
        .iconBox {
          font-size: 0;
          position: relative;
          z-index: 1;
        }
        .title {
          font-size: 12px;
          font-weight: bold;
          color: #000;
          line-height: 16.5px;
          padding-top: 4px;
        }
      }
    }
    .recommend{
      padding: 0 15px 15px;
      .title{
        font-size: 16px;
        color: #323233;
        font-weight: bold;
      }
      .recommend-items{
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li{
          width: 165px;
          text-align: center;
          border-radius: 8px;
          box-shadow: 0 0 10px 10px #f4f4f4;
          padding-top: 20px;
          padding-bottom: 30px;
          margin-top: 15px;
          .name{
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #000;
            margin-bottom: 8px;
            margin-top: 15px;
            .v{
              margin-left: 5px;
              width: 18.5px;
              height: 16px;
            }
          }
        }
      }
    }
  }
}
</style>

