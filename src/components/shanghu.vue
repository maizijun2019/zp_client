<template>
  <div class="FuWuBox">
    <el-dialog
      title="商户搜索结果"
      :visible.sync="tan_f"
      width="70%"
      append-to-body
      >
      <div  class="tanbox" v-if="tableData">
        <el-table :data="tableData" style="width: 100%" stripe>
          <!-- <el-table-column prop="name" label="项目名称">
            <template slot="header" slot-scope="scope">
              <div class='TabHearTop TabHearTop_a'><span class="TabHearTop_sp"></span>项目名称</div>
            </template>
            <template slot-scope="scope">
              <span style="margin-left:10px">{{scope.$index+1}}、</span>{{scope.row.name}}
            </template>
          </el-table-column> -->
          <el-table-column prop="enterprise_name" label="商户名" width="180"></el-table-column>
          <el-table-column prop="telephone" label="电话" width="130"></el-table-column>
          <el-table-column prop="address" label="地址">
            <template slot-scope="scope">{{scope.row.merger_name}}{{scope.row.address}}</template>
          </el-table-column>
           <el-table-column prop="industry_name" label="企业分类"></el-table-column>
          <el-table-column prop="industry_name" label="服务类型">
              <template slot-scope="scope">
            <div v-if="scope.row.gbclass" v-for="item in scope.row.gbclass">
                <el-tooltip effect="dark" :content="item.class_name" placement="bottom">
                  <div class="leibox">{{item.class_name}}</div>
    </el-tooltip></div>
    <div v-if="!scope.row.gbclass">/</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBox">
         <el-pagination
            layout="prev, pager, next"
            :total="total" :current-page="form.page" :page-size='form.limit' @size-change="fanFn"
              @current-change="fanFn" >
          </el-pagination>
        </div>
      </div>
    </el-dialog>

    <div class="soubox">
      <div class="souboxlef">
        <div class="souboxli">
          分类：
          <el-cascader
          v-model="form.class_code"
          :options="fuwuData"
          clearable
          filterable
        ></el-cascader>
        </div>
        <div class="souboxli souboxli_">
          分类名：<input type="text" class="souboxli_name" v-model="form.class_name" placeholder="请输入分类名">
        </div>
        <div class="souboxli souboxli_">
          商户名：<input type="text" class="souboxli_name" v-model="form.operator_name" placeholder="请输入商户名">
        </div>
      </div>
      <div class="souboxrig"><div class="searbox_lef_btn"  @click="shangsouFn">搜索</div></div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
     return{
       tableData:null,
       tan_f:false,
      fuwuData:null,
      total:0,
      form:{
        operator_name:'',
        class_name:'',
        class_code:'',
        page:1,
        limit:7
      }
     }
  },
  mounted(){
    let that=this;
    this.form={
        operator_name:'',
        class_name:'',
        class_code:'',
        page:1,
        limit:7
    };
      this.Com.request({}, "industryclass/index/treeList2017", function(res) {
        let fuduData_ = [];
        for (let i = 0; i < res.length; i++) {
          fuduData_[i] = {};
          fuduData_[i].value = res[i].code;
          fuduData_[i].label = res[i].name;
          if(res[i].children && res[i].children.length>0)
          {
          fuduData_[i].children = [];
            for (let j = 0; j < res[i].children.length; j++)
            {
              fuduData_[i].children[j] = {};
              fuduData_[i].children[j].value = res[i].children[j].code;
              fuduData_[i].children[j].label = res[i].children[j].name;
              if(res[i].children[j].children && res[i].children[j].children.length>0)
              {
              fuduData_[i].children[j].children = [];
                for (let k = 0; k < res[i].children[j].children.length; k++)
                {
                  fuduData_[i].children[j].children[k] = {};
                  fuduData_[i].children[j].children[k].value = res[i].children[j].children[k].code;
                  fuduData_[i].children[j].children[k].label = res[i].children[j].children[k].name;
                  if(res[i].children[j].children[k].children && res[i].children[j].children[k].children.length>0){
                  fuduData_[i].children[j].children[k].children = [];
                    for (let m = 0; m < res[i].children[j].children[k].children.length; m++)
                    {
                      fuduData_[i].children[j].children[k].children[m] = {};
                      fuduData_[i].children[j].children[k].children[m].value = res[i].children[j].children[k].children[m].code;
                      fuduData_[i].children[j].children[k].children[m].label = res[i].children[j].children[k].children[m].name;
                    }
                  }
                }
              }
            }
          }
        }
        that.fuwuData = fuduData_;
      });
  },
  methods:{
    fanFn(e){
      this.form.page=e;
      this.shangsouFn();
    },
    shangsouFn(){
      let that=this;
      let form_=this.form;
      this.Com.request({
        operator_name:form_.operator_name,
        class_name:form_.class_name,
        class_code:form_.class_code[form_.class_code.length-1],
        page:form_.page,
        limit:form_.limit,
      },'homepage/index/operatorsQuery',function(res){
        that.tableData=res.data;
        that.tan_f=true;
        that.total=res.total;
      })
    }
  },
  components:{
  }
}
</script>

<style scoped>
.leibox{
  background-color: #d9ecff;
  font-size: 12px;
  padding: 5px 12px;
  display: inline-block;
  white-space: nowrap;
  margin: 2px 0;
  text-align: center;
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}
.pageBox{
  text-align: right;
}
.souboxlef{
  display: flex;
  align-items: center;
  flex: 1;
}
.souboxli{
  margin-right: 40px;
}
.souboxli_{
  flex: 1;
}
.souboxli_name{
  border: none;
      font-size: 14px;
    line-height: 27px;
    border-bottom: 1px solid #ddd;
    padding: 0 8px;
    box-sizing: border-box;
    width:calc(100% - 100px);
}
.searbox_lef_btn{
  cursor: pointer;
  background-color: #5c9eff;
  color: white;
  text-align: center;
  width: 70px;
  line-height: 25px;
  font-size: 12px;
}
.soubox{
  display:flex;
  align-items: center;
  justify-content: space-between;
}
</style>