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

const getAlbumList = params => {
  return wechatApp.request({
    path: '/photoAlbum/get_album_list',
    params
  })
}

const getAlbumInfo = params => {
  return wechatApp.request({
    path: '/photoAlbum/get_album_info',
    params
  })
}

const delPhotos = params => {
  return wechatApp.request({
    method: 'POST',
    path: '/photoAlbum/del_photos',
    params
  })
}

const updateAlbum = params => {
  return wechatApp.request({
    method: 'POST',
    path: '/photoAlbum/update_album',
    params
  })
}

module.exports = {
  getWxInfo,
  createAlbum,
  getAlbumList,
  getAlbumInfo,
  updateAlbum,
  delPhotos
}