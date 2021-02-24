// pages/listMore/listMore.js  首页列表 查看更多

//获取App 应用实例
const app = getApp()

Page({
	data: {
		dataList: [...app.globalData.data],
	},
	// 分享设置
	onShareAppMessage: function (res) {
		return {
			title: '我是身份授权页',
			path: '/pages/listDetail/listDetail',
			success: function (res) {

			}
		}
	},
	onLoad() {
		console.log(app.globalData.userInfo)
	},

	// 单个列表被点击
	bindListDetaileTap(event) {
		wx.navigateTo({
			url: '../listDetail/listDetail?id=' + event.target.id
		})
	},
})
