const Wechat = require('../wechat')
const wechatApp = new Wechat()

const getTodayHistory = params => {
  return wechatApp.request({
    url: '/aliy/today_history',
    params
  })
}

module.exports = {
  getTodayHistory
}