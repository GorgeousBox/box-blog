<template>
  <div id="friendMA">
    <div class="friendMA-publish">
      <div class="friendMA-publish-add">
        <div class="friendMA-publish-title">
          <h3>添加友联</h3>
        </div>
        <div class="friendMA-publish-content">
          <el-form 
            ref="form" 
            :model="friendPublish" 
            label-width="80px" 
            size="mini">
            <el-form-item label="友联名称" class="el-form-item-title" type>
              <el-input v-model="friendPublish.name" ></el-input>
            </el-form-item>
            <el-form-item label="友联链接" class="el-form-item-title" type>
              <el-input v-model="friendPublish.link"></el-input>
            </el-form-item>
            <el-form-item label="友联描述" class="el-form-item-title" type>
              <el-input v-model="friendPublish.dec"></el-input>
            </el-form-item>
            <el-form-item label="友联图标" class="el-form-item-title" type>
              <el-input v-model="friendPublish.img"></el-input>
            </el-form-item>
          </el-form>
          <el-button 
            type="primary" 
            round 
            class="friendMA-publish-content-button"
            @click="friendAdd">
            添加友联
          </el-button>
        </div>
      </div>

      <div class="friendMA-publish-change">
        <div class="friendMA-publish-change-title">
          <h3>修改友联</h3>
        </div>
        <div class="friendMA-publish-change-content">
          <el-table
            :data="tableData"
            :stripe="true"
            :border="true"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="友联id号"
              width="215">
            </el-table-column>
            <el-table-column
              prop="name"
              label="友联名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="dec"
              label="友联描述"
              width="150">
            </el-table-column>
            <el-table-column
              prop="link"
              label="友联链接"
              width="150">
            </el-table-column>
            <el-table-column
              label="操作"
              width="300">
              <template slot-scope="scope">
                <el-popover
                  placement="right"
                  width="700"
                  trigger="click"
                  class="modify">
                  <el-form 
                    ref="form" 
                    :model="modifyFriend" 
                    label-width="80px" 
                    size="mini">
                    <el-form-item label="修改名称" class="el-form-item-title" type>
                      <el-input v-model="modifyFriend.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="修改描述" class="el-form-item-title" type>
                      <el-input v-model="modifyFriend.dec" ></el-input>
                    </el-form-item>
                    <el-form-item label="修改链接" class="el-form-item-title" type>
                      <el-input v-model="modifyFriend.link" ></el-input>
                    </el-form-item>
                    <el-form-item label="修改图标" class="el-form-item-title" type>
                      <el-input v-model="modifyFriend.img" ></el-input>
                    </el-form-item>
                    <el-button 
                      type="primary" 
                      round 
                      class="friendMA-publish-content-button"
                      @click="modifyFriendFN(scope.row, 'name')">
                      修改名称
                    </el-button>
                    <el-button 
                      type="primary" 
                      round 
                      class="friendMA-publish-content-button"
                      @click="modifyFriendFN(scope.row, 'dec')">
                      修改描述
                    </el-button>
                    <el-button 
                      type="primary" 
                      round 
                      class="friendMA-publish-content-button"
                      @click="modifyFriendFN(scope.row, 'link')">
                      修改链接
                    </el-button>
                    <el-button 
                      type="primary" 
                      round 
                      class="friendMA-publish-content-button"
                      @click="modifyFriendFN(scope.row, 'img')">
                      修改图标
                    </el-button>
                  </el-form>
                  <el-button 
                    slot="reference"
                    type="primary"
                    size="mini">
                    修改
                  </el-button>
                </el-popover>
                <el-popconfirm
                  confirm-button-text='给爷爬'
                  cancel-button-text='手滑了'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定删除吗？"
                  @confirm="handleDelete(scope.$index, scope.row)"
                >
                  <el-button
                    slot="reference"
                    size="mini"
                    type="danger"
                  >删除
                  </el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data(){
    return {
      friendPublish: {
        name: "",
        link: "",
        dec: "",
        img: "",
      },

      tableData: [],

      modifyFriend:{
        name: "",
        dec: "",
        link: "",
        img: "",
      }
    };
  },

  computed: {
    ...mapState(['userInfo']),
  },

  methods: {
    async friendAdd(){
      let {name, link, dec, img} = this.friendPublish;

      let {data} = await this.$axios({
        method: "post",
        url: "/friend/add",
        data: {
          name, link, dec, img
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
    },

    async handleDelete(value, item){
      let user = this.userInfo._id
      if (!user) {
        return this.$message.error("权限不足")
      }
      
      let {data} = await this.$axios({
        method: "post",
        url: "/friend/delete",
        data: {
          user,
          id: item.id,
        }
      });

      if(data.code) return this.$message.error(data.msg)

      this.$message({
        type: "success",
        duration: 1000,
        message: data.msg,
        onClose(){
          window.location.reload()
        },
      });

    },

    async modifyFriendFN(id, type){
      let temp = "";
      switch (type) {
        case "name": temp = this.modifyFriend.name;break;
        case "link": temp = this.modifyFriend.link;break;
        case "dec": temp = this.modifyFriend.dec;break;
        case "img": temp = this.modifyFriend.img;break;
      }

      let {data} = await this.$axios({
        method: "post",
        url: "/friend/modify",
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
  },

  async mounted(){
    let {data:{data}} = await this.$axios({
      method: "post",
      url: "/friend/huo"
    });

    data.forEach(item => {
      let id = item._id;
      let name = item.name;
      let dec = item.dec;
      let link = item.link;
      let img = item.img;

      let all = {id, name, dec, link, img};

      this.tableData.push(all);
    });
  }
};
</script>

<style lang="less" scoped>

.modify
{

}

#friendMA
{
  margin-left: 5px;

  h3
  {
    font-size: 17px;
    letter-spacing: 1px;
    line-height: 24px;
    border-left: 3px solid skyblue;
    text-indent: 10px;
    margin-bottom: 20px;
  }

  .friendMA-publish-content
  {
    display: flex;
    flex-direction: column;

    // .el-form-item-title
    // {
    //   width: 300px;
    // }

    .friendMA-publish-content-button
    {
      width: 300px;
      margin-top: 20px;
      align-self: center;
    }
  }
}

</style>