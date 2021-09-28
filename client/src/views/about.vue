<template>
  <div id="About">
    <article>
      <h2>关于自己</h2>
      <p>灰化肥挥发会发黑</p>
      <!-- 我以占领高地，结束战斗 -->
    </article>
    <article>
      <h2>关于网站</h2>
      <p>灰化肥挥发会发黑灰化肥挥发会发黑</p>
    </article>
    <article>
      <h2>特殊说明</h2>
      <p>灰化肥挥发会发黑灰化肥挥发会发黑灰化肥挥发会发黑</p>
    </article>
    <article>
      <h2>关于其他</h2>
      <p>灰化肥挥发会发黑灰化肥挥发会发黑灰化肥挥发会发黑灰化肥挥发会发黑</p>
    </article>
  </div>
</template>

<script>
export default {
  name: "About",

  methods: {
  },

  mounted(){
    this.Reset();
    document.title = '日常代码·关于'
  }
}
</script>

<style lang="less" scoped>
#About {
  opacity: 0.96;
  user-select: text;
  // cursor: url("../assets/img/光标文本.jpg"), default;
  
  article{
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand","Microsoft YaHei",sans-serif;
  }
  h2{
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    border-left: 5px solid #73b899;
    text-indent: 10px;
  }
  p{
    text-indent: 2em;
    color: #444;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;
    pre{
      text-indent: 0;
      display: inline-block;
      font-family: "Quicksand","Microsoft YaHei",sans-serif;
      font-size: 14px;
    }
    span{
      color: #bd4147;
      background-color: rgba(27,31,35,.05);
      font-weight: 700;
    }
    a{
      color: #409eff;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>