<template>
  <div id="home">
    <Ability />
    <PreArticle />
    <Work />
    <SendMail />
  </div>
</template>
  
<script>

import Ability from "@/components/content/routerContent/home/ability";
import PreArticle from "@/components/content/routerContent/home/preArticle";
import SendMail from "@/components/content/routerContent/home/Send-mail";
import Work from "@/components/content/routerContent/home/work";

export default {
  components: {
    Ability,
    PreArticle,
    SendMail,
    Work
  },

  mounted () {
    this.Reset();
    document.title = '日常代码'
  }
};
</script>

<style scoped lang="less" >
// 移动端适应媒体查询
@media screen and (max-width: 850px) {
  /deep/#home-preArticle,/deep/#home-ability,/deep/#Send-mail,/deep/#work
  {
    h2
    {
      font-size: 25px !important;
    }
  }
}









#home
{
  opacity: 0.96;
}
/deep/#home-preArticle,/deep/#home-ability,/deep/#Send-mail,/deep/#work
{
  width: 100%;
  // min-width: 0;
  background: white;
  box-sizing: border-box;
  padding: 25px 20px;
  box-shadow: 0 0 4px #ddd;
  font-family: Quicksand !important;
  margin-bottom: 20px;
  color: #444;

  div:nth-child(1)
  {
    h2
    {
      font-size: 30px;
      letter-spacing: 3px;
      margin-bottom: 25px;
    }

    p
    {
      line-height: 30px;
      font-size: 15px;
      letter-spacing: 4px;
      text-indent: 2em;
      border-bottom: 1px solid #ddd;
      padding-bottom: 20px;
      margin-bottom: 20px;

      a
      {
        text-decoration: underline;
        color: #aaa;
      }
    }
  }
}
</style>