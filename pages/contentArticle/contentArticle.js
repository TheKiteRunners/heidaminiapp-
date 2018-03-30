// pages/contentArticle/contentArticle.js
import formatTime from '../../utils/util'
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
    commentsList: [],
    anonymousImg: '',
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

  deleteComments: function(res) {
    const { commentsList } = this.data;
    const target = res.target.dataset.index;
    wx.request({
      url: 'https://www.liuxuan.shop/heida/delcomments.do',
      method: 'GET',
      data: {
        commentsid: commentsList[target].commentsid,
      },
      success: () => {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1000,
        })
        this.onShow();
      }
    })
  }, // 删除评论

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
    const { commnum } = this.data
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
    this.onShow();
  }, // 发送评论

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('load', options)
    const article = wx.getStorageSync('article')
    const { nickname, headimg, contents, articleid, anonymous, times, commnum, delflag, likednum, likeflag, anonymousImg } = article[options.target]
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
      anonymousImg: anonymousImg,
      autofocus: options.send == '1' ? true : false,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: 'https://www.liuxuan.shop/heida/selcomments.do',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('userId'),
        articleid: this.data.articleid
      },
      success: (res) => {
        res.data = Array.isArray(res.data) ? res.data : [];
        const commentsList = res.data.map((item) => {
          item.times = formatTime(item.times)
          item.headimg = decodeURIComponent(item.headimg)
          return item
        })
        this.setData({
          commentsList: commentsList,
        })
        console.log('评论', this.data.commentsList)
      }
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onShow();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})