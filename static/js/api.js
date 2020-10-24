import Vue from 'vue'  //引入vue
import axios from 'axios'  //引入axios

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

export default {
  request(obj,url,callback){
    var tou='application/json; charset=UTF-8';
    var obj_=obj;
    // if(url=='customers/index/addEnterprise')
    // {
    //   tou='multipart/form-data';
    
    // }
  var url_='/api/zp/public/index.php/client/'+url;
  // var url_='http://139.224.239.47/zp/public/index.php/client/'+url;
  // var url_='http://zp.damaike.com/manage_client/public/index.php/'+url;


     axios({
            method: 'post',
            url: url_,
            data:obj_,
            headers: {
                'Content-Type':tou
            }
        }).then(
            (result) => {
              callback(result.data);
            }
        ).catch(
            (error) => {
              console.log(error)
            }
        )


        // $.ajax({
        //     type: "post",
        //     url: "http://172.16.3.97/mySite/manage_client/public/index/"+url,
        //     dataType: "json",
        //     data:obj_,
        //     success: function (data) {
        //       callback(data); 
        //     }
        //   });
  },
  loginFNPan(callback){
    axios({
      method: 'post',
      url: '/api/zp/public/index.php/client/consumer/info',
      // url: 'http://192.168.50.101/manage_client/public/login/index/loginJudge',
      // url: 'http://zp.damaike.com/manage_client/public/index.php/login/index/loginJudge',


      headers: {
          'Content-Type':'application/json; charset=UTF-8'
      }
    }).then(
        (result) => {
          callback(result.data);
        }
    ).catch(
        (error) => {
          console.log(error)
        }
    )

    // $.ajax({
    //   type: "post",
    //   url: "http://172.16.3.97/mySite/manage_client/public/index/login/index/loginJudge",
    //   dataType: "json",
    //   data:'',
    //   success: function (data) {
    //     callback(data);
    //   }
    // });
  },
  chuan(obj,url,callback){
    var obj_=obj;
      var url_='/api/zp/public/index.php/client/'+url;

  // var url_='http://139.224.239.47/zp/public/index.php/client/'+url;
  // var url_='http://zp.damaike.com/manage_client/public/index.php/'+url;
      axios.post(url_, obj_, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => {
        console.log(res);
        callback(res.data);
      }).catch(err => {
        console.log(err);
        callback(err.data);
      });
  },
}