const app = getApp()
const { getAlbumInfo, updateAlbum, delPhotos, addPhotos } = require('../../utils/api/photoAlbum')
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
    albumInfo: {},
    tipShow: false,
    tipMsg: '',
    tipType: '',
    mediaList: [],
    app: {}
  },

  computed: {
    selList(data) {
      return _.flatten(data.albumInfo.photoList).filter(item => item.isSelect) || []
    },
  },

  methods: {
    showTips(tipMsg = '', tipType = 'error') {
      this.setData({
        tipShow: true,
        tipMsg,
        tipType
      })
    },

    loveSwitch() {
      this.setData({
        isLove: !this.data.isLove
      })
    },

    manageSwitch() {
      if (!app.globalData.isPublish) return this.showTips('努力建设中')
      this.setData({
        isEdit: !this.data.isEdit
      })
    },

    shareAlbum() {
      return this.showTips('努力建设中')
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

    photoPreview(e) {
      const { photo } = e.currentTarget.dataset
      console.log('photo', photo)
      if (photo.file_type === 'image') {
        return wx.previewImage({
          urls: this.data.albumInfo.photos.filter(item => item.file_type === 'image').map(item => item.file_path),
          showmenu: true,
          current: photo.file_path
        })
      }

      if (photo.file_type === 'video') {
        if (!app.globalData.isPublish) return this.showTips('视频资源暂未支持播放')
        wx.navigateTo({
          url: `/pages/videoPreview/videoPreview?file_path=${photo.file_path}`
        })
      }
    },

    addPhotos(upFiles) {
      console.log('upFiles', upFiles)
      const params = {
        album_id: this.data.id,
        photos: upFiles
      }
      addPhotos(params)
      .then(res => {
        if (res.data.result) {
          this.getAlbumInfo()
          wx.hideLoading()
        }
      })
      .catch(error => {
        wx.hideLoading()
      })
    },

    async uploadThumb(medias, upFiles) {
      for (let i = 0; i < medias.length; i++) {
        const upResult = await this.uploadFile(medias[i], 'thumbTempFilePath')
        if (upResult.result) {
          upFiles[i]['file_thumb_image_path'] = upResult.file_list[0].file_path
          if (i === medias.length - 1) {
            this.addPhotos(upFiles)
          }
          continue
        }
      }
    },

    async uploadAction() {
      if (!this.data.mediaList.length) {
        return
      }
      wx.showLoading({
        title: '上传中',
      })
  
      let upFiles = []
  
      // 循环上传
      const medias = this.data.mediaList
      for (let i = 0; i < medias.length; i++) {
        const upResult = await this.uploadFile(medias[i])
        if (upResult.result) {
          upResult.file_list[0]['file_type'] = medias[i].fileType
          upFiles = [...upFiles, ...upResult.file_list]
          if (i === medias.length - 1) {
            // console.log('medias', medias)
            // console.log('upFiles', upFiles)
            if (medias[0].fileType === 'image') {
              return this.addPhotos(upFiles)
            }
            // 视频 缩略图上传
            this.uploadThumb(medias, upFiles)
          }
          continue
        }
        wx.hideLoading()
        this.showTips(upResult.msg)
        return
      }
    },
  
    uploadFile(file, targetPath = null) {
      return new Promise((resolve, reject) => {
        const uploadTask = wx.uploadFile({
          url: `${app.globalData.apiBaseUrl}/files/upload_file`,
          filePath: targetPath ? file[targetPath] : file.tempFilePath,
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
      })
    },

    uploadMedia() {
      if (!app.globalData.isPublish) return this.showTips('努力建设中')
      wx.chooseMedia({
        mediaType: ['image','video'],
        sourceType: ['album', 'camera'],
        maxDuration: 30,
        success: res => {
          // console.log('res', res)
          const mediaList = res.tempFiles
          this.setData({
            mediaList
          }, () => {
            this.uploadAction()
          })
        }
      })
    },

    delPhoto() {
      if (!this.data.selList.length) return
      const params = {
        photo_ids: this.data.selList.map(item => item.photo_id).join(',')
      }
      delPhotos(params)
      .then(res => {
        if (res.data.result) {
          this.getAlbumInfo()
        }
      })
    },

    downPhoto() {
      if (!this.data.selList.length) return
      if (this.data.selList.length > 1) {
        return this.showTips('当前只支持单张图片下载')
      }
      const params = {
        photo_ids: this.data.selList.map(item => item.photo_id).join(',')
      }
      wx.downloadFile({
        url: `${app.globalData.apiBaseUrl}/files/download_file?file_name=${this.data.selList[0].file_name}`,
        success (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                console.log('saveImageToPhotosAlbum res', res)
              },
              fail(error) {
                console.log('error', error)
              }
            });
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
      this.setData({
        app: app
      })
      const id = options.id || null
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