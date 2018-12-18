// 引入wechat.js
let wechat = require('./utils/wechat.js');

// App实例
App({
	onLaunch: function () {
		// 展示本地存储能力
		// var logs = wx.getStorageSync('logs') || []
		// logs.unshift(Date.now())
		// wx.setStorageSync('logs', logs)

		// 授权检测   获取用户信息
		// wx.getSetting({
		// 	success: res => {
		// 		if (res.authSetting['scope.userInfo']) {
		// 			// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
		// 			this.userInfoReadyCallback()
		// 			// wx.getUserInfo({
		// 			// 	success: res => {
		// 			// 		// 赋值全局变量
		// 			// 		this.globalData.userInfo = res.userInfo;

		// 			// 		// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		// 			// 		// 所以此处加入 callback 以防止这种情况
		// 			// 		if (this.userInfoReadyCallback) {
		// 			// 			this.userInfoReadyCallback(res)
		// 			// 		}
		// 			// 	}
		// 			// })

		// 			// wechat.getCryptoData()
		// 			// 	.then(d => {
		// 			// 		console.log(d)
		// 			// 		return wechat.getMyOpenid(d);
		// 			// 	})
		// 			// 	.then(d => {
		// 			// 		console.log("从后端获取的openid", d.data);
		// 			// 	})
		// 			// 	.catch(e => {
		// 			// 		console.log(e);
		// 			// 	})

		// 		}
		// 	}

		// })


		// 登录
		// wx.login({
		//   success: res => {
		//     return console.log(res)
		//     this.globalData.code = res.code

		//     wx.request({
		//       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx38e9f9835b60acec&secret=078870fc1288cc4ac0ffe7a4ec468347&js_code='+ res.code +'&grant_type=authorization_code',
		//       data: {},
		//       header: {
		//           'content-type': 'application/json'
		//       },
		//       success: function(res) {
		//         console.log(res)
		//         // openid = res.data.openid //返回openid
		//       }
		//     })
		//     // 发送 res.code 到后台换取 openId, sessionKey, unionId
		//   }
		// })

	},




	globalData: {
		userInfo: null,
		code: '',
	}
})