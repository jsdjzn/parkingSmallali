const app = getApp();
var RSA = require('../../utils/wx_rsa.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiptItem1:'收款单号：',
    receipt:[{receiptNumber:201903123161171334,
              payResult:-1,
              plateNumber:'苏A0001',
              time:'2019-04-01 16:13:15',
              payType:'1',
              payMoney:'5'},
              {receiptNumber:201903123161171334,
              payResult:0,
              plateNumber:'苏A0001',
              time:'2019-04-01 16:13:15',
              payType:'2',
              payMoney:'5'}],
    isTrue:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
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
              if(res.data.code === 500){
                my.alert({
                  title: "错误信息",
                  content: res.data.msg
                })
              } else { 
                console.log(res.data.list)
                if (res.data.list.length === 0) {
                  this.setData({
                    isTrue:true
                  });
                }         
                this.setData({
                  receipt:res.data.list
                });           
              }
            },
            fail: (err) => {
              my.alert({
                title: "错误信息",
                content: JSON.stringify(err)
              })
            }
          });
  },
})
