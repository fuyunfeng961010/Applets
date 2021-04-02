const app = getApp()
const { getAlbumInfo, updateAlbum, delPhotos } = require('../../utils/api/photoAlbum')
const computedBehavior = require('miniprogram-computed').behavior
const moment = app.globalData.moment
const helper = app.globalData.helper
const _ = app.globalData.underscore

Component({
  behaviors: [computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    isLove: false,
    isEdit: false,
    titleEdit: false,
    id: null,
    albumInfo: {}
  },

  computed: {
    selList(data) {
      return _.flatten(data.albumInfo.photoList).filter(item => item.isSelect) || []
    },
  },

  methods: {
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
      const params = {
        album_id: this.data.id,
        title: this.data.albumInfo.title
      }
      updateAlbum(params)
      .then(res => {
        if (res.data.result) {
          this.getAlbumInfo()
          this.setData({
            titleEdit: false
          })
        }
      })
    },

    titleInput: function (e) {
      this.setData({
        ['albumInfo.title']: e.detail.value
      })
    },

    delPhoto() {
      if (!this.data.selList.length) return
      const params = {
        photo_ids: this.data.selList.map(item => item.photo_id).join(',')
      }
      console.log('params', params)
      delPhotos(params)
      .then(res => {
        if (res.data.result) {
          this.getAlbumInfo()
        }
      })
    },

    downPhoto() {
      if (!this.data.selList.length) return
      const params = {
        photo_ids: this.data.selList.map(item => item.photo_id).join(',')
      }
      console.log('params', params)
      wx.downloadFile({
        url: `${app.globalData.apiBaseUrl}/files/download_file?file_path`, //仅为示例，并非真实的资源
        success (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            wx.playVoice({
              filePath: res.tempFilePath
            })
          }
        }
      })
    },

    allSel(e) {
      const { list_index } = e.currentTarget.dataset
      const photos = this.data.albumInfo.photoList[list_index]
      photos.forEach(item => {
        item.isSelect = true
      })
      this.setData({
        [`albumInfo.photoList[${list_index}]`]: photos
      })
    },

    photoSel(e) {
      const { list_index, photos_index } = e.currentTarget.dataset
      this.setData({
        [`albumInfo.photoList[${list_index}][${photos_index}].isSelect`]: !this.data.albumInfo.photoList[list_index][photos_index].isSelect
      })
    },

    getAlbumInfo() {
      getAlbumInfo({ album_id: this.data.id })
        .then(res => {
          if (res.data.result) {

            const info = res.data.data[0]
            if (info.photos.length) {
              info.photos.forEach(item => {
                item.created_at = moment(item.created_at).format('MM月DD日')
                item['isSelect'] = false
              })
              info.photoList = helper.groupBy(info.photos, item => {
                return [item.created_at]
              })
            }
            this.setData({
              albumInfo: info
            })
            console.log('info', info)
          }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // const id = options.id || null
      const id = 1
      if (id) {
        this.setData({ id }, () => {
          this.getAlbumInfo()
        })
      }
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
  }
})