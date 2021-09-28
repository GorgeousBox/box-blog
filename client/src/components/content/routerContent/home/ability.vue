<template>
  <article id="home-ability">
    <div class="home-introduce">
      <h2>测试小标题</h2>
      <p>
        这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者这里是测试者
      </p>
    </div>

    <div class="home-ability">
      <div class="home-information">
        <h3>个人信息</h3>
        <ul class="home-personal-data">
          <li>
            <p>昵称</p>
            <p>啊啊啊啊啊啊</p>
          </li>
          <li>
            <p>地址</p>
            <p>啊啊啊啊啊啊</p>
          </li>
          <li>
            <p>MAIL</p>
            <p>77777777777@qq.com</p>
          </li>
          <li>
            <p>GITHUB</p>
            <p><a href="" target="_black">http://hhhhhh.com</a></p>
          </li>
          <!-- <li>测试盒子占领了第二页</li> -->
        </ul>
      </div>

      <div class="home-skills">
        <h3>我的能力</h3>
        <ul>
          <Strip subject="HTML5&CSS3" width="width:70%"></Strip>
          <Strip subject="JavaScript" width="width:60%"></Strip>
          <Strip subject="Vue.js" width="width:50%"></Strip>
          <Strip subject="node.js" width="width:40%"></Strip>
          <Strip subject="c" width="width:30%"></Strip>
          <Strip subject="canvas" width="width:10%"></Strip>
        </ul>
        <!-- <li>测试盒子占领了补充能量中……</li> -->
      </div>
    </div>
  </article>
</template>

<script>


import Strip from "@/components/currency/strip";

export default {
  components: {
    Strip
  },
};
</script>

<style scoped lang="less">
// 移动端适应媒体查询
@media screen and (max-width: 850px) {
  h3
  {
    width: 100px !important;
    margin: 15px 0 15px 0 !important;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }

  .home-ability
  {
    flex-direction: column;
    
    .home-information
    {
      width: 100% !important;

      .home-personal-data
      {
        p
        {
          text-indent: 0 !important;
          margin-bottom: 5px;
          text-align: center;
        }
        p:nth-child(odd)
        {
          text-align: left;
          width: 80px !important;
          font-size: 14px !important;
        }
      }
    }
  }
}







  #home-ability
  {
    user-select: text;

    .home-introduce
    {
      span
      {
        font-style: italic;
        text-decoration: line-through;
        color: #777;
      }
    }

    .home-ability
    {
      display: flex;
      justify-content: space-between;

      h3
      {
        margin-bottom: 30px;
        font-weight: 400;
        font-size: 22px;
        color: #666;
      }

      .home-information
      {
        width: 55%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .home-personal-data
        {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          li
          {
            display: flex;

            p,a
            {
              color: #666;
              margin: 0;
              padding: 0;
              border: none;
              text-decoration: none;
              transition: .2s;
            }
            a:hover
            {
              color: skyblue;
            }
            p:nth-child(1)
            {
              width: 40%;
              color: #000;
              font-weight: bold;
            }
            p:nth-child(2)
            {
              flex: 1;
              letter-spacing: 0;
            }
          }
        }
      }

      .home-skills
      {
        flex: 1;
      }
    }
  }
</style>