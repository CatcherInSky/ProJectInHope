// pages/service/service.js
Page({
  data: {
    list: [{
      name: "IT架构",
      info: "基于高可靠的虚拟化服务器集群，打造集高可靠、高性能、高容灾性于一体的IT云架构，并提供架构运维服务。",
      color: "#5891D4",
      url: "/pages/column1/IT/IT",
      picURL: "/images/service/1.png"
    }, {
      name: "网站建设",
      info: "紧随设计与技术潮流，结合自主研发的CMS系统，为客户提供网站建设订制服务。95%以上的客户选择了响应式网站设计。",
      color: "#FFA300",
      url: "/pages/column1/Web/Web",
      picURL: "/images/service/2.png"
    }, {
      name: "软件开发",
      info: "根据客户需求，订制开发各种管理软件，为客户办公、生产、管理提供技术支撑，助力客户快速发展。",
      color: "#00CBC6",
      url: "/pages/column1/software/software",
      picURL: "/images/service/3.png"
    }, {
      name: "App定制",
      info: "专注于手机应用软件开发与服务，致力于提供各行业各业务场景App定制开发，兼容IOS与Android平台。",
      color: "#2EB8F2",
      url: "/pages/column1/template/template?id=3",
      picURL: "/images/service/4.png"
    }, {
      name: "微信开发",
      info: "微信是当前最大的移动入口，将企业信息、服务、活动等内容通过微信公众平台直达微信用户，减少宣传成本，为产品促销、推广、宣传、售后提供保障。",
      color: "#00C444",
      url: "/pages/column1/wechat/wechat",
      picURL: "/images/service/5.png"
    }, {
      name: "微信小程序开发",
      info: "微信小程序，获取便捷、传播快速，无需下载安装点击即可使用。",
      color: "#6641B7",
      url: "/pages/column1/wxapp/wxapp",
      picURL: "/images/service/6.png"
    }, {
      name: "Drupal定制开发",
      info: "基于强大开源、安全可靠的Drupal，设计界面、定制功能，提供专业建站解决方案。",
      color: "#00A2EB",
      url: "/pages/template/content/content?id=130",
      picURL: "/images/service/7.png"
    }, {
      name: "人文公益",
      info: "配合活动或产品宣传需要，提供集摄影摄像、宣传品设计、画册设计、视频制作等全方位服务。",
      color: "#FF3C3D",
      url: "/pages/column1/template/template?id=5",
      picURL: "/images/service/8.png"
    }],

    indicatorColor: "#dcdcdc",
    indicatorActiveColor: "#c82800"
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "青朴 - 服务"
    });
  },

  onShareAppMessage: function(res) {
    return {}
  }
})