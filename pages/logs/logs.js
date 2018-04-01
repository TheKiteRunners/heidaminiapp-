// pages/logs/logs.js
import formatTime from '../../utils/util'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    unLikeUrl: "/image/heart.png",
    likeUrl: "/image/heart1.png",
    _indexTitle: 1,//switch 顶部
    article: [],//记录所有文章信息
  },

  likeClick: function (res) {
    const target = res.target.dataset.index;
    let article = this.data.article;
    article[target].likeflag === 1 ? article[target].likeflag = 0 : article[target].likeflag = 1
    article[target].likeflag === 1 ? article[target].likednum++ : article[target].likednum--
    this.setData({
      article: article,
    });
    console.log('点赞', article[target].articleid);
    wx.request({
      url: article[target].likeflag === 1 ? 'https://www.liuxuan.shop/heida/like.do' : 'https://www.liuxuan.shop/heida/unlike.do',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('userId'),
        articleid: article[target].articleid,
      },
    })
  }, // 点赞

  writeArticl: function () {
    wx.navigateTo({
      url: '../writeArticl/writeArticl',
    })
  }, // 写文章

  deleteArticle: function (res) {
    const target = res.target.dataset.index;
    let article = this.data.article;
    wx.showModal({
      title: '提示',
      content: '确认要删除这篇文章吗?',
      confirmColor: '#0cb3f7',
      cancelColor: '#333333',
      success: (res) => {
        if (res.confirm) {
          const deleteEssay = article.splice(target, 1)
          this.setData({
            article: article,
          })
          wx.request({
            url: 'https://www.liuxuan.shop/heida/deletearticle.do',
            method: 'GET',
            data: {
              articleid: deleteEssay[0].articleid,
              userid: deleteEssay[0].userid
            },
            success: () => {
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000,
                mask: true,
              })
              wx.setStorage({
                key: 'article',
                data: this.data.article,
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
        }
      },
      fail: () => {

      }
    })
  }, // 删除文章

  sendComment: function (res) {
    const target = res.target.dataset.index;
    console.log('发表评论')
    wx.navigateTo({
      url: `../contentArticle/contentArticle?send=1&target=${target}`,
    })
  }, // 发评论

  seeDetails: function (res) {
    const target = res.currentTarget.dataset.index;
    console.log('看文章')
    wx.navigateTo({
      url: `../contentArticle/contentArticle?target=${target}`,
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
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        if (!res.data) {
          // 调用登录接口
          app.getUserInfo()
        }
      },
      fail: () => {
        // 调用登录接口
        app.getUserInfo()
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
    wx.request({
      url: 'https://www.liuxuan.shop/heida/getinita.do',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('userId')
      },
      success: (res) => {
        console.log('pull', res)
        res.data = Array.isArray(res.data) ? res.data : [];
        const article = res.data.map((item) => {
          item.times = formatTime(item.times)
          if (item.anonymous === 1) {
            item.anonymousImg = `/image/anonymous${Math.ceil(Math.random() * 7)}.png`
          } else {
            item.anonymousImg = ''
          }
          return item
        })
        this.setData({
          article: article,
        })
        wx.setStorage({
          key: 'article',
          data: article,
        })
      },
      fail: () => {
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
        articleid: this.data.article[this.data.article.length - 1].articleid,
        userid: wx.getStorageSync('userId')
      },
      success: (res) => {
        console.log('bottom', res);
        res.data = Array.isArray(res.data) ? res.data : [];
        const article = res.data.map((item) => {
          item.times = formatTime(item.times)
          if (item.anonymous === 1) {
            item.anonymousImg = `/image/anonymous${Math.ceil(Math.random() * 7)}.png`
          } else {
            item.anonymousImg = ''
          }
          return item
        })
        this.setData({
          article: this.data.article.concat(article),
        })
        wx.setStorage({
          key: 'article',
          data: this.data.article,
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