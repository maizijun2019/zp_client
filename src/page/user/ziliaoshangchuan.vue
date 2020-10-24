<template>
  <div>
    <div @click="dialogVisible = true;chuan_name=''" class="addbox">
      <div class="upbtn">上传资料</div>
    </div>
    <div class="XiangBoxcen">
      <div class='XiangBox_top'>
                <div class="XiangBox_toptit">资料列表</div>
              </div>
    </div>
    <div  class="TableStyle">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="项目名称">
          <template slot="header" slot-scope="scope">
            <div class='TabHearTop TabHearTop_a'><span class="TabHearTop_sp"></span>文件名称</div>
          </template>
          <template slot-scope="scope">
            <span style="margin-left:10px">{{scope.$index+1}}、</span>{{scope.row.ori_name}}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="文件分类" width='100'>
          <template slot-scope="scope" class="fenlist">
            <span>{{fenlei[scope.row.type]}}</span>
          </template>

        </el-table-column>
        <el-table-column prop="update_at" label="上传时间"></el-table-column>
        <el-table-column prop="projectid" label="操作" width='150'>
          <template slot-scope="scope">
            <span class="dianbtn" :data-id="scope.row.id" @click="xiadanFn(scope.row.id)">下载</span>
            <span class="dianbtn" :data-id="scope.row.id" @click="xiuFn(scope.$index)">修改</span>
            <span class="dianbtn" :data-id="scope.row.id" @click="shanFn(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加文件"
      :visible.sync="dialogVisible"
      width="500" :append-to-body="true"> 
      <div>

        <div class="ziliaotab">
          <div class="tabcen_li">
            <div class="tabcen_li_name">文件名：</div>
            <el-input placeholder="请输入内容" v-model="fromData.ori_name" clearable></el-input>
            <!-- <input type="text" v-model="fromData.enterprise_name"> -->
          </div>
          <div class="tabcen_li">
            <div class="tabcen_li_name">文件：</div>
            <div class="upbox upbtn">
              上传
              <input type="file" @change="upImg" accept='.zip,.doc,.docx,.xls,.xlsx,.xlsm,.png,.jpg,.gif'>
            </div>
          </div>
          <div class="tabcen_li" v-if='chuan_name'>
            <div class="tabcen_li_name">上传：</div>
            <div class="fname">{{chuan_name}}</div>
          </div>
          <div class="tabcen_li">
            <div class="tabcen_li_name">上传类型：</div>
            <el-select v-model="fromData.type" filterable placeholder="请选择">
              <el-option v-for="item in fenleiData" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFn">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改文件"
      :visible.sync="editf"
      width="500" :append-to-body="true"> 
      <div>

        <div class="ziliaotab">
          <div class="tabcen_li">
            <div class="tabcen_li_name">文件名：</div>
            <el-input placeholder="请输入内容" v-model="editData.ori_name" clearable></el-input>
            <!-- <input type="text" v-model="fromData.enterprise_name"> -->
          </div>
          <div class="tabcen_li">
            <div class="tabcen_li_name">文件：</div>
            <div class="upbox upbtn">
              上传
              <input type="file" @change="upImg" accept='.zip,.doc,.docx,.xls,.xlsx,.xlsm,.png,.jpg,.gif'>
            </div>
          </div>
          <div class="tabcen_li">
            <div class="tabcen_li_name">上传：</div>
            <div class="fname">{{chuan_name}}</div>
          </div>
          <div class="tabcen_li">
            <div class="tabcen_li_name">上传类型：</div>
            <el-select v-model="editData.type" filterable placeholder="请选择">
              <el-option v-for="item in fenleiData" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editf = false">取 消</el-button>
        <el-button type="primary" @click="editFn">确 定</el-button>
      </span>
    </el-dialog>

    <div class="PageBox" v-if="tableData && tableData.length>0">
      <el-pagination
        layout="prev, pager, next"
        :total="total" :current-page="page+1" :page-size='pageSize' @size-change="pageFn"
          @current-change="pageFn" >
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default{
    data(){
      return{
        fromData: {
          type:null,
          ori_name:null,
          addedFiles:null,
       },
        fenleiData: null,
        chuan_name:null,
        dialogVisible:false,
        tableData:null,
        fenlei:null,
        editData:{
          id:null,
           type:null,
          ori_name:null,
          addedFiles:null,
          path:null
        },
        editf:false,
        index:0,
        // 分页
        total:0,
        page:0,
        pageSize:15
      }
    },
    created(){
      let that=this;
      // 获取分类列表
      that.Com.request("",'/personalcenter/Index/getuploadTypes',function(res){
        that.fenleiData=res.data;
        let fenlei_={};
        for(let i=0;i<res.data.length;i++)
        {
          fenlei_[res.data[i].type]=res.data[i].name;
        }
        that.fenlei=fenlei_;
        that.getListFn();
      })
      // 获取上传
    },
    methods:{
      // 下载
      xiadanFn:function(id){
        let that=this;
        let id_=id;
        that.$confirm('确定下载该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            window.location.href='http://zp.damaike.com/manage_client/public/index.php/personalcenter/Index/fileDownload?id='+id_;
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 点击分页
      pageFn:function(res){
        this.page=res-1;
        this.getListFn();
      },
      // 获取上传列表
      getListFn(){
        let that=this;
        that.Com.request({
          pageIndex:that.page,
          limit:that.pageSize,
        },'/personalcenter/Index/getUploadedFiles',function(res){
          if(res.result=='success')
          {
            that.tableData=res.data;
            that.total=res.total;
          }
        })
      },
      // 修改文件
      editFn:function(){
        let that=this;
        that.Com.loginFNPan(function(res) {
             if(res.error_code==0){

              let param = new FormData();
              param.append("addedFiles", that.editData.addedFiles);
              param.append("type", that.editData.type);
              param.append("ori_name", that.editData.ori_name);
              param.append("id", that.editData.id);
              let config = {
                headers: { "Content-Type": "multipart/form-data" }
              };
              // that.$http.post("http://172.16.3.97/mySite/manage_client/public/customers/index/changeUploadFile1",
              that.$http.post("http://zp.damaike.com/manage_client/public/index.php/personalcenter/Index/changeUploadFile1",
              // that.$http.post("/api/mySite/manage_client/public/personalcenter/Index/changeUploadFile1",
                  param,
                  config
                )
                .then(response => {
                  if (response.data.result == "success") {
                    that.$message({
                      message: "文件修改成功",
                      type: "success",
                      duration: 1500,
                        onClose: function() {
                          that.editf=false;
                           that.getListFn();
                       }
                    });
                  }
                  else{
                                      that.$message({
                    message: response.data.error_message,
                    type: "error",
                    duration: 1500,
                  });
                  }
                });
            }
          });
      },
      // ---选择修改文件
      xiuFn:function(index){
        let index_=index;
        let that=this;
        that.index=index;
        let data_=that.tableData;
        that.editData=Object.assign({},that.tableData[index_]);
        that.chuan_name=data_[index_]['path'];
        that.editf=true;
      },
      // ---选择删除文件
      shanFn(id)
      {
        let that=this;
        let id_=id;
        that.$confirm('确定删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.Com.request({
            id:id_
          },'/personalcenter/Index/deleteUpload',function(res){
            if(res.result='success')
            {
              that.$message({
                type: 'success',
                message: '删除成功!'
              })
              that.getListFn();
            }else{
              that.$message({
                type: 'error',
                message: res.error_message
              })
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },  
      // 添加
      addFn(){
        let that=this;
        if(!that.fromData.ori_name)
        {
          that.$message({
                message: '请填写文件名',
                type: 'error',
                duration:1500,
                onClose:function(){
                }
              });
        }
        else if(!that.fromData.type){
          that.$message({
                message: '请选择文件分类',
                type: 'error',
                duration:1500,
                onClose:function(){
                }
              });
        }
        else{
          that.Com.loginFNPan(function(res) {
            if(res.error_code==0) {
            let param = new FormData();
            param.append("addedFiles", that.fromData.addedFiles);
            param.append("type", that.fromData.type);
            param.append("ori_name", that.fromData.ori_name);
            let config = {
              headers: { "Content-Type": "multipart/form-data" }
            };
            // that.$http.post("http://172.16.3.97/mySite/manage_client/public/customers/index/addEnterprise",
            that.$http.post("http://zp.damaike.com/manage_client/public/index.php/personalcenter/Index/uploadFiles",
            // that.$http.post("/api/mySite/manage_client/public/personalcenter/Index/uploadFiles",
                param,
                config
              )
              .then(response => {
                if (response.data.result == "success") {
                  that.$message({
                    message: "文件添加成功",
                    type: "success",
                    duration: 1500,
                    onClose: function() {
                      that.dialogVisible=false;
                       that.getListFn();
                    }
                  });
                }
                else{
                                       that.$message({
                    message: response.data.error_message,
                    type: "error",
                    duration: 1500,
                  });
                }
              });
          }
        });
        }
      },
      // 上传图片
    upImg(e) {
      var that = this;
      if (e && e.target.files[0]) {
        let file_ = e.target.files[0];
        if(that.editf)
        {
          that.editData.addedFiles = file_;
        }
        else{
          that.fromData.addedFiles = file_;
          if(that.fromData.ori_name==null)
          { 
            that.fromData.ori_name=file_.name;
          }
        }
        that.chuan_name = file_.name;
      }
    },
    },
    components:{

    }
  }
</script>

<style scoped>
.fenlist{
  text-align: center;
}
.dianbtn{
  cursor: pointer;
  color: #3399ff;
}
.dianbtn:nth-child(2)
{
  margin:0 15px;
}
.dianbtn:hover
{
  text-decoration: underline;
}
.XiangBoxcen{
  border-bottom: 1px solid #ddd;
}
.XiangBox_toptit{
  background-color: #3399ff;
  color:white;
  font-size: 13px;
  text-align: center;
  line-height:28px;
  padding: 0 20px;
  padding-right: 25px;
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.XiangBox_toptit::after
{
  background-color: white;
  content: '';
  position:absolute;
  right: 0;
  transform: rotate(45deg) translate(-25px,-20px);
  width: 3px;
  height: 100px;
}
.addbox{
  padding: 20px;
  box-sizing: border-box;
}
.fname{
    flex: 1;
        word-break: break-word;
}
.imgup {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: white;
}
.upbox {
  position: relative;
}
.upbox img {
  width: 90px;
  cursor: pointer;
}
.upbox input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 99;
  cursor: pointer;
}
.tancen {
  box-sizing: border-box;
  margin-top: 90px;
}
.upbtn{
  text-align: center;
  cursor: pointer;
  background-color: #e5f5ff;
  color: #3366ff;
  width: 90px;
  height: 35px;
  line-height: 35px;
  display:block;
}
.upbtn:hover
{
  box-shadow: 0 0 20px -5px #2eaefd inset, 0 0 3px #ddd;
}

.ziliaotab .topbox{
  display: flex;
  align-items: center;
  color: #3399ff;
  padding:20px 12px;
  box-sizing: border-box;
}
.ziliaotab .topbox_{
  display: flex;
  align-items: center;
  color: #3399ff;
  box-sizing: border-box;
}
.ziliaotab .topbox i{
 cursor: pointer;
}
.ziliaotab .topbox span{
  color: white;
  background-color: #3399ff;
  border-radius: 50%;
  margin-right: 10px;
  padding: 3px;
  font-size: 10px;
  cursor: pointer;
}
.ziliaotab .topbox i:hover
{
  text-decoration: underline;
}
.ziliaotab .addbtn{
  margin: auto;
  margin-top: 60px;
}
.ziliaotab .tabcen_li{
  position: relative;
  display: flex;
  align-items: center;
  margin: auto;
  margin-top: 20px;
  width: 320px;
}
.ziliaotab .tabcen_li:nth-child(1)
{
  margin-top: 0 !important;
}
.ziliaotab .tabcen_li_name{
  min-width: 80px;
  font-size: 13px;
  color: #888888;
  text-align: left;
  margin-right: 5px;
}
.ziliaotab .tabcen_li input,.tabcen_li select
{
  border: none;
  border: 1px solid #ddd;
  width: 250px;
  line-height: 30px;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 13px;
  height: 30px;
  flex: 1;
}

.ziliaotab .tabcen_li  .el-input{
  width: auto;
}
.ziliaotab .tabcen_li_cuo{
  color: #ff3333;
  margin-left: 10px;
  font-size: 13px;
}
.ziliaojiben .tabcen_li .el-input__inner{
  border: none;
  border: 1px solid #ddd;
  width: 250px;
  line-height: 30px  !important;
  padding: 0 5px;
  box-sizing: border-box;
  font-size: 13px;
  height: auto !important;
  border-radius: 0 !important;
}
</style>