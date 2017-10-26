// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
     ],
     indicatorDots: true,
     autoplay: true,
     circular: true,
     interval: 5000,
     duration: 1000,
     _num: 1,
     essay:{}
  },
  menuClick:function(e){
      this.setData({
         _num:e.target.dataset.num
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.request({
         url: 'https://www.easy-mock.com/mock/59393fce91470c0ac10d65cf/heida/item',       
         success:(res)=>{
            this.setData({
               essay : res.data.data
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
     wx.request({
        url: 'https://www.easy-mock.com/mock/59393fce91470c0ac10d65cf/heida/item',
        success: (res) => {
           this.setData({
              essay: res.data.data
           })
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