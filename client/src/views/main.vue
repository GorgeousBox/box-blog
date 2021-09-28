<template>
  <div id="main">
    <!-- <div class="container1"
         v-if="loading">
      <div class="trans">
        <span>玩命加载中...</span>
      </div>
    </div> -->

    <div class="main-yes">
      <div class="main-yes-vague">
        <div class="main-yes-All">
          <div class="main-yes-All-face" :class="{'main-yes-All-face-face': overallSituationFlip}"></div>
          <div class="main-yes-All-name">测试者</div>
          <div class="main-yes-All-dec">这里是测试者的一段话，不知道说啥，凑数就完了</div>
          <div class="main-yes-All-line"></div>
          <div class="main-yes-All-Nav">
            <router-link :to="{name: 'home'}">首页</router-link>
            <router-link :to="{name: 'article'}">文章</router-link>
            <router-link :to="{name: 'message'}">留言</router-link>
            <router-link :to="{name: 'life'}">生活</router-link>
            <router-link :to="{name: 'friend'}">友链</router-link>
            <router-link :to="{name: 'about'}">关于</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loading: true,
      overallSituationFlip: false,
    };
  },

  mounted () {
    this.$emit('getShopCode', true);
    document.querySelector('body')
      .setAttribute(
        'style',
        'overflow-y:hidden;'
      );
    // if(window.history.length > 1)
    // {
    //   setTimeout(() => {
    //     this.loading = false;
    //   }, 500);
    // }
    window.onload = () => {
      this.overallSituationFlip = true;
    };
  },
}
</script>

<style lang="less" scoped>
#main {
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  width: 100%;
  height: 100%;
  opacity: 1 !important;

  .main-yes {
    width: 100%;
    height: 100%;
    background: url(../assets/img/封面背景.jpg) no-repeat center/cover;
    
    .main-yes-vague {
      width: 100%;
      height: 100%;
      background: linear-gradient(
        140deg,
        rgba(68, 68, 68, 0.6) 20%,
        rgba(0, 0, 0, 0.9)
      );
      display: flex;
      justify-content: center;
      align-items: center;
      // filter:blur(10px);
    }

    .main-yes-All
    {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .main-yes-All-face
      {
        background: url(../assets/img/纸盒子.png) no-repeat center/cover;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        transition: all 3s;
      }
      .main-yes-All-face-face
      {
        animation: face 3s ease-in-out alternate;
        animation-fill-mode: forwards;

        @keyframes face {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(1080deg);
          }
        }
      }
      .main-yes-All-name
      {
        text-align: center;
        width: 140%;
        font-size: 25px;
        font-weight: bold;
        color: white;
        border-bottom: 1px solid rgba(153, 153, 153, .4);
        padding: 30px;
      }
      .main-yes-All-dec
      {
        color: white;
        font-size: 15px;
        padding: 30px;
      }
      .main-yes-All-line
      {
        width: 100px;
        height: 1px;
        background: rgba(153, 153, 153, .4);
      }
      .main-yes-All-Nav
      {
        padding: 20px;
        display: flex;
        justify-content: space-around;
        width: 300px;

        a
        {
          color: #666 !important;
          font-size: 12px;
          transition: all .3s;

          &:hover
          {
            color: white !important;
          }
        }
      }
    }
  }
}
</style>