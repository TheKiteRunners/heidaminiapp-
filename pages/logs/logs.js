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

  likeClick: function (res) {
    const target = res.target.dataset.index;
    const article = this.data.article;
    console.log('点赞', article[target])
    wx.request({
      url: 'https://www.liuxuan.shop/heida/like.do',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('userId'),
        articleid: article[target].articleid
      },
    })
  }, // 点赞

  writeArticl: function () {
    wx.navigateTo({
      url: '../writeArticl/writeArticl',
    })
  }, // 写文章

  sendComment: function (res) {
    const target = res.target.dataset.index;
    const article = this.data.article;
    console.log('发表评论', article[target])
    wx.navigateTo({
      url: '../contentArticle/contentArticle?send=1',
    })
  }, // 发评论

  seeDetails: function(res) {
    const target = res.target.dataset.index;
    const article = this.data.article;
    console.log('看文章', article[target])
    wx.navigateTo({
      url: '../contentArticle/contentArticle?',
    })
  }, // 看文章

  titleClick: function (res) {
    this.setData({
      _indexTitle: res.target.dataset.index
    })
    switch (this.data._indexTitle) {
      case '1':

        break;
      case '2':

        break;
    }
  }, // 切换顶部样式
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('log-load'); 
    wx.request({
      url: 'https://www.liuxuan.shop/heida/getinita.do',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('userId')
      },
      success: (res) => {
        console.log(res)
        this.setData({
          article: Array.isArray(res.data) ? res.data : [],
        })
      }
    })

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
    console.log('pull');
    wx.request({
      url: 'https://www.liuxuan.shop/heida/getinita.do',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('userId')
      },
      success: (res) => {
        this.setData({
          article: Array.isArray(res.data) ? res.data : [],
        })
      },
      fail: ()=>{
        console.log('fail');
      },
      complete: (res) => {
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.request({
      url: 'https://www.liuxuan.shop/heida/getra.do',
      method: 'GET',
      data: {
        articleid: this.data.article[this.data.article.length-1].articleid,
        userid: wx.getStorageSync('userId')
      },
      success: (res) => {
        this.setData({
          article: this.data.article.concat(res.data),
        })
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})