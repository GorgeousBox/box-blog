<template>
  <div id="Link">
    <article class="title">
      <h2>友情链接</h2>
      <p>请在
        <router-link to="/message">留言板</router-link>
        申请友链，本站友链信息：
      </p>
      <p>名称：阿巴阿巴</p>
      <p>网址：<a href="/">http://777777777777</a></p>
      <p>图标：<span>http://777777777777</span></p>
      <p>描述：用毒蛇的毒毒毒蛇毒蛇会被毒死吗？</p>
    </article>
    <article class="content">
      <ul>
        <li v-for="(item,value) in linkData" :key="value">
          <a  :href="item.link" target="_blank">
            <svg
              width="100%" height="100%"
              viewBox="0 0 300 150"
              preserveAspectRatio="none"
            >
              <path
                d="M 300 150 V 0 H 0 V 150 H 300"
                fill="none"
                stroke="#409eff"
                stroke-dasharray="900"
                stroke-dashoffset="900"
              ></path>
            </svg>
            <div class="top">
              <p
                class="img"
                :style="{backgroundImage:`url(${item.img})`}"
              ></p>
              <p class="name">
                {{item.name}}
              </p>
            </div>
            <div class="bot">
              <p class="des">{{item.dec}}</p>
            </div>
          </a>
        </li>
        <div v-show="!linkData.length" class="noneDiv">
          还没有友联哦……
        </div>
      </ul>
    </article>
  </div>
</template>

<script>
export default {
  name: "Link",
  data() {
    return {
      linkData: [],
    }
  },
  async created(){
    this.Reset();
    document.title = '日常代码·友链';
    let res = await this.$axios.post("/friend/huo")
    this.linkData = res.data.data
  }
}
</script>

<style scoped lang="less">
#Link {
  opacity: 0.96;
  user-select: text;

  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand", "Microsoft YaHei", sans-serif;
  }

  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    border-left: 5px solid #73b899;
    text-indent: 10px;
  }

  p {
    text-indent: 2em;
    color: #444;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;

    span {
      color: #bd4147;
      background-color: rgba(27, 31, 35, .05);
      font-weight: 700;
      @media screen and (max-width: 850px) {
        letter-spacing: 1px;
        font-size: 12px !important;
      }
    }

    a {
      color: #409eff;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  article.content {
    margin-top: 10px;
    p {
      text-indent: 0;
    }

    .noneDiv
    {
      font-family: "Quicksand";
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        position: relative;
        box-sizing: border-box;
        flex: 1;
        min-width: 260px;
        margin: 0 7.5px 15px;
        background-color: rgba(27, 31, 35, .05);

        a {
          box-sizing: border-box;
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          padding: 5px;
          svg {
            position: absolute;
            top: 0;
            left: 0;
            path{
              transition: 1s;
            }
          }
          &:hover{
            svg path{
              stroke-dashoffset: 0;
            }
          }
        }



        div.top {
          display: flex;
          height: 50px;

          p.img {
            width: 50px;
            height: 50px;
            background-position: center center;
            background-size: cover;
            border-radius: 50%;
          }

          p.name {
            flex: 1;
            font-size: 14px;
            height: 50px;
            margin-left: 15px;
            line-height: 50px;
            color: #409eff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        div.bot {
          p {
            font-size: 12px;
            height: 60px;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>