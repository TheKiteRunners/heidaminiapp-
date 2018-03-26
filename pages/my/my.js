// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    avatarUrl: '',
    nickName: '',
    imgFuc: [
      "/image/icecream-01.png",
      "/image/icecream-04.png",
      "/image/icecream-03.png"
    ]
  },
  bindViewTap: function () {
    //console.log('bindViewTap');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userid',
      success: function (res) {
      },
      fail:  () => {
        //调用登录接口
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
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName,
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
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})