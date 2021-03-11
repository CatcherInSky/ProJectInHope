// pages/column3/HopeLIMS/HopeLIMS.js
Page({
  data: {
    banner: {
      img: "http://greenhoper.com/skin/images/LIMS001.png",
      textImg: "http://greenhoper.com/skin/images/LIMS002.png",
      title1: "网上预约仪器，",
      title2: "步到位",
      list: [
        "http://greenhoper.com/skin/images/LIMS003.png",
        "/images/product/spots.png",
        "http://greenhoper.com/skin/images/LIMS004.png",
        "/images/product/spots.png",
        "http://greenhoper.com/skin/images/LIMS005.png",
        "/images/product/spots.png",
        "http://greenhoper.com/skin/images/LIMS006.png"
      ]
    },

    list: [{
      img: "http://greenhoper.com/skin/images/LIMS007.png",
      title: "浏览器登陆",
      text: "无需安装客户端，操作方便快捷！",
      width: "420rpx"
    }, {
      img: "/images/product/order.png",
      title: "预约环",
      text: "国内首创RIA预约环，图形化展示，\n仪器预约情况一目了然！",
      width: "280rpx"
    }, {
      img: "http://greenhoper.com/skin/images/LIMS009.png",
      title: "微信预约",
      text: "系统与微信公众号对接，\n随时随地在微信上预约！",
      width: "316rpx"
    }],
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