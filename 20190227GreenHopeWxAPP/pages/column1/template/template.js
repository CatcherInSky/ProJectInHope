// pages/column1/App/App.js
Page({
  data: {
    banner: {},
    list: []
  },

  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "青朴 - 服务"
    })

    if (options.id == 3)
      this.setData({
        banner: {
          bg: "http://greenhoper.com/Skin/banner/APP1920.jpg",
          title: "APP定制",
          sub: "APP customization"
        }
      })
    else if (options.id == 5)
      this.setData({
        banner: {
          bg: "http://greenhoper.com/Skin/banner/human1920.jpg",
          title: "人文公益",
          sub: "Graphic Design"
        }
      })

    let that = this;
    let app = getApp();
    wx.request({
      url: app.globalData.greenHopeUrl + '?type=column&pw=7289179183b64bd81cb498d9c11c0308',
      success: (msg) => {
        let ids = msg.data.split("<split>");
        ids.pop();

        let column = parseInt(options.id);

        ids[column] = ids[column].split(",");
        ids[column].pop();
        ids = ids[column];
        let sum = ids.length;
        let newData = [];
        for (let i = 0; i < ids.length; ++i) {
          wx.request({
            url: app.globalData.greenHopeUrl + '?type=othermsg&id=' + ids[i] + '&pw=7289179183b64bd81cb498d9c11c0308',
            success: (msg) => {
              newData.push({
                title: that.htmlDecode(msg.data.title),
                sub: that.htmlDecode(msg.data.subtitle),
                time: that.htmlDecode(msg.data.time),
                img: app.globalData.fullPath + msg.data.picurl,
                nav: "/pages/template/content/content?id=" + ids[i]
              });
              if (!--sum) {
                newData.sort((x, y) => {
                  return new Date(y.time) - new Date(x.time);
                });

                that.setData({
                  list: newData
                });
              }
            }
          })
        }
      }
    })
  },

  htmlDecode: function(str) {
    let s = "";
    if (str.length == 0) return "";
    s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    s = s.replace(/&#183;/g, "·");
    return s;
  },

  onShareAppMessage: function(res) {
    return {}
  }
})