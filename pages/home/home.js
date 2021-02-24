// pages/home/home.js  首页

//获取App 应用实例
const app = getApp()

// 定义wechat.js
const wechat = app.globalData.wechat;

Page({
	data: {
		imgUrls: [
			'http://img3.imgtn.bdimg.com/it/u=337460218,1386144557&fm=26&gp=0.jpg',
			'https://portal.fuyunfeng.top/files/images/hexo-default-bg.jpg',
			'http://img3.imgtn.bdimg.com/it/u=360071471,385830226&fm=26&gp=0.jpg'
		],
		indicatorDots: true,
		autoplay: true,
		interval: 2000,
		duration: 1000,
		dataList: [
			{
				id: 1,
				title: "标题一",
				content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
				imgUrl: "http://img3.imgtn.bdimg.com/it/u=337460218,1386144557&fm=26&gp=0.jpg",
			},
			{
				id: 2,
				title: "标题二",
				content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
				imgUrl: "https://portal.fuyunfeng.top/files/images/hexo-default-bg.jpg",
			},
			{
				id: 3,
				title: "标题三",
				content: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
				imgUrl: "http://img3.imgtn.bdimg.com/it/u=360071471,385830226&fm=26&gp=0.jpg",
			}
		],
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
		// console.log(app.globalData.userInfo)
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
