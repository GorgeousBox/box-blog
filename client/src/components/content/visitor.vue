<template>
  <div id="visitor">
    <h4>最近访客</h4>
    <ul>
      <li v-for="(item,value) in visitorList" :key="value" :style="{backgroundImage:`url(${item.user.img})`}" :title="item.user.user">
        <p>{{item.user.user}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Visitor",
  data(){
    return {
      visitorList: []
    }
  },

  methods: {
    async getVisitor(){
      let {data} = await this.$axios({
        method: "get",
        url: "/visitor",
      })

      this.visitorList = data.data;
    }
  },

  async created(){
    this.getVisitor()
  }
}
</script>

<style scoped lang="less">
#visitor{
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  // box-shadow: 0 0 4px #ddd;
  padding: 0 20px 20px 20px;
  display: flex;

  > h4 {
    width: 20px;
    line-height: 20px;
    padding-bottom: 10px;
    border-right: 1px solid #ccc;
    color: white;
    font-size: 16px;
    padding-right: 15px;
    margin-right: 10px;
  }
  ul{
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    li{
      border-radius: 5px;
      position: relative;
      overflow: hidden;
      float: left;
      width: 53px;
      height: 53px;
      margin-right: 6px !important;
      margin-bottom: 6px;
      background: none no-repeat center center/cover;
      
      &:nth-child(4n){
        margin-right: 0;
      }
      p{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 16px;
        background-color: rgba(0,0,0,.5);
        color: #fff;
        text-align: center;
        line-height: 16px;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
      }
    }
  }
}
</style>