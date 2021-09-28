<template>
  <div id="reg"
       @mousedown="handleClose">
    <div class="reg-information"
         @mousedown.stop>
      <div class="reg-title">用户注册</div>

      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="user"
                      label-width="80px">
          <el-input type="text"
                    v-model="ruleForm.user"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码"
                      prop="pass"
                      label-width="80px">
          <el-input type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码"
                      prop="checkPass"
                      label-width="80px">
          <el-input type="password"
                    v-model="ruleForm.checkPass"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div class="reg-botton-All">
        <slot />
      </div>

      <div class="login-close"
           @click="handleClose">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 建立一个事件，如果触发就执行这个函数，这个函数是一个自定义的函数，父组件就可以触发这个自定义函数
    handleClose () {
      this.$emit("close")
    },
  },

  data () {
    return {
      ruleForm: {
        user: "",
        pass: "",
        checkPass: "",
      },

      rules: {
        user: [{
          // 判断用户输入的值是不是按照你写的正则表达式，如果是则进行，如果不是就报错
          // 这个validator函数是element组件自带的函数
          validator (rule, value, callback) {
            if (/^[\w\u4e00-\u9fa5]{2,8}$/.test(value))
            {
              callback()
            } else
            {
              callback(new Error("用户名应在2到8个字符内，且以汉字，数字0-9或者字母a-b，A-b组成"))
            }
          },
          required: true,
          trigger: "blur",
        }],

        pass: [{
          validator (rule, value, callback) {
            if (/^[\w!*.?]{6,18}$/.test(value))
            {
              callback()
            } else
            {
              callback(new Error("密码应在6到18个字符内，且以数字0-9和字母a-b或者大写组成，可以有以下特殊符号？.*!"))
            }
          },
          required: true,
          trigger: "blur",
        }],

        checkPass: [{
          validator: (rule, value, callback) => {
            if (!value) callback(new Error("请再确认一遍密码"));
            else
            {
              if (value === this.ruleForm.pass) callback()
              else callback(new Error("密码不一致，请重新输入"));
            }
          },
          required: true,
          trigger: "blur",
        }]
      },

    };
  },
};
</script>

<style scoped lang="less">
@media screen and (max-width: 850px) {
  .reg-information
  {
    width: 270px !important;
    height: 450px !important;
  }
}




.reg-botton-All {
  position: relative;
}

#reg {
  width: 100%;
  height: 100%;
  z-index: 10000000000000000;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;

  .reg-information {
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

    .el-form {
      .el-form-item {
        margin-bottom: 50px;
      }
    }

    .reg-title {
      font-size: 20px;
      width: 100%;
      border-bottom: 1px solid skyblue;
      text-align: center;
      padding: 10px 0;
    }

    .reg-botton-All {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-content: center;
    }

    .login-close {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: url("../../assets/img/光标手指.gif"), default !important;

      div {
        width: 100%;
        height: 2px;
        background: black;
        transform: rotateZ(45deg);
        position: absolute;
        top: 50%;
      }

      div:nth-child(2) {
        transform: rotateZ(-45deg);
      }
    }
  }
}
</style>