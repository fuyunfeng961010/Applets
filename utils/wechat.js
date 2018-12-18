/**
 * Promise化小程序接口
 * @Fuyf 2018/12/17
 */

//请求域名前缀 
let domain = 'http://172.16.12.145:9090';
// let domain = 'https://applets-admin.fuyunfeng.top';

class Wechat {
    /**
     * 登陆
     * @return {Promise} 
     */
    static login() {
        return new Promise((resolve, reject) => wx.login({ success: resolve, fail: reject }));
    };

    /**
     * 获取用户信息 (未授权无法直接获取)
     * @return {Promise} 
     */
    static getUserInfo() {
        return new Promise((resolve, reject) => wx.getUserInfo({ success: resolve, fail: reject }));
    };

    /**
     * 发起网络请求
     * @param {string} url  
     * @param {object} params 
     * @return {Promise} 
     */
    static request(url, params, method = "GET", type = "json") {
        return new Promise((resolve, reject) => {
            let opts = {
                url: domain + url,
                data: Object.assign({}, params),
                method: method,
                header: { 'Content-Type': type },
                success: resolve,
                fail: reject
            }
            wx.request(opts);
        })
            .then( data => {
                if(data.data.code && data.data.code != 2000) {
                   return this.errDialog(data.data.message) 
                }
                return Promise.resolve(data);
            })
    };

    /**
     * 调用login 获取临时登录 code 
     */
    static getCryptoData() {
        let js_code = '';
        return this.login()
            .then(data => {
                js_code = data.code;
                return this.getUserInfo();//调用getUserInfo 获取用户加密信息
            })
            .then(data => {

                if(this.getUserInfoCallBack) {
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
    static getMyOpenid(params) {
        let url = '/applets/getMyOpenid';
        return this.request(url, params, "POST", "application/x-www-form-urlencoded");
    };
}
module.exports = Wechat;