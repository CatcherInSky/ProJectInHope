// pages/intro/intro.js
Page({
  data: {
    list: [{
      img: "http://greenhoper.com/skin/images/HopeCMS001.png",
      textImg: "http://greenhoper.com/skin/images/HopeCMS002.png",
      title1: "HopeCMS的",
      title2: "大优势",
      nav: "/pages/column2/HopeCMS/HopeCMS",
      color: "#1b4e8d"
    }, {
      img: "http://greenhoper.com/skin/images/LIMS001.png",
      textImg: "http://greenhoper.com/skin/images/LIMS002.png",
      title1: "网上预约仪器，",
      title2: "步到位",
      nav: "/pages/column2/HopeLIMS/HopeLIMS",
      color: "#000"
    }, {
      img: "http://greenhoper.com/skin/images/MMS001.png",
      textImg: "http://greenhoper.com/skin/images/MMS002.png",
      title1: "选择HopeMMS，尊享",
      title2: "项专业级服务",
      nav: "/pages/column2/HopeMMS/HopeMMS",
      color: "#383838"
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