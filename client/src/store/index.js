import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    playUrl:1,  //歌曲播放地址
    musicDetail:'',
    play:true,
    time:0,
    loadingHistory: false,
  },
  mutations: {
    login(state,userInfo){
      state.userInfo = userInfo;
    },
    logout(state){
      state.userInfo = {};
    },
    getVuexUrl(state,url){
      state.playUrl = url
    },
    getVuexDetaile(state,item){
      state.musicDetail = item
    },
    //暂定播放
    getplay(state,item){
      state.play = item
    },
    //获取数据
    getTime(state,item){
      state.time = item
    },
    loadingHistoryFC(state, loadingHistory){
      state.loadingHistory = loadingHistory
    },
  },
  actions: {
  },
  modules: {
  }
})
