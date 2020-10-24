<template>
  <div class='pu-kong pi_jie'>
    <div class="HuiGe"></div>
    <div class="cen-width pijie_cen">
      <div class="YeLi">
        <router-link :to="{name:'FuWu'}" class="YeLi_li">服务项目</router-link>
        <i class="el-icon-arrow-left"></i>
        <router-link :to="{name:'PiPei'}" class="YeLi_li">精准匹配</router-link>
        <i class="el-icon-arrow-left YeLi_i_on"></i>
        <router-link :to="{name:'PiPeiJieGuo'}" class="YeLi_li YeLi_li_on">匹配结果</router-link>
      </div>
    </div>
    <div class="TableStyle">
      <el-table :data="tableData" style="width: 100%" stripe v-loading="loading">
        <el-table-column prop="name" label="项目名称">
          <template slot="header" slot-scope="scope">
            <div class='TabHearTop TabHearTop_a'><span class="TabHearTop_sp"></span>项目名称</div>
          </template>
        </el-table-column>
        <el-table-column prop="ctime" label="申报时间" align="center"></el-table-column>
        <el-table-column prop="matching" label="匹配度" width="120">
          <template slot-scope="scope"><span class="pipeidu">{{scope.row.matching}}%</span></template>
        </el-table-column>
        <el-table-column prop="xiang" label="操作" width="330"align="center" >
          <template slot-scope="scope">
            <div class="info_btn info_btn_bang BangBtn">
            <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=489261411&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:489261411:51" alt="点击咨询" title="点击咨询"/></a>

                我要帮助
            </div>
              <router-link :to="{name:'FuWuXiangQing',query:{'pid':scope.row.id}}" class="info_btn">我要下单</router-link>
              <router-link :to="{name:'FuWuXiangQing',query:{'pid':scope.row.id}}" class="info_btn">查看详情</router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="PageBox" v-if="total>0">
        <el-pagination
          layout="prev, pager, next"
          :total="total" :current-page="formData.page-1" :page-size='pageSize' @size-change="pageFn"
            @current-change="pageFn" >
        </el-pagination>
      </div>
    </div>
    <div class="HuiGe"></div>

  </div>
</template>

<script>
  export default{
    data(){
      return{
          tableData: null,
          formData:{
            page:1,
            code:null,
          },
          total:0,
          pageSize:0,
          loading:false
      }
    },
    created(){
      let that=this;
      that.formData.code=this.$route.query.code;
      this.Com.loginFNPan(function(res){
          if(res.error_code==101)
        {
          that.$message({
                message:"请先登录",
                type: 'error',
                duration:1500,
                onClose:function(){
              that.$router.push({name:'Login'})
            }
            });
        }
      })
      this. pageFn(1);
    },
    methods:{
      pageFn(num){
        let that=this;
        let page_=num;
        that.loading=true;
            this.Com.request({
              code:this.$route.query.code,
              pageIndex:page_
            },'orders/Orders/intelligentMatching',function(res){
              if(res.result=='success')
              {
                let data_=that.tableDat;
                if(that.tableDat)
                {
                  data_=data_.concat(res.data.data)
                }
                else{
                  data_=res.data.data;
                }
                that.tableData=data_;
                that.total=res.data.count;
                that.pageSize=res.data.pageSize;
        that.loading=false;
            }
        })
      }
    },
    components:{

    }
  }
</script>

<style scoped>
.PageBox{
  padding: 20px 0;
  padding-bottom: 50px;
}
.TableStyle{
  padding:0 10px;
  box-sizing: border-box;
  background-color:white;
}
.info{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pipeidu{
  color: #3399ff;
}
.info_btn{
  position: relative;
  text-align: center;
  height: 27px;
  line-height: 27px;
  cursor: pointer;
  color: #3399ff;
  border-radius: 3px;
  border-radius: 60px;
  display: inline-block;
  margin: 0 10px;
}
.info_btn:hover{
  color: #77b4f1;
  text-decoration: underline !important;
}
.pi_jie{
  background-color: #f3f3f3;
}
.pijie_cen{
  background-color: white;
}
.TableStyle{
  min-height: 500px;
}
</style>