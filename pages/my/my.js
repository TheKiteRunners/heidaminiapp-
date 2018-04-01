// pages/my/my.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: '',
    articlesnum: 0,
    commnum: 0,
    likednum: 0,
  },
  bindViewTap: function (res) {
    const types = res.target.dataset.type;
    switch (types) {
      case 'article':
        wx.navigateTo({
          url: "../myArticle/myArticle?type=article",
        })
      break;
      case 'comment':
        wx.navigateTo({
          url: "../myArticle/myArticle?type=comment",
        })
      break;
      case 'liked':
        wx.navigateTo({
          url: "../myArticle/myArticle?type=liked",
        })
      break;
      default: 
      break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'userId',
      success: (res) => {
        this.setData({
          avatarUrl: wx.getStorageSync('avatarUrl'),
          nickName: wx.getStorageSync('nickName'),
        })
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
                  success:  (res) => {
                    wx.setStorage({
                      key: 'userId',
                      data: res.data.userid,
                    })
                    wx.request({
                      url: "https://www.liuxuan.shop/heida/Info.do",
                      method: 'GET',
                      data: {
                        userid: res.data.userid,
                      },
                      success: (res) => {
                        console.log(res)
                        const { articlesnum, commnum, likednum } = res.data
                        this.setData({
                          articlesnum: articlesnum,
                          commnum: commnum,
                          likednum: likednum,
                        })
                      }
                    })
                  },
                })
              }
            })
          },
          fail: () => {

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
    wx.request({
      url: "https://www.liuxuan.shop/heida/Info.do",
      method: 'GET',
      data: {
        userid: wx.getStorageSync('userId')
      },
      success: (res) => {
        console.log(res)
        const { articlesnum, commnum, likednum } = res.data
        this.setData({
          articlesnum: articlesnum,
          commnum: commnum,
          likednum: likednum,
        })
      }
    })
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