//app.js
App({
  onLaunch: function () {

  },
  getUserInfo: function () {
    wx.login({
      success: (resLogin) => {
        wx.getUserInfo({
          success: (res) => {
            wx.setStorage({
              key: 'avatarUrl',
              data: res.userInfo.avatarUrl,
            })
            wx.setStorage({
              key: 'nickName',
              data: res.userInfo.nickName,
            })
            wx.request({
              url: "https://www.liuxuan.shop/heida/signin.do",
              data: {
                code: resLogin.code,
                nickname: res.userInfo.nickName,
                headimg: encodeURIComponent(res.userInfo.avatarUrl),
              },
              method: 'GET',
              success: function (res) {
                wx.setStorage({
                  key: 'userId',
                  data: res.data.userid,
                })
              },
            })
          }
        })
      }
    })
  },
})