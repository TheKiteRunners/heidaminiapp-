//app.js
App({
  onLaunch: function () {

  },
  getUserInfo: function () {
    var that = this;
    wx.getStorage({
      key: 'userid',
      success: function (res) {

      },
      fail: function () {
        //调用登录接口
        wx.login({
          success: function (resLogin) {
            //console.log(resLogin.code);
            wx.getUserInfo({
              success: function (res) {
                //that.globalData.userInfo = res.userInfo;
                //console.log(that.globalData.userInfo);
                wx.setStorage({
                  key: 'avatarUrl',
                  data: res.userInfo.avatarUrl,
                })
                wx.setStorage({
                  key: 'nickName',
                  data: res.userInfo.nickName,
                })
                wx.request({
                  url: "https://liuxuan.shop/signin",
                  data: {
                    code: resLogin.code,
                    user: res.userInfo,
                  },
                  method: 'GET',
                  success: function(res) {
                    console.log(res.data);
                    wx.setStorage({
                      key: 'userid',
                      data: res.data,
                    })
                  },
                })
              }
            })

          }
        })
      }
    })
  },
})