// pages/albumDetail/albumDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLove: false,
    isEdit: false,
    titleEdit: false,
    imageUrl: 'https://portal.fuyunfeng.top/files/images/applets-cat.jpg',
    list: 5,
    title: '周末日常拍摄'
  },

  loveSwitch() {
    this.setData({
      isLove: !this.data.isLove
    })
  },

  manageSwitch() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },

  titEditSwitch() {
    this.setData({
      titleEdit: !this.data.titleEdit
    }, () => {
      this.setData({
        autoFocus: this.data.titleEdit
      })
      console.log(this.data.autoFocus)
    })
  },

  titleBlur() {
    this.setData({
      titleEdit: false
    })
  },

  titleInput: function (e) {
    this.setData({
      title: e.detail.value
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