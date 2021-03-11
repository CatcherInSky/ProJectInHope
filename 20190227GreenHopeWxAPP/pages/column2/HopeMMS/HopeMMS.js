// pages/HopeMMS/HopeMMS.js
Page({
  data: {
    banner: {
      img: "http://greenhoper.com/skin/images/MMS001.png",
      textImg: "http://greenhoper.com/skin/images/MMS002.png",
      title1: "选择HopeMMS，尊享",
      title2: "项专业级服务",
    },
    list: [{
        img: "http://greenhoper.com/skin/images/MMS003.png",
        text: "会议网站"
      },
      {
        img: "http://greenhoper.com/skin/images/MMS004.png",
        text: "在线注册"
      }, {
        img: "http://greenhoper.com/skin/images/MMS005.png",
        text: "在线投稿"
      }, {
        img: "http://greenhoper.com/skin/images/MMS006.png",
        text: "在线审稿"
      }, {
        img: "http://greenhoper.com/skin/images/MMS007.png",
        text: "在线支付"
      }, {
        img: "http://greenhoper.com/skin/images/MMS008.png",
        text: "邮件提醒"
      },
    ],

    footer: {
      title: "有案例，有口碑，值得信赖",
      sub: "致力于打造高效、便利的会务管理系统，让办会更简单、更轻松！",
      img: "http://greenhoper.com/skin/images/MMS009.png"
    }
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "青朴 - 产品"
    })
  },

  onShareAppMessage: function(res) {
    return {}
  }
})