<template>
  <div id="Message">
    <article class="title">
      <h2>留言板</h2>
      <p>请文明发言，禁止广告。不然拉黑了嗷\(^o^)/~</p>
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
        <el-button type="primary"
                   size="mini"
                   @click="publishMsg">发表</el-button>
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
        <div class="clear"></div>
      </div>
    </article>
    <article class="content"
             v-if="msgData.length">
      <!-- <ul class="infinite-list"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        > -->
      <ul class="infinite-list">
        <div class="infinite-list-sort"
             v-if="!msgData.length <= 0">
          <p class="infinite-list-sort-p"
             @click="getMsg(1, false);"
             :class="{'infinite-list-sort-p-change': !sortColor}">最热</p>
          <p>|</p>
          <p class="infinite-list-sort-p"
             @click="getMsg(1, true);"
             :class="{'infinite-list-sort-p-change': sortColor}">最新</p>
        </div>
        <!-- 评论加回复 -->
        <li v-for="(item,value) in msgData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            :key="value">
          <!-- <li :data="msgData"> -->
          <!-- 评论 -->
          <div class="parent">
            <div class="left">
              <img :src="item.user.img"
                   alt="">
            </div>
            <div class="right">
              <div class="name-time">
                <span>{{item.user.user}}</span>
                <span class="name-time-type"
                      v-if="item.type === 'admin'">
                  站长
                </span>
                <span class="name-time-type2"
                      v-else></span>
                <span>{{item.time | fmtTime}}</span>
              </div>
              <div class="message">
                <p v-html="item.msg"></p>
              </div>
              <div class="like-reply">
                <i class="like iconfont icon-heart-fill"
                   :class="{clickLike: item.likes.indexOf(userInfo._id) !== -1}"
                   @click="likeClick(item,item)"></i>
                <span>{{item.likes.length}}</span>
                <i class="reply iconfont icon-pinglun"
                   @click="replyClick(item, item)"></i>
              </div>
            </div>
          </div>
          <!--回复-->
          <div class="child"
               v-for="(item2,value2) in item.children"
               :key="value2">
            <div class="left">
              <img :src="item2.user.img"
                   alt="">
            </div>
            <div class="right">
              <div class="name-time">
                <span>{{item2.user.user}}</span>
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
                   @click="likeClick(item, item2, value2)"></i>
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
      </ul>
      <el-pagination layout="total, prev, pager, next, jumper"
                     :current-page.sync="currentPage"
                     :total="msgData.length"
                     @current-change="handleCurrentChange"
                     class="paging"
                     :page-size="pagesize"
                     :hide-on-single-page="true">
      </el-pagination>
      <!-- <p v-if="loading" style="align-self: center;">加载中...</p>
      <p v-if="noMore" style="align-self: center;">没有更多了</p> -->
    </article>
    <div class="no"
         v-if="msgData.length <= 0">
      暂无留言....
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Message",
  data () {
    return {
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
      loading: false,
      sortColor: false,
      // 当前页
      currentPage: 1,
      // 每页多少条
      pagesize: 7,
    }
  },

  computed: {
    ...mapState(['userInfo']),

    noMore () {
      return this.count >= this.msgDataAllNumber - 1;
    },
    disabled () {
      return this.loading || this.noMore;
    }
  },

  methods: {
    //切换emoji的显示与隐藏
    handleToggleEmoji (showEmoji) {
      switch (showEmoji)
      {
        case 1: this.showEmoji1 = !this.showEmoji1; break;
        case 2: this.showEmoji2 = !this.showEmoji2; break;
      }
    },

    //点击每一个emoji的时候，加入input
    handleEmojiClick (item) {
      this.textarea += item
      this.showEmoji1 = false;
    },

    // 发表评论函数
    async publishMsg () {
      let userId = this.userInfo._id;
      let type = this.userInfo.type;
      let msg = this.textarea.trim();

      if (!userId) return this.$message.error("请先登录");
      if (!msg) return this.$message.error("请先输入留言内容");

      let { data } = await this.$axios({
        method: "post",
        url: "/msg",
        data: {
          msg,
          userId,
          type
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

    // 获取评论函数
    async getMsg (val, sort) {
      if (sort) this.sortColor = true;
      else this.sortColor = false;

      const number = 10;
      const count = 10 * (val - 1);
      let { data: { data } } = await this.$axios({
        method: "post",
        url: "/msg/huo",
        data: {
          count,
          number,
          sort,
        }
      });

      data.data.filter(item => {
        // data.filter(item => {
        //用来表示每一条留言的回复输入框的内容
        item.replyTxt = ""
        //用来表示回复的是哪个
        item.replyUser = { ...item.user }
        //用来表示当前留言的回复框要不要打开
        item.isShowReply = false
      });

      // this.msgData = this.msgData.concat(data.data);
      // console.log(this.msgData);
      this.msgDataAllNumber = data.lengthAll;
      // console.log(this.msgDataAllNumber);
      this.msgData = data.data;
    },

    // 回复按钮点击
    async replyClick (item, thisItem) {

      if (!this.userInfo._id) return this.$message.error("请先登录");

      if (
        thisItem.user._id === item.replyUser._id
        && item.isShowReply
      )
      {
        item.isShowReply = false
        return
      }

      item.replyUser = thisItem.user
      item.isShowReply = true
    },

    // 回复提交
    async replySubmit (item) {
      let user = this.userInfo._id;
      let msg = item.replyTxt.trim();
      let type = this.userInfo.type;
      let reply = item.replyUser._id;

      if (!msg) this.$message.error("请先输入留言内容");

      let msgId = item._id;
      let child = { msg, user, reply, type };

      let { data } = await this.$axios({
        method: "post",
        url: "/msg/reply",
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
    async likeClick (item, item2, childIndex) {
      let userId = this.userInfo._id

      if (!userId) return this.$message.error("请先登录")

      // let likes = item2.likes;
      // let index = likes.indexOf(userId);

      // if(index !== -1) likes.splice(index, 1)
      // else likes.push(userId);
      let likes = userId;

      let { data } = await this.$axios({
        method: "post",
        url: "/msg/like",
        data: {
          parentId: item._id,
          childId: item2._id,
          likes,
          childIndex
        }
      });

      let isChild = item._id !== item2._id;

      if (isChild) item2.likes = data.data;
      else item.likes = data.data.likes;
    },

    // load () {
    //   this.loading = true;
    //   setTimeout(() => {
    //     this.count += 5;
    //     this.getMsg()
    //     this.loading = false;
    //   }, 2000);
    // },

    handleCurrentChange (val) {
      // console.log(val);
      // this.getMsg(val, true)
      // this.getMsg()
      // this.currentPage = currentPage;
    },

    // async leavingSort()
    // {
    //   let {data} = await this.$axios({
    //     method: "post",
    //     url: "/msg/huo",
    //     data: {
    //       sort: true,
    //     }
    //   });

    // }
  },

  mounted () {
    this.Reset();
    document.title = '日常代码·留言'
    document.addEventListener("click", () => {
      this.showEmoji = false
    });

    this.getMsg(1, true);
  }
}
</script>

<style scoped lang="less">
@media screen and (max-width: 850px) {
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

.clickLike {
  color: red !important;
}

#Message {
  opacity: 0.96;
  .no {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 20px;
    background: white;
  }

  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand", "Microsoft YaHei", sans-serif;

    /deep/.number {
      cursor: url("../assets/img/光标手指.gif"), default !important;
    }

    &.title {
      margin: 0;
      display: inline-block;

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
      margin-top: 15px;
      display: flex;
      flex-direction: column;

      .infinite-list-sort {
        display: flex;
        justify-content: flex-end;
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
        align-self: center;
      }

      ul {
        // height: 100%;
        width: 100%;
        // overflow-y: auto;

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
            margin-left: 25px;
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
      position: relative;

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
      /deep/.el-button {
        position: absolute;
        top: 35px;
        left: 55px;
      }
    }
  }
}
</style>