var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    parktime:'0分',
    intime:'0',
    outtime:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    
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
    this.setData({
      count:app.globalData.count,
      parktime:app.globalData.parktime,
      intime:app.globalData.intime,
      outtime:app.globalData.outtime
    });
    my.httpRequest({
      url: 'https://njyf.jskingen.com/parkingInterface/payment/getPay',
      method: 'GET',
      header:{
        'content-type': 'application/json'
      },
      dataType: 'json',
      data:{plateNumber:app.globalData.plateNumbers},//获取输入的内容
      success: (res) => {
         this.setData({
           count:res.data.fee,
           parktime:res.data.stayTime,
           intime:res.data.inTime,
           outtime:res.data.outTime
         });
         if(res.data.count == 0){
           my.alert({
             title:"免费",
             content:"本次停车无需支付费用！"
           })
         }
        my.httpRequest({
          url: 'https://njyf.jskingen.com/parkingInterface/payment/addReceipt',
          method: 'GET',
          header:{
            'content-type': 'application/json'
          },
          dataType: 'json',
          data:{orgId:app.globalData.orgId,
                ownerId:app.globalData.carOwnerId,
                plateNumber:app.globalData.plateNumber,
                carId:app.globalData.carId,
                payType:'1',
                payResult:"1",
                payMoney:this.data.count
                },//获取输入的内容
          fail: (err) => {
            my.alert({
            title: "错误信息",
            content: JSON.stringify(err)
          })
        } 
        });
      },
      fail: (err) => {
          my.alert({
          title: "错误信息1111",
          content: JSON.stringify(err)
          })
        } 
    });
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
    pay() {
      console.log("1111111111111111111");
      var that = this;
      my.httpRequest({
        url: 'https://njyf.jskingen.com/parkingInterface/alipay/createtrade',//须加httpRequest域白名单
        method: 'POST',
        data: {
        outTradeNo: '1111', 
        buyer_id: '1234', },
        dataType: 'json',
        success: function(res) {
          that.tradePay(res.data.trade_no);
        },
        fail: function(res) {
        },
        complete: function(res) {
          my.hideLoading();
        }
      });
    },
})