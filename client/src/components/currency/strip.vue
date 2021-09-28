<template>
  <div id="strip" :class="{'margin':margin}">
    <div class="header">
      <span>{{subject}}</span>
      <span>{{widthTrue}}</span>
    </div>

    <div class="strip">
      <div class="big">
        <div class="samll" :style="width" ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subject: String,
    width: String,
    margin:{
      type: Boolean,
      default: true,
    },
  },
  data()
  {
    return {
      widthTrue: this.width.slice(6)
    };
  },
}
</script>

<style scoped lang="less">

.margin
{
  margin-bottom: 15px;
}

#strip
{
   .header
  {
    margin-bottom: 5px;
    font-weight: bold;
    letter-spacing: 2px;

    span:nth-child(1)
    {
      color: #000;
    }
    span:nth-child(2)
    {
      float: right;
      font-size: 12px;
      color: #999;
    }
  }


  .big
  {
    width: 100%;
    height: 5px;
    border-radius: 3px;
    background: #ececec;
    overflow: hidden;

    .samll
    {
      height: 100%;
      background: #bfe2e6;
    }
  }
}
</style>