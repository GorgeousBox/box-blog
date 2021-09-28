<template>
  <div id="lifeMA">
    <div class="lifeMA-add">
      <div class="lifeMA-publish-title">
        <h3>添加生活</h3>
      </div>
      <div class="lifeMA-publish-content">
        <el-form 
          ref="form" 
          :model="lifePublish" 
          label-width="80px" 
          size="mini">
          <el-form-item label="生活标题" class="el-form-item-title" type>
            <el-input v-model="lifePublish.title"></el-input>
          </el-form-item>
          <el-form-item label="生活内容">
            <el-input 
              v-model="lifePublish.msg"
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              maxlength="200"
              show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="上传图片">
            <el-upload
              :action="urlBase+'/life/img'"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              name="img"
              :on-success="coverSuccess"
              :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">只能上传jpg，png的图片，且不能超过3MB</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form> 
      </div>
      <div class="lifeMA-publish-botton">
        <el-button type="primary" round class="el-form-item-submit" @click="confirmAgain">发表生活</el-button>
        <div class="confirmAgain" v-show="confirmAgainData">
          <div class="confirmAgain-bigBox">
            <div>确定发表生活吗？</div>
            <div>
              <div @click="confirmAgain(false)">手残了</div>
              <div @click="submitForm">给爷发</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      dialogVisible: false,
      dialogImageUrl:"",

      lifePublish: {
        msg: "",
        title: "",
        imgSrc: "",
      },

      confirmAgainData: false,
    };
  },

  methods: {
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    coverSuccess(res,file,fileList){
      this.lifePublish.imgSrc = res.imgSrc
    },
    beforeAvatarUpload(file) {
      //是否是图片格式
      let isImage = /^image\/(jpeg|png)$/.test(file.type)
      //是否小于2M
      let isLt2M = file.size / 1024 / 1024 < 3;
      if (!isImage) {
        this.$message.error('上传封面必须是jpg/png图片');
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 3MB!');
      }
      return isImage && isLt2M
    },

    async submitForm()
    {
      this.confirmAgainData = false;

      let {data} = await this.$axios({
        method: "post",
        url: "/life/add",
        data: {
          msg: this.lifePublish.msg,
          title: this.lifePublish.title,
          imgSrc: this.lifePublish.imgSrc,
        }
      });

      if (data.code) return this.$message.error(data.msg);

      this.$message({
        type: "success",
        duration: 1000,
        message: data.msg,
        onClose(){
          window.location.reload()
        },
      });
    },

    confirmAgain(a = true){
      if(!a) return this.confirmAgainData = false;
      this.confirmAgainData = true;
    }
  }
}
</script>

<style lang="less" scoped>
#lifeMA
{
  margin-left: 5px;
  display: flex;
  flex-direction: column;

  h3
  {
    font-size: 17px;
    letter-spacing: 1px;
    line-height: 24px;
    border-left: 3px solid skyblue;
    text-indent: 10px;
    margin-bottom: 20px;
  }
  
  .lifeMA-publish-botton
  {
    display: flex;
    justify-content: center;
    
    .el-form-item-submit
    {
      margin-top: 20px;
      width: 300px;
    }
  }
  

  .confirmAgain
  {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    z-index: 2;
    
    .confirmAgain-bigBox
    {
      position: absolute;
      width: 300px;
      height: 200px;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background: white;
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      // align-items: center;

      div:nth-child(1)
      {
        align-self: center;
      }

      div:nth-child(2)
      {
        display: flex;
        justify-content: space-around;
        
        div
        {
          cursor: pointer;
          padding: 10px 15px;
          border-radius: 20px;
          font-size: 15px;
          color: white;
        }

        div:nth-child(1)
        {
          background: red;
        }
        div:nth-child(2)
        {
          background: green;
        }
      }

      div:nth-child(3)
      {
        align-self: center;
        color: red;
        font-size: 12px;
      }
    }
  }
}
</style>