// pages/contact/contact.js
Page({
  data: {
    longitude: 113.291788,
    latitude: 23.092835,
    scale: 18,
    markers: [{
      longitude: 113.291788,
      latitude: 23.092835,
      title: "中山大学科技园A座1106"
    }],
    distence: "未知当前位置",

    title: "广州青朴科技有限公司",
    sub: "园南路与园西路交叉路口东南50米",
    navIcon: "/images/contact/navIcon.png",
    list: [{
      icon: "/images/contact/1.png",
      text: "广东省广州市海珠区中山大学国家大学科技园A座1106"
    }, {
      icon: "/images/contact/2.png",
      text: "020-84158987"
    }, {
      icon: "/images/contact/3.png",
      text: "info@greenhoper.com"
    }]
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "青朴 - 联系我们"
    });

    let that = this;
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        const rad = function(d) {
          return d * Math.PI / 180.0;
        };
        const EARTH_RADIUS = 6378.137;
        let radLat1 = rad(this.data.latitude);
        let radLat2 = rad(res.latitude);
        let a = radLat1 - radLat2;
        let b = rad(this.data.longitude) - rad(res.longitude);
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;

        that.setData({
          distence: "当前距离您 " + s + " 米"
        });
      }
    });
  },

  phoneCall: function(e) {
    if (e.currentTarget.id == 1)
      wx.makePhoneCall({
        phoneNumber: '02084158987'
      });
  },

  navTo: function() {
    wx.openLocation({
      longitude: 113.291788,
      latitude: 23.092835,
      scale: 18,
      name: '广州青朴科技有限公司',
      address: '广东省广州市海珠区中山大学国家大学科技园A座1106'
    });
  },

  onShareAppMessage: function(res) {
    return {}
  }
})