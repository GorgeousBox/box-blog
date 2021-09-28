<template>
  <div id="articleID">
    <div class="no"
         v-if="data.length <= 0">
      <NotFound />
    </div>

    <div class="yes"
         v-else>
      <div class="articleID-content-all">
        <div class="articleID-head">
          <div class="articleID-head-title">
            <div class="articleID-head-title-title">
              {{data.title}}
            </div>
            <div class="articleID-head-title-info">
              <li>作者：<a href="">{{data.author}}</a></li>
              <li>吃瓜群众：{{data.reading}}</li>
              <li>更新于 {{ data.date | fmtTime }}</li>
            </div>
          </div>

          <div class="articleID-head-date">
            <div class="articleID-head-date-day">{{ data.date | fmtTime(3) }}</div>
            <div class="articleID-head-date-month">
              <li>{{ data.date | fmtTime(2,false) }}月</li>
              <li>{{ data.date | fmtTime(1) }}</li>
            </div>
          </div>
        </div>

        <div id="articleID-content"></div>

        <div class="articleID-explain">
          <li>非特殊说明，原创文章版权归 华丽的小盒子 所有，转载请注明出处</li>
          <li>本文标题： <a href="">{{data.title}}</a></li>
          <li>本文网址： <a href="">{{currentUrl}}</a></li>
        </div>

        <div class="articleID-link">
          <div class="articleID-link-title">
            <p>文章链接</p>
          </div>
          <div class="articleID-link-link">
            <li v-for="(item,value) in data.link"
                :key="value">
              <i class="iconfont icon-biaoji"></i>
              <a target="_blank" :href="item[1]">{{item[0]}}</a>
            </li>
            <li v-show="[data.link].length <= 2">
              <i class="iconfont icon-biaoji"></i>
              <a target="_blank" href="">没有了...</a>
            </li>
          </div>
        </div>
      </div>

      <!-- <div class="articleID-share">
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <a href=""></a>
        <i class="iconfont icon-weixin1"></i>
        <i class="iconfont icon-weibo"></i>
        <i class="iconfont icon-qq"></i>
        <i class="iconfont icon-062qqkongjian"></i>
      </div> -->

      <div class="Message">
        <article class="title">
          <h2>发表评论</h2>
          <el-input type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    maxlength="100"
                    show-word-limit
                    v-model="textarea">
          </el-input>
          <div class="btn-i">
            <i class="iconfont icon-biaoqing"
               @click.stop="handleToggleEmoji(1)"></i>
            <div v-show="showEmoji1"
                 @click.stop
                 class="emoji">
              <ul>
                <li v-for="item in emoji"
                    @click="handleEmojiClick(item)"
                    :key="item">
                  {{item}}
                </li>
              </ul>
            </div>
            <el-button type="primary"
                       size="mini"
                       @click="publishMsg">发表</el-button>
            <div class="clear"></div>
          </div>
        </article>
        <article class="content">
          <ul>
            <div class="infinite-list-sort"
                 v-if="!msgData.length <= 0">
              <p class="infinite-list-sort-p"
                 @click="getMsg(0, false);"
                 :class="{'infinite-list-sort-p-change': !sortColor}">最热</p>
              <p>|</p>
              <p class="infinite-list-sort-p"
                 @click="getMsg(1, false);"
                 :class="{'infinite-list-sort-p-change': sortColor}">最新</p>
            </div>
            <!-- 评论加回复 -->
            <li v-for="(item,value) in msgData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                :key="value">
              <!-- 评论 -->
              <div class="parent">
                <div class="left">
                  <img :src="item.userId.img"
                       alt="">
                </div>
                <div class="right">
                  <div class="name-time">
                    <span>{{item.userId.user}}</span>
                    <span class="name-time-type"
                          v-if="item.type === 'admin'">
                      站长
                    </span>
                    <span class="name-time-type2"
                          v-else></span>
                    <span>{{item.time | fmtTime}}</span>
                  </div>
                  <div class="message">{{item.msg}}</div>
                  <div class="like-reply">
                    <i class="like iconfont icon-heart-fill"
                       :class="{clickLike: item.likes.indexOf(userInfo._id) !== -1}"
                       @click="likeClick(item,item,value)"></i>
                    <span>{{item.likes.length}}</span>
                    <i class="reply iconfont icon-pinglun"
                       @click="replyClick(item, item, value)"></i>
                  </div>
                </div>
              </div>
              <!-- 回复 -->
              <div class="child"
                   v-for="(item2,value2) in item.children"
                   :key="value2">
                <div class="left">
                  <img :src="item2.userId.img"
                       alt="">
                </div>
                <div class="right">
                  <div class="name-time">
                    <span>{{item2.userId.user}}</span>
                    <span class="name-time-type"
                          v-if="item2.type === 'admin'">
                      站长
                    </span>
                    <span class="name-time-type2"
                          v-else></span>
                    <span>{{item2.time | fmtTime}}</span>
                  </div>
                  <div class="message">
                    <span>@{{item2.reply.user}}</span>
                    <div>{{item2.msg}}</div>
                  </div>
                  <div class="like-reply">
                    <i class="like iconfont icon-heart-fill"
                       :class="{clickLike: item2.likes.indexOf(userInfo._id) !== -1}"
                       @click="likeClick(item, item2, value2, value)"></i>
                    <span>{{item2.likes.length}}</span>
                    <i class="reply iconfont icon-pinglun"
                       @click="replyClick(item, item2)"></i>
                  </div>
                </div>
              </div>
              <!-- 回复框 -->
              <div class="replyInput"
                   :class="{
                'show': item.isShowReply
              }">
                <el-input type="textarea"
                          :rows="1"
                          v-model="item.replyTxt"
                          :placeholder="'@'+item.replyUser.user"
                          size="mini"></el-input>
                <el-button class="replyBtn"
                           type="primary"
                           size="mini"
                           @click="replySubmit(item)">回复
                </el-button>
                <div class="clear"></div>
              </div>
            </li>
            <el-pagination layout="total, prev, pager, next, jumper"
                           :current-page.sync="currentPage"
                           :total="msgData.length"
                           @current-change="handleCurrentChange"
                           class="paging"
                           :page-size="pagesize"
                           :hide-on-single-page="true">
            </el-pagination>
            <div v-if="data.comment !== undefined && data.comment.length <= 0">还没有评论哦……</div>
          </ul>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NotFound from "@/views/notFound"
import homeVue from './home.vue';

export default {
  name: "articleID",
  data () {
    return {
      data: {},
      id: this.$route.params.id,
      currentUrl: window.location.href,
      // 当前页
      currentPage: 1,
      // 每页多少条
      pagesize: 7,


      // 评论数据
      textarea: "",
      showEmoji1: false,
      showEmoji2: false,
      emoji: [
        "😃", "😁", "😂", "😊", "🙃", "🥰", "😘", "🤭", "🤔", "😏",
        "😵", "😟", "🙁", "😳", "😰", "😭", "😖", "😡", "😠", "😈",
        "🤡", "☠️", "👻", "🙈", "🙉", "❤️", "💖", "💢", "💣", "💤",
        "👋", "👍", "👌", "🤞", "🤟", "🤙", "👊", "🖕", "🤝", "🙏",
        "🙅", "🙅‍♂️", "👨‍✈️", "👩‍✈️", "👷", "👷‍♀️", "🤦", "🤦‍♂️", "👴", "🧓",
        "🐴", "🐮", "🐖", "🐑", "🐓", "🦚", "🐲", "🐳", "🐟", "🐌",
      ],
      msgData: [],
      sortColor: false,
    };
  },

  components: {
    NotFound,
  },

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    //点击每一个emoji的时候，加入input
    handleEmojiClick (item) {
      this.textarea += item
      this.showEmoji1 = false;
    },

    //切换emoji的显示与隐藏
    handleToggleEmoji (showEmoji) {
      switch (showEmoji)
      {
        case 1: this.showEmoji1 = !this.showEmoji1; break;
        case 2: this.showEmoji2 = !this.showEmoji2; break;
      }
    },

    // 发表评论函数
    async publishMsg () {
      let userId = this.userInfo._id;
      let msg = this.textarea.trim();
      let type = this.userInfo.type;
      let time = Date.parse(new Date());

      if (!userId) return this.$message.error("请先登录");
      if (!msg) return this.$message.error("请先输入留言内容");

      let info = { msg, userId, time, type }

      let { data } = await this.$axios({
        method: "post",
        url: "/art/comment",
        data: {
          userId,
          info,
          msgId: this.data._id,
        }
      });

      if (data.code) return this.$message.error(data.msg)

      this.$message({
        type: "success",
        duration: 1000,
        message: data.msg,
        onClose () {
          window.location.reload()
        },
      });

      this.textarea = "";
    },

    // 回复按钮点击
    replyClick (item, thisItem) {
      if (!this.userInfo._id) return this.$message.error("请先登录");
      if (
        thisItem.userId._id === item.replyUser._id
        && item.isShowReply
      )
      {
        item.isShowReply = false
        return
      }
      item.replyUser = thisItem.userId;

      item.isShowReply = true;
    },

    // 回复提交
    async replySubmit (item) {
      let userId = this.userInfo._id;
      let msg = item.replyTxt.trim();
      let type = this.userInfo.type;
      let reply = item.replyUser._id;

      if (!msg) return this.$message.error("请先输入留言内容");

      let msgId = item._id;
      let child = { msg, userId, reply, type };

      let { data } = await this.$axios({
        method: "post",
        url: "/art/reply",
        data: {
          msgId,
          child,
        }
      })

      if (data.code) return this.$message.error(data.msg);

      this.$message({
        type: "success",
        duration: 1000,
        message: data.msg,
        onClose () {
          window.location.reload()
        },
      });
    },

    // 点赞
    async likeClick (item, item2, Index, Index2) {
      let userId = this.userInfo._id
      let acId = this.data._id

      if (!userId) return this.$message.error("请先登录")

      // let likes = item2.likes;
      // let index = likes.indexOf(userId);

      // if (index !== -1) likes.splice(index, 1)
      // else likes.push(userId);
      let likes = userId;

      let { data: { data } } = await this.$axios({
        method: "post",
        url: "/art/id/like",
        data: {
          parentId: item._id,
          childId: item2._id,
          likes,
          Index,
          Index2,
          acId
        }
      });

      console.log(data);
      let isChild = item._id !== item2._id;

      if (isChild) item2.likes = data;
      else item.likes = data;
    },

    // async handleCurrentChange(val){
    //   let {data} = await this.$axios({
    //     method: 'post',
    //     url: "/art/sort",
    //     data: { 
    //       id: this.id 
    //     }
    //   });

    //   const number = 10;
    //   // this.data
    // }
    // 获取评论
    async getMsg (sort, is = true) {
      this.sortColor = !this.sortColor;
      let res = await this.$axios({
        method: 'get',
        url: "/art/id",
        params: {
          id: this.id,
          sort
        }
      })

      this.data = res.data.data;
      this.msgData = this.data.comment;

      if (this.data && !this.data.length)
      {
        this.data.comment.filter(item => {
          this.$set(item, "replyTxt", "")
          this.$set(item, "replyUser", { ...item.userId })
          this.$set(item, "isShowReply", false)
        });

        if (is)
        {
          let { data } = await this.$axios({
            method: 'get',
            url: this.data.srcMD
          })

          editormd.markdownToHTML("articleID-content", {
            markdown: data,
            toc: false,
            emoji: true,
            taskList: true,
            tex: true,
            flowChart: true,
            sequenceDiagram: true
          });
        }
      }
    },

    handleCurrentChange (val) {
      // this.currentPage = currentPage;
    },

  },


  async mounted () {
    this.Reset();
    document.title = '日常代码·文章';
    this.getMsg(1);
  },
};
</script>

<style scoped lang="less">
@media screen and (max-width: 850px) {
  /deep/#articleID-content
  {
    padding: 0 !important;
  }

  #articleID
  {
    padding: 20px 15px !important;

    .articleID-head-title-info
    {
      flex-wrap: wrap;
    }
  }

  /deep/.number, /deep/.btn-prev, /deep/.btn-next
  {
    width: 30px !important;
    padding: 0;
  }

  // /deep/.paging
  // {
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  // }

  .content
  {
    padding: 25px 10px !important;
  }

  .articleID-head-date
  {
    display: none !important;
  }
}
/deep/.el-pagination__jump, /deep/.el-pagination__total
{
  margin: 0 !important;
}
.name-time-type {
  background: #ffcc33;
  border-radius: 2px;
  font-size: 12px;
  margin: 0 5px 0 2px !important;
  color: white !important;
}
.name-time-type2 {
  margin: 0 5px 0 2px;
}

.articleID-explain
{
  li:nth-child(3)
  {
    display: flex;
    align-items: center;
    a
    {
      overflow: hidden;
      display: inline-block;
      max-width: 200px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}





.name-time-type {
  background: #ffcc33;
  border-radius: 2px;
  font-size: 12px;
  margin: 0 5px 0 2px !important;
  color: white !important;
}
.name-time-type2 {
  margin: 0 5px 0 2px;
}

#articleID {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 25px;
  background: white;
  box-shadow: 0 0 4px #ddd;
  // max-width: 1000px;
  user-select: text;
  opacity: 0.96;

  .articleID-content-all {
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid #e1e2e0;

    .articleID-head {
      width: 100%;
      border-bottom: 1px solid #e8e9e7;
      display: flex;
      align-content: center;
      margin-bottom: 10px;

      .articleID-head-title {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;

        .articleID-head-title-title {
          font-size: 20px;
          margin-bottom: 5px;
        }

        .articleID-head-title-info {
          display: flex;
          font-size: 12px;
          color: #787977;

          li {
            margin-right: 15px;

            a {
              color: skyblue;
            }
          }
        }
      }

      .articleID-head-date {
        width: 80px;
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        font-family: Quicksand;

        .articleID-head-date-day {
          font-size: 38px;
          text-align: center;
          font-weight: bold;
          color: #00cc66;
        }

        .articleID-head-date-month {
          display: flex;
          justify-content: space-between;
          font-size: 17px;
          color: #989997;
        }
      }
    }

    #articleID-content {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      box-sizing: border-box;
      padding: 10px;
    }

    .articleID-explain {
      box-sizing: border-box;
      margin-top: 30px;
      padding: 20px;
      background: #f8f9f7;

      li {
        color: #565755;
        font-size: 13px;
        line-height: 20px;

        a {
          color: skyblue;
        }
      }
    }

    .articleID-link {
      margin-top: 10px;

      .articleID-link-title {
        background: #f8f9f7;
        display: flex;
        border-left: 5px solid #00cccc;

        p {
          line-height: 40px;
          margin-left: 30px;
          color: #585957;
          font-size: 16px;
        }
      }

      .articleID-link-link {
        margin: 10px 0 0 10px;
        a {
          margin-left: 5px;
          color: skyblue;
        }
      }
    }
  }

  .articleID-share {
    box-sizing: border-box;
    padding: 30px 0;
    border-bottom: 1px solid #e1e2e0;
    display: flex;
    justify-content: center;

    i {
      display: inline-block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      line-height: 50px;
      text-align: center;
      margin-right: 20px;
      font-size: 30px;

      &:nth-child(1) {
        border: 2px solid #5ac64f;
        color: #5ac64f;
        line-height: 55px;
      }
      &:nth-child(2) {
        border: 2px solid #ff7171;
        color: #ff7171;
      }
      &:nth-child(3) {
        border: 2px solid #14afff;
        color: #14afff;
      }
      &:nth-child(4) {
        border: 2px solid #fbb611;
        color: #fbb611;
        margin: 0;
        font-size: 35px;
      }
    }
  }
}

.clickLike {
  color: red !important;
}

.Message {
  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    padding: 25px 20px;
    font-family: "Quicksand", "Microsoft YaHei", sans-serif;
    border-bottom: 1px dashed skyblue;

    /deep/.number {
      cursor: url("../assets/img/光标手指.gif"), default !important;
    }

    &.title {
      margin: 0;
      display: inline-block;

      h2 {
        margin-bottom: 15px;
        font-size: 16px;
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
        margin-bottom: 20px;
      }
      /deep/ textarea {
        height: 70px;
        font-size: 12px;
        letter-spacing: 2px;
        font-family: "Quicksand", "Microsoft YaHei", sans-serif !important;
      }
      .btn-i {
        width: 100%;
        position: relative;
        top: 5px;

        > i {
          float: left;
          font-size: 20px;
          margin-top: 5px;
          cursor: url("../assets/img/光标手指.gif"), default !important;
        }
        .el-button {
          float: right;
          margin-top: 5px;
        }
        .emoji {
          position: absolute;
          top: 30px;
          background-color: #fff;
          padding: 8px;
          box-shadow: 0 0 3px #aaa;
          user-select: none;
          z-index: 2;

          &::before {
            content: "";
            position: absolute;
            z-index: 3;
            top: -10px;
            left: 5px;
            width: 0;
            height: 0;
            border: 5px solid transparent;
            border-bottom-color: #ccc;
          }
          ul {
            width: 250px;
            height: 150px;
            border-left: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            li {
              box-sizing: border-box;
              float: left;
              width: 25px;
              height: 25px;
              border-right: 1px solid #e5e5e5;
              border-top: 1px solid #e5e5e5;
              font-size: 18px;
              line-height: 25px;
              cursor: url("../assets/img/光标手指.gif"), default !important;
            }
          }
        }
      }
    }

    &.content {
      margin: 0 !important;
      display: flex;
      flex-direction: column;

      .infinite-list-sort {
        display: flex;
        align-self: flex-end;
        color: #000;

        p {
          display: flex;
          align-items: center;
          padding-right: 10px;
          font-size: 13px;
          transition: all 0.3s;
          cursor: url("../assets/img/光标手指.gif"), default !important;
        }
        .infinite-list-sort-p:hover {
          color: red;
        }
        p:nth-child(2) {
          cursor: inherit;
          font-size: 17px;
        }
        .infinite-list-sort-p-change {
          color: red;
        }
      }

      .paging {
        justify-self: center;
        margin-top: 20px;
      }

      ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 0;

        & > div {
          align-self: center;
        }

        li {
          padding-bottom: 5px;
          padding-top: 20px;
          border-bottom: dashed 1px #ccc;
          font-size: 12px;
          font-family: "Microsoft YaHei", "sans-serif";
          div.parent,
          div.child {
            margin-bottom: 5px;
            display: flex;
          }
          div.child {
            margin-left: 20px;
            margin-top: 3px;
          }
          div.left {
            overflow: hidden;
            width: 40px;
            height: 40px;
            margin-right: 15px;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
            }
          }
          div.right {
            flex: 1;
            div.name-time {
              font-size: 12px;
              margin-bottom: 3px;
              span:nth-child(1) {
                color: #73b899;
              }
              span:nth-child(2) {
                color: #aaa;
                margin-left: 10px;
                font-family: "Microsoft YaHei", "sans-serif";
              }
            }
            div.message {
              color: #666;
              letter-spacing: 2px;
              margin-bottom: 3px;
              word-break: break-word;
              user-select: text;
              white-space: pre-line;
              display: flex;

              span {
                color: #409eff;
                margin-right: 5px;
                user-select: none;
              }
            }
            div.like-reply {
              margin: 5px 0;
              i {
                font-size: 14px;
                color: #aaa;
                cursor: url("../assets/img/光标手指.gif"), default !important;
              }
              span {
                display: inline-block;
                width: 43px;
                font-size: 12px;
                color: #aaa;
              }
            }
          }
        }
      }
    }

    .replyInput {
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-left: 55px;
      transition: height 0.3s;

      &.show {
        height: 60px;
      }

      .el-input {
        margin-bottom: 5px;
      }

      .replyBtn {
        padding: 4px 9px !important;
        float: right;
      }
    }
  }
}
</style>