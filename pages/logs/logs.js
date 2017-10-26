// pages/logs/logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeUrl: "/image/heart.png",
    likeFlag: 0,
    likeNum: 0,
    picUrls: [],
    userImg: "",
    userNickName: "",
    hideName: false,
    _indexTitle: 1,//switch 顶部
    article: [],//记录所有文章信息
    totalIndex: 0,
  },
  likeClick: function () {
    if (!this.data.likeFlag) {
      this.setData({
        likeUrl: "/image/heart1.png",
        likeNum: this.data.likeNum + 1,
        likeFlag: 1
      })
    } else {
      this.setData({
        likeUrl: "/image/heart.png",
        likeNum: this.data.likeNum - 1,
        likeFlag: 0
      })
    }
  },
  writeArticl: function () {
    wx.navigateTo({
      url: '../writeArticl/writeArticl',
    })
  },
  titleClick: function (res) {//切换顶部样式
    this.setData({
      _indexTitle: res.target.dataset.index
    })
    switch (this.data._indexTitle) {
      case '1':

        break;
      case '2':

        break;
      case '3':

        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('load');
    //wx.startPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log('ready');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //console.log('show');
    wx.startPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //console.log('Hide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //console.log('unload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.request({
      url: 'https://liuxuan.shop/geta',
      method: 'GET',
      data: {
        index: this.data.totalIndex,
      },
      success: (res) => {
        console.log(res.data);
        let message = res.data;
        let article = this.data.article;

        if(res.data.length < 5 || wx.getStorageSync('articleLack') == 4) {
          let aIndex = wx.getStorageSync('articleLack');
          if(aIndex == 4) {
            if(res.data.length == 5) {
              wx.setStorage({
                key: 'articleLack',
                data: 0,
              })
              article.splice(0, parseInt(aIndex));
              for (let i in message) {
                article.unshift(message[i]);
              }
              this.setData({
                article: article,
                totalIndex: this.data.totalIndex + 5,
              })
            }
          }else {
            wx.setStorage({
              key: 'articleLack',
              data: res.data.length,
            })
            article.splice(0, parseInt(aIndex));
            for (let i in message) {
              article.unshift(message[i]);
            }
            this.setData({
              article: article,
            })
          }
        } else {
          wx.setStorage({
            key: 'articleLack',
            data: 0,
          })
          for (let i in message) {
            article.unshift(message[i]);
          }
          this.setData({
            article: article,
            totalIndex: this.data.totalIndex + 5,
          })
        }
        
        wx.stopPullDownRefresh();
      }
    })
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