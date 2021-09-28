<template>
  <article id="home-preArticle">
    <div class="home-prearticle-introduce">
      <h2>热门文章</h2>
      <p> 热门文章推荐! <a href="/article">更多文章</a> 请访问文章页&gt;.&lt; </p>
    </div>

    <div class="home-prearticle">
      <div class="home-all-picture">
        <div v-if="data.length === 1"
             class="home-all-picture-1">
          <DynamicPicture :src="urlBase + data[0].coverSrc"
                          :title="data[0].title"
                          :href="'/article/' + data[0]._id"
                          ranking="一"
                          rankingColor="background:#FF9900;"></DynamicPicture>
        </div>
        <div v-if="data.length === 2"
             class="home-all-picture-2">
          <DynamicPicture :src="urlBase + data[0].coverSrc"
                          :title="data[0].title"
                          :href="'/article/' + data[0]._id"
                          ranking="一"
                          rankingColor="background:#FF9900;">
          </DynamicPicture>
          <DynamicPicture :src="urlBase + data[1].coverSrc"
                          :title="data[1].title"
                          :href="'/article/' + data[1]._id"
                          ranking="二"
                          rankingColor="background:#EEEEEE"></DynamicPicture>
        </div>
        <div v-if="data.length >= 3"
             class="home-all-picture-3">
          <div>
            <DynamicPicture :src="urlBase + data[0].coverSrc"
                            :title="data[0].title"
                            :href="'/article/' + data[0]._id"
                            ranking="一"
                            rankingColor="background:#FF9900;"></DynamicPicture>
          </div>
          <div>
            <DynamicPicture :src="urlBase + data[1].coverSrc"
                            :title="data[1].title"
                            :href="'/article/' + data[1]._id"
                            ranking="二"
                            rankingColor="background:#EEEEEE;"></DynamicPicture>
            <DynamicPicture :src="urlBase + data[2].coverSrc"
                            :title="data[2].title"
                            :href="'/article/' + data[2]._id"
                            ranking="三"
                            rankingColor="background:#996600"></DynamicPicture>
          </div>
        </div>
        <div v-if="data.length <= 0">
          暂无文章……
        </div>
      </div>
    </div>
  </article>
</template>

<script>

import DynamicPicture from "@/components/currency/dynamic-picture";

export default {
  data () {
    return {
      src: [
      ],
      href: [

      ],
      data: []
    }
  },
  components: {
    DynamicPicture
  },

  async mounted () {
    let { data: { data } } = await this.$axios({
      method: "post",
      url: "/art/all",
      data: {
        order: "reading"
      }
    });

    this.data = data
  }
}
</script>

<style scoped lang="less">
// 移动端适应媒体查询
@media screen and (max-width: 850px) {
  // #dynamic-picture
  // {
  //   width: 300px !important;
  //   height: 150px !important;
  // }
  .home-all-picture-2 {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    #dynamic-picture {
      margin-bottom: 5px !important;
    }
  }

  .home-all-picture-3 {
    justify-content: center;
    align-items: center;
    div:nth-child(1) {
      #dynamic-picture {
        margin-bottom: 5px !important;
      }
    }

    div {
      #dynamic-picture {
        margin-bottom: 5px !important;
      }
      margin: 0 !important;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}

.home-all-picture {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  background: url(../../../../assets/img/边框总.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .home-all-picture-1 {
    align-self: center;
    margin: 50px 20px;
  }
  .home-all-picture-2 {
    margin: 50px 20px;
    display: flex;
    justify-content: space-around;
  }
  .home-all-picture-3 {
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    margin: 50px 20px;

    & > div {
      margin: 20px 0;
      display: flex;

      div:nth-child(1) {
        margin-right: 20px;
      }
    }
  }
}
</style>