<template>
  <div class="">
    <div class="cen-width pu-kong qitaye">
      <div class="cenbox">
        <div class="cen_left pu-ying">
          <div class="cen_left_tit"><img src="@/assets/img/left-bg.png"><span></span>书式下载</div>
        </div>
        <div class="cen_right">
          <div class='cen_right_li pu-ying' :class="li_index==0?'cen_right_li_on':''">
            <div class='SearBox'>
              <div class="SearBox_in"><img src="@/assets/img/7.png"><input type="text" v-model="str" placeholder="输入关键字"></div>
              <div class="SearBox_btn" @click="sousuoFn">搜索</div>
            </div>
            <div class='xiazai_cen'>
              <div class='xiazai_cen_li' v-if='liDatas' v-for='item in liDatas'>
                <div class="xiazai_cen_li_lef"><span></span>{{item.name}}</div>
                <div class="xiazai_cen_li_rig" @click="xiaFn(item.id,item.charge,item.price)">
                  <img src="@/assets/img/xiazai.png">
                  <!-- <a class='' :href='"http://zp.damaike.com/mySite/manage_client/public/index/downLoad/index/bookDownload?id="+item.id
'><img src="@/assets/img/xiazai.png"></a> -->
</div>
              </div>

              <div class="PageBox" v-if="total>0">
                <el-pagination
                  layout="prev, pager, next"
                  :total="total" :current-page="page" :page-size='pageSize' @size-change="fanFn"
                    @current-change="fanFn">
                </el-pagination>
              </div>
              <div class="zanwu" v-if='liDatas && liDatas.length==0'>暂无..</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        li_index:0,
        liDatas:null,
        total:0,
        page:1,
        pageSize:9,
        xiaurl:null,
        str:null
      }
    },
    created(){
      let that=this;
      this.getListFn();
      this.xiaurl=this.gongCan.filrUrl;
    },
    methods:{
      liFn(index)
      {
        this.li_index=index;
      },
      // 翻页
      fanFn(e){
        this.page=e;
       this.getListFn();
      },
      // 通过分类获取列表
      getListFn(){
        let that=this;
        that.Com.request({
          pageIndex:that.page,
          str:that.str
        },'homePage/index/book',function(res){
          that.liDatas=res.data;
          that.total=res.count;
        })
      },
      // 搜索
      sousuoFn(){
        this.page=1;
        this.getListFn();
      },
      // 下载
      xiaFn(id,charge,price)
      {

        let that=this;
        let id_=id;

        if(charge==0)
        {
          that.$confirm('确定下载该文档？', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            // that.Com.request({
            //   id:id_,
            // },'downLoad/index/bookDownload',function(res){
            // })
             window.location.href='http://zp.damaike.com/manage_client/public/index.php/downLoad/index/bookDownload?id='+id_;
          }).catch(() => {
          });
        }
        else{
          that.$confirm('该文档将花费【'+price+'】，确定下载该文档？', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(() => {
            // that.Com.request({
            //   id:id_,
            // },'downLoad/index/bookDownload',function(res){
            // })
             window.location.href='http://zp.damaike.com/manage_client/public/index.php/downLoad/index/bookDownload?id='+id_;
          }).catch(() => {
          });
        }

      }
    },
    components:{

    }
  }
</script>

<style scoped>
.zanwu{
  text-align: center;
}
.cen_right_li {
  min-height: 600px;
}
.PageBox{
  margin-top: 30px;
}
.SearBox{
  justify-content:flex-end;
}
.xiazai_cen{
  margin-top: 20px;
}
.xiazai_cen_li{
  border-bottom: 1px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:15px 0;
}
.xiazai_cen_li_rig{
  width: 50px;
  text-align: right;
}
.xiazai_cen_li_rig img{
  width: 15px;
  cursor: pointer;
}
.xiazai_cen_li_lef{
  display: flex;
  align-items: center;
  flex: 1;
}
.xiazai_cen_li_lef span{
  display:block;
  width: 8px;
  height: 8px;
  background-color: #333333;
  border-radius: 50%;
  margin-right: 10px;
}
.xiazai_cen_li_rig img:hover{
  opacity: 0.5;
}
</style>