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
                console.log("缴费："+JSON.stringfy(res));
                /*
                this.setData({
                  receipt:res.data.list
                });
                */
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