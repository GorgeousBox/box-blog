import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from "axios"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import "../public/scss/index.scss";

NProgress.configure({
  easing: 'ease', // 动画方式    
  speed: 300, // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();

  // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  
  NProgress.done();
})

// axios.defaults.baseURL = 'http://123.57.136.215';
axios.defaults.baseURL = (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.hezi.site"),
  // axios.defaults.baseURL = 'http://www.hezi.site';
  Vue.prototype.$axios = axios;
axios.defaults.withCredentials = true;

Vue.mixin({
  data() {
    return {
      // urlBase: process.env.NODE_ENV === "development"?"http://123.57.136.215":"",
      urlBase: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.hezi.site",
      // urlBase: process.env.NODE_ENV === "development"?"http://www.hezi.site":"",
    }
  },

  methods: {
    Reset() {
      this.$emit('getShopCode', false);
      document.querySelector('body')
        .setAttribute(
          'style',
          'overflow-y: scroll;'
        );
    }
  },

  filters: {
    fmtTime(value, date2, date3 = true) {
      let date = new Date(value),
        YY = date.getFullYear(),
        MM = date.getMonth() + 1,
        DD = date.getDate(),
        hh = date.getHours(),
        mm = date.getMinutes();

      if (date3) {
        MM < 10 && (MM = "0" + MM)
        DD < 10 && (DD = "0" + DD)
        hh < 10 && (hh = "0" + hh)
        mm < 10 && (mm = "0" + mm)
      }

      switch (date2) {
        case 1:
          return YY;
        case 2:
          return MM;
        case 3:
          return DD;
        case 4:
          return hh;
        case 5:
          return mm;
      }

      return `${YY}-${MM}-${DD} ${hh}:${mm}`
    },
  }
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')