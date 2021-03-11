// pages/column3/HopeCMS/HopeCMS.js
Page({
  data: {
    banner: {
      img: "http://greenhoper.com/skin/images/HopeCMS001.png",
      textImg: "http://greenhoper.com/skin/images/HopeCMS002.png",
      title1: "HopeCMS的",
      title2: "大优势",
      list: [{
        img: "http://greenhoper.com/skin/images/HopeCMS003.png",
        title: "安全",
        sub: "有效抵抗DDos攻击"
      }, {
        img: "http://greenhoper.com/skin/images/HopeCMS004.png",
        title: "稳定",
        sub: "负载均衡，架构稳定"
      }, {
        img: "http://greenhoper.com/skin/images/HopeCMS005.png",
        title: "灵活",
        sub: "部件模块化，弹性管理"
      }]
    },

    list: [{
      img: "http://greenhoper.com/skin/images/HopeCMS006.png",
      title: "响应式网站",
      text: "自动适配不同分辨率，无\n论在PC、平板、手机均有\n最佳浏览体验",
      width: "380rpx"
    }, {
      img: "http://greenhoper.com/skin/images/HopeCMS007.png",
      title: "日历",
      text: "网站上添加日历，在日期上\n标记重大事件、热点动态",
      width: "320rpx"
    }, {
      img: "http://greenhoper.com/skin/images/HopeCMS008.png",
      title: "访问统计",
      text: "无需借助第三方统计网站，自带图形化统计，可自主配置",
      width: "483rpx"
    }]
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