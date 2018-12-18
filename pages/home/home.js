// 引入wechat.js
let wechat = require('../../utils/wechat.js');

//获取App 应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img3.imgtn.bdimg.com/it/u=337460218,1386144557&fm=26&gp=0.jpg',
      'http://img3.imgtn.bdimg.com/it/u=2001807309,3159444868&fm=11&gp=0.jpg',
      'http://img3.imgtn.bdimg.com/it/u=360071471,385830226&fm=26&gp=0.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    dataList: [
      {
        id: 1,
        title: "标题一",
        content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        imgUrl: "http://img3.imgtn.bdimg.com/it/u=337460218,1386144557&fm=26&gp=0.jpg",
      },
      {
        id: 2,
        title: "标题二",
        content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        imgUrl: "http://img3.imgtn.bdimg.com/it/u=2001807309,3159444868&fm=11&gp=0.jpg",
      },
      {
        id: 3,
        title: "标题三",
        content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        imgUrl: "http://img3.imgtn.bdimg.com/it/u=360071471,385830226&fm=26&gp=0.jpg",
      }
    ],
  },
  onLoad() {
    console.log(app.globalData.userInfo)
    wx.request({
      method: "POST",
      url: 'http://172.16.12.145:9090/user/login',
      data: {
        password: "123456",
        userName: "fuyf"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res)
      }
    })
  },
  // 单个列表被点击
  bindListTap(event) {
    wx.navigateTo({
      url: '../listDetail/listDetail?id=' + event.target.id
    })
  }
})
