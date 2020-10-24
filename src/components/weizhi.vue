<template>
  <div>
    <div class="WeiZhiBox">
      <div class="WeiZhiBox_zi">{{addres[1].name}}-{{addres[2].name}}</div>
      <span @click="dialogVisible = true">修改</span>
      <!-- <span @click="xiuFn">修改</span> -->
      
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="40%" :modal-append-to-body='false' :append-to-body='false'
          >
          <div class="tanxuanbox_cen">
            <el-select v-model="prov" placeholder="请选择" @change="shenFn" value-key="id">
              <el-option v-for="item in arr" :key="item.name " :label="item.name " :value="item"></el-option>
            </el-select>
            <el-select v-model="city" placeholder="请选择" @change="shiFn" value-key="id">
              <el-option v-for="item in cityArr" :key="item.name " :label="item.name " :value="item"></el-option>
            </el-select>
            <el-select v-model="district" placeholder="请选择" value-key="id" @change="quFn">
              <el-option
                v-for="item in districtArr"
                :key="item.name "
                :label="item.name "
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <!-- <div v-for="item in arr">{{item.name}}</div> -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="difn">确 定</el-button>
          </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import options from "../../static/js/country-data.js";
// import options from "../../static/js/didata.js";
// import options from "../../static/js/2.js";

// import '../../static/js/api.js'
//  var map_u=require('../../static/js/map.json');
export default {
  data() {
    return {
      arr: null,
      prov: "请选择",
      city: "请选择",
      district: "请选择",
      cityArr: [],
      districtArr: [],
      dialogVisible:false,//弹窗显示
      xuan:[{
        name:'浙江省',
        id:''
      },{
        name:'温州市',
        id:''
      },{
        name:'瓯海区',
        id:''
      }],
      level:1,
      region_id:'',
      chuData:{
        arr:{}
      },
    };
  },
  created() {
    let that=this;
    this.Com.request({
      level:1,
      region_id:''
    },'/index/index/getRegionsBy',function(res){
      that.arr=res.data;
      let arr_={};
      for(let i=0;i<res.data.length;i++)
      {
        arr_[res.data[i]['id']]=res.data[i]['name'];
      }
      that.chuData.arr=arr_;
    })
  },
  methods: {
    shenFn(e)
    {
      let that=this;
      that.cityArr='';
      that.districtArr='';
      that.city="请选择";
      that.district="请选择";
      that.xuan[0].id=e.id;
      that.xuan[0].name=e.name;
      that.xuan[1].id=''
      that.xuan[1].name='';
      that.xuan[2].id=''
      that.xuan[2].name='';
      this.Com.request({
        level:2,
        region_id:e.id
      },'/index/index/getRegionsBy',function(res){
        that.cityArr=res.data
      })
    },
    shiFn(e)
    {
      let that=this;
      that.districtArr='';
      that.district="请选择";
      that.xuan[1].id=e.id;
      that.xuan[1].name=e.name;
      that.xuan[2].id=''
      that.xuan[2].name='';
      this.Com.request({
        level:3,
        region_id:e.id
      },'/index/index/getRegionsBy',function(res){
        that.districtArr=res.data
      })
    },
    quFn(e){
      this.xuan[2].id=e.id;
      this.xuan[2].name=e.name;
    },
    difn:function(){
      this.dialogVisible=false;
      this.$store.commit("Adress", Object.assign({},this.xuan));
    },
  },
  computed: {
    addres(){
      console.log(this.$store.state.adress);
      return this.$store.state.adress;
    }
  },
};
</script>

<style scoped>
.xiugaibtn{
  padding: 0 !important;
  border: none !important;
  font-size: 12px !important;
      color: #5c9eff !important;
    font-size: 12px !important;
}
.xiugaibtn span{
    color: #5c9eff !important;
    font-size: 12px !important;

}
.tanxuanbox_cen{
  display: flex;
  align-items:center;
  justify-content: space-around;
}
.tanxuanbox_btn{
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content:center;
}
.tanxuanbox_btn{
  
}
.tanxuanbox_cen .el-select{
  margin:0 5px;
}
.WeiZhiBox {
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 12px;
}
.WeiZhiBox_zi{
  background-color: #f3f3f3;
  color: #333333;
  font-size: 12px;
  margin: 0 15px;
  padding: 3px 10px;
  box-sizing: border-box;
  border-radius: 20px;
}
.WeiZhiBox span {
  cursor: pointer;
  color: #5c9eff;
  font-size: 12px;
}
</style>