<template>
  <div class="TableStyle">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="项目名称">
      <template slot="header" slot-scope="scope">
        <div class='TabHearTop TabHearTop_a'><span class="TabHearTop_sp"></span>项目名称</div>
      </template>
      <template slot-scope="scope">
        <span style="margin-left:10px">{{scope.$index+1}}、</span>{{scope.row.title}}
      </template>
    </el-table-column>
    <el-table-column prop="type" label="项目分类"></el-table-column>
    <el-table-column prop="orderTime" label="项目时间"></el-table-column>
    <el-table-column prop="projectid" label="详情" width='100'>
       <template slot-scope="scope">
         <router-link :to="{name:'UserIndexBanZhongXiang',query:{'oid':scope.row.order_id,'type':1}}" class="xaingbtn">查看详情</router-link>
      </template>
    </el-table-column>
  </el-table>
  <div class="PageBox" v-if="total>0">
    <el-pagination
      layout="prev, pager, next"
      :total="total" :current-page="page" :page-size='pageSize' @size-change="pageFn"
        @current-change="pageFn" >
    </el-pagination>
  </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
          tableData:null,
          page:1,
          total:0,
          pageSize:0,

      }
    },
    created(){
      this.getShuFn(1)
    },
    methods:{
      pageFn(num)
      {
        this.getShuFn(num);
      },
      getShuFn(num)
      {
        let that=this;
        let num_=num;
        this.page=num_;
        that.Com.request({
          pageIndex:num_
          },'personalCenter/Index/toBeAudited',function(res){
          if(res.result=='success')
          {
            that.total=res.count;
            that.pageSize=res.pageSize;
            that.tableData=res.data;
          }
        })
      }
    },
    components:{

    }
  }
</script>

<style scoped>

.xaingbtn{
  color: #3399ff;
}
.PageBox{
  margin-top: 20px;
}
</style>