const app = getApp();
var RSA = require('../../utils/wx_rsa.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receipt:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
         var encStr = ""
         var input_rsa = app.globalData.carOwnerId;
         var jsonData = JSON.stringify({ carownerId: input_rsa})
         var encrypt_rsa = new RSA.RSAKey();
         encrypt_rsa = RSA.KEYUTIL.getKey(app.globalData.publicKey);
         encStr = encrypt_rsa.encrypt(jsonData)
         encStr = RSA.hex2b64(encStr);
      my.request({
            url: app.globalData.url+'payment/getPayRecord',
            method: 'POST',
            header:{
              'content-type': 'application/json'
            },
            dataType: 'json',
            data:{requestData: encStr},//获取输入的内容
            success: (res) => {
              console.log("缴费："+JSON.stringfy(res));
              this.setData({
                receipt:res.data.list
              });
            },
            fail: (err) => {
              my.alert({
                title: "错误信息",
                content: JSON.stringify(err)
              })
            }
          });
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

  }, 
})