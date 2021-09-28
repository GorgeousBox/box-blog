<template>
  <div id="Allinfor">
    <AppInformation />
    <div class="sticky">
      <HotArticle />
      <Visitor />
    </div>
  </div>
</template>

<script>

import AppInformation from "@/components/content/AppInformation";
import HotArticle from "@/components/content/hot-article";
import Visitor from "@/components/content/visitor";

export default {
  data(){
    return {
      // ifFixed: false,
      hoverTimer: null,
    };
  },
  methods: {
    // fixed(){
    //   window.addEventListener("scroll",() => {
    //     let scrollTop = document.documentElement.scrollTop;
    //     this.ifFixed = scrollTop >= 250;
    //   })
    // },

    // hover(event){
    //   let el = event.currentTarget;
    //   el.style.opacity = 1;
    //   clearTimeout(this.hoverTimer);
    // },

    // hover2(event){
    //   let el = event.currentTarget;
    //   this.hoverTimer = setTimeout(() => {
    //     el.style.opacity = .7;
    //   }, 1000);
    // },
  },
  mounted() {
    // this.fixed()
  },
  components:{
    AppInformation,
    HotArticle,
    Visitor
  }
};
</script>

<style scoped lang="less">
#Allinfor {
  width: 270px;
  margin-right: 15px;
  transition: 1s;
  // opacity: .7;
  padding-bottom: 30px;
  position: relative;

  .sticky{
    width: 270px;
    &.fixed{
      position: fixed;
      top: 45px;
      // right: auto;
      // right: 20px;
    }
  }
}
</style>