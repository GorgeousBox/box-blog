<template>
  <div id="life">
    <el-timeline v-if="data">
      <el-timeline-item  
        class="el-timeline"
        v-for="(item,value) in data" 
        :key="value"
        placement="top" 
        :timestamp="item.time | fmtTime"
        color="skyblue">
        <el-card>
          <h4>{{item.title}}</h4>
          <p>{{item.msg}}</p>
          <img v-if="item.imgSrc" :src="urlBase+item.imgSrc">
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <div class="no" v-if="data.length <= 0">
      暂无记录....
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      data: {},
    };
  },

  async mounted(){
    this.Reset();
    document.title = '日常代码·生活'
    let {data:{data}} = await this.$axios({
      method: "post",
      url: "/life/huo"
    });

    this.data = data;
  },
}
</script>

<style scoped lang="less">
#life
{
  user-select: text;

  img
  {
    margin-top: 10px;
    max-width: 400px;
    max-height: 400px;

    @media screen and (max-width: 850px) {
      max-width: 250px;
      max-height: 250px;
    }
  }
  /deep/.el-timeline
  {
    .el-timeline-item__timestamp
    {
      color: white;
      font-weight: bold;
      font-family: Quicksand;
      font-size: 14px;
    }
    .el-timeline-item__tail
    {
      border-left: 2px solid skyblue;
    }
    .el-timeline-item__content
    {
      width: initial;
      white-space: pre-line;
    }
  }
  
  .no
  {
    box-sizing: border-box;
    padding: 20px;
    background: white;
  }
}
</style>