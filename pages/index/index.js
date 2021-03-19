const app = getApp()

const { getTodayHistory } = require('../../utils/aliy')

const wechat = app.globalData.wechat;

// 分享其他路由页面 用户未授权时跳转首页 并携带路由参数  授权后直接跳转到分享的页面 默认home页面
let sharePath = '/pages/home/home';

Page({
	data: {
    todayHisInfo: [],
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
    richData: '<p style=""text-align:" center"=""><img height=""194"" width=""300"" src="http://m.46644.com/todayhistory/upload/c0b0lishitupian.jpg"></p><p style=""text-align:" center"="">墨西拿人纷纷逃离家园</p><p>        1月2日。上星期一意大利南部发生地震，人们的恐惧不是没有理由的。这次地震使20多万人丧生。饥饿和肺炎会夺去更多人的生命。</p>'.replace(/\<img/gi, '<img style="max-width:100%;height:auto"'),
    richData2: '<p style="text-align: center">　<img height="200" width="147" src="http://m.46644.com/todayhistory/upload/391d031903.jpg" /></p><p style="text-align: center">谢希德</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 谢希德，物理学家，1921年出生于福建泉州，是著名的物理学家、教育家，她是我国半导体物理学的开拓者之一，是我国表面物理学的先驱者和奠基人之一，在国际半导体物理学和表面物理等学术机构中担任多项职务，是我国在国际上这些领域中的代表性人物，她对我国凝聚态物理的研究和发展，倾注了毕生的心血，成就卓著。她与同事坚持不懈、刻苦研究、取得多项重要成果和奖励，1997年获得何梁何利科技进步奖。鉴于她对科学事业的突出贡献，美国、英国、日本等国的10多所大学授予她名誉科学博士称号。她于1988年被选为第三世界科学院院士。1990年被选为美国文理科学院外国院士。谢希德教授于1983年1月任复旦大学校长。后因病于2000年3月4日在上海华东医院逝世，享年79岁。</p>'.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
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
    this.getTodayInfo()
    return
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

  getTodayInfo() {
    const params = {
      month: new Date().getMonth() + 1,
      day:  new Date().getDate()
    }
    getTodayHistory(params)
      .then(res => {
        if (res.data.result) {
          console.log('res', res.data.data)
          const hisList = res.data.data
          hisList.forEach(item => {
            item.content = item.content.replace('<img', '<img style="max-width:100%; height:auto;"')
          })
          this.setData({
            todayHisInfo: hisList
          })
        }
      })
  },

  toHome() {
    console.log('toHome')
    wx.switchTab({
      url: '/pages/photoAlbum/photoAlbum'
    })
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
