var WxParse = require('../../wxParse/wxParse.js');

var id = 0;

Page({
  data: {
    title: "",
    date: ""
  },

  onLoad: function(option) {
    id = option.id;

    if (id == 130)
      wx.setNavigationBarTitle({
        title: "青朴 - 服务"
      });
    else
      wx.setNavigationBarTitle({
        title: "青朴 - 案例"
      });

    this.init();
  },

  init: function() {
    let app = getApp();
    let that = this;
    wx.request({
      url: 'https://greenhoper.com/ajax/Index.aspx?type=othermsg&id=' + id + '&pw=7289179183b64bd81cb498d9c11c0308',
      success: (res) => {
        this.setData({
          title: res.data.title,
          date: res.data.time
        });
      }
    });

    wx.request({
      url: 'https://greenhoper.com/ajax/Index.aspx?type=article&id=' + id + '&pw=7289179183b64bd81cb498d9c11c0308',
      success: (res) => {
        let article = res.data;
        let error1 = article.match(/如果您在浏览本站时，反复出现此错误/g)
        let error2 = article.match(/模板文件不存在/g)
        if (error1 || error2)
          that.init();

        let k = article.match(/<img\s?src=".*?(?=")/g)
        if (k) {
          let p = k.map((value) => {
            if (value.indexOf('http') > -1) return value.replace('<img src="', '')
            return app.globalData.fullPath + value.replace('<img src="', '')
          })
          for (let i = 0; i < k.length; i++) {
            article = article.replace(k[i], '<img src="' + p[i])
          }
        }
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    });
  },

  wxParseTagATap: function(e) {
    wx.navigateTo({
      url: "/pages/template/webview/webview?url=" + e.currentTarget.dataset.src
    });
  },

  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
    this.init();
  },

  onShareAppMessage: function(res) {
    return {}
  }
})