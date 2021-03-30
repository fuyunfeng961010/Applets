const domain = 'https://portal.fuyunfeng.top'
// const apiBaseUrl = `${domain}/api`
const apiBaseUrl = 'http://192.168.1.117:9098'

module.exports.domain = domain
module.exports.apiBaseUrl = apiBaseUrl

const Wechat = require('./utils/wechat');
const helper = require('./utils/helper');

const storageSync = ['userProfile', 'userInfo']

// App实例
App({
  onLaunch: function () {
    // 用户信息
    storageSync.forEach(item => {
      wx.getStorage({
        key: item,
        success: res => {
          this.globalData[item] = JSON.parse(res.data)
        }
      })
    })
    

    // api 请求报错信息
    Wechat.prototype.wxDialog = (type = 'error', msg) => {
      wx.showToast({
        title: msg,  //标题
        icon: type,  //图标，支持"success"、"loading"
        // image: type === 'error' ? '/static/images/err1.png' : '',  //自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
        mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
        success: () => { }, //接口调用成功的回调函数
        fail: () => { },  //接口调用失败的回调函数
        complete: () => { } //接口调用结束的回调函数
      })
    }

    // 公共方法挂载
    this.globalData.helper = helper;
  },

  // 全局globalData变量
  globalData: {
    domain,
    apiBaseUrl,
    helper,
    userProfile: null,
    userInfo: null
  }
})