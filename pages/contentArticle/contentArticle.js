// pages/contentArticle/contentArticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    headimg: '',
    contents: '',
    articleid: '',
    anonymous: '',
    times: '',
    commnum: 0,
    likednum: 0,
    delflag: 0,
    likeflag: 0,
    autofocus: false,
    commentContents: '',
    unLikeUrl: "/image/heart.png",
    likeUrl: "/image/heart1.png",
  },

  deleteArticle: function() {
    wx.request({
      url: 'https://www.liuxuan.shop/heida/deletearticle.do',
      method: 'GET',
      data: {
        articleid: this.data.articleid
      },
      success: () => {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000,
          mask: true,
        })
      },
      fail: () => {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 1000,
          mask: true,
        })
      }
    })
    wx.navigateBack()
  }, // 删除文章

  likeClick: function() {
    const flag = this.data.likeflag
    this.setData({
      likeflag: flag === 1 ? 0 : 1,
      likednum: flag === 0 ? this.data.likednum+1 : this.data.likednum-1
    })
    wx.request({
      url: this.data.likeflag === 1 ? 'https://www.liuxuan.shop/heida/like.do' : 'https://www.liuxuan.shop/heida/unlike.do',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('userId'),
        articleid: this.data.articleid,
      },
    })
  }, // 点赞

  sendComment: function() {
    this.setData({
      autofocus: !this.data.autofocus,
    })
  }, // 获取焦点

  inputComments: function(e) {
    this.setData({
      commentContents: e.detail.value
    })
  }, // 输入文字

  send: function() {
    const str = this.data.commentContents
    this.setData({
      commentContents: '',
    })
    wx.request({
      url: 'https://www.liuxuan.shop/heida/savecomments.do',
      method: 'GET',
      data: {
        contents: str,
        userid: wx.getStorageSync('userId'),
        articleid: this.data.articleid,
      },
      success: () => {
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
  }, // 发送评论

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('load', options)
    const article = wx.getStorageSync('article')
    const { nickname, headimg, contents, articleid, anonymous, times, commnum, delflag, likednum, likeflag } = article[options.target]
    console.log(options)
    this.setData({
      nickname: nickname,
      headimg: headimg,
      contents: decodeURIComponent(contents),
      articleid: articleid,
      anonymous: anonymous,
      times: times,
      commnum: commnum,
      likednum: likednum,
      delflag: delflag,
      likeflag: likeflag,
      autofocus: options.send == '1' ? true : false,
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