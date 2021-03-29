// pages/newAlbum/newAlbum.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [
      {
        path: 'https://portal.fuyunfeng.top/files/images/applets-cat.jpg'
      }
    ],
    title: 'name',
    tipShow: false,
    tipMsg: '',
    tipType: ''
  },

  submitAlbum() {
    if (!this.data.title) {
      return this.showTips('影集名不能为空')
    }
    if (!this.data.imageList.length) {
      return this.showTips('至少上传一张图片')
    }

    const uploadTask  = wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
        'title': this.data.title
      },
      success (res){
        console.log('res', res)
      }
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })
    // wx.navigateTo({
    //   url: '../albumDetail/albumDetail'
    // })
  },

  showTips(tipMsg = '', tipType = 'error') {
    this.setData({
      tipShow: true,
      tipMsg,
      tipType
    })
  },

  chooseImage() {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        console.log('res', res)
        const tempFiles = res.tempFiles
        // tempFiles.forEach(item => {
        //   item['isChoose'] = false
        // })
        this.setData({
          imageList: [...this.data.imageList, ...tempFiles]
        })
      }
    })
  },

  delImage(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      imageList: this.data.imageList.filter((item, i) => i !== index)
    })
  },

  switchImage(e) {
    console.log('e', e)
    console.log('dataset', e.currentTarget.dataset)
    const index = e.currentTarget.dataset.index
    const imageList = this.data.imageList
    imageList[index].isChoose = !imageList[index].isChoose
    this.setData({
      imageList
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