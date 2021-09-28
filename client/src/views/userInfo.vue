<template>
  <div id="UserInfo">
    <article v-if="userInfo._id">
      <h2>用户信息</h2>
      <p>昵称：{{ userInfo.user }}</p>
      <p>
        头像：
        <span
          class="img"
          :style="{
            backgroundImage: `url(${urlBase}${userInfo.imgSrc})`
          }"
        ></span>
      </p>
      <div class="update">
        <el-tabs class="first" v-model="activeName">
          <el-tab-pane label="修改昵称" name="first">
            <el-form
              :model="nameForm"
              status-icon
              :rules="rules"
              ref="nameForm"
              label-width="100px"
            >
              <el-form-item label="原昵称">
                {{ userInfo.user }}
              </el-form-item>
              <el-form-item label="新昵称" prop="user">
                <el-input
                  type="text"
                  v-model="nameForm.user"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleNameUpdate('nameForm')">确认修改</el-button>
              </el-form-item>
            </el-form>

            <div class="tips">*友情提示：用户名修改之后，登录时要使用你修改之后的用户名哦</div>
          </el-tab-pane>
          <el-tab-pane class="second" label="修改密码" name="second">
            <el-form
              :model="passForm"
              status-icon
              :rules="rules"
              ref="passForm"
              label-width="100px"
            >
              <el-form-item label="原密码" prop="oldPass">
                <el-input
                  type="password"
                  v-model="passForm.oldPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPass">
                <el-input
                  type="password"
                  v-model="passForm.newPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="newPass2">
                <el-input
                  type="password"
                  v-model="passForm.newPass2"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handlePassUpdate('passForm')">确认修改</el-button>
              </el-form-item>

              <div class="tips">*友情提示：修改密码之后需要重新登录</div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane class="third" label="修改头像" name="third">
            <el-upload
              class="avatar-uploader"
              name="avatar"
              :action="urlBase+'/upload/face'"
              :show-file-list="false"
              :with-credentials="true"
              :on-success="handleAvatarSuccess" 
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <div class="tips">*友情提示：上传头像请上传jpg、png、gif类型的文件，且文件不能高于2MB大小,选择好文件之后立马更新</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </article>
    <article v-else>
      <h2>用户信息</h2>
      <p>暂未登陆，无信息。
        <router-link to="/">返回首页</router-link>
      </p>
    </article>
  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  name: "UserInfo",
  data() {
    return {
      activeName: "first",
      nameForm: {user: ""}, 
      passForm: {
        oldPass: "",
        newPass: "",
        newPass2: ""
      },
      imageUrl: "",
      rules: {
        /*用户名规则*/
        user: [{
          validator(rule, value, callback) {
            if (/^[\w\u4e00-\u9fa5]{2,8}$/.test(value)) {
              callback()
            } else {
              callback(new Error("用户名应以汉字或者0-9、a-b、A-B字母组成"))
            }
          },
          required: true,
          trigger: "blur"
        }],

        /*密码规则*/
        oldPass: [{
          validator(rule, value, callback) {
            if (/^[\w!*.?]{6,18}$/.test(value)) {
              callback()
            } else {
              callback(new Error("密码不满足规则"))
            }
          },
          required: true,
          trigger: "blur"
        }],
        newPass: [{
          validator(rule, value, callback) {
            if (/^[\w!*.?]{6,18}$/.test(value)) {
              callback()
            } else {
              callback(new Error("密码应在6到18个字符内，且以数字0-9和字母a-b或者大写组成，可以有以下特殊符号？.*!"))
            }
          },
          required: true,
          trigger: "blur"
        }],
        /*再次输入密码规则*/
        newPass2: [{
          validator: (rule, value, callback) => {
            if (value !== this.passForm.newPass || !value) {
              callback("两次输入密码不一致")
            } else {
              callback()
            }
          },
          required: true,
          trigger: "blur"
        }],
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 修改用户名
    handleNameUpdate(formName) {
      this.$refs[formName].validate(async valid => {
        // 发送请求
        let {data} = await this.$axios({
          method: "POST",
          url: "/update/name",
          data: {newName: this.nameForm.user}
        })

        if (data.code !== 0){
          return this.$message.error(data.msg)
        }

        this.$message({
          type: "success",
          duration: 1000,
          message: "修改成功",
          // 等待duration设置的时间结束后，刷新页面
          onClose(){
            window.location.reload()
          }
        })
      })
    },

    // 修改密码
    handlePassUpdate(formName){
      this.$refs[formName].validate(async valid => {
        if(!valid) return false

        let {data} = await this.$axios({
          method: "post",
          url: "/update/pass",
          data: {
            _id: this.userInfo._id,
            oldPass: this.passForm.oldPass,
            newPass: this.passForm.newPass,
          }
        });

        if (!data.code) return this.$message.error(data.msg);

        await this.$axios({
          method: "post",
          url: "/update/out",
        })

        window.location.href = "/"

        this.$message({
          type: "success",
          duration: 1000,
          message: data.msg,
          onClose(){
            window.location.reload()
          },
        });
      });
    },

    // 上传成功头像处理
    // handleAvatarSuccess函数是element上传组件固定函数
    handleAvatarSuccess(res, file) {
      if (res.code !== 0){
        return this.$message.error(res.msg)
      }
      // imageUrl为函数固定必有
      // 如果上传成功，则把标签里的img表示变为上传的图片
      this.imageUrl = URL.createObjectURL(file.raw);
      
      this.$message({
        type: "success",
        message: res.msg,
        duration: 1000,
        onClose(){
          window.location.reload()
        }
      })
    },

    //上传之后的检测
    beforeAvatarUpload(file) {
      //是否是图片格式
      let isImage = /^image\/(gif|jpeg|png)$/.test(file.type)
      //是否小于2M
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传头像必须是jpg/png/gif图片');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isImage && isLt2M
    },
  },

  mounted(){
    this.Reset();
    document.title = '日常代码·修改'
  }
}
</script>

<style scoped lang="less">
.tips{
  font-family: "Quicksand", "Microsoft YaHei", sans-serif;
  text-align: center;
  color: red;
  font-size: 12px;
  margin-top: 20px;
}


#UserInfo {
  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: "Quicksand", "Microsoft YaHei", sans-serif;

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

      a {
        color: #409eff;

        &:hover {
          text-decoration: underline;
        }
      }

      span.img {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-size: cover;
        background-position: center center;
      }
    }
  }

  .third {
    display: flex;
    flex-direction: column;
    align-items: center;

    /deep/ .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    /deep/ .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    /deep/ .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    /deep/ .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>

