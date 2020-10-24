<template>
  <div class="ziliaotab gongsiadd">
    <div class="topbox">
      <div class="topbox_" @click="fanFn">
        <span class="el-icon-arrow-left"></span>
        <i>返回上级</i>
      </div>
      <!-- <router-link to="/user/ziliao" class="topbox_"><span class="el-icon-arrow-left"></span><i>返回上级</i></router-link> -->
    </div>
    <div class="tancen">
      <div class="tabcen_li">
        <div class="tabcen_li_name">公司名：</div>
        <input type="text" v-model="fromData.enterprise_name" />
      </div>
      <div class="tabcen_li">
        <div class="tabcen_li_name">公司logo：</div>
        <div class="upbox">
          <img src="@/assets/img/12.png" />
          <input type="file" @change="upImg" accept="image/*" />
          <img :src="img_url" v-if="img_url" class="imgup" />
        </div>
      </div>
      <div class="tabcen_li">
        <div class="tabcen_li_name">所属行业：</div>
        <el-select v-model="fromData.industry" filterable placeholder="请选择">
          <el-option v-for="item in hangYeAll" :key="item.industry_id" :label="quxianFn(item.industry_name)" :value="item.industry_id"></el-option>
        </el-select>
      </div>
      <div class="tabcen_li" v-if="userinfo && userinfo.is_operators==1 && fuwuData">
        <div class="tabcen_li_name">服务类型：</div>
        <el-cascader
          v-model="fromData.fuwu"
          :options="fuwuData"
          :props="props"
          @change="handleChange"
          filterable
        ></el-cascader>
      </div>
      <div class="tabcen_li">
        <div class="tabcen_li_name">公司电话：</div>
        <input type="text" v-model="fromData.telephone" />
      </div>
      <div class="tabcen_li tabcen_li_d">
        <div class="tabcen_li_name">公司地址：</div>
        <div class="tabcen_li_d_">
          <el-select v-model="prov" placeholder="请选择" @change="shenFn">
            <el-option v-for="item in arr" :key="item.region_id " :label="item.name " :value="item.region_id"></el-option>
          </el-select>
          <el-select v-model="city" placeholder="请选择" @change="shiFn">
            <el-option v-for="item in cityArr" :key="item.region_id " :label="item.name " :value="item.region_id"></el-option>
          </el-select>
          <el-select v-model="district" placeholder="请选择">
            <el-option
              v-for="item in districtArr"
              :key="item.region_id "
              :label="item.name "
              :value="item.region_id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="tabcen_li">
        <div class="tabcen_li_name">具体地址：</div>
        <input type="text" v-model="fromData.address" />
      </div>
      <div class="JBtn addbtn" @click="addFn">确认添加</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: { multiple: true, checkStrictly: true },
      fromData: {
        enterprise_name: null,
        file: null,
        address: null,
        telephone: null,
        industry: null,
        fuwu: null
      },
      img_url: null,
      hangYeAll: [],
      fuwuData: null,
      arr: null,
      prov: "",
      city: "",
      district: "",
      cityArr: [],
      districtArr: [],
    };
  },
  created() {
    this.getHang();
    let that = this;
    this.Com.request(
      {
        level: 1,
        region_id: ""
      },
      "region/region",
      function(res) {
        that.arr = res.data;
        let arr_ = {};
        for (let i = 0; i < res.data.length; i++) {
          arr_[res.data[i]["region_id"]] = res.data[i]["name"];
        }
        that.chuData.arr = arr_;
      }
    );
  },
  methods: {
    quxianFn(name){
      // if(name.indexOf('　├　')!=-1)
      // {
      //   name=name.replace("　├　","");
      // }
      return name;
    },
    // 地址选择------------------
    shenFn(e) {
      let that = this;
      that.cityArr = "";
      that.districtArr = "";
      that.city = "";
      that.district = "";
      this.Com.request(
        {
          level: 2,
          region_id: e
        },
        "region/region",
        function(res) {
          that.cityArr = res.data;
        }
      );
    },
    shiFn(e) {
      let that = this;
      that.districtArr = "";
      that.district = "";
      this.Com.request(
        {
          level: 3,
          region_id: e
        },
        "region/region",
        function(res) {
          that.districtArr = res.data;
        }
      );
    },
    // -------------------
    handleChange(e) {
    },
    // 返回上一页
    fanFn() {
      this.$router.go(-1);
    },
    // 获取行业
    getHang() {
      let that = this;
      this.Com.request({}, "industry/listArray", function(res) {
        if (res.error_code == 0) {
          that.hangYeAll = res.data;
        }
      });
      // 获取服务
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
    // 上传图片
    upImg(e) {
      var that = this;
      if (e && e.target.files[0]) {
        var name_ = e.target.dataset.name;
        let file_ = e.target.files[0];
            let param = new FormData();
            param.append("logo_img", file_);
          that.Com.request(param, "api/uploadLogoImg", function(res) {
              console.log("4444444444")
              console.log(res)
              if(res.error_code==0)
              {
                that.fromData.file =res.data.path;
                var reader = new FileReader();
                reader.readAsDataURL(file_);
                reader.onload = function(e) {
                  that.img_url = e.target.result;
                };
              }
              else{
                that.$message({
                  message: res.error_message,
                  type: "error",
                  duration: 1500
                });
              }
            });
      }
    },
    // 添加公司
    addFn() {
      let that = this;
      if (!that.fromData.enterprise_name) {
        that.$message({
          message: "请填写公司名称",
          type: "error",
          duration: 1500
        });
      }
       else if (!that.fromData.telephone) {
        that.$message({
          message: "请填写公司电话",
          type: "error",
          duration: 1500
        });
      } else if (!that.fromData.address) {
        that.$message({
          message: "请选择公司地址",
          type: "error",
          duration: 1500
        });
      } else if (!that.fromData.industry) {
        that.$message({
          message: "请选择行业",
          type: "error",
          duration: 1500
        });
      } 
      else if(!that.prov || !that.city || !that.district){
        that.$message({
          message: "请选择省市区",
          type: "error",
          duration: 1500
        });
      }
      //  else if((!that.fromData.fuwu || !that.fromData.fuwu.length>0) && that.$store.state.info.is_operators==1){
      //  that.$message({
      //     message: "请选择服务类型",
      //     type: "error",
      //     duration: 1500
      //   });
      // }
      else {
        that.Com.loginFNPan(function(res) {
          if (res.error_code == 0) {
            that.Com.request({
              enterprise_name:that.fromData.enterprise_name,
              logo_path:that.fromData.file,
              fixed_telephone:that.fromData.telephone,
              industry_id:that.fromData.industry,
              province_region_id:that.prov,
              city_region_id:that.city,
              area_region_id:that.district,
              address:that.fromData.address,
            }, "enterprise/add", function(res) {
              if (res.error_code == 0) {
                  that.$message({
                    message: "公司添加成功",
                    type: "success",
                    duration: 1500,
                    onClose: function() {
                      that.$router.push({ name: "UserZiLiaoJiben" });
                    }
                  });
              }
            });
            // if(that.$store.state.info.is_operators==1)
            // {
            //   let fuwu_ = that.fromData.fuwu;
            //   let fuwuData = [];
            //   for (let i = 0; i < fuwu_.length; i++) {
            //     let len_ = fuwu_[i].length - 1;
            //     fuwuData[i] = fuwu_[i][len_];
            //   }
            //   for (let j = 0; j < fuwuData.length; j++) {
            //     param.append("code[]", fuwuData[j]);
            //   }
            // }
            // param.append("file", that.fromData.file);
            // param.append("enterprise_name", that.fromData.enterprise_name);
            // param.append("address", that.fromData.address);
            // param.append("telephone", that.fromData.telephone);
            // param.append("industry", that.fromData.industry);
            // param.append("province", that.prov);
            // param.append("city", that.city);
            // param.append("region", that.district);
            // that.Com.request(param, "enterprise/add", function(res) {
            //   console.log("4444444444")
            //   console.log(res)
            //   if (response.data.result == "success") {
            //       that.$message({
            //         message: "公司添加成功",
            //         type: "success",
            //         duration: 1500,
            //         onClose: function() {
            //           that.$router.push({ name: "UserZiLiaoJiben" });
            //         }
            //       });
            //     }
            // });
          }
                        else{
                that.$message({
                  message: res.error_message,
                  type: "error",
                  duration: 1500
                });
              }
        });
      }
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.info;
    }
  },
  components: {}
};
</script>

<style scoped>
.gongsiadd {
  position: relative;
  height: 100%;
}
.tancen {
  overflow-y: scroll;
  max-height: calc(100% - 60px);
  padding-bottom: 30px;
  box-sizing: border-box;
  margin-top: 0 !important;
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
</style>