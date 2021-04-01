const app = getApp()
const { getWxInfo, getAlbum } = require('../../utils/api/photoAlbum')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: 'https://portal.fuyunfeng.top/files/images/applets-cat.jpg',
    albumList: []
  },

  toNewAlbum() {
    if (app.globalData.userInfo?.openid) {
      return wx.navigateTo({
        url: '../newAlbum/newAlbum'
      })
    }
    wx.getUserProfile({
      desc: '用于个人影集权限标识', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async res => {
        console.log('res', res)
        wx.setStorage({
          key: 'userProfile',
          data: JSON.stringify(res.userInfo)
        })
        app.globalData.userProfile = res.userInfo
        this.getUserInfo()
      }
    })
  },

  getUserInfo() {
    wx.login({
      success(res) {
        console.log('res', res)
        if (res.code) {
          const params = {
            code: res.code,
            ...app.globalData.userProfile
          }
          console.log('params', params)
          getWxInfo(params)
            .then(res => {
              if (res.data.result) {
                wx.setStorage({
                  key: 'userInfo',
                  data: JSON.stringify({ ...res.data.data, timestamp: new Date().getTime() }),
                })
                app.globalData.userInfo = res.data.data
                wx.navigateTo({
                  url: '../newAlbum/newAlbum'
                })
              }
            })
        }
      }
    })
  },

  getAlbumInfo() {
    getAlbum()
    .then(res => {
      console.log('res', res)
      if (res.data.result) {
        this.setData({
          albumList: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('userProfile', app.globalData.userProfile)
    console.log('userInfo', app.globalData.userInfo)
    if (app.globalData.userInfo?.openid) {
      this.getAlbumInfo()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})