var app = getApp();
var RSA = require('../../utils/wx_rsa.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:'',
    parktime:'',
    intime:'',
    outtime:'',
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
    var encStr = ""
    var input_rsa = app.globalData.plateNumbers;
    var jsonData = JSON.stringify({ plateNumber: input_rsa})
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(app.globalData.publicKey);
    encStr = encrypt_rsa.encrypt(jsonData)
    encStr = RSA.hex2b64(encStr);
    my.request({
      url: app.globalData.url+'payment/getPay',
      method: 'POST',
      header:{
        'content-type': 'application/json'
      },
      dataType: 'json',
      data:{requestData: encStr},//获取输入的内容
      success: (res) => {
        if(res.data.code === 500){
              my.alert({
                title: "错误信息",
                content: res.data.msg
              })
        } else {
          this.setData({
            count:res.data.fee,
            parktime:res.data.stayTime,
            intime:res.data.inTime,
            outtime:res.data.outTime
          })
          if(res.data.fee == 0){
            my.alert({
              title:"免费",
              content:"本次停车无需支付费用！"
            })
          }
        }
        var encStr = ""
        var orgId=app.globalData.orgId;
        var ownerId=app.globalData.carOwnerId;
        var plateNumber=app.globalData.plateNumbers;
        var carId=app.globalData.carId;
        var payType='1';
        var payResult='1';
        var payMoney=this.data.count;
        var jsonData = JSON.stringify({ orgId: orgId, 
                                        ownerId: ownerId,
                                        plateNumber: plateNumber,
                                        carId: carId,
                                        payType: payType,
                                        payResult: payResult,
                                        payMoney: payMoney})
        var encrypt_rsa = new RSA.RSAKey();
        encrypt_rsa = RSA.KEYUTIL.getKey(app.globalData.publicKey);
        encStr = encrypt_rsa.encrypt(jsonData)
        encStr = RSA.hex2b64(encStr);
        my.request({
          url: app.globalData.url+'payment/addReceipt',
          method: 'POST',
          header:{
            'content-type': 'application/json'
          },
          dataType: 'json',
          data:{requestData: encStr},//获取输入的内容
          success: (res) => {
                app.globalData.receiptNumber = res.data.receiptNumber      
          },
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
          title: "错误信息",
          content: JSON.stringify(err)
        })
      }, 
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
      var that = this;
      if(that.data.count == 0){
         my.alert({
            title:"免费",
            content:"本次停车无需支付费用！"
          })
      }else{
        var encStr = ""
        var outTradeNo= app.globalData.receiptNumber;
        var buyer_id= app.globalData.userId;
        var jsonData = JSON.stringify({ outTradeNo: outTradeNo, buyer_id: buyer_id})
        var encrypt_rsa = new RSA.RSAKey();
        encrypt_rsa = RSA.KEYUTIL.getKey(app.globalData.publicKey);
        encStr = encrypt_rsa.encrypt(jsonData);
        encStr = RSA.hex2b64(encStr);
        my.request({
        url: app.globalData.url+'alipay/createtrade',
        method: 'POST',
        header:{
            'content-type': 'application/json'
          },
        data: {
          requestData: encStr
         },
         dataType: 'json',
        success: function(res) {
          if(res.data.code === 500){
              my.alert({
                title: "错误信息",
                content: res.data.msg
              })
          } else {
            that.tradePay(res.data.qr_code);
          }
        },
        fail: function(res) {
          my.alert({
              title: "错误信息",
              content: JSON.stringify(res)
            })
        },
        complete: function(res) {
          my.hideLoading();
        }
      });
      }  
    },
    tradePay: function(tradeNO){
      my.tradePay({
        tradeNO: tradeNO,  
        success: function(res) {
          my.alert(res.resultCode);
        },
        fail: function(res) {
            my.alert(res.resultCode);
          },
      });
  }
  
})