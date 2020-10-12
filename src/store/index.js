import Vue from 'vue'
import Vuex from 'vuex'
import { LgetItem, LreItem, LsetItem } from '../utils/storage'
import cfg from '@/config'

if(cfg.version !== LgetItem('version') || LgetItem('version') === null){
  localStorage.clear()
  LsetItem('version',cfg.version)
}
LreItem('ossHost')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ossHost:LgetItem('ossHost')
  },
  mutations: {
    SET_OSSHOST(state,data){
      LsetItem('ossHost',data)
      state.ossHost=data
    }
  },
  getters:{
    ossHost:state=>state.ossHost
  },
  actions: {
  },
  modules: {
  }
})
