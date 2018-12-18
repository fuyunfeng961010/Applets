// 引入wechat.js
let wechat = require('../../utils/wechat.js');

//获取App 应用实例
const app = getApp()

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},
	// 分享设置
	onShareAppMessage: function (res) {
		return {
			title: '我是分享',
			path: '/pages/index/index',
			success: function (res) {

			}
		}
	},

	onLoad: function () {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})

			// wx.switchTab({
			// 	url: '../home/home'
			// })
		} else if (this.data.canIUse) {
			
			wx.getSetting({
				success: res => {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					if (res.authSetting['scope.userInfo']) {
						wechat.getCryptoData()
							.then(data => {
								return wechat.getMyOpenid(data)
							})
							.then( data => {
								if(data) {
									console.log(data)
								}
								
							})
							.catch(e => {
								console.log(e)
							})

						// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 所以加入 callback 以防止这种情况
						wechat.getUserInfoCallBack = (data) => {
							app.globalData.userInfo = data;
							this.setData({
								userInfo: data,
								hasUserInfo: true
							})
						}
					}
				}

			})
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getSetting({
				success: res => {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					if (res.authSetting['scope.userInfo']) {
						wechat.getCryptoData()
							.then(data => {
								return wechat.getMyOpenid(data)
							})
							.then(data => {
								console.log(data)
							})
							.catch(e => {
								console.log(e)
							})

						wechat.getUserInfoCallBack = (data) => {
							app.globalData.userInfo = data;
							this.setData({
								userInfo: data,
								hasUserInfo: true
							})
						}
					}
				}

			})
		}
		
	},


	/**
	 * 用户点击开始体验 确认授权后
	 * 通过wx.login 接口 获取临时code码  通过 getUserInfo 获取用户加密信息
	 * 发送临时code码 与用户基本信息参数到后台获取 openId 与解码后的信息
	 * @Fuyf 2018/12/17
	 */

	getUserInfo: function (e) {
		let userInfo = e.detail.userInfo;
		if (e.detail.userInfo) {
			app.globalData.userInfo = userInfo;
			this.setData({
				userInfo: data,
				hasUserInfo: true
			})

			wechat.getCryptoData()
				.then(data => {
					return wechat.getMyOpenid(data)
				})
				.then(data => {
					console.log(data)
				})
				.catch(e => {
					console.log(e)
				})

		}
	},

	//点击头像跳转首页
	bindViewTap: function () {
		wx.switchTab({
			url: '../home/home'
		})
	},

	// 获取手机号回调 个人开发者无权限
	getPhoneNumber(e) {
		console.log(e)
	}

})
