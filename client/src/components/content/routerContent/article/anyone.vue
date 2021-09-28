<template>
  <div id="anyone">
    <div class="top" v-if="top">置顶</div>

    <div class="anyone-title">
      <div class="anyone-title-all">
        <li class="anyone-title-all-type">【{{articleTitleType}}】</li>
        <a class="anyone-title-all-title" :href="'/article/' + article_id">{{articleTitle}}</a>
      </div>
      <div class="anyone-title-date">
        <div class="anyone-title-date-day">{{ articleDate | fmtTime(3) }}</div>
        <div class="anyone-title-date-month">
          <li>{{ articleDate | fmtTime(2, false) }}月</li>
          <li>{{ articleDate | fmtTime(1) }}</li>
        </div>
      </div>
    </div>

    <div class="anyone-describe">
      <a class="anyone-describe-img" :href="'/article/' + article_id">
        <img :src="articleimg" alt="">
      </a>
      <div class="anyone-describe-describe">{{articleDescribe}}</div>
    </div>

    <div class="anyone-bottom">
      <div class="anyone-bottom-read">
        <a :href="'/article/' + article_id" class="anyone-bottom-read-continue">阅读全文</a>
        <div class="anyone-bottom-read-before"></div>
      </div>

      <div class="anyone-bottom-label">
        <div class="anyone-bottom-label-label">
          <i class="iconfont icon-tubiao-"></i>
          <a 
            v-for="(item,value) in articleLabel" 
            :key="value">
            {{item}}
          </a>
        </div>
        <div class="anyone-bottom-label-comment">
          <li>
            <i class="iconfont icon-liulan"></i>
            {{articleReading}}
          </li>
          <li>
            <i class="iconfont icon-pinglun1"></i>
            {{articleComments}}
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data()
  {
    return {
      
    };
  },

  props:[
    "articleTitleType",
    "articleTitle",
    "articleDescribe",
    "articleReading",
    "articleComments",
    "articleDate",
    "articleLabel",
    "articleimg",
    "article_id",
    "top"
  ],

};
</script>

<style scoped lang="less">
@media screen and (max-width: 850px) {
  .anyone-describe
  {
    flex-direction: column;
    .anyone-describe-describe
    {
      margin-top: 10px;
    }

    img
    {
      max-width: 280px !important;
      max-height: 160px !important;
    }
  }

  .anyone-bottom-label
  {
    flex-direction: column;

    .anyone-bottom-label-comment
    {
      margin: 15px 0 0 5px;
    }
  }

  .anyone-title-date
  {
    display: none !important;
  }
}




#anyone
{
  width: 100%;
  box-sizing: border-box;
  padding: 10px 25px;
  padding-bottom: 30px;
  background: white;
  // min-width: 650px;
  margin-bottom: 20px;
  box-shadow: 0 0 4px #ddd;
  overflow: hidden;
  position: relative;

  .top
  {
    position: absolute;
    top: 10px;
    left: -50px;
    width: 140px;
    height: 30px;
    background: #ff9900;
    transform: rotateZ(-45deg);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
  }

  .anyone-title
  {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .anyone-title-all
    {
      width: 100%;
      height: 30px;
      display: flex;
      border-bottom: 1px solid #ccc;
      padding-top: 20px;

      .anyone-title-all-type
      {
        color: #0099FF;
        letter-spacing: .1em;
        line-height: 150%;
        margin-right: 5px;
      }

      .anyone-title-all-title
      {
        font-weight: bold;
        font-size: 18px;
        color: black;
      }
    }

    .anyone-title-date
    {
      width: 80px;
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      font-family: Quicksand;

      .anyone-title-date-day
      {
        font-size: 38px;
        text-align: center;
        font-weight: bold;
        color: #00CC66;
      }

      .anyone-title-date-month
      {
        display: flex;
        justify-content: space-between;
        font-size: 17px;
        color: #989997;
      }
    }
  }

  .anyone-describe
  {
    width: 100%;
    display: flex;
    margin-bottom: 25px;

    .anyone-describe-img
    {
      display: inline-block;
      margin-right: 15px;
      
      img
      {
        width: 300px;
        height: 180px;
      }
    }

    .anyone-describe-describe
    {
      flex:1;
      font-size: 15px;
    }
  }

  .anyone-bottom
  {
    display: flex;
    flex-direction: column;

    .anyone-bottom-read
    {
      display: flex;
      align-items: center;

      .anyone-bottom-read-continue
      {
        margin-right: 20px;
        font-size: 15px;
        font-weight: bold;
        color: black;

        &:hover
        {
          color: #00CC66;
          text-decoration: underline;
        }
      }

      .anyone-bottom-read-before
      {
        flex: 1;
        height: 1%;
        border-bottom: 1px solid #ccc;
      }
    }

    .anyone-bottom-label
    {
      display: flex;
      justify-content: space-between;
      align-content: center;
      margin-top: 10px;

      .anyone-bottom-label-label
      {
        display: flex;
        align-content: center;

        .iconfont
        {
          font-size: 25px;
          color: #787977;
        }

        a
        {
          box-sizing: border-box;
          background: #f1f2f0;
          font-size: 12px;
          padding: 5px 10px;
          color: #787977;
          transition: all .2s;
          border-radius: 20px;
          margin-right: 7px;

          &:hover
          {
            background: #6bc30d;
            color: white;
          }
        }
      }

      .anyone-bottom-label-comment
      {
        display: flex;
        align-items: center;

        .iconfont
        {
          font-size: 20px;
          margin-right: 5px;
        }

        li
        {
          letter-spacing: .5px;
          display: flex;
          align-items: center;
          margin-right: 20px;
          color: #787977;
          font-size: 13px;
          font-family: Quicksand;
        }
      }
    }
  }
}

</style>