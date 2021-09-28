<template>
  <div id="hot-article">
    <div class="title">热门文章</div>
    <ul class="articleTitle">
      <li v-for="(item,value) in dataCom"
          :key="value"
          :class="{liChange: value === 0, liChange2: value === 1, liChange3: value === 2}">
        <i>{{value + 1}}</i>
        <a class="a"
           :href="'/article/' + item._id">{{item.title}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      order: "reading",
    };
  },

  computed:{
    dataCom(){
      if(document.body.clientWidth < 850) return this.data.slice(0,3);
      else return this.data.slice(0,5);
    }
  },

  async mounted () {
    let { data } = await this.$axios({
      method: "post",
      url: "/art/all",
      data: {
        order: this.order,
      }
    });

    this.data = data.data;
  },
}
</script>

<style scoped lang="less">
#hot-article {
  width: 100%;
  margin-top: 15px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;

  .title {
    width: 16px;
    margin-bottom: 10px;
    border-right: 1px solid #ccc;
    font-family: Quicksand;
    font-weight: bolder;
    padding-right: 15px;
    margin-right: 15px;
    color: white;
  }

  .articleTitle {
    li {
      width: 100%;
      height: 40px;
      display: flex;
      margin-bottom: 3px;

      i {
        margin-top: 10px;
        display: inline-block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        text-align: center;
        line-height: 16px;
        font-family: Pacifico;
        background: #71a598;
        color: white;
        margin-right: 10px;
        font-style: normal;
      }

      .a {
        flex: 1;
        display: inline-block;
        line-height: 40px;
        height: 100%;
        // background: brown;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        color: white;

        &:hover {
          color: #409eff;
          text-decoration: underline;
        }
      }
    }

    .liChange {
      i {
        background: rgb(255, 153, 0);
      }
    }
    .liChange2 {
      i {
        background: #EEEEEE;
      }
    }
    .liChange3 {
      i {
        background: rgb(153, 102, 0);
      }
    }
  }
}
</style>