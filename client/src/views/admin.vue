<template>
  <!-- <div id="admin">
    <div class="yes" v-if="isLogin">
      <div class="admin-change">
        <div class="admin-change-Nav">
          <div class="admin-change-Nav-header">
            <img :src="urlBase + '/' + userData.img" alt="" @click="goTo('/admin/adminHome')">
            <div>{{userData.user}}</div>
          </div>

          <div class="admin-change-Nav-Nav">
            <el-row class="tac">
              <el-col :span="12">
                <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>文章管理</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="1-1" @click="goTo('/admin/articleAdmin')">发表文章</el-menu-item>
                      <el-menu-item index="1-2" @click="goTo('/admin/moveArticle')">删除文章</el-menu-item>
                      <el-menu-item index="1-3" @click="goTo('/admin/articleChange')">修改文章</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu>
              </el-col>
            </el-row>
          </div>
        </div>
      
        <div class="admin-change-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="on" v-else>
      {{warningMsg}}
    </div>
  </div> -->

  <div id="admin">
    <!-- <div class="yes" v-if="isLogin">
      <div class="admin-caneVine">
        <p>好日子</p>
        <div class="admin-caneVine-bubble">
          <div class="admin-caneVine-bubble-number" :style="{bottom: ce.bottom + 'px', opacity: ce.opacity}">

          </div>
        </div>
      </div>
    </div> -->

    <div class="yes"
         v-if="isLogin">
      <div class="admin-title">
        <h2>后台管理系统</h2>
      </div>

      <div class="admin-Nav">
        <el-tabs tab-position="left"
                 v-model="activeTab">
          <!-- <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane> -->
          <el-tab-pane label="消息管理"
                       name="first">
            <NewsMA />
          </el-tab-pane>
          <el-tab-pane label="文章管理"
                       name="second">
            <ArticleMA />
          </el-tab-pane>
          <el-tab-pane label="友联管理"
                       name="third">
            <FriendMA />
          </el-tab-pane>
          <el-tab-pane label="生活管理"
                       name="fourth">
            <LifeMA />
          </el-tab-pane>
          <el-tab-pane label="音乐管理"
                       name="fifth">
            <MusicMA />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="on"
         v-else>
      {{warningMsg}}
    </div>
  </div>
</template>

<script>

// 导入模块
import ArticleMA from "@/components/adminAll/articleMA";
import FriendMA from "@/components/adminAll/friendMA";
import NewsMA from "@/components/adminAll/newsMA";
import LifeMA from "@/components/adminAll/lifeMA";
import MusicMA from "@/components/adminAll/musicMA";
import { mapState } from "vuex";

export default {
  components: {
    ArticleMA,
    FriendMA,
    NewsMA,
    LifeMA,
    MusicMA
  },

  data () {
    return {
      isLogin: false, // 是否以管理员登录
      warningMsg: "", // 提示信息
      userData: {}, // 用户数据
      activeTab: "first" // 默认显示
    };
  },
  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    // 跳转
    goTo (path) {
      this.$router.replace(path)
    },

  },

  mounted () {
    this.Reset();
    document.title = '日常代码·管理'
    
  },

  async created () {
    let openId = window.localStorage.getItem("openId");
    // 向后端发送请求
    let { data } = await this.$axios({
      method: 'post',
      url: '/admin',
      data: {
        openId
      }
    });
    if (data.code) this.warningMsg = data.msg;
    this.userData = data.data
    this.isLogin = data.code === 0;
  }
}
</script>

<style scoped lang="less">
#admin {
  box-sizing: border-box;
  padding: 20px;
  padding-bottom: 50px;
  background-color: white;

  .admin-title {
    margin-bottom: 30px;

    h2 {
      font-size: 20px;
      letter-spacing: 1px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }
  }
}

// #admin
// {
//   // box-sizing: border-box;
//   // padding: 20px;
//   position: relative;
//   background: url(../assets/img/admin-background.jpg);
//   height: 1450px;
//   background-size: cover;

//   .admin-caneVine
//   {
//     position: absolute;
//     top: 200px;
//     left: 200px;
//     width: 100px;
//     height: 100px;
//     background-image: radial-gradient(rgba(255, 255, 255, .3),#beebaf);
//     border-radius: 50%;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: rgba(0, 0, 0);
//     transition: all .5s;
//     opacity: .4;

//     &:hover
//     {
//       opacity: 1;
//     }

//     .admin-caneVine-bubble
//     {
//       width: 50%;
//       position: absolute;
//       bottom: 0;
//       height: 120%;

//       .admin-caneVine-bubble-number
//       {
//         width: 10px;
//         height: 10px;
//         background:chartreuse;
//         position: absolute;
//         border-radius: 50%;
//         bottom: 0;
//       }
//     }
//   }
// }

// #admin
// {
//   .yes,.no
//   {
//     background: white;
//   }

//   .yes
//   {
//     .admin-change
//     {
//       display: flex;

//       .admin-change-Nav
//       {
//         background:chartreuse;
//         width: 25%;

//         .admin-change-Nav-header
//         {
//           box-sizing: border-box;
//           padding: 10px;
//           display: flex;
//           align-items:center;
//           flex-direction: column;
//           text-align: center;

//           img
//           {
//             width: 50%;
//             height: 50%;
//             cursor: pointer;
//           }

//           div
//           {
//             margin-top: 5px;
//           }
//         }

//         .admin-change-Nav-Nav
//         {
//           margin-top: 10px;
//           box-sizing: border-box;
//           padding: 10px 0;
//           background: burlywood;

//           .tac
//           {
//             .el-col
//             {
//               width: 100%;

//               /deep/.el-menu-item
//               {
//                 width: 100% !important;
//                 min-width: 0 !important;
//                 padding: 0 !important;
//                 text-indent: 2em;
//               }
//             }
//           }
//         }
//       }

//       .admin-change-content
//       {
//         flex: 1;
//       }
//     }
//   }
// }
</style>