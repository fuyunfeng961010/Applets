const app = getApp()
const { createAlbum } = require('../../utils/api/photoAlbum')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [
      // {
      //   path: 'https://portal.fuyunfeng.top/files/images/applets-cat.jpg'
      // }
    ],
    title: '',
    tipShow: false,
    tipMsg: '',
    tipType: ''
  },

  showTips(tipMsg = '', tipType = 'error') {
    this.setData({
      tipShow: true,
      tipMsg,
      tipType
    })
  },

  createAlbum(upFiles) {
    const params = {
      title: this.data.title,
      photos: upFiles
    }
    createAlbum(params)
    .then(res => {
      wx.hideLoading()
      console.log('res', res)
      wx.switchTab({
        url: '/pages/photoAlbum/photoAlbum'
      })
    })
    .catch(() => {
      wx.hideLoading()
    })
  },

  async submitAlbum() {
    if (!this.data.title) {
      return this.showTips('影集名不能为空')
    }
    if (!this.data.imageList.length) {
      return this.showTips('至少上传一张图片')
    }
    wx.showLoading({
      title: '上传中',
    })

    let upFiles = []

    // 循环上传
    const imgs = this.data.imageList
    for (let i = 0; i < imgs.length; i++) {
      const upResult = await this.uploadImgs(imgs[i])
      console.log('upResult', upResult)
      if (upResult.result) {
        upResult.file_list[0]['file_type'] = 'image'
        upFiles = [...upFiles, ...upResult.file_list]
        if (i === imgs.length - 1) {
          console.log('upFiles', upFiles)
          this.createAlbum(upFiles)
        }
        continue
      }
      wx.hideLoading()
      this.showTips(upResult.msg)
      return
    }
  },

  uploadImgs(file) {
    return new Promise((resolve, reject) => {
      const uploadTask = wx.uploadFile({
        url: `${app.globalData.apiBaseUrl}/files/upload_file`,
        filePath: file.path,
        name: 'files',
        formData: {},
        success(res) {
          const data = JSON.parse(res.data)
          resolve(data)
        },
        fail(error) {
          console.log('error', error)
          resolve({
            result: false,
            msg: error.errMsg
          })
        }
      })

      // uploadTask.onProgressUpdate((res) => {
      //   console.log('上传进度', res.progress)
      //   console.log('已经上传的数据长度', res.totalBytesSent)
      //   console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      // })
    })
    // wx.navigateTo({
    //   url: '../albumDetail/albumDetail'
    // })
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