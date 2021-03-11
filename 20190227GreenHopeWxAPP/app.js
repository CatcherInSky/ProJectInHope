//app.js

App({
  onError: function(e) {
    wx.showToast({
      title: "网络错误，请下拉刷新",
      icon: "none"
    });

  },

  globalData: {
    greenHopeUrl: "https://greenhoper.com/ajax/Index.aspx",
    fullPath: "https://greenhoper.com"
  }
})