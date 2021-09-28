<template>
  <div id="articleMA">
    <div class="articleMA-publish">
      <div class="articleMA-publish-title">
        <h3>发表文章</h3>
      </div>
      <div class="articleMA-publish-content">
        <el-form ref="form"
                 :model="articlePublish"
                 label-width="80px"
                 size="mini">
          <el-form-item label="文章标题"
                        class="el-form-item-title"
                        type>
            <el-input v-model="articlePublish.title"></el-input>
          </el-form-item>
          <el-form-item label="文章标签">
            <el-tag :key="value"
                    v-for="(item, value) in articleLabel"
                    :closable="true"
                    :disable-transitions="false"
                    @close="handleClose(item)">
              {{item}}
            </el-tag>
            <el-input class="input-new-tag"
                      v-if="inputVisible"
                      v-model="articlePublish.label"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm">
            </el-input>
            <el-button v-else
                       class="button-new-tag"
                       size="small"
                       @click="showInput">
              + 新标签
            </el-button>
          </el-form-item>
          <el-form-item label="文章类型">
            <el-select v-model="articlePublish.type"
                       placeholder="请选择">
              <el-option v-for="item in articleType"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章描述">
            <el-input v-model="articlePublish.describe"
                      type="textarea"
                      :rows="6"
                      placeholder="请输入内容"
                      maxlength="100"
                      show-word-limit>
            </el-input>
          </el-form-item>
          <el-form-item label="上传封面">
            <el-upload :action="urlBase+'/admin/cover'"
                       list-type="picture-card"
                       :on-preview="handlePictureCardPreview"
                       :on-remove="handleRemove"
                       name="cover"
                       :on-success="coverSuccess"
                       :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip"
                   slot="tip">只能上传jpg，png的横向图片，且不能超过3MB</div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                   :src="dialogImageUrl"
                   alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload class="upload-demo"
                       drag
                       :action="urlBase+'/admin/md'"
                       multiple
                       ref="mdUpload"
                       name="md"
                       :file-list="mdFileList"
                       :on-success="mdUploadSuccess"
                       :before-upload="beforeMDUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip"
                   slot="tip">只能上传md文件，且不超过3MB，请谨慎选择文件，避免不必要的请求操作，增大服务器负担</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="附带链接"
                        class="el-form-item-link"
                        type>
            <div class="el-form-item-link-input">
              <div>
                <el-form-item label="链接标题:"
                              type
                              class="el-form-item-link-input-input">
                  <el-input v-model="linkValueTitle"></el-input>
                </el-form-item>
                <el-form-item label="链接:"
                              type
                              class="el-form-item-link-input-input">
                  <el-input v-model="linkValue"></el-input>
                </el-form-item>
                <el-button type="primary"
                           round
                           class="el-form-item-link-input-button"
                           @click="addLink">
                  添加链接
                </el-button>
              </div>
              <div class="el-form-item-link-li"
                   v-for="(item2,value2) in articlePublish.link"
                   :key="value2">
                {{item2[0]}}: {{item2[1]}}
              </div>
            </div>
          </el-form-item>
        </el-form>

        <el-button type="primary"
                   round
                   class="el-form-item-submit"
                   @click="confirmAgain">发表文章</el-button>
        <div class="confirmAgain"
             v-show="confirmAgainData">
          <div class="confirmAgain-bigBox">
            <div>确定发表文章吗？</div>
            <div>
              <div @click="confirmAgain(false)">手残了</div>
              <div @click="submitForm">给爷发</div>
            </div>
            <div>*注意检查文章链接等不必要条件</div>
          </div>
        </div>
        <div class="el-form-item-waring">*注意：检查好之后再发表文章，避免产生额外的请求</div>
      </div>
    </div>

    <div class="articleMA-content">
      <h3>修改文章</h3>
      <el-table :data="tableData"
                :stripe="true"
                :border="true"
                style="width: 100%">
        <el-table-column prop="id"
                         label="文章id号"
                         width="215">
        </el-table-column>
        <el-table-column prop="title"
                         label="文章标题"
                         width="150">
        </el-table-column>
        <el-table-column prop="time"
                         label="发表时间"
                         width="150">
        </el-table-column>
        <el-table-column prop="pv"
                         label="浏览量"
                         width="65">
        </el-table-column>
        <el-table-column prop="cm"
                         label="评论量"
                         width="65">
        </el-table-column>
        <el-table-column label="操作"
                         width="300">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="seeAC(scope.$index, scope.row)">
              查看
            </el-button>
            <el-popover placement="right"
                        width="700"
                        trigger="click"
                        class="modify">
              <el-form ref="form"
                       :model="modifyArticle"
                       label-width="80px"
                       size="mini">
                <el-form-item label="修改标题"
                              class="el-form-item-title"
                              type>
                  <el-input v-model="modifyArticle.title"></el-input>
                </el-form-item>
                <el-form-item label="置顶状态">
                  <el-select v-model="modifyArticle.top"
                             placeholder="请选择">
                    <el-option v-for="item in topData"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-button type="primary"
                           round
                           class="article-publish-content-button"
                           @click="modifyArticleFN(scope.row, 'title')">
                  修改标题
                </el-button>
                <el-button type="primary"
                           round
                           class="article-publish-content-button"
                           @click="modifyArticleFN(scope.row, 'top')">
                  置顶状态
                </el-button>
              </el-form>
              <el-button slot="reference"
                         type="primary"
                         size="mini">
                修改
              </el-button>
            </el-popover>
            <el-popconfirm confirm-button-text='给爷爬'
                           cancel-button-text='手滑了'
                           icon="el-icon-info"
                           icon-color="red"
                           title="确定删除吗？"
                           @confirm="handleDelete(scope.$index, scope.row)">
              <el-button slot="reference"
                         size="mini"
                         type="danger">删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data () {
    return {
      inputVisible: false,  // 文章标签控制显示数据
      inputVisible2: false, // 文章链接控制显示数据
      urlBase: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
      mdFileList: [], // md文件地址
      dialogImageUrl: "", // 封面地址数据
      dialogVisible: false, // 封面el默认数据
      linkValueTitle: "", // 文章链接添加的内容标题
      linkValue: "", // 文章链接添加的内容
      confirmAgainData: false,// 再次确定发表文章

      // 文章修改数据
      tableData: [],
      modifyArticle: {
        title: "",
        top: "",
      },

      // 文章发表数据
      articlePublish:
      {
        title: "", // 文章标题
        type: "", // 文章类型
        label: "", // 文章标签
        describe: '',  // 文章描述
        src: "",  // 文章内容md地址
        coverSrc: '', // 文章封面地址
        link: {}, // 文章链接数据
      },

      // 文章类型配置数据
      articleType:
        [{
          value: "原创",
          label: '原创',
        },
        {
          value: "转载",
          label: '转载',
        }
        ],
      
      // 置顶类型配置数据
      topData: [{
          value: "置顶",
          label: '置顶',
        },
        {
          value: "不置顶",
          label: '不置顶',
        }
        ],

      // 文章标签默认配置数据
      articleLabel: ["个人日记", "JavaScript", "web前端"],
    };
  },

  computed: {
    ...mapState(['userInfo']),
  },

  async mounted () {
    let { data: { data } } = await this.$axios({
      method: "post",
      url: "/art/all",
      data: {
        order: "date"
      }
    })

    data.forEach(item => {
      let id = item._id;
      let title = item.title;
      let time = item.date;
      let pv = item.reading;
      let cm = item.comment.length;
      let coverSrc = item.coverSrc;
      let srcMD = item.srcMD
      time = this.fmtTime(time);

      let all = { id, title, time, pv, cm, coverSrc, srcMD };

      this.tableData.push(all);
    });
  },

  methods: {

    // el标签配置函数
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

    fmtTime (value, date2, date3 = true) {
      let date = new Date(value),
        YY = date.getFullYear(),
        MM = date.getMonth() + 1,
        DD = date.getDate(),
        hh = date.getHours(),
        mm = date.getMinutes();

      if (date3)
      {
        MM < 10 && (MM = "0" + MM)
        DD < 10 && (DD = "0" + DD)
        hh < 10 && (hh = "0" + hh)
        mm < 10 && (mm = "0" + mm)
      }

      switch (date2)
      {
        case 1: return YY;
        case 2: return MM;
        case 3: return DD;
        case 4: return hh;
        case 5: return mm;
      }

      return `${YY}-${MM}-${DD} ${hh}:${mm}`
    },

    // 上传封面配置函数
    handleRemove (file, fileList) {
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },


    //发表文章
    async submitForm () {
      this.confirmAgainData = false;

      let { data } = await this.$axios({
        method: "post",
        url: "/admin/article",
        data: {
          title: this.articlePublish.title,
          type: this.articlePublish.type,
          label: this.articleLabel,
          describe: this.articlePublish.describe,
          src: this.articlePublish.src,
          coverSrc: this.articlePublish.coverSrc,
          link: this.articlePublish.link,
        }
      });
      if (data.code) return this.$message.error(data.msg);

      this.$message({
        type: "success",
        message: data.msg,
        onClose () {
          window.location.reload()
        },
      });

      setTimeout(() => {
        this.$router.push('/article/' + data._id)
      }, 1000);
    },

    // md上传成功的钩子
    mdUploadSuccess (res, file, fileList) {
      this.articlePublish.src = res.mdSrc
    },

    // 封面上传成功的钩子
    coverSuccess (res, file, fileList) {
      this.articlePublish.coverSrc = res.coverSrc
    },

    // 添加链接函数
    addLink () {
      if (!this.linkValueTitle || !this.linkValue) return this.$message.error("链接要输入链接名称和地址")

      let title = this.linkValueTitle;
      let value = this.linkValue;
      this.$set(this.articlePublish.link, title, [title, value])
    },

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

    // md文件格式检测
    beforeMDUpload (file) {
      let isMD = file.type;
      let isLt3M = file.size / 1024 / 1024 < 3;
      if (isMD)
      {
        this.$message.error('上传文件必须是md格式');
      }
      if (!isLt3M)
      {
        this.$message.error('上传文件大小不能超过 3MB!');
      }
      return !isMD && isLt3M
    },

    // 删除文章
    async handleDelete (value, item) {
      let user = this.userInfo._id
      let { srcMD, coverSrc } = item
      if (!user)
      {
        return this.$message.error("权限不足")
      }

      let { data } = await this.$axios({
        method: "post",
        url: "/art/delete",
        data: {
          user,
          id: item.id,
          srcMD,
          coverSrc
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

    },

    seeAC (value, item) {
      window.location.href = `/article/${item.id}`
    },


    // 再次确定发表文章
    confirmAgain (a = true) {
      if (!a) return this.confirmAgainData = false;
      this.confirmAgainData = true;
    },

    async modifyArticleFN(id, type){
      let temp = "";
      switch (type) {
        case "title": temp = this.modifyArticle.title;break;
        case "top": temp = this.modifyArticle.top;break;
      }
      console.log(temp);
      let {data} = await this.$axios({
        method: "post",
        url: "/art/change",
        data: {
          type,
          temp,
          id: id.id
        },
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
  }
};
</script>

<style scoped lang="less">
button {
  margin-left: 0 !important;
  margin-right: 5px;
}

// .article-publish-content {
//   display: flex;
//   flex-direction: column;

// .el-form-item-title
// {
//   width: 300px;
// }

.article-publish-content-button {
  width: 300px;
  margin-top: 20px;
  align-self: center;
}
// }

h3 {
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 24px;
  border-left: 3px solid skyblue;
  text-indent: 10px;
  margin-bottom: 20px;
}

.articleMA-content {
  margin-left: 5px;
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    background: #9ae77c;
    border-radius: 20px;
  }

  ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    background: #ededed;
  }
}

.articleMA-publish {
  margin-left: 5px;
  margin-bottom: 30px;

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px !important;
    height: 32px !important;
    line-height: 30px !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }

  .articleMA-publish-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    padding-bottom: 20px;
    border-bottom: 1px dashed skyblue;

    .el-form-item-title {
      .el-input {
        width: 200px;
      }
    }

    .el-form-item-link {
      .el-form-item-link-input {
        display: flex;
        box-sizing: border-box;
        padding: 10px;
        border: 1px dashed blue;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        div:nth-child(1) {
          .el-form-item-link-input-input {
            margin: 0;
            margin-bottom: 10px;
            width: 400px;
          }
        }

        .el-form-item-link-li {
          flex-direction: column;
        }
      }
    }

    .el-form-item-submit {
      margin-top: 20px;
      align-self: center;
      width: 300px;
    }

    .el-form-item-waring {
      margin-top: 10px;
      align-self: center;
      font-size: 13px;
      color: red;
    }
  }
}

.confirmAgain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
  
  .confirmAgain-bigBox {
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

    div:nth-child(1) {
      align-self: center;
    }

    div:nth-child(2) {
      display: flex;
      justify-content: space-around;

      div {
        cursor: pointer;
        padding: 10px 15px;
        border-radius: 20px;
        font-size: 15px;
        color: white;
      }

      div:nth-child(1) {
        background: red;
      }
      div:nth-child(2) {
        background: green;
      }
    }

    div:nth-child(3) {
      align-self: center;
      color: red;
      font-size: 12px;
    }
  }
}
</style>
