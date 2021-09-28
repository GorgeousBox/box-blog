<template>
  <div id="appInformation"> 
    <div class="personal">
      <div class="character">
        <img :src="appInformationImgUrl" alt="图片加载失败">
        <div class="introduce">
          <p>我是测试者</p>
          <p>程序猿
            <!-- <span>{{characterState[1]}}</span> -->
          </p>
        </div>
      </div>
      <div class="contact">
        <!-- <a v-for="item in aForClass" :key="item" :class="item" ></a> -->
        <a href="" target="_blank" class="iconfont icon-github"></a>
        <a title="俺的关注才不给你看" class="iconfont icon-bird-xiaoniao"></a>
        <a href="" target="_blank" class="iconfont icon-weibo"></a>
        <el-popover placement="bottom" width="150" trigger="click">
          <img style="display: block" src="@/assets/img/纸盒子.png" width="150" height="150" alt="微信图标">
          <a slot="reference" class="iconfont icon-weixin1"></a>
        </el-popover>
        <a target="_blank" :href="aHrefQQ" class="iconfont icon-QQ"></a>
      </div>
    </div>

    <div class="download">
      <a href="" target="_blank">NEW PAGE</a>
    </div>
  </div>
</template>

<script>
export default {
  data()
  {
    return {
      appInformationImgUrl: require("@/assets/img/纸盒子.png"),
      aForClass: ["iconfont icon-github", "iconfont icon-bird-xiaoniao", "iconfont icon-weibo", "iconfont icon-weixin1", "iconfont icon-QQ"],
      aHrefQQ: "http://wpa.qq.com/msgrd?v=3&uin=7777777777777&site=qq&menu=yes",// QQ接口数据，7777777换成你的QQ即可
    }
  },
};
</script>

<style scoped lang="less">
  #appInformation
  {
    width: 100%;
    height: 228px;
    // background: #bfe2e6;
    // box-shadow: 0 0 4px #ddd;
    display: flex;
    flex-direction: column;

    .personal
    {
      width: 100%;
      height: 65%;
      box-sizing: border-box;
      padding: 20px 15px;

      .character
      {
        width: 100%;
        display: flex;
        align-content: center;

        img
        {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: solid 1px white;
          margin-right: 15px;
          margin-left: 10px;
        }

        .introduce
        {
          display: flex;
          flex-direction: column;
          justify-content: center;
          // margin-right: 55px;

          p
          {
            // font-family: 黑体;
            font-weight: bolder;
            margin-top: 10px;
            margin-bottom: 0;
            color: white;
          }
          p:nth-child(2)
          {
            color: white;
            font-size: 12px;

            span
            {
              color: white;
            }
          }
        }
      }

      .contact
      {
        width: 100%;
        height: 20px;
        margin-top: 20px;
        display: flex;
        justify-content: space-around;

        a
        {
          font-size: 21px;
          line-height: 20px;
          vertical-align: text-bottom;
          color: white;
          text-decoration: none;
        }
      }
    }

    .download
    {
      flex: 1;
      box-sizing: border-box;
      padding: 20px;

      a{
        display: block;
        width: 65%;
        height: 40px;
        border-radius: 23px;
        margin: 0 auto;
        box-shadow: 0 0 0 #888;
        font-family: "Quicksand","sans-serif";
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        font-weight: 700;
        color: white;
        letter-spacing: 1px;
        background-color: #bfe2e6;
        transition: box-shadow .3s;

        &:hover{
          box-shadow: 0 2px 10px #888;
        }
      }
    }
  }
</style>