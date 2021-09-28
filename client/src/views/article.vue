<template>
  <div id="article">
    <div class="article-classification" :class="{moveClick:moveClick}">
      <div class="article-classification-title">文章分类：</div>
      <div class="article-classification-all">
        <a v-for="(item,value) in classificationData"
           :key="value"
           @click="classificationClick(item,value)"
           :class="{'article-classification-Click': item.state}">{{item.name}}</a>
      </div>
      <div class="article-classification-open" @click="moveArticleOpen" :class="{'article-classification-open-close':moveClick}">
        <i class="iconfont icon-dayuhao"></i>
      </div>
    </div>
    <div class="article-none"
         v-if="!data.length">
      <p>该标签下还没有文章哦，去看看别的标签吧</p>
    </div>
    <div class="article-all"
         v-else>
      <Anyone v-for="(item,value) in data"
              :key="value"
              :articleTitleType="item.titleType"
              :articleTitle="item.title"
              :articleimg="urlBase + item.coverSrc"
              :articleDescribe="item.describe"
              :articleReading="item.reading"
              :articleComments="item.comment.length"
              :articleDate="item.date"
              :articleLabel="item.label"
              :article_id="item._id"
              :top="item.top"></Anyone>
    </div>
  </div>
</template>

<script>
import Anyone from "@/components/content/routerContent/article/anyone";

export default {
  data () {
    return {
      data: [],
      order: "date", // 判断排序类型
      moveClick: true,// 移动端文章分类展开数据

      // 分类数据
      classificationData: [
        { name: "全部", state: true },
        { name: "个人日记", state: false },
        { name: "JavaScript", state: false },
        { name: "web前端", state: false },
        { name: "vue.js", state: false },
        { name: "3d建模", state: false },
      ],
    }
  },

  components: {
    Anyone
  },

  methods: {
    // 移动端文章分类展开
    moveArticleOpen(){
      this.moveClick = !this.moveClick;
    },

    // 文章置顶函数
    articleTop (data) {
      data.forEach((item, value) => {
        if (item.top) 
        {
          data.splice(value, 1);
          data.unshift(item);
          return false;
        }
      });
    },

    // 文章分类点击效果以及发送后端改变内容
    async classificationClick (item, value) {
      this.classificationData.forEach(item2 => {
        item2.state = false;
      });
      item.state = true;

      const { data } = await this.$axios({
        method: "post",
        url: "/art/classification",
        data: { name: item.name },
      });

      if (data.code) return this.$message.error(data.msg);

      this.articleTop(data.data);
      this.data = data.data;
    }
  },

  async mounted () {
    this.Reset();
    document.title = '日常代码·总文章'
    let { data } = await this.$axios({
      method: "post",
      url: "/art/all",
      data: {
        order: this.order,
      }
    });

    this.articleTop(data.data);
    this.data = data.data;
  },
}
</script>

<style scoped lang="less">
@media screen and (max-width: 850px) {
  .moveClick
  {
    top: -330px !important;
  }

  .article-classification-open-close
  {
    transform: rotateZ(90deg) !important;
  }

  #article {
    margin-top: 20px;

    .article-classification {
      width: 90px !important;
      height: 350px !important;
      position: fixed !important;
      top: 0;
      left: 0 !important;
      z-index: 2;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 !important;
      border-radius: 0 !important;
      margin: 0 !important;
      transition:all .3s;

      .article-classification-title {
        margin: 30px 0 0 10px;
      }

      .article-classification-all {
        flex-direction: column;
        a
        {
          margin-top: 10px;
        }
      }

      .article-classification-open {
        transition: all .3s;
        height: 90px;
        position: relative;
        bottom: -35px;
        display: flex !important;
        justify-items: center;
        align-items: center;
        transform: rotateZ(-90deg);
      }
    }
  }
}

.article-classification-open {
  display: none;
  transform: rotateZ(90deg);
}

.article-classification-Click {
  color: rgb(247, 171, 8) !important;
}

#article {
  opacity: 0.96;

  .article-classification {
    display: flex;
    width: 100%;
    height: 40px;
    background: white;
    border-radius: 30px;
    box-shadow: 0 0 3px #ccc;
    margin: 10px 0 20px 0;
    box-sizing: border-box;
    padding-left: 20px;
    align-items: center;
    font-weight: bold;

    .article-classification-all {
      display: flex;
      margin-top: 2px;

      a {
        display: inline-block;
        height: 100%;
        color: rgb(129, 127, 127);
        font-size: 14px;
        margin-left: 10px;
        transition: all 0.3s;

        &:hover {
          color: rgb(247, 171, 8);
        }
      }
    }
  }
}
.article-none {
  box-sizing: border-box;
  padding: 50px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>