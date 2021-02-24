// pages/home/home.js  首页

//获取App 应用实例
const app = getApp()

// 定义wechat.js
const wechat = app.globalData.wechat;

Page({
	data: {
		imgUrls: [...app.globalData.data].slice(0, 3).map(item => item.imgUrl),
		indicatorDots: true,
		autoplay: true,
		interval: 2000,
		duration: 1000,
		dataList: [...app.globalData.data].slice(0, 3),
	},

	// 分享设置
	onShareAppMessage: function (res) {
		return {
			title: '我是身份授权页',
			path: '/pages/index/index',
			success: function (res) {

			}
		}
	},

	onLoad() {
		console.log(app.globalData)
	},

	// 单个列表被点击
	bindListDetaileTap(event) {
		wx.navigateTo({
			url: '../listDetail/listDetail?id=' + event.target.id
		})
	},

	// 查看更多
	bindListMoreTap() {
		wx.navigateTo({
			url: '../listMore/listMore'
		})
	}
})
