const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receipt:[
      {receiptNumber:'1234123',
       payResult:'成功',
       plateNumbers:'苏A1234',
       time:'2019年3月5日13时15分12秒',
       payType:'成功',
       payMoney:'1500'},
       {
        receiptNumber:'1234123',
        payResult:'成功',
        plateNumbers:'苏A1234',
        time:'2019年3月5日13时15分12秒',
        payType:'成功',
        payMoney:'1500'}
       ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      my.httpRequest({
            url: 'https://njyf.jskingen.com/parkingInterface/payment/getPayRecord',
            method: 'GET',
            header:{
              'content-type': 'application/json'
            },
            dataType: 'json',
            data:{openid:app.globalData.authCode,
                  carownerId:app.globalData.carownerId ,
                  sysType:'0'},//获取输入的内容
            success: (res) => {
              my.setData({
                receipt:res.data.list
              });
            },
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