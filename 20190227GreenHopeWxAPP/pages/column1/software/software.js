// pages/column1/software/software.js
Page({
  data: {
    banner: {
      bg: "http://greenhoper.com/Skin/banner/software1280.jpg",
      title: "软件开发",
      sub: "Software Development"
    },

    inner1: {
      title: "软件，为提高效率而生",
      sub: "根据用户要求建造出软件系统或者系统中的软件部分",
      img: "http://greenhoper.com/skin/images/designsoftware.png"
    },

    inner2: {
      title: "产品贴合需求",
      sub: "多年开发经验，把握核心需求，数理完整业务流程",
      list: [{
        img: "http://greenhoper.com/skin/images/iconn1.png",
        text: "系统调研"
      }, {
        img: "/images/service/arrow.png"
      }, {
        img: "http://greenhoper.com/skin/images/iconn2.png",
        text: "软件开发"
      }, {
        img: "/images/service/arrow.png"
      }, {
        img: "http://greenhoper.com/skin/images/iconn3.png",
        text: "用户体验"
      }, {
        img: "/images/service/arrow.png"
      }, {
        img: "http://greenhoper.com/skin/images/iconn4.png",
        text: "安装调试"
      }, {
        img: "http://greenhoper.com/skin/images/iconn5.png",
        text: "软件测试"
      }, {
        img: "/images/service/arrow.png"
      }, {
        img: "http://greenhoper.com/skin/images/iconn6.png",
        text: "技术文献"
      }, {
        img: "/images/service/arrow.png"
      }, {
        img: "http://greenhoper.com/skin/images/iconn7.png",
        text: "业务培训"
      }, {
        img: "/images/service/arrow.png"
      }, {
        img: "http://greenhoper.com/skin/images/iconn8.png",
        text: "运营维护"
      }]
    },

    inner3: {
      title: "软件界面友好",
      sub: "软件UI界面精心设计，力求简洁大方",
      img: "http://greenhoper.com/skin/images/piccc.png"
    },

    inner4: {
      title: "系统安全稳定",
      sub: "以稳定的架构为基础开发，良好的使用体验",
      list: [{
        img: "http://greenhoper.com/skin/images/100plus.png",
        text: "用户选择了我们"
      }, {
        img: "http://greenhoper.com/skin/images/100plus.png",
        text: "已完成的项目"
      }, {
        img: "http://greenhoper.com/skin/images/8.png",
        text: "年经验的沉淀"
      }]
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