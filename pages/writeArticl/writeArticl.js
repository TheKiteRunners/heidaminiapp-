// pages/writeArticl/writeArticl.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      maxFont: 140,
      picUrls: [],
      actionText: "+",
      article: "",
      userInfo: {},
      anonymous: 0, //0--没匿名 / 1--匿名
  },
  inputNum: function(e){//文本框操作
      this.setData({
         maxFont: 140 - e.detail.value.length,
         article: e.detail.value
      })
      if (this.data.maxFont == 0) {
         wx.showModal({
            title: '提示',
            content: '字数超过限制!!!',
            showCancel: 'false',
            success: function (res) {
               if (res.confirm) {
                  console.log('用户点击确定')
               } else if (res.cancel) {
                  console.log('用户点击取消')
               }
            }
         })
      }
  },
  bindPhoto: function () {
     wx.chooseImage({
        success: (res) => {
           let tfps = res.tempFilePaths;
           let _picUrls = this.data.picUrls;
           for (let i = 0; i < tfps.length; i++) {
              _picUrls.push(tfps[i]);
           }
           this.setData({
              picUrls: _picUrls,
           })
        },
     })
  },
  delete: function (e) {
     let index = e.target.dataset.index;
     let _picUrls = this.data.picUrls;
     _picUrls.splice(index, 1);
     if (_picUrls.length === 0) {
        this.setData({
           picUrls: _picUrls,
        })
     }
     this.setData({
        picUrls: _picUrls,
     })
  },
  switchChange: function (e) {//匿名确定函数
    if (e.detail.value) {
      this.setData({
        anonymous: 1
      })
    }else {
      this.setData({
        anonymous: 0
      })
    }
  },
  submit:function(){
     let urls = '';
     let length = this.data.picUrls.length;
     for(let i = 0; i < length; i++){
        urls += this.data.picUrls[i]+'_';
     }
    const userid = wx.getStorageSync('userId');
    const nickname = wx.getStorageSync('nickName');
    const headimg = wx.getStorageSync('avatarUrl');
    wx.request({
      url: 'https://www.liuxuan.shop/heida/inserta.do',
      method: 'POST',
      data: {
        contents: this.data.article,
        userid: userid,
        nickname: nickname,
        headimg: headimg,
        anonymous: this.data.anonymous // 0匿名，1不匿名
      },
      success: function(res) {
        wx.showToast({
          title: '成功发表',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
      }
    })
    wx.navigateBack()

      // wx.navigateBack({
      //    delta: '1?art=' + this.data.article + '&img=' + urls + '&userImg=' + this.data.userInfo.avatarUrl + '&userName=' + this.data.userInfo.nickName
      // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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