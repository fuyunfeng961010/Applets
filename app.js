// 引入wechat.js
const Wechat = require('./utils/wechat');
const helper = require('./utils/helper');

const testData = [
  {
    id: 2,
    title: "坦克英雄介绍",
    content: `
      坦克型英雄血厚防高，属于生存能力较强、输出能力一般的英雄。
      在团战中占据前排位置，抵挡掉较多的敌方输出伤害，当然根据英雄技能的不同战术也会有所区别。如坦克型英雄中的“白起”，在团战中，占据前排可利用技能“死神之镰”将敌方英雄拉至身旁采取围攻的方式，也可使用技能“傲慢嘲讽”使范围内的敌人攻击自身，为队友争取更多时间进行输出及控制。
    `,
    imgUrl: "https://portal.fuyunfeng.top/files/images/applets-tanke.jpg",
  },
  {
    id: 3,
    title: "战士英雄介绍",
    content: `
      战士型英雄攻守兼备，属于输出能力和生存能力都比较突出的近攻英雄。
      在团战中站于坦克英雄身后，承受少量敌方输出伤害，在敌方阵容中展开厮杀，有时候在缺乏坦克英雄时，也会充当先锋，承受大量伤害。“亚瑟”就属于战士英雄中的代表，团战中使用技能“誓约之盾”沉默敌方主力，使其不能使用技能。“回旋打击”对范围内的敌方造成持续伤害，“神剑裁决”找准时机给予敌方英雄致命一击。
    `,
    imgUrl: "https://portal.fuyunfeng.top/files/images/applets-zhanshi.jpg",
  },
  {
    id: 4,
    title: "刺客英雄介绍",
    content: `
      刺客型英雄属于生存能力较弱，但输出能力却极具爆炸性的英雄。
      在团战中可绕往敌方阵容后面，找准时机一套技能秒杀敌方后排的脆皮输出。如刺客型英雄“荆轲”，在团战开始前，埋伏于敌方身后草丛中。等团战开始再出现，使用技能“影杀”闪现至敌方血量较少的英雄身后进行击杀。
    `,
    imgUrl: "https://portal.fuyunfeng.top/files/images/applets-cike.jpg",
  },
  {
    id: 5,
    title: "法师英雄介绍",
    content: `
      法师型英雄属于生存能力较弱，但输出强力且兼具控制技能的英雄。
      在团战中占据后排的位置，对敌方英雄进行输出控制。“妲己”就是一个在战场上比较常见的法师英雄，拥有“偶像魅力”控制技能，可眩晕目标，“女王崇拜”和“灵魂冲击”，都是妲己的强力输出技能，能对目标造成较大杀伤力。在战场上，妲己除非发育到极致，方可站撸对方，不然都要依靠比较肉的英雄，在前排英雄抵抗伤害时，利用远距离输出优势进行暴力输出。
    `,
    imgUrl: "https://portal.fuyunfeng.top/files/images/applets-fashi.jpg",
  },
  {
    id: 6,
    title: "射手英雄介绍",
    content: `
      射手型英雄属于远程输出能力极高且带有控制技能的英雄。
      在团战中利用自身“手长”的优势站于后排进行输出控制。如射手英雄“鲁班七号”，在团战中可在安全距离释放技能“空中支援”，让对手不敢轻易靠近。鲁班七号还有“河豚手雷”和“无敌鲨嘴炮”的远程输出技能，都能对敌人造成威胁。出装强化攻击和攻速后，被动技能“火力压制”绝对犀利！
    `,
    imgUrl: "https://portal.fuyunfeng.top/files/images/applets-sheshou.jpg",
  },
  {
    id: 7,
    title: "辅助英雄介绍",
    content: `
      辅助型英雄属于生存能力和输出能力略平庸的英雄。
      单靠强力的技能效果来为队友增加状态及控制敌方英雄。如辅助英雄“孙膑”，在团战中站在己方阵容中间，利用技能“时之波动”为周围队友补充护盾并增加队友移动速度。“时空爆弹”用于控制敌方主力英雄，技能“时光流逝”降低范围内敌人的移动速度并造成魔法伤害，无论在什么局势中，帮助队友追杀或逃跑都非常实用。
    `,
    imgUrl: "https://portal.fuyunfeng.top/files/images/applets-fuzhu.jpg",
  },
  {
    id: 1,
    title: "王者小技巧",
    content: `
      1.阵容越完整的队伍，团战时更有优势，上单、打野、中单、射手、坦克/辅助，5个位置越完整越有优势;
      2.不要秒选英雄，很容易造成队友不合;
      3.第一个蓝让给打野位，打野怪时最后一击留给打野位打，叠被动;
      4.坦克要随时保护自己家的脆皮，不要想着杀人团战的时候不要追着别人的坦克打
      5.打野的时候，也要及时支援队友
      6.如果你在上路带兵线，下路发生了团战，要优先清兵线推塔，因为等你去了下路团战早结束了，我方优势，去了也没用，我方劣势，去了也是坐等被抓
      7.永远要对草丛保持警戒要时刻关注小地图
      8.选择英雄时一定要注意搭配，有些英雄是没有晕控，所以很多时候看起来阵容挺好，其实有很大漏洞，留不住人
    `,
    imgUrl: "https://portal.fuyunfeng.top/files/images/applets-mvp.png",
  }
]

// App实例
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // api 请求报错信息
    Wechat.prototype.wxDialog = (type = 'error', msg) => {
      wx.showToast({
        title: msg,  //标题
        icon: type,  //图标，支持"success"、"loading"
        // image: type === 'error' ? '/static/images/err1.png' : '',  //自定义图标的本地路径，image 的优先级高于 icon
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
        mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
        success: () => { }, //接口调用成功的回调函数
        fail: () => { },  //接口调用失败的回调函数
        complete: () => { } //接口调用结束的回调函数
      })
    }

    // 公共方法挂载
    this.globalData.helper = helper;


  },

  // 全局globalData变量
  globalData: {
    userInfo: null,//用户基本信息 openId 与 解密信息
    wechat: null,//Promise化小程序接口 封装
    data: testData,
    helper: null
  }
})