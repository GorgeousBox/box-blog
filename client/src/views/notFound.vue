<template>
  <div id="notFound">
    <div class="notFound-go" @click="go">
      在返回首页看看吧
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    go(){
      window.location.href = "/"
    }
  },

  mounted(){
    this.$emit('getShopCode', true);
    document.title = '日常代码·找不到啊'
  }
}
</script>

<style lang="less" scoped>

#notFound
{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background: url(../assets/img/404.jpg) no-repeat top/cover;

  .notFound-go
  {
    width: 170px;
    height: 30px;
    line-height: 30px;
    position: absolute;
    left: 0;
    right: 25px;
    bottom: 0;
    top: 400px;
    margin: auto;
    text-align: center;
    transition: all .2s;
    background: #85ABB4;
    font-weight: bold;
    border-radius: 20px;
    font-size: 13px;

    &:hover
    {
      color: white;
      background: skyblue;
    }
  }
}

</style>