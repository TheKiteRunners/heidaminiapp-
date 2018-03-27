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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('load', options)
    const { nickname, headimg, contents, articleid, anonymous} = options
    this.setData({
      nickname: nickname,
      headimg: headimg,
      contents: decodeURIComponent(contents),
      articleid: articleid,
      anonymous: anonymous
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