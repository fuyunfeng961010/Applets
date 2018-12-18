// pages/map/map.js  地理位置

// markers做成主动设置坐标做标记  地图会定位到当前用户所在位置 增加一键缩放查看两个坐标
Page({
  data: {
    // 缩放视野以包含所有给定的坐标点
    includePoints:[],
    // 当前用户坐标默认值
    latitude: '31.19233',
    longitude: '121.523947',
    // 标记坐标 应从服务端获取
    markers: [
      {
        iconPath: "../../static/images/map-other.png",
        id: 0,
        latitude: 31.19233,
        longitude: 121.523947,
        width: 30,
        height: 30
      },
      {
        iconPath: "../../static/images/position-selected.png",
        id: 1,
        latitude: 29.19233,
        longitude: 109.523947,
        width: 30,
        height: 30
      }
    ],
    // polyline: [{
    //   points: [{
    //     longitude: 113.3245211,
    //     latitude: 23.10229
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color:"#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
    // controls: [{
    //   id: 1,
    //   iconPath: '/resources/location.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }]
  },
  onLoad: function () {
    var that = this;
    // 获取并定位到当前用户坐标
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
  },

  // 缩放所有标记到可视区域
  bindScaleTap() {
    let scaleData = [
      {
        latitude: 29.19233,
        longitude: 109.523947,
      }, 
      {
        latitude: 31.19233,
        longitude: 121.523947,
      }
    ];
    
    this.setData({
      includePoints: scaleData
    })
  },

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})