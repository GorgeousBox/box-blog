<template>
  <div id="newsMA">
    <div class="none" v-show="!data.length">
      暂无消息……
    </div>

    <div class="newsMA-news" v-for="(item, value) in data" :key="value">
      <div class="newsMA-news-title">
        <div><span>{{item.name}}</span> 从主页给您发送消息</div>
        <div>他的邮箱是：{{item.email}}</div>
      </div>
      <div class="newsMA-news-title2" v-show="item.subject.length">主题：{{item.subject}}</div>
      <div class="newsMA-news-content">
        <div>{{item.message}}</div>
      </div>
      <div class="newsMA-news-bottom">
        <div @click="newsRemove(item)">已阅读并删除消息</div>
        <div>
          {{item.time | fmtTime(1)}}年{{item.time | fmtTime(2,false)}}月{{item.time | fmtTime(3,false)}}日 {{item.time | fmtTime(4)}}:{{item.time | fmtTime(5)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      data: [],
    };
  },

  methods: {
    async newsRemove(item){
      const id = item._id;

      let {data} = await this.$axios({
        method: "post",
        url: "/mail/remove",
        data: {id},
      });

      if(data.code !== 0) return this.$message.error(data.msg);

      return this.$message({
        type: "success",
        message: data.msg,
        onClose(){
          window.location.reload()
        }
      });
    },
  },

  async mounted(){
    let {data} = await this.$axios({
      method: "get",
      url: "/mail"
    });

    if(data.code !== 0) return this.$message.error(data.msg);

    this.data = data.data;
  },
}
</script>

<style lang="less" scoped>
#newsMA
{
  .none
  {
    height: 300px;
    font-family: Quicksand;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .newsMA-news
  {
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 10px;
    background: skyblue;
    border-radius: 3px;
    color: white;
    font-family: Quicksand;
    user-select: text;
    display: flex;
    flex-direction: column;

    .newsMA-news-title
    {
      margin-bottom: 10px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;

      div:nth-child(2)
      {
        font-size: 15px;
      }

      span
      {
        font-weight: bold;
        font-size: 16px;
      }
    }

    .newsMA-news-title2
    {
      font-size: 13px;
      margin-left: 40px;
    }

    .newsMA-news-content
    {
      margin: 20px 0;
      align-self: center;
    }

    .newsMA-news-bottom
    {
      display: flex;
      justify-content: space-between;

      div:nth-child(1)
      {
        color: white;
        font-weight: bold;
        cursor: pointer;

        &:hover
        {
          color: blue;
        }
      }
    }
  }
}

</style>