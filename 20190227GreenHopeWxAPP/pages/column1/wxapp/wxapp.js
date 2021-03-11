// pages/intro/intro.js
Page({
  data: {
    HeadlineText: "微信小程序开发",
    DateText: "发布时间：2017-05-05",
    Paragraph1: "1. 微信小程序是什么\n  微信小程序是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或者搜一下即可打开应用，也体现了“用完即走”的理念，用户不用关心是否安装太多应用的问题。应用将无处不在，随时可用，但又无需安装卸载，可以在微信内被便捷地获取和传播，同时具有出色的使用体验。",
    pictureUrl1: "http://www.greenhoper.com/UploadFiles/Image/201705/63629596432731010994604.jpg",
    Paragraph2: "2. 微信小程序的优势\n• 不用安装，即开即用，节省流量，不占用桌面\n• 丰富的框架组件和API接口\n• 运行能力和流畅度不亚于原生应用程序\n• 方便的展现自己的内容，实现企业基本的服务用户的需求\n• 容易在微信内获取和传播，减少宣传成本\n\n3. 微信小程序开发流程\n为客户提供需求整理、原型设计、设计开发、专业测试、部署上线、后期维护一站式的定制服务，深度了解客户业务需求，根据小程序的设计、功能、使用场景规定和限制，提供最合适的微信小程序开发服务。",
    pictureUrl2: "/images/service/wxapp_process.png"
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