// 引入wechat.js
let wechat = require('./utils/wechat.js');

// App实例
App({
	onLaunch: function () {
		// 展示本地存储能力
		// var logs = wx.getStorageSync('logs') || []
		// logs.unshift(Date.now())
		// wx.setStorageSync('logs', logs)

		// wechat只引入一次 赋值给全局 globalData.wechat
		this.globalData.wechat = wechat;

		

		// 统一弹窗
		wechat.wxDialog = (type,msg) => {
			wx.showToast({
				title: msg,  //标题
				icon: type=='error'? 'none' :type,  //图标，支持"success"、"loading"
				image: type=='error' ?'/static/images/err1.png' :'',  //自定义图标的本地路径，image 的优先级高于 icon
				duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
				mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
				success: () => { }, //接口调用成功的回调函数
				fail: () => { },  //接口调用失败的回调函数
				complete: () => { } //接口调用结束的回调函数
			})
		}

		
	},

	// 全局globalData变量
	globalData: {
		userInfo: null,//用户基本信息 openId 与 解密信息
		wechat: null,//Promise化小程序接口 封装
	}
})