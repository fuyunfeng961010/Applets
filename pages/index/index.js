//index.js
//获取应用实例
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
			wx.switchTab({
				url: '../home/home'
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
				wx.switchTab({
					url: '../home/home'
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
					wx.switchTab({
						url: '../home/home'
					})
				}
			})
		}
	},
	// 点击开始 确认赋权后自动跳转首页
	getUserInfo: function (e) {
		console.log(e)
		if (e.detail.userInfo) {
			app.globalData.userInfo = e.detail.userInfo
			this.setData({
				userInfo: e.detail.userInfo,
				hasUserInfo: true
			})
			wx.switchTab({
				url: '../home/home'
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
