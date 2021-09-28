<template>
  <div id="Send-mail">
    <div class="mail-title">
      <h2>发送消息</h2>
      <p> 有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*) </p>
    </div>

    <div class="mail-mail">
      
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="Goudan"
        class="demo-ruleForm">

      <el-form-item label="你的邮箱" prop="email">
        <el-input
            type="text"
            v-model="ruleForm.email"
            placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>

      <el-form-item label="你的主题">
        <el-input
            type="text"
            v-model="ruleForm.subject"
            placeholder="请输入主题"
        ></el-input>
      </el-form-item>

      <el-form-item label="你的内容" prop="message">
        <el-input
            type="textarea"
            v-model="ruleForm.message"
            placeholder="请输入内容"
            show-word-limit
            :rows="2"
        ></el-input>
      </el-form-item>

      <el-form-item class="el-form-itemAll">
        <el-button
            type="primary"
            @click="handleContactSubmit"
        >给我发
        </el-button>
      </el-form-item>

    </el-form>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";
import userInfoVue from '../../../../views/userInfo.vue';

export default {

  computed:{
    ...mapState(["userInfo"]),
  },

  data(){
    return {
      ruleForm: {
        email: "",
        subject: "",
        message: "",
      },
      rules: {
        email: [
          {type: "email", required: true, trigger: "blur", message: "请输入正确的邮箱"}
        ],
        message: [
          {required: true, trigger: "blur", message: "n", message: "请输入信息"}
        ]
      }
    }
  },

  methods:{
    handleContactSubmit() {
      if(!this.userInfo.user) return this.$message.error("请先登录");
      //验证表单的所有数据是否准确
      this.$refs.Goudan.validate(async vaild => {
        if (vaild){
          //通过所有数据的验证
          let {data} = await this.$axios({
            method: "post",
            url: "/mail",
            data: {
              name: this.userInfo.user,
              email: this.ruleForm.email,
              subject: this.ruleForm.subject,
              message: this.ruleForm.message,
            }
          });

          this.ruleForm.name = this.ruleForm.email = this.ruleForm.subject = this.ruleForm.message = "";

          if(data.code !== 0) return this.$message.error(data.msg);
          window.location.href = "/";
          return this.$message({
            type: "success",
            message: data.msg,
            onClose(){
              window.location.reload()
            }
          });
        }else{
          //验证不通过
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.el-form {
  padding: 0 10px;

  /deep/ input,/deep/ textarea{
    background: #F2F2F2;
  }
  /deep/ textarea
  {
    height: 100px;
  }

  .el-form-itemAll
  {
    .el-button {
      display: block;
      width: 100px;
      height: 40px;
      margin-top: 35px;
      border: 0;
      border-radius: 20px;
      box-shadow: 0 0 0 #bbb;
      background-color: #bfe2e6;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: 2px;
      font-family: "Quicksand", "sans-serif";
      color: #000;
      outline: 0;
      transition: box-shadow .3s;

      &:hover {
        box-shadow: 0 3px 5px #bbb;
      }
    }
  }
}
</style>