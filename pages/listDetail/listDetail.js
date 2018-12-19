// pages/listDetail/listDetail.js 首页 列表详情
//获取App 应用实例
const app = getApp()

// 定义wechat.js
const wechat = app.globalData.wechat;

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	// 分享设置
	onShareAppMessage: function (res) {
		return {
			title: '我是列表详情页',
			path: '/pages/listDetail/listDetail',
			success: function (res) {

			}
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 当前页面设置为分享首页 && 用户未登录时跳转至首页 传当前页面path路由参数
		wechat.getSetting()
			.then(res => {
				if (!res.authSetting['scope.userInfo']) {
					wx.navigateTo({
						url: '../index/index?path=/pages/listDetail/listDetail'
					})
				}
			})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
})