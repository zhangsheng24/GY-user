<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
    <Tabbar />
  </div>
</template>
<script>
import Tabbar from "@/commons/template/TabBar.vue";
import {mapGetters} from 'vuex'
import {LgetItem} from '@/utils/storage'
import api from '@/api'
export default {
  data() {
    return {
      transitionName: "slide-left",
    };
  },
  computed:{
    ...mapGetters['ossHost']
  },
  components: {
    Tabbar,
  },
  watch:{
    $route(to,from){
      if(!this.ossHost && LgetItem('jwtToken')){
        api('oss.getOssHost').then(res=>{
          console.log(res)
          this.$store.commit('SET_OSSHOST',res.host)
        }).catch(err=>{
          console.log(err)
        })
      }
      const toIndex=to.meta.navIndex
      const fromIndex=from.meta.navIndex
      this.transitionName=toIndex<fromIndex?'slide-right':'slide-left'
    }
  }
};
</script>
<style src='@/commons/css/reset.css'></style>
<style lang="scss" scoped>
#app {
  width: 100vw;
  font-family: PingFangSC-Regular;
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
  }
  .slide-left-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    position: absolute;
  }
  .slide-right-leave-to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
</style>

