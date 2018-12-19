// pages/index/index.js  身份授权 appId获取

//获取App 应用实例
const app = getApp()

// 定义wechat.js
const wechat = app.globalData.wechat;

// 分享其他路由页面 用户未授权时跳转首页 并携带路由参数  授权后直接跳转到分享的页面 默认home页面
let sharePath = '/pages/home/home';

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},

	// 分享设置
	onShareAppMessage: function (options) {
		let shareObj = {
			title: '我是身份授权页',
			path: '/pages/index/index',
			success: res => {
				// 转发成功之后的回调 不会触发
				if (res.errMsg == 'shareAppMessage:ok') {

				}
			},
			fail: () => {
				// 转发失败之后的回调
				if (res.errMsg == 'shareAppMessage:fail cancel') {
					// 用户取消转发
				} else if (res.errMsg == 'shareAppMessage:fail') {
					// 转发失败，其中 detail message 为详细失败信息
				}
			},

			complete: () => {
				// 转发结束之后的回调（转发成不成功都会执行）
			}
		}

		// button 页面中按钮 转发
		if (options.from == 'button') {
			shareObj.title = '我是首页 列表详情';
			shareObj.path = '/pages/listDetail/listDetail'
			shareObj.imageUrl = '/static/images/position-default.png'
		}

		return shareObj;
	},

	onLoad: function (options) {
		// 其他页面分享 用户未授权时携带参数跳转过来
		if(options && options.path) {
			sharePath = options.path;
		}
		
		// 已获取到用户信息
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			}, () => {
				this.bindViewTap()
			})

		} else if (this.data.canIUse) {
			wechat.getSetting()
				.then(res => {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					if (res.authSetting['scope.userInfo']) {
						wechat.getCryptoData()
							.then(data => {
								return wechat.getMyOpenid(data)
							})
							.then(data => {
								if (data) {
									// 用户openId及解密信息存储
									app.globalData.userInfo = data.data.data;
									this.setData({
										userInfo: data.data.data,
										hasUserInfo: true
									}, () => {
										this.bindViewTap()
									})
								}

							})
							.catch(e => {
								console.log(e)
							})
					}
				})

		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wechat.getSetting()
				.then(res => {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					if (res.authSetting['scope.userInfo']) {
						wechat.getCryptoData()
							.then(data => {
								return wechat.getMyOpenid(data)
							})
							.then(data => {
								if (data) {
									// 用户openId及解密信息存储
									app.globalData.userInfo = data.data.data;
									this.setData({
										userInfo: data.data.data,
										hasUserInfo: true
									}, () => {
										this.bindViewTap()
									})
								}
							})
							.catch(e => {
								console.log(e)
							})
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

		if (e.detail.userInfo) {
			wechat.getCryptoData()
				.then(data => {
					return wechat.getMyOpenid(data)
				})
				.then(data => {
					if (data) {
						// 用户openId及解密信息存储
						app.globalData.userInfo = data.data.data;
						this.setData({
							userInfo: data.data.data,
							hasUserInfo: true
						}, () => {
							this.bindViewTap()
						})
					}

				})
				.catch(e => {
					console.log(e)
				})

		}
	},

	//点击头像跳转首页
	bindViewTap: function () {
		// tabBar路由跳转
		let targetPath = sharePath;
		sharePath = '/pages/home/home';// 其他分享页面强制进入当前页 授权后 跳转路由重定向到home首页

		if(targetPath=='/pages/home/home' || targetPath=='/pages/map/map') {
			wx.switchTab({
				url: targetPath
			})
		}else {
			wx.navigateTo({
				url: targetPath
			})
		}
	},

	// 获取手机号回调 个人开发者无权限
	getPhoneNumber(e) {
		console.log(e)
	}

})
