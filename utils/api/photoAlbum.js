const Wechat = require('../wechat')
const wechatApp = new Wechat()

const getWxInfo = params => {
  return wechatApp.request({
    path: '/photoAlbum/get_wx_info',
    params
  })
}

const createUser = params => {
  return wechatApp.request({
    path: '/photoAlbum/create_user',
    params
  })
}

module.exports = {
  createUser,
  getWxInfo
}