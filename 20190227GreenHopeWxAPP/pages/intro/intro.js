// pages/intro/intro.js
Page({
  data: {
    banner: [{
      img: "http://greenhoper.com/Skin/images/slider3.jpg",
      textImg: "/images/intro/text3.png"
    }, {
      img: "http://greenhoper.com/Skin/images/slider2.jpg",
      textImg: "/images/intro/text2.png"
    }, {
      img: "http://greenhoper.com/Skin/images/slider1.jpg",
      textImg: "/images/intro/text1.png"
    }],
    indicatorColor: "#fff",
    indicatorActiveColor: "#d90000",
    types: {
      title: "服务类型",
      list: [{
        img: "/images/service/1.png",
        nav: "/pages/column1/IT/IT",
        text: "IT架构",
        color: "#eef6ff"
      }, {
        img: "/images/service/2.png",
        nav: "/pages/column1/Web/Web",
        text: "网站建设",
        color: "#faf5f0"
      }, {
        img: "/images/service/3.png",
        nav: "/pages/column1/software/software",
        text: "软件开发",
        color: "#f0faf0"
      }, {
        img: "/images/service/4.png",
        nav: "/pages/column1/template/template?id=3",
        text: "App定制",
        color: "#f5f5f5"
      }, {
        img: "/images/service/5.png",
        nav: "/pages/column1/wechat/wechat",
        text: "微信开发",
        color: "#fafafa"
      }, {
        img: "/images/service/6.png",
        nav: "/pages/column1/wxapp/wxapp",
        text: "微信小程序开发",
        color: "#e6e6fa"
      }, {
        img: "/images/service/7.png",
        nav: "/pages/template/content/content?id=130",
        text: "Drupal定制开发",
        color: "#d6ecf9"
      }, {
        img: "/images/service/8.png",
        nav: "/pages/column1/template/template?id=5",
        text: "人文公益",
        color: "#f7f7f7"
      }]
    },
    process: {
      title: "服务流程",
      img: "/images/intro/process.png",
      before: ["确定方案", "开发测试", "部署培训"],
      after: ["需求调研", "项目启动", " 试运行", "项目维护"]
    },
    adv: {
      title: "服务优势",
      img: [
        "/images/intro/9.png",
        "/images/intro/10.png",
        "/images/intro/11.png",
        "/images/intro/12.png"
      ],
      text: ["执着于品质追求", "严谨的服务流程", "丰富的项目经验", "完善的售后服务"]
    }
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "青朴 - 介绍"
    })
  },

  onShareAppMessage: function(res) {
    return {}
  }
})