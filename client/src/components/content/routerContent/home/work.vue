<template>
  <article id="work">
    <h2>历史进程</h2>
    <ul>
      <li>
        <div class="left">
          <p class="time">2021-5-9</p>
        </div>
        <div class="right">
          <h3>
            IDOT KONW
          </h3>
          <p class="img">
            <img src="" width="auto" height="30" alt="">
          </p>
          <p class="company">
            我不到啊
          </p>
          <p class="content">
            阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴
          </p>
        </div>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="less">
@media screen and (max-width: 850px) {
  #work
  {
    ul
    {
      .right
      {
        margin-top: 10px !important;
      }
      
      li
      {
        display: flex;
        flex-direction: column;
      }
    }
  }
}






#work{
  p{
    padding: 0 !important;
  }

  ul {
    margin-top: 40px;
    li{
      display: flex;
      div.left{
        width: 200px;
        p.time{
          position: relative;
          top: -12px;
          width: 160px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-weight: 700;
          background-color: #bfe2e6;
          &::after{
            position: absolute;
            top: 0;
            right: -30px;
            content: "";
            width: 0;
            height: 0;
            border: 15px solid transparent;
            border-left-color: #bfe2e6;
          }
        }
      }
      div.right{
        box-sizing: border-box;
        flex: 1;
        padding-left: 20px;
        padding-right: 40px;
        padding-bottom: 40px;
        border-left: 2px solid #bfe2e6;
        h3{
          position: relative;
          margin-bottom: 20px;
          margin-top: -10px;
          line-height: 25px;
          font-size: 17px;
          &::before{
            position: absolute;
            content: "";
            top: 10px;
            left: -23px;
            width: 4px;
            height: 4px;
            background-color: #000;
          }
        }
        p.img{
          margin-bottom: 20px;
        }
        p.company{
          color: #000;
          margin-bottom: 20px;
        }
        p.content{
          color: #777;
          letter-spacing: 1px;
          font-size: 16px;
        }
      }
      &:last-child{
        div.right{
          border-color: transparent;
        }
      }
    }
  }
}
</style>