<!-- 
------------------------------------------------------------------------------------------------------------------

注： 该版本代码为开源测试版本，可以进行二创。
注： 虽然网站并不是很火，代码写的也潦草，但如若进行二创还请务必说明原出处，谢谢了！
注： 如有看不懂的代码可以找我，我的微信是SSS2056439016

原出处：
作者：华丽的小盒子
地址：www.hezi.site

------------------------------------------------------------------------------------------------------------------
-->
<template>
  <div id="app"
       :style="{backgroundImage:'url('+appBackground+')'}">
    <div class="contentAll">
      <div v-if="loadingAll"
           class="contentAll-allinfor"
           :class="{inforCssOpen:inforCssOpen}">
        <div class="contentAll-identification"
             @click="inforCssClick">
             <i class='iconfont icon-dayuhao' v-show="this.inforCss" :class="{i:inforCssOpen}"></i>
             <p v-show="!this.inforCss">信息栏</p>
        </div>
        <Allinfor v-if="loadingAll"></Allinfor>
      </div>
      <div class="router-content"
           :class="{mainAll: main}">
        <router-view @getShopCode='getShopCode'
                     :class="{opacityPart: opacityPart}"></router-view>
        <!-- <router-view name = 'home'></router-view>
        <router-view name = 'article'></router-view>
        <router-view name = 'message'></router-view>
        <router-view name = 'life'></router-view>
        <router-view name = 'friend'></router-view>
        <router-view name = 'about'></router-view> -->
      </div>
    </div>

    <div class="Nav"
         v-if="loadingAll"
         :class="{oooo: clickNav}">
      <div class="Nav-button"
           @click="oooo()"
           :class="{oo: clickNav}">
        <i class="iconfont icon-dayuhao"></i>
      </div>
      <AppNav />
    </div>

    <div class="record-number"
         v-if="loadingAll">
      <div>
        <span>备案号</span>
        <a href="https://beian.miit.gov.cn"
           target="_blank">鲁ICP备77777777号
        </a>
      </div>
      <div>
        <img src="./assets/img/备案图标.png"
             alt=""
             class="beiantubiao">
        <a target="_blank"
           href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37010402001014">鲁公网安备 777777777777777号
        </a>
      </div>
      <span class="home-span">Copyright © 2021-2021 测试者 All Rights Reserved</span>
    </div>
    <!-- <el-backtop 
      target=".content" 
      :bottom="100"
      :right="100"
      :visibility-height="100">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        }"
      >
        UP
      </div>
    </el-backtop> -->
    <!-- <el-backtop class="backtop" v-if="loading"></el-backtop> -->
    <el-backtop class="backtop"></el-backtop>
    <!-- <Player></Player> -->
  </div>
</template>

<script>

// 导入vuex以及模块
import AppNav from "@/components/Nav/AppNav";
import Allinfor from "@/components/content/Allinfor";
import { mapMutations } from "vuex"
import { mapState } from "vuex";

export default {
  name: 'app',
  data () {
    return {
      loading: true,
      main: false,
      loadingAll: false,
      opacityPart: false,
      appBackground: "",
      clickEffect: true,// 是否有点击效果
      clickNav: false,//手机端是否弹出导航栏
      screenWidth: document.body.clientWidth, // 窗口监听数据
      inforCss: false,// 信息栏移动端样式变化数据
      inforCssOpen: false,//信息栏移动端展开数据
    }
  },
  components: {
    AppNav,
    Allinfor,
    // Player
  },
  computed: {
    ...mapState(["mainAll"]),
  },
  methods: {
    ...mapMutations(["login"]),

    // 移动端信息栏点击展开
    inforCssClick () {
      if (this.inforCss)
      {
        this.inforCssOpen = !this.inforCssOpen;
      }
    },

    getShopCode (value) {
      this.main = value;
      this.loading = value;

      if (!value) this.opacityPart = true;
      else this.opacityPart = false;
    },

    // 随机背景
    randomBackground () {
      const randomBackground = Math.random();
      if (randomBackground > .5) return this.appBackground = require("./assets/img/唯美1.jpg");
      else return this.appBackground = require("./assets/img/唯美2.jpg");
    },

    // // 是否有点击特效函数
    // clickEffectis (l = true) {
    //   if (l) this.clickEffect = true
    //   else this.clickEffect = false;
    // },

    // 鼠标点击特效
    mouseSpecialEffects () {
      window.onclick = function (event) {
        let heart = document.createElement("mouse-special-effects");
        heart.onselectstart = new Function('event.returnValue=false');
        const textTemp = Math.random();
        if (textTemp > .9) document.body.appendChild(heart).innerHTML = "❤有阳光的地方就会有阴影，所以有阴影的地方就一定会有阳光。❤"
        else if (textTemp > .8) document.body.appendChild(heart).innerHTML = "❤眼泪这东西啊，是流出来就能把辛酸和悲伤都冲走的好东西。❤"
        else if (textTemp > .7) document.body.appendChild(heart).innerHTML = "❤与其想着如何漂亮地死去，还不如漂亮地活到生命的最后。❤"
        else if (textTemp > .6) document.body.appendChild(heart).innerHTML = "❤人生，就像肥皂泡一样。❤"
        else if (textTemp > .5) document.body.appendChild(heart).innerHTML = "❤自由不是无法无天而是按照自己的规则活下去。❤"
        else if (textTemp > .4) document.body.appendChild(heart).innerHTML = "❤在太阳休息的时候，我们就是照亮夜空的太阳哦！❤"
        else if (textTemp > .3) document.body.appendChild(heart).innerHTML = "❤顺便说一下，虽然今天工作很忙，不过我跷班了。❤"
        else if (textTemp > .2) document.body.appendChild(heart).innerHTML = "❤人就是要以自卑为跳板才能跳得更高。❤"
        else if (textTemp > .1) document.body.appendChild(heart).innerHTML = "❤真正重要的东西，总是没有的人比拥有的人清楚。❤"
        else if (textTemp > 0) document.body.appendChild(heart).innerHTML = "❤绝望的颜色越是浓厚，在哪里也一定会存在耀眼的希望之光。❤";
        heart.style.cssText = "position: fixed;left:-100%;";

        let f = 16, // 字体大小
          x = event.clientX - f / 2, // 横坐标
          y = event.clientY - f, // 纵坐标
          c = "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")", // 随机颜色
          a = 1.7, // 透明度
          s = 1; // 放大缩小

        let timer = setInterval(function () {

          if (a <= 0)
          {
            document.body.removeChild(heart);
            clearInterval(timer);
          } else
          {
            heart.style.cssText = "font-size:16px;position: fixed;color:" + c + ";left:" + x + "px;top:" + y + "px;opacity:" + a + ";transform:scale(" + s + ");z-index:1;";
            y--;
            a -= 0.016;
            s += 0.002;

          }
        }, 12);
      }
    },

    // 手机端是否弹出导航栏
    oooo () {
      this.clickNav = !this.clickNav;
    }
  },

  watch: {
    screenWidth (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer)
      {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(() => {
          // 打印screenWidth变化的值
          if (that.screenWidth > 850) 
          {
            this.clickNav = false;
            this.inforCss = false;
          }
          else 
          {
            this.clickNav = true;
            this.inforCss = true;
            console.log(this.inforCss);
          }
          that.timer = false
        }, 400)
      }
    }
  },

  async mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }

    if (document.body.clientWidth < 850) 
    {
      this.clickNav = true;
      this.inforCss = true;
    }


    this.mouseSpecialEffects();
    console.log(
      "%c别找了，不可能有一个cosole.log，有一个我倒立拉稀，除了这个以外哈",
      "background-color:rgb(30,30,30);border-radius:4px;font-size:12px;padding:4px;color:rgb(220,208,129);"
    );
    this.randomBackground();
    // 当加载完成之后，关闭加载页面
    // window.onload = async () => {
    //   setTimeout(() => {
    //     document.querySelector('body')
    //       .setAttribute(
    //         'style', 
    //         'overflow-y:scroll;'
    //       )
    //     this.loading = false
    //   }, 1000);
    // }
    // this.main = this.$refs.ch.main;

    window.onload = () => {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }

    if (!this.main)
    {
      document.querySelector('body')
        .setAttribute(
          'style',
          'overflow-y: scroll;'
        );
    }
    setTimeout(() => {
      this.loadingAll = true;
    }, 1000);

    //  console.log(window.history.length);

    if (window.history.length > 1) 
    {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
    // else
    // {
    // window.onload = async () => {
    //   this.loading = false;
    // }
    // }
    //页面加载后，检测是否已经保存登录信息了
    let { data } = await this.$axios({
      method: "post",
      url: "/login/check"
    })
    //更新vuex
    data.code === 0 && this.login(data.data)
  },

  created () {
    // 加载页面适应配置，使用户体验提高
    // this.loading = true;
    // this.overflow = false;
    // document.querySelector('body')
    //   .setAttribute(
    //     'style', 
    //     'overflow-y:hidden;'
    //   )
    // this.loading = this.$loading({
    //   lock: true,
    //   fullscreen: true,
    //   text: '正在玩命的加载……',
    //   background:'rgba(0, 0, 0)'
    // });
    // setTimeout(() => {
    //   this.loadingAll = true;
    // }, 1000);
  },

  beforeUpdate () {
    if (window.history.length > 1) 
    {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="less">
.tipsA
{
  // position: absolute;
  margin: 0 auto 0 auto;
  font-size: 20px;
  color: red;
  font-weight: bold;
}

.inforCssOpen
{
  left: 0 !important;
}
.i
{
  transform: rotateZ(-180deg); 
}


// 移动端适应媒体查询
@media screen and (max-width: 850px) {
  // .musicAll,
  .waifu {
    display: none !important;
  }

  #music
  {
    bottom: 0 !important;
  }

  #app {
    .contentAll {
      margin-bottom: 30px !important;
    }

    .record-number {
      flex-direction: column !important;
      height: 90px !important;
    }

    .contentAll-allinfor
    {
      .contentAll-identification
      {
        width: 15px !important;
        height: 150px !important;
        top: 140px !important;
        border-radius: 0 10px 10px 0 !important;
        right: -14px !important;

      }
    }
  }
}

@import url(./assets/css/font.css);

.oooo {
  right: -50px !important;
}
.oo {
  background: rgb(33, 180, 238) !important;
  transform: rotateY(180deg) !important;
}

html,
body {
  // background:
  //       // url(./assets/img/背景左.png) no-repeat left 50px fixed,
  //       url(./assets/img/左荷叶.png) bottom left/contain fixed no-repeat,
  //       url(./assets/img/右荷花.png) bottom right/contain fixed no-repeat ,
  //       url(./assets/img/下背景.png) fixed bottom/contain,
  //       url(./assets/img/荷叶背景.png) fixed top/contain ;
  //       // #F2F2F2;
  // background-repeat: right;
  // height: 100%;
  // width: 100%;
  // min-width: 900px;
  user-select: none;
  // position: relative;
  cursor: url(./assets/img/光标普通.gif), default;

  a,
  button {
    cursor: url("./assets/img/光标手指.gif"), default !important;
  }

  input,
  textarea {
    cursor: url("./assets/img/光标文本.jpg"), default !important;
  }
}

// .musicAll
// {
//   position: absolute;
//   right: 0;
//   bottom: 0;
//   z-index: -10;
// }

.opacityPart {
  animation: opacityPart 0.7s ease-in-out alternate;
  animation-fill-mode: forwards;

  @keyframes opacityPart {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.94;
    }
  }
}

.beiantubiao {
  margin: 0 2px 0 20px;
  vertical-align: middle;
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  /* 设置弹性盒模型 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #37474f;
  opacity: 1;
  transition: all 0.5s;

  .trans {
    position: absolute;
    width: 120px;
    height: 120px;
    /* 设置弹性盒模型 */
    display: flex;
    justify-content: center;
    align-items: center;
    background: #37474f;
  }
  span {
    position: absolute;
    color: #fff;
    z-index: 1;
  }

  .trans::after {
    content: "";
    position: absolute;
    width: 155px;
    height: 155px;
    background: #37474f;
    /* 添加边框 */
    border: 4px solid #3ff9dc;
    /* 初始化位置 */
    transform: rotate(45deg);
    /* 添加动画、动画时间和样式 */
    animation: rotate1 3s ease-in-out infinite alternate;
  }

  .trans::before {
    content: "";
    position: absolute;
    width: 155px;
    height: 155px;
    /* 添加边框 */
    border: 4px solid #ffab91;
    /* 初始化位置 */
    transform: rotate(-90deg);
    /* 添加动画、动画时间和样式 */
    animation: rotate2 3s ease-in-out infinite alternate;
  }

  @keyframes rotate1 {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-90deg);
    }
    50% {
      transform: rotate(-180deg);
    }
    75% {
      transform: rotate(-270deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

  @keyframes rotate2 {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

p {
  margin-bottom: 0 !important;
}
h2 {
  margin-top: 0 !important;
}

.mainAll {
  z-index: 3 !important;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  // background: url(./assets/img/唯美1.jpg) no-repeat fixed center/cover;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  justify-content: space-between;
  // min-width: max-content;

  .Nav {
    width: 50px;
    height: 490px;
    // background:
    //     url(./assets/img/叶子.png),
    //     url(./assets/img/叶子背景.png);
    // background-size: 300px 500px;
    // background-repeat: no-repeat;
    // background-position: top;
    background: // url(./assets/img/导航背景2.png) no-repeat 40px 0 / cover,
      // url(./assets/img/导航背景3.png) no-repeat 0 10px / cover,
      // url(./assets/img/导航背景4.png) no-repeat 0 / cover,
      // url(./assets/img/导航背景1.png) no-repeat 0 / cover;
      rgb(183, 225, 240);
    // box-shadow: 0 0 5px black;
    position: fixed;
    top: 0;
    z-index: 2;
    opacity: 0.9;
    right: 0;
    transition: 1s;
    border-radius: 30px 0 0 30px;
    // overflow: hidden;
    .Nav-button {
      display: none;
    }

    @media screen and (max-width: 850px) {
      .Nav-button {
        width: 15px;
        height: 80px;
        // background: url(./assets/img/导航背景1.png) no-repeat 0 / cover;
        // background: url(./assets/img/导航背景1.png) no-repeat 0 / cover;
        background: rgb(183, 225, 240);
        position: absolute;
        top: 40%;
        left: -14px;
        transition: transform 0.3s;
        display: flex !important;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 13px;
        font-weight: bold;
        text-shadow: 0 2px 3px 0 black;
        cursor: url("./assets/img/光标手指.gif"), default !important;
      }
    }
  }

  .contentAll {
    width: 100%;
    max-width: 1280px;
    // background: pink;
    // margin: 20px auto;
    // position: relative;
    align-self: center;
    display: flex;
    padding-top: 10px;
    margin-bottom: 50px;
    // margin-left: 220px;

    .contentAll-allinfor {
      position: fixed;
      left: -270px;
      background: url(./assets/img/纸盒子.png) bottom right/cover,
        rgb(36, 35, 35);
      border-radius: 0 30px 0 0;
      transition: 0.5s;
      z-index: 3;
      top: 0;
      height: 100%;
      @media screen and (max-width: 850px) {
        left: -285px;
      }

      .contentAll-identification {
        width: 30px;
        height: 115px;
        background: rgb(36, 35, 35);
        position: absolute;
        right: -30px;
        top: 60px;
        border-radius: 0 15px 5px 0;
        color: white;
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        i
        {
          transition: all .3s;
        }

        p
        {
          line-height: 25px;
        }

        &::before {
          content: "";
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url(./assets/img/box.png) bottom right/cover;
          margin-bottom: 5px;
          margin-left: -1px;

          @media screen and (max-width: 850px) {
            display: none !important;
          }
        }
      }

      @media screen and (min-width: 850px) {
        &:hover {
          left: 0;
        }
      }
    }

    .router-content {
      width: 100%;
      flex: 1;
      padding: 0 15px 0 15px;
      z-index: 1;
      // background: blue;
    }
  }

  .record-number {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    min-width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    background: rgba(0, 204, 255, 0.4);

    div:nth-child(1) {
      margin-left: 30px;
    }

    a {
      display: inline-block;
      margin-left: 5px;
      color: white;
      font-size: 14px;
    }

    .home-span,
    span {
      display: inline-block;
      font-size: 13px !important;
      color: #ccc;
    }
  }
}
// @media only screen and (max-height:700px){
//   .record-number
//   {
//     position: fixed !important;
//     bottom: 0 !important;
//   }
// }

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0;
  // transition: all .3s;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background: #47bed6;
  border-radius: 20px;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ededed;
  border-radius: 20px;
}

.el-popover {
  min-width: 50px !important;
}
</style>
