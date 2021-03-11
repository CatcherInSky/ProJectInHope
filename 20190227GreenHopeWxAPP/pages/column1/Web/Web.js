// pages/column1/Web/Web.js
Page({
  data: {
    banner: {
      bg: "http://greenhoper.com/Skin/banner/web1280.jpg",
      title: "网站建设",
      sub: "Website Construction"
    },

    inner1: {
      title: "信息时代的灵魂之窗，我们帮你构建",
      sub: "紧随设计与技术潮流，结合自主研发的CMS系统，提供高端网站订制服务",
      img: "http://greenhoper.com/skin/images/webdesign001.png"
    },

    inner2: {
      title: "国际潮流设计风格",
      sub: "高品质图片，通栏式设计，根据客户需求定制风格",
      list: [{
        title: "通栏式设计",
        sub: "界面简洁大气，轻松适应多种屏幕",
        img: "http://greenhoper.com/skin/images/webdesign002.png"
      }, {
        img: "/images/service/arrow.png"
      }, {
        title: "高质量图片",
        sub: "有冲击力的高品质图片提升网站感染力",
        img: "http://greenhoper.com/skin/images/webdesign003.png"
      }, {
        img: "/images/service/arrow.png"
      }, {
        title: "专业定制风格",
        sub: "根据客户需求定制风格",
        img: "http://greenhoper.com/skin/images/webdesign004.png"
      }]
    },

    inner3: {
      title: "响应式设计",
      sub: "自动匹配不同分辨率的设备，保证最佳浏览体验",
      img: "http://greenhoper.com/skin/images/webdesign005.png"
    },

    inner4: {
      title: "厚朴内容管理系统(HopeCMS)",
      sub: "安全、稳定、便捷的后台系统，得到客户广泛好评",
      list: [{
        title: "安 全",
        sub: "Safety",
        img: "http://greenhoper.com/skin/images/webdesign006.png"
      }, {
        img: "/images/service/arrow.png"
      }, {
        title: "便 捷",
        sub: "Convenience",
        img: "http://greenhoper.com/skin/images/webdesign007.png"
      }, {
        img: "/images/service/arrow.png"
      }, {
        title: "稳 定",
        sub: "Stability",
        img: "http://greenhoper.com/skin/images/webdesign008.png"
      }]
    },

    inner5: {
      title: "兼容主流浏览器",
      sub: "IE8-IE11、Chrome、Firefox、Safari以及360安全浏览器、搜狗浏览器、QQ浏览器等",
      list: ["http://greenhoper.com/skin/images/webdesign009.png", "http://greenhoper.com/skin/images/webdesign010.png", "http://greenhoper.com/skin/images/webdesign011.png", "http://greenhoper.com/skin/images/webdesign012.png", "http://greenhoper.com/skin/images/webdesign013.png", "http://greenhoper.com/skin/images/webdesign014.png"]
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