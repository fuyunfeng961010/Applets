const Wechat = require('../wechat')
const wechatApp = new Wechat()

const getWxInfo = params => {
  return wechatApp.request({
    path: '/photoAlbum/get_wx_info',
    params
  })
}

const createAlbum = params => {
  return wechatApp.request({
    method: 'POST',
    path: '/photoAlbum/create_album',
    params
  })
}

const getAlbum = params => {
  return wechatApp.request({
    path: '/photoAlbum/get_album',
    params
  })
}

module.exports = {
  getWxInfo,
  createAlbum,
  getAlbum
}