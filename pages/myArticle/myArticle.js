// pages/myArticle/myArticle
import formatTime from '../../utils/util'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    unLikeUrl: "/image/heart.png",
    likeUrl: "/image/heart1.png",
    _indexTitle: 1, // switch 顶部
    article: [], // 记录所有文章信息
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
              articleid: deleteEssay[0].articleid
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

  getArticle: function(types) {
    wx.request({
      url: 'https://www.liuxuan.shop/heida/',
      method: 'GET',
      data: {
        userid: wx.getStorageSync('userId')
      },
      success: (res) => {
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
      },
      fail: () => {
        console.log('fail');
      },
      complete: (res) => {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const types = options.type
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
    switch (types) {
      case 'article':

        break;
      case 'comment':
        break;
      case 'liked':
        break;
      default:
        break;
    }

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