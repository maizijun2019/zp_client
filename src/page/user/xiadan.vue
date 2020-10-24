<template>
  <div>
    <!-- <div>地区没变！！！！！</div> -->
    <div class="TableStyle fuwubox_bot">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="项目名称">
            <template slot="header" slot-scope="scope">
              <div class='TabHearTop TabHearTop_a'><span class="TabHearTop_sp"></span>项目名称</div>
            </template>
            <template slot-scope="scope">
              <span style="margin-left:10px">{{scope.$index+1}}、</span>{{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="项目分类"></el-table-column>
          <el-table-column prop="ctime" label="创建时间"></el-table-column>
          <el-table-column prop="projectid" label="操作" width='100'>
            <template slot-scope="scope">
              <router-link :to="{name:'UserIndexBanZhongXiang',query:{'pid':scope.row.id,'type':2}}" class="dianbtn">下单</router-link>
              <!-- <span class="dianbtn" @click="xiadanFn(scope.row.i)">下单</span> -->
            </template>
          </el-table-column>
        </el-table>
        <div class="PageBox" v-if="tableData && tableData.length>0">
          <el-pagination
            layout="prev, pager, next"
            :total="total" :current-page="page" :page-size='pageSize' @size-change="pageFn"
              @current-change="pageFn" >
          </el-pagination>
        </div>
      </div>
    

  </div>
</template>

<script>
  export default{
    data(){
      return{
        page:1,
        tableData:null,
        total:0,
        pageSize:0,
      }
    },
    created(){
        this.getListFn();
    },
    methods:{
      // --下单
      xiadanFn:function(id){

      },
        // 点击分页
      pageFn:function(res){
        this.page=res;
        this.getListFn();
      },
      // 获取上传列表
      getListFn(){
        let that=this;
        that.Com.request({
           pageIndex:that.page,
        },'personalCenter/Index/canHandel',function(res){
          that.total=res.count;
          that.pageSize=res.pageSize;
          that.loading=false;
          that.tableData=res.data;
        })
      },
    },
    components:{

    }
  }
</script>

<style scoped>
.dianbtn{
  cursor: pointer;
  color: #3399ff;
}
.dianbtn:hover
{
  text-decoration: underline;
}
</style>