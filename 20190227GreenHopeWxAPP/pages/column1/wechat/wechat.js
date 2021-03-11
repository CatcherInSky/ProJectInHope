// pages/column1/wechat/wechat.js
Page({
  data: {
    banner: {
      bg: "http://greenhoper.com/Skin/banner/wechat1920.jpg",
      title: "微信开发",
      sub: "WeChat Development"
    },

    inner1: {
      title: "移动时代的最佳传播途径",
      sub: "为客户提供行业解决方案或功能优化方案提高公众号服务效果",
      list: [{
        img: "http://greenhoper.com/skin/images/WeChat001.png",
        text: "针对性强"
      }, {
        img: "http://greenhoper.com/skin/images/WeChat002.png",
        text: "低成本"
      }, {
        img: "http://greenhoper.com/skin/images/WeChat003.png",
        text: "覆盖面广"
      }, {
        img: "http://greenhoper.com/skin/images/WeChat004.png",
        text: "操作简单"
      }, {
        img: "http://greenhoper.com/skin/images/WeChat005.png",
        text: "互动性强"
      }, {
        img: "http://greenhoper.com/skin/images/WeChat006.png",
        text: "信息量大"
      }]
    },

    inner2: {
      title: "活动策划",
      sub: "以公众号为载体进行活动策划，获得更大影响力",
      list: [{
        img: "http://greenhoper.com/skin/images/WeChat007.png",
        text: "个性化定制"
      }, {
        img: "/images/service/arrow.png"
      }, {
        img: "http://greenhoper.com/skin/images/WeChat008.png",
        text: "贴心服务"
      }, {
        img: "/images/service/arrow.png"
      }, {
        img: "http://greenhoper.com/skin/images/WeChat009.png",
        text: "易于推广"
      }]
    },

    inner3: {
      title: "业务系统与微信公众号对接",
      sub: "微信入口，更强大的服务，更方便的用户管理",
      img: "http://greenhoper.com/skin/images/WeChat010.png"
    }
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "青朴 - 服务"
    })
  },

  onShareAppMessage: function(res) {
    return {}
  }
})