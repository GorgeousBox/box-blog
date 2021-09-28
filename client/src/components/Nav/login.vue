<template>
  <div id="login" @mousedown="handleClose">
    <div class="login-information" @mousedown.stop>
      <div class="login-title">用户登录</div>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="user" label-width="70px" >
          <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pass" label-width="70px">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div class="login-botton-All">
        <slot />
      </div>

      <div class="login-close" @click="handleClose">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    handleClose() {
      this.$emit("close")
    },
  },

  data(){
    return {
      ruleForm: {
        user:"",
        pass:"",
      },

      rules: {
        user:[{
          validator(rule, value, callback) {
            if(!value) callback(new Error("请填写用户名"))
            else callback();
          },
          trigger: "blur",
        }],
        
        pass:[{
          validator(rule, value, callback) {
            if(!value) callback(new Error("请填写密码"));
            if (/^[\w!*.?]{6,18}$/.test(value)) callback() 
            else callback(new Error("密码含有特殊字符"));
          },
          trigger: "blur",
        }]
      },

    };
  },
};
</script>

<style scoped lang="less">
@media screen and (max-width: 850px) {
  .login-information
  {
    width: 270px !important;
    height: 450px !important;
  }
}






#login
{
  width: 100%;
  height: 100%;
  z-index: 10000000000000000;
  background: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0;
  left: 0;

  .login-information
  {
    background: white;
    height: 500px;
    width: 450px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;

    .el-form
    {
      .el-form-item
      {
        margin-bottom: 50px;
      }
    }

    .login-title
    {
      font-size: 20px;
      width: 100%;
      border-bottom: 1px solid skyblue;
      text-align: center;
      padding: 10px 0;
    }

    .login-botton-All
    {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-content: center;
    }

    .login-close
    {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: url("../../assets/img/光标手指.gif"), default !important;


      div
      {
        width: 100%;
        height: 2px;
        background: black;
        transform: rotateZ(45deg);
        position: absolute;
        top: 50%;
      }

      div:nth-child(2)
      {
        transform: rotateZ(-45deg);
      }
    }
  }
}
</style>