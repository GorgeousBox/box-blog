<template>
  <div id="musicMA">
    <div class="musicMA-title">
      <h3>添加音乐</h3>
    </div>

    <div class="musicMA-content">
      <el-form ref="form"
               :model="musicMAPublish"
               label-width="80px"
               size="mini">
        <el-form-item label="音乐标题"
                      class="el-form-item-title"
                      type>
          <el-input v-model="musicMAPublish.title"></el-input>
        </el-form-item>
        <el-form-item label="音乐歌手"
                      class="el-form-item-singer"
                      type>
          <el-input v-model="musicMAPublish.singer"></el-input>
        </el-form-item>
        <el-form-item label="上传音乐">
          <el-upload class="upload-demo"
                     drag
                     :action="urlBase+'/music/mp3'"
                     multiple
                     ref="mdUpload"
                     name="mp3"
                     :file-list="mp3FileList"
                     :on-success="mp3Success"
                     :before-upload="beforeMDUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip"
                 slot="tip">只能上传mp3文件，且不超过7MB，请谨慎选择文件，避免不必要的请求操作，增大服务器负担</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传封面">
          <el-upload :action="urlBase+'/music/cover'"
                     list-type="picture-card"
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove"
                     name="cover"
                     :on-success="coverSuccess"
                     :before-upload="beforeAvatarUpload">
            <i class="el-icon-plus"></i>
            <div class="el-upload__tip"
                 slot="tip">只能上传jpg，png的图片，且不能超过3MB</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="音乐歌词"
                      class="el-form-item-lyric">
          <el-input v-model="musicMAPublish.lyric"
                    type="textarea"
                    :rows="40"
                    placeholder="请输入内容"
                    show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div class="musicMA-content-botton">
        <el-button type="primary"
                   round
                   class="el-form-item-submit"
                   @click="addmusic">添加音乐</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 输入框数据
      musicMAPublish: {
        title: "",
        singer: "",
        lyric: "",
      },

      // mp3上传之后的地址
      musicSrc: "",
      // 音乐封面上传之后的地址
      musicCoverSrc: "",

      // 上传配置数据
      dialogVisible: false,
      dialogImageUrl: "",
      mp3FileList: [],
    };
  },

  methods: {
    // 音乐文件上传成功钩子
    mp3Success (res, file, fileList) {
      this.musicSrc = res.mp3Src;
    },

    // 音乐封面上传成功钩子
    coverSuccess (res, file, fileList) {
      this.musicCoverSrc = res.coverSrc;
    },



    // 上传检测函数
    // 图片格式检测
    beforeAvatarUpload (file) {
      //是否是图片格式
      let isImage = /^image\/(jpeg|png)$/.test(file.type)
      //是否小于2M
      let isLt2M = file.size / 1024 / 1024 < 3;
      if (!isImage)
      {
        this.$message.error('上传封面必须是jpg/png图片');
      }
      if (!isLt2M)
      {
        this.$message.error('上传封面图片大小不能超过 3MB!');
      }
      return isImage && isLt2M
    },

    // mp3文件格式检测
    beforeMDUpload (file) {
      let isMD = file.type;
      let isLt3M = file.size / 1024 / 1024 < 15;
      if (isMD !== "audio/mpeg")
      {
        this.$message.error('上传文件必须是MP3格式');
      }
      if (!isLt3M)
      {
        this.$message.error('上传文件大小不能超过 15MB!');
      }
      return isMD && isLt3M
    },



    // 上传配置函数
    handleClose (tag) {
      this.articleLabel.splice(this.articleLabel.indexOf(tag), 1);
    },
    showInput () {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm () {
      let inputValue = this.articlePublish.label;

      if (inputValue)
      {
        this.articleLabel.push(inputValue);
      }
      this.inputVisible = false;
      this.articlePublish.label = '';
    },
    handleRemove (file, fileList) {
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },


    // 添加音乐函数
    async addmusic(){
      const title = this.musicMAPublish.title,
            singer = this.musicMAPublish.singer,
            lyric = this.musicMAPublish.lyric,
            musicSrc = this.musicSrc,
            musicCoverSrc = this.musicCoverSrc


      if(!title || !singer || !lyric || !musicSrc || !musicCoverSrc) return this.$message.error("有些东西还没填哦，在检查检查吧")

      let {data} = await this.$axios({
        method: "post",
        url: "/music/add",
        data: {
          title, singer, lyric, musicSrc, musicCoverSrc
        }
      });

      if(data.code) return this.$message.error(data.msg);

      this.$message({
        type: "success",
        duration: 1000,
        message: data.msg,
        onClose(){
          window.location.reload()
        },
      });
    } 
  },
}
</script>

<style lang="less" scoped>
#musicMA {
  margin-left: 5px;

  .musicMA-title {
    h3 {
      font-size: 17px;
      letter-spacing: 1px;
      line-height: 24px;
      border-left: 3px solid skyblue;
      text-indent: 10px;
      margin-bottom: 20px;
    }
  }

  .musicMA-content {
    .musicMA-content-botton {
      display: flex;
      justify-content: center;
      align-items: center;

      .el-form-item-submit {
        margin-top: 20px;
        align-self: center;
        width: 300px;
      }
    }
  }
}
</style>