// pages/case/case.js
let error = 0;
let success = 0;

Page({
  data: {
    scrollX: "true",
    bannerTitle: "科技与人文的完美融合",
    bannerSubtitle: "Technology and humanity",
    timeiconURL: "/images/case/timeicon.png",

    info: [{
      title: "软件开发",
      color: "#353535",
      border: "solid 4rpx #353535"
    }, {
      title: "IT架构",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "网站建设",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "APP定制",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "微信开发",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "人文公益",
      color: "#b4b4b4",
      border: ""
    }],

    classes: [],
    currentIndex: "0",
    scrollLeft: 0
  },

  init: function() {
    try {
      let app = getApp();
      let update = 0;
      wx.request({
        url: app.globalData.greenHopeUrl + '?type=all_column&pw=7289179183b64bd81cb498d9c11c0308',
        success: (msg) => {
          let newData = [];
          newData.push(msg.data["10"]);
          newData.push(msg.data["8"]);
          newData.push(msg.data["9"]);
          newData.push(msg.data["22"]);
          newData.push(msg.data["11"]);
          newData.push(msg.data["15"]);

          for (let i in newData) {
            for (let j in newData[i]) {
              newData[i][j].title = this.htmlDecode(newData[i][j].title);
              if (newData[i][j].title.length > 22)
                newData[i][j].title = newData[i][j].title.substring(0, 23) + '…';
              newData[i][j].time = this.htmlDecode(newData[i][j].time);
              newData[i][j].picurl = app.globalData.fullPath + newData[i][j].picurl;
              newData[i][j].nav = "/pages/template/content/content?id=" + newData[i][j].id;
            }
          }

          this.setData({
            column: newData,
            swiperHeight: newData[0].length * 230 + "rpx"
          }, () => {
            wx.hideLoading();
          });
        }
      });
    } catch (err) {
      if (error == 0) {
        wx.showToast({
          title: "网络错误，请下拉刷新",
          icon: "none"
        });
        error = 1;
      }
    }
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "青朴 - 案例"
    });

    wx.getSystemInfo({
      success: (res) => {
        this.windowHeight = res.windowHeight;
        this.windowWidth = res.windowWidth;
      }
    });

    wx.showLoading({
      title: "正在加载……"
    });
    this.init();
  },

  htmlDecode: function(str) {
    try {
      if (str == undefined) {
        return "";
      }

      let s = "";
      if (str.length == 0)
        return "";
      s = str.replace(/&gt;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "\'");
      s = s.replace(/&quot;/g, "\"");
      s = s.replace(/<br>/g, "\n");
      s = s.replace(/&#183;/g, "·");
      return s;
    } catch (err) {
      if (error == 0) {
        wx.showToast({
          title: "网络错误，请下拉刷新",
          icon: "none"
        });
        error = 1;
      }
    }
  },

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
    error = 0;
    success = 0;
    this.init();
  },

  changeColumn: function(e) {
    let newInfo = [{
      title: "软件开发",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "IT架构",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "网站建设",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "APP定制",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "微信开发",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "人文公益",
      color: "#b4b4b4",
      border: ""
    }];
    newInfo[parseInt(e.currentTarget.id.split('-')[1])].color = "#353535";
    newInfo[parseInt(e.currentTarget.id.split('-')[1])].border = "solid 4rpx #353535";
    this.setData({
      info: newInfo,
      currentIndex: e.currentTarget.id.split('-')[1],
      swiperHeight: this.data.column[parseInt(e.currentTarget.id.split('-')[1])].length * 230 + "rpx"
    });
  },

  changeColumn2: function(e) {
    let newInfo = [{
      title: "软件开发",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "IT架构",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "网站建设",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "APP定制",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "微信开发",
      color: "#b4b4b4",
      border: ""
    }, {
      title: "人文公益",
      color: "#b4b4b4",
      border: ""
    }];

    newInfo[parseInt(e.detail.current)].color = "#353535";
    newInfo[parseInt(e.detail.current)].border = "solid 4rpx #353535";

    if (e.detail.current == 0)
      this.setData({
        scrollLeft: 0
      });
    else if (e.detail.current == 5)
      this.setData({
        scrollLeft: 1920
      });

    this.setData({
      info: newInfo,
      swiperHeight: this.data.column[parseInt(e.detail.current)].length * 230 + "rpx"
    });
  },

  onShareAppMessage: function(res) {
    return {}
  }
})