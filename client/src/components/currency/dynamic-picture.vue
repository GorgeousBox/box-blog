<template>
  <div id="dynamic-picture">
    <div>
      <img :src="src" alt="">
    </div>
    <a class="picture-background" :href="href">
      <div class="picture-ranking" :style="rankingColor">第{{ranking}}</div>
      <div class="picture-html">{{title}}</div>
      <div class="picture-more">阅读文章</div>
      <div class="picture-title">{{title}}</div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    href: {
      type: String,
      default: "/",
    },
    title: String,
    ranking: String,
    rankingColor: String,
  }
};
</script>

<style scoped lang="less">
@media screen and (max-width: 850px) {
  img
  {
    max-width: 260px !important;
    max-height: 250px !important;
  }
}





#dynamic-picture
{
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  display: table;
  .picture-ranking
  {
    width: 150px;
    height: 25px;
    transform: rotateZ(-45deg);
    margin-left: -35px;
    margin-top: 30px;
    text-align: center;
    line-height: 25px;
    box-shadow: 0 5px 10px black;
    color: skyblue;
    font-weight: bold;
  }

  >div
  {
    display: table-cell;
    vertical-align: middle;

    img
    {
      max-width: 350px;
      max-height: 300px;
      transform: scale(1.3);
    }
  }

  .picture-background
  {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transition: all .4s;
  }
  .picture-background:hover
  {
    background: rgba(0, 0, 0, .4);
    .picture-title
    {
      bottom: -30px;
    }

    .picture-html
    {
      opacity: 1;
      top: 30%;
    }
    .picture-more
    {
      opacity: 1;
      bottom: 30%;
    }
  }

  .picture-html
  {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 20%;
    font-size: 20px;
    font-weight: bold;
    color: white;
    opacity: 0;
    transition: all .4s;
  }

  .picture-more
  {
    width: 30%;
    height: 32px;
    position: absolute;
    bottom: 20%;
    left: 50%;
    font-size: 15px;
    text-align: center;
    line-height: 32px;
    font-weight: bold;
    color: #000;
    background: #bfe2e6;
    transform: translateX(-50%);
    border-radius: 32px;
    opacity: 0;
    transition: all .4s;
  }

  .picture-title
  {
    height: 30px;
    width: 100%;
    background: rgba(0, 0, 0, .2);
    color: white;
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    bottom: 0;
    font-weight: bold;
    transition: all .4s;
  }
}
</style>