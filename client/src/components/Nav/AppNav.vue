<template>
  <div id="AppNav">
    <!-- <div class="NavLogo">
      <a href="/">box</a>
    </div> -->
    <div class="AppNav">
      <router-link :to="{name: 'home'}">首页</router-link>
      <router-link :to="{name: 'article'}">文章</router-link>
      <router-link :to="{name: 'message'}">留言</router-link>
      <router-link :to="{name: 'life'}">生活</router-link>
      <router-link :to="{name: 'friend'}">友链</router-link>
      <router-link :to="{name: 'about'}">关于</router-link>
      <router-link :to="{name: 'background'}">背景</router-link>
    </div>
    <!-- <div class="userNav"
         v-if="userInfo._id"> -->
    <div class="userNav"
         v-if="ifLogin">
      <Face />
    </div>
    <div class="NavLogin"
         v-else>
      <el-button @click="qqLogin"
                 id="qqLoginBtn"
                 title="QQ登入">
        <i class="iconfont icon-QQ1" style="color:white;font-size:40px;" ></i>
        <!-- <img src="@/assets/img/qq.png"
             alt=""
             style="width:30px;height:30px"> -->
      </el-button>
    </div>
    <!-- <Login v-show="ifShowLogin"
           @close="clickBotton(2)"
           ref="ClearValueLogin">
      <el-button type="primary"
                 style="width: 40%;"
                 @click="clickBotton(2,1)"
                 ref="ClearValueLogin">登录</el-button>
      <el-button type="success"
                 class="login-botton-login"
                 @click="clickBotton(5)"
                 style="width: 40%;"
                 ref="ClearValueLogin">注册</el-button>
    </Login>
    <Reg v-show="ifShowreg"
         @close="clickBotton(4)"
         ref="ClearValueReg">
      <el-button type="success"
                 class="login-botton-login"
                 @click="clickBotton(4,2)"
                 style="width: 40%;"
                 ref="ClearValueReg">注册并登录</el-button>
      <div class="ref-zhang"
           @click="clickBotton(6)">已有账号？点击这里</div>
    </Reg> -->
    <div class="ship"></div>
  </div>
</template>

<script>

import Login from "@/components/Nav/login";
import Reg from "@/components/Nav/reg";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import Face from "./face";

export default {

  data () {
    return {
      ifShowLogin: false,
      ifShowreg: false,
      ifLogin: false,
    };
  },

  components: {
    Login,
    Reg,
    Face
  },

  computed: {
    ...mapState(['userInfo'])
  },

  methods: {
    ...mapMutations(['login', 'logout']),

    //qq登入接口函数
    qqLogin () {
      window.location.href = "77777777777777";
      // console.log(QC);
    },

    // qq检测
    async loginCheck () {
      //获取localStorage
      let openId = window.localStorage.getItem("openId"),
        access_token = window.localStorage.getItem("access_token");

      //没有值得表示未登录
      if (!openId || !access_token) return

      //有值则表示已登录 -- 请求用户信息
      let res = await this.$axios({
        method: "get",
        url: "/login/userinfo",
        params: {
          // access_token,
          openId,
          // "oauth_consumer_key": 101953727
        }
      })

      // console.log(res.data.data);

      //判断用户信息是否请求成功
      if (res.data.code !== 0)
      {
        this.$message.error(res.msg)
        return
      }

      let userInfor = {
        _id: res.data.data._id,
        imgSrc: res.data.data.img,
        user: res.data.data.user,
        type: res.data.data.type,
      };
      this.login(userInfor);
      this.ifLogin = true;

      await this.$axios({
        method: "post",
        url: "/visitor/updata",
        data: {
          id: res.data.data._id,
        }
      })
    },

    // 此函数是为了兼容数据，通过改变数据是否为真的方式来实现显示哪一个标签，以及向后端发送请求
    // 此函数有待提升，如果在子组件里面发送请求会好一些
    // a：决定是显示或者隐藏哪一个标签
    // b：是否进行验证并向后台发送请求
    // c：决定清空哪一个input标签已输入的值
    clickBotton (a, b, c) {

      // b为1表示登录验证
      if (b === 1)
      {
        // 验证你输入的用户名啊之类是否都正确
        // 由于是在父组件里面进行验证子组件的input，所以要写成 this.$refs.ClearValueLogin.$refs.ruleForm.validate
        let temp = this.$refs.ClearValueLogin.$refs.ruleForm.validate(async vaild => {
          if (vaild)
          {
            //通过所有数据的验证
            let { data } = await this.$axios({
              method: "POST",
              url: "/login",
              data: {
                user: this.$refs.ClearValueLogin.ruleForm.user,
                pass: this.$refs.ClearValueLogin.ruleForm.pass,
              },
            });

            if (data.code) return this.$refs.ClearValueReg.$message.error(data.msg)

            this.ifShowLogin = false;
            this.$refs.ClearValueLogin.ruleForm.user = "";
            this.$refs.ClearValueLogin.ruleForm.pass = "";

            //更新vuex的数据
            this.login(data.data)

            window.location.href = "/home"

            this.$refs.ClearValueReg.$message({
              type: "success",
              duration: 1500,
              message: "登陆成功",
              onClose () {
                window.location.reload()
              }
            });
          } else
          {
            //验证不通过，返回false值赋给变量temp
            return false;
          };
        });
        // 如果验证不通过，直接结束函数
        if (!temp) return
      }
      // b为2表示注册验证
      else if (b === 2) 
      {
        let temp = this.$refs.ClearValueReg.$refs.ruleForm.validate(async vaild => {

          if (vaild)
          {
            // 向后台发送请求，这里用到的是axios工具
            let { data } = await this.$axios({
              method: "POST", //设置发送模式，有get和post两种，因为要区分，所以用post
              url: "/reg", //设置发送给后台，这个后端的路由地址
              // 设置要发送的数据，这里就把用户名和密码发送出去了
              data: {
                user: this.$refs.ClearValueReg.ruleForm.user,
                pass: this.$refs.ClearValueReg.ruleForm.pass,
              }
            });

            // 这里的data.code是后台返回的数据，是自己设置的哈
            if (data.code !== 0)
            {
              //给用户一个提示
              return this.$refs.ClearValueReg.$message({
                type: "error",
                duration: 1500,
                message: data.msg
              });
            }

            this.login(data.data)

            this.ifShowreg = false;
            this.$refs.ClearValueReg.ruleForm.user = "";
            this.$refs.ClearValueReg.ruleForm.pass = "";
            this.$refs.ClearValueReg.ruleForm.checkPass = "";

            window.location.href = "/home";

            this.$refs.ClearValueReg.$message({
              type: "success",
              duration: 1500,
              message: "注册成功",
              onClose () {
                window.location.reload()
              }
            });
          } else
          {
            //验证不通过
            return false;
          };
        });
        if (!temp) return
      };

      if (!c) 
      {
        // 把用户输入的值变为空
        this.$refs.ClearValueLogin.ruleForm.user = "";
        this.$refs.ClearValueLogin.ruleForm.pass = "";
        this.$refs.ClearValueReg.ruleForm.user = "";
        this.$refs.ClearValueReg.ruleForm.pass = "";
        this.$refs.ClearValueReg.ruleForm.checkPass = "";
      }

      // 决定显示标签
      switch (a)
      {
        case 1: this.ifShowLogin = true; break;
        case 2: this.ifShowLogin = false; break;
        case 3: this.ifShowreg = true; break;
        case 4: this.ifShowreg = false; break;
        case 5:
          this.ifShowLogin = false;
          this.ifShowreg = true; break;
        case 6:
          this.ifShowLogin = true;
          this.ifShowreg = false; break;
        default: throw new Error("没有该项选择!!!");
      };
    },

    // qq登录函数
    async QQQC () {
      await this.loginCheck();

      // console.log(this.userInfo);
      if (!QC.Login.check()) return;
      // console.log("成功");
      //登陆成功
      QC.api("get_user_info", {
        "oauth_consumer_key": 101953727
      }).onSuccess = ({ data }) => {
        // console.log(data);
        QC.Login.getMe(async (openId, accessToken) => {
          // console.log(data);
          //发送到后端
          let res = await this.$axios({
            method: "post",
            url: "/login",
            data: {
              data,
              openId
            }
          })

          //后端处理完成
          if (res.data.code !== 0)
          {
            //登录失败
            this.ifLogin = false;
            this.$message.error(res.data.msg);
          } else
          {
            // console.log("登入成功");
            // 登录成功
            this.ifLogin = true;
            this.data = res.data;
            this.$message.success(res.data.msg);
            // 存储Token
            window.localStorage.setItem("openId", openId);
            window.localStorage.setItem("access_token", accessToken);
            //跳转到之前的页面
            window.history.go(-2);
          }
        })
      };
    },
  },

  mounted () {
    this.QQQC();
  }
};
</script>

<style scoped lang="less">
.ref-zhang {
  position: absolute;
  bottom: -30px;
  text-decoration: underline;
  color: rgb(27, 23, 23);
  cursor: url("../../assets/img/光标手指.gif"), default !important;
}

#AppNav {
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 auto;
  // background: pink;
  justify-content: space-between;

  .userNav {
    position: absolute;
    // left: -50px;
    top: 5px;
    left: 0;
    width: 50px;
    height: 50px;
    // background: #d5eeff;
    border-radius: 50% 0 0 50%;
  }

  .NavLogo {
    width: 130px;
    height: 100%;

    a {
      text-align: center;
      line-height: 45px;
      display: block;
      font-size: 30px;
      font-family: Pacifico;
      color: rgba(0, 0, 0, 0.7);
      text-decoration: none;
    }
  }

  .AppNav {
    margin-top: 70px;
    width: 100%;
    height: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;

    a {
      width: 100%;
      text-align: center;
      line-height: 50px;
      font-size: 16px;
      font-weight: bolder;
      color: white;
      text-shadow: 0 0 3px black;
      text-decoration: none;
      transition: all 0.3s;
      // cursor: pointer !important;
      // border-bottom: solid 2px white;

      &:hover {
        color: skyblue;
      }
    }

    .router-link-exact-active {
      color: skyblue;
      border-color: rgb(78, 155, 185);
    }
  }

  .NavLogin {
    width: 50px;
    height: 50px;
    // border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 10px;
    left: 0;

    button {
      width: 40px !important;
      height: 40px !important;
      background: rgb(51, 169, 216);
      border-radius: 50%;
      font-size: 14px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
    }
  }

  .ship {
    width: 100%;
    height: 50px;
    background: url(../../assets/img/小船.png) center/cover;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>