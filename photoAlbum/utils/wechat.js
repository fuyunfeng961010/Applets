class Wechat {
  constructor(intOpt = {}) {
    this.app = getApp()
    this.apiUrl = intOpt.apiUrl ? intOpt.apiUrl : this.app.globalData.apiBaseUrl
  }

  request(option = {}) {
    return new Promise((resolve, reject) => {
      const openid = this.app.globalData.userInfo?.openid || null
      let opts = {
        url: this.apiUrl + option.path,
        data: Object.assign({openid}, option.params),
        method: option.method || 'GET',
        timeout: 10000,
        header: {
        },
        success: resolve,
        fail: reject
      }
      wx.request(opts);
    })
      .then(data => {
        // console.log('this', this)
        if (!data.data.result) {
          this.wxDialog('none', data.data.msg)
          Promise.resolve(data);
        }
        return Promise.resolve(data);
      })
      .catch(error => {
        console.log('error', error)
        Promise.reject(error.errMsg)
        setTimeout(() => {
          this.wxDialog('none', error.errMsg)
        }, 200)
      })
  };
}
module.exports = Wechat;