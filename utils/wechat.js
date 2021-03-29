/**
 * api请求
 */
const domain = require('../app').domain
class Wechat {
  constructor(intOpt = {}) {
    this.apiBaseUrl = intOpt.baseUrl ? intOpt.baseUrl : `${domain}/api`;
  }

  /**
   * wx 请求
   */
  request(option = {}) {
    return new Promise((resolve, reject) => {
      let opts = {
        url: this.apiBaseUrl + option.url,
        data: Object.assign({}, option.params),
        method: option.method || 'GET',
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
  };

  /**
   * 调用login 获取临时登录 code 
   * @return {Promise}
   */
  getCryptoData() {
    let js_code = '';
    return this.login()
      .then(data => {
        js_code = data.code;
        return this.getUserInfo();//调用getUserInfo 获取用户加密信息
      })
      .then(data => {

        if (this.getUserInfoCallBack) {
          this.getUserInfoCallBack(data.userInfo)
        }

        // 将用户临时登录code与加密信息参数发送到后台
        let params = {
          js_code,
          encryptedData: data.encryptedData,
          iv: data.iv,
          rawData: data.rawData,
          signature: data.signature
        };
        return Promise.resolve(params);
      })
      .catch(e => {
        console.log(e);
        return Promise.reject(e);
      })
  };

  /**
   * 发送临时登录code与加密参数 到后端获取openid 和解码信息
   * @param {object} params 
   */
  getMyOpenid(params) {
    let url = '/applets/getMyOpenid';
    return this.request(url, params, "POST", "application/x-www-form-urlencoded");
  };
}
module.exports = Wechat;