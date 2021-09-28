<template>
  <div id="Face">
    <el-badge v-show="number && userInfo.type === 'admin'"
              :value="number"
              class="Face-news"
              :max="99"></el-badge>
    <el-popover placement="left"
                class="Face-popover"
                width="50px"
                trigger="hover">
      <!--默认显示出来的-->
      <div slot="reference"
           class="img"
           :title="userInfo.user"
           :style="{
          //backgroundImage: `url(${urlBase}${userInfo.imgSrc})`
          backgroundImage: `url(${userInfo.imgSrc})`
        }">
      </div>
      <!--hover之后显示的-->
      <div class="list">
        <!-- <el-button type="primary"
                   size="mini"
                   @click="handleUserUpdate">修改信息</el-button> -->
        <el-button type="primary"
                   size="mini"
                   @click="userChangeHtml"
                   v-show="userInfo.type === 'admin'">管理网页</el-button>
        <el-button type="danger"
                   size="mini"
                   @click="handleUserLogout">退出登录</el-button>
      </div>
    </el-popover>

  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "Face",
  data () {
    return {
      isChange: false,
      number: 0,
    }
  },
  props: {
    Alldata: {},
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // handleUserUpdate () {
    //   this.$router.push("/userinfo")
    // },

    async handleUserLogout () {
      // await this.$axios({
      //   method: "post",
      //   url: "/login/logout"
      // })
      QC.Login.signOut()
      this.$message.success('成功退出登录');
      window.localStorage.removeItem("openId")
      window.localStorage.removeItem("access_token")
      window.location.href = "/home"
    },

    userChangeHtml () {
      this.$router.push("/admin")
    },
  },

  async mounted () {
    // let { data } = await this.$axios({
    //   method: "post",
    //   url: "/admin"
    // });
    // console.log("天天",this.userInfo);
    let data2 = await this.$axios({
      method: "get",
      url: "/mail"
    });

    // console.log(data2.data.data);
    this.number = data2.data.data.length;

    // this.isChange = data.code === 0;
  }
}
</script>

<style scoped lang="less">



#Face {
  position: absolute;
  width: 34px;
  height: 34px;
  margin-right: 30px;
  user-select: none;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  cursor: url("../../assets/img/光标手指.gif"), default !important;

  .Face-news {
    position: absolute;
    right: -12px;
    top: -9px;
  }

  .img {
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 0 5px #555;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
  }
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .el-button {
    width: 100%;
    margin-top: 5px;
    margin-left: 0;
  }
}
</style>

