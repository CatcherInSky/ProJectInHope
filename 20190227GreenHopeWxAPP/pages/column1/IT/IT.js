// pages/column1/IT/IT.js
Page({
  data: {
    banner: {
      bg: "http://greenhoper.com/Skin/banner/ITstructure1920.jpg",
      title: "IT架构",
      sub: "IT Architecture"
    },

    inner1: {
      title: "IT架构是信息化的梁柱",
      sub: "清楚架构分析方法和架构组件间的关系，真正理解企业架构的作用和价值",
      img: "http://greenhoper.com/skin/images/201607141352100010.png"
    },

    inner2: {
      title: "网络办公层级精简",
      sub: "网络办公层级精简、网速瓶颈分析、WiFi布局",
      list: [{
        title: "网络办公层级精简",
        img: "http://greenhoper.com/skin/images/201607141352100011.png"
      }, {
        title: "网速瓶颈分析",
        img: "http://greenhoper.com/skin/images/201607141352100012.png"
      }, {
        title: "WiFi布局",
        img: "http://greenhoper.com/skin/images/201607141352100013.png"
      }]
    },

    inner3: {
      title: "高可用服务器集群搭建",
      sub: "采用VMware ESXi虚拟化方式，配合高可用储存，容灾性能高，服务有保障",
      img: "http://greenhoper.com/skin/images/201607141352100014.png"
    },

    inner4: {
      title: "专业运维",
      sub: "文档（CMDB）建立与维护、定期设备巡检、完善数据备份策略",
      list: [{
        title: "文档建立与维护",
        img: "http://greenhoper.com/skin/images/201607141352100015.png"
      }, {
        img: "/images/service/arrow.png"
      }, {
        title: "定期设备巡检",
        img: "http://greenhoper.com/skin/images/201607141352100016.png"
      }, {
        img: "/images/service/arrow.png"
      }, {
        title: "完善数据备份",
        img: "http://greenhoper.com/skin/images/201607141352100017.png"
      }]
    },
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