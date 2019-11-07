<template>
  <div class="container-article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread v-model="reqParams.channel_id ">内容管理</my-bread>
      </div>
      <el-form label-width="80px" :model="reqParams">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.radio">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 频道插件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top:30px">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果：</span>
      </div>
      <template>
        <el-table :data="article" style="width: 100%">
          <el-table-column label="封面">
            <template slot-scope="scope">
              <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px">
                <div slot="error">
                  <img src="../../assets/error.gif" width="150" height="100" />
                </div>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column label="标题" prop="title"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.status===0">草稿</el-tag>
              <el-tag v-if="scope.row.status===1">待审核</el-tag>
              <el-tag type="success" v-if="scope.row.status===2">审核通过</el-tag>
              <el-tag type="warning" v-if="scope.row.status===3">审核失败</el-tag>
              <el-tag type="danger" v-if="scope.row.status===4">已删除</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="发布时间" prop="pubdate"></el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                circle
                plain
                @click="edit(scope.row.id)"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete" circle plain @click="delArticle(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        style="margin-top:30px"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reqParams: {
        radio: null,
        channel_id: null
      },
      dateArr: [],
      article: [],
      channelOptions: [],
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.article = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    search () {
      if (this.reqParams.channel_id === '') this.reqParams.channel_id = null
      this.reqParams.page = 1
      this.getArticles()
    },
    changeDate (dateArr) {
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    edit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    async delArticle (id) {
      await this.$http.delete(`articles/${id}`)
      this.$message.success('删除成功')
      this.getArticles()
    }
  }
}
</script>
<style scoped lang='less'></style>
