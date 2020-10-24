import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/page/main'
import Index from '@/page/index/index'
import Guanyu from '@/page/guanyu/index'
import Login from '@/page/login/login'
import Reg from '@/page/login/reg'
import FuWu from '@/page/fuwu/index'
import FuWuXiangQing from '@/page/fuwu/xiangmu_xiang'



import XiaZai from '@/page/xiazai/index'
import XinWen from '@/page/xinwen/index'
import XinWenXiang from '@/page/xinwen/xiangqing'

import Mainb from '@/page/index'
import PiPei from '@/page/fuwu/pipei'
import PiPeiJieGuo from '@/page/fuwu/pipei_jieguo'
import PiPeiJieGuoXiang from '@/page/fuwu/pipei_jieguo_xiangqing'
import PiPeiAddGong from '@/page/fuwu/addgong'


import User from '@/page/user/index'
import UserShou from '@/page/user/shouye'
import UserZiLiao from '@/page/user/ziliao'
import UserZiLiaoJiben from '@/page/user/ziliaojiben'
import UserAddGongSi from '@/page/user/addgongsi'
import UserEditGongSi from '@/page/user/editgongsi'
import UserZiLiaoRenTian from '@/page/user/ziliaorenzhengtian'
import UserZiLiaoRen from '@/page/user/ziliaorenzheng'
import UserZiLiaoZhangHao from '@/page/user/ziliaozhanghao'
import UserXiuGaiMi from '@/page/user/xiugaimima'
import UserIndexBanZhong from '@/page/user/shouyebanlizhong'
import UserIndexDaiShen from '@/page/user/shouyedaishenhe'

import UserIndexKeBan from '@/page/user/shouyekeban'
import UserIndexKePi from '@/page/user/shouyekepi'
import UserIndexWanCheng from '@/page/user/shouyewancheng'


import UserIndexBanZhongXiang from '@/page/user/shouyebanlizhong_xiang'
import ZiliaoChuan  from '@/page/user/ziliaoshangchuan'
import XiaDan from '@/page/user/xiadan' 


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/index',
      children:[
        {
          path: '/',
          name: 'Mainb',
          component: Mainb,
          redirect: '/index',
          children:[
            {
              path: '/index',
              name: 'Index',
              component: Index
            },
            {
              path: '/aboutUs',
              name: 'Guanyu',
              component: Guanyu
            },
            {
              path: '/matching',
              name: 'PiPei', 
              component: PiPei
            },
            {
              path: '/matching/add',
              name: 'PiPeiAddGong',
              component: PiPeiAddGong
            },
            {
              path: '/matching/result',
              name: 'PiPeiJieGuo',
              component: PiPeiJieGuo
            },
            {
              path: '/matching/result/details',
              name: 'PiPeiJieGuoXiang',
              component: PiPeiJieGuoXiang
            },
            {
              path: '/service',
              name: 'FuWu',
              component: FuWu
            },
            {
              path: '/service/details',
              name: 'FuWuXiangQing',
              component: FuWuXiangQing
            },
            {
              path: '/bookDownload',
              name: 'XiaZai',
              component: XiaZai
            },
            {
              path: '/news',
              name: 'XinWen',
              component: XinWen
            },
            {
              path: '/news/details',
              name: 'XinWenXiang',
              component: XinWenXiang
            },

            {
              path: '/user',
              name: 'User',
              component: User,
              redirect: '/user/index',
              children:[
                {
                  path: '/user/index',
                  name: 'UserShou',
                  component: UserShou,
                  redirect: '/user/index/inHandling',
                  children:[
                    {
                      path: '/user/index/inHandling',
                      name: 'UserIndexBanZhong',
                      component: UserIndexBanZhong
                    },
                    {
                      path: '/user/index/noAudited',
                      name: 'UserIndexDaiShen',
                      component: UserIndexDaiShen
                    },
                    {
                      path: '/user/index/canAudited',
                      name: 'UserIndexKeBan',
                      component: UserIndexKeBan
                    },
                    {
                      path: '/user/index/canMatching',
                      name: 'UserIndexKePi',
                      component: UserIndexKePi
                    },
                    {
                      path: '/user/index/complete',
                      name: 'UserIndexWanCheng',
                      component: UserIndexWanCheng
                    }
                  ]
                },
                    {
                      path: '/user/index/details',
                      name: 'UserIndexBanZhongXiang',
                      component: UserIndexBanZhongXiang
                    },
                {
                  path: '/user/addCompany',
                  name: 'UserAddGongSi',
                  component: UserAddGongSi
                },
                {
                  path: '/user/dataUpload',
                  name: 'ZiliaoChuan',
                  component: ZiliaoChuan
                },
                {
                  path: '/user/userOrder',
                  name: 'XiaDan',
                  component: XiaDan
                },
                {
                  path: '/user/editCompany',
                  name: 'UserEditGongSi',
                  component: UserEditGongSi
                },
                {
                  path: '/user/editPassword',
                  name: 'UserXiuGaiMi',
                  component: UserXiuGaiMi
                },
                {
                  path: '/user/info',
                  name: 'UserZiLiao',
                  component: UserZiLiao,
                  redirect: '/user/info/basic',
                  children:[
                    {
                      path: '/user/info/basic',
                      name: 'UserZiLiaoJiben',
                      component: UserZiLiaoJiben
                    },
                    {
                      path: '/user/info/authentication',
                      name: 'UserZiLiaoRen',
                      component: UserZiLiaoRen
                    },
                    {
                      path: '/user/info/authentication/fillIin',
                      name: 'UserZiLiaoRenTian',
                      component: UserZiLiaoRenTian
                    },
                    {
                      path: '/user/info/account',
                      name: 'UserZiLiaoZhangHao',
                      component: UserZiLiaoZhangHao
                    },
                  ]
                },
              ]
            },
          ]
        },
        {
          path: '/register',
          name: 'Reg',
          component: Reg
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
      ],
    },
    // {
    //   path: '/main',
    //   name: 'Index',
    //   component: Index
    // }
  ]
})
