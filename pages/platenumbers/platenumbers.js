const app = getApp();
var RSA = require('../../utils/wx_rsa.js');
Page({
  data: {
    motto: '鼎集智慧停车',
    plateNumbers:[{plateNumber:123123}], 
    banner: 'https://njyf.jskingen.com/images/indexBanner2.jpg',
    carnumber:'../../img/myCarNumber/showNumber.png',
    carownerId:''
  },
  onShow: function () {
    var encStr = "";
    var input_rsa = app.globalData.carOwnerId;
    var jsonData = JSON.stringify({ carOwnerId: input_rsa})
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(app.globalData.publicKey);
    encStr = encrypt_rsa.encrypt(jsonData)
    encStr = RSA.hex2b64(encStr);
    my.request({
      url: app.globalData.url+'login/getAllPlatenumber',
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
            plateNumbers:res.data.userInfo
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
  pay(ev) {
    var plateNumber = this.data.plateNumbers;
    for(var i =0;i<plateNumber.length;i++){
      if(plateNumber[i].plateNumber == ev.currentTarget.dataset.name){
        app.globalData.carId = plateNumber[i].carId;
      }
    }
    app.globalData.plateNumbers = ev.currentTarget.dataset.name;
    var encStr = ""
    var input_rsa = app.globalData.plateNumbers;
    var jsonData = JSON.stringify({ plateNumber: input_rsa})
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(app.globalData.publicKey);
    encStr = encrypt_rsa.encrypt(jsonData)
    encStr = RSA.hex2b64(encStr);
    my.request({
          url: app.globalData.url+'payment/hasIoRecord',
          method: 'POST',
          header:{
            'content-type': 'application/json'
          },
          dataType: 'json',
          data:{
                requestData: encStr
                },//获取输入的内容
          success: (res) => {
            if(res.data.code === 500){
                my.alert({
                title: "错误信息",
                content: res.data.msg
                })
            } else if(res.data.ioRecord == 0){
              my.alert({
                title: "无需付费",
                content: "您尚未停车，无需缴费,如有问题，请联系管理员！！"
              })
            }else if(res.data.ioRecord == 1){
              my.navigateTo({ url: '../pay/pay' });
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
  navigateTo() {
    my.navigateTo({ url: '../nokeypay/nokeypay' });
  },
  navigateToaddPn() {
    my.navigateTo({url: '../addplatenumbers/addplatenumbers'});
  },
  query(){
    my.navigateTo({url: '../my/my'});
  },
  delPlateNumber(ev) {
    my.confirm({
      title: "删除车牌",
      content: "是否删除车牌",
      confirmButtonText:"确认",
      cancelButtonText:"取消",
      success: (result) => {
        /*if(result.data.code === 500){
                my.alert({
                title: "错误信息",
                content: res.data.msg
                })
          }else */ if(result.confirm){
          var encStr = ""
          var input_rsa = ev.currentTarget.dataset.name;
          var jsonData = JSON.stringify({ plateNumber: input_rsa})
          var encrypt_rsa = new RSA.RSAKey();
          encrypt_rsa = RSA.KEYUTIL.getKey(app.globalData.publicKey);
          encStr = encrypt_rsa.encrypt(jsonData)
          encStr = RSA.hex2b64(encStr);
          my.request({
            url: app.globalData.url+'payment/deletPlateNumber',
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
                var platenumbers = this.data.plateNumbers;
                for(var i=0;i<platenumbers.length;i++){
                  if(platenumbers[i].plateNumber == ev.currentTarget.dataset.name){
                    platenumbers.splice(i,1);
                  }
                }
                this.setData({
                  plateNumbers:platenumbers
                })
              } 
            },
            fail: (err) => {
              my.alert({
                title: "错误信息",
                content: JSON.stringify(err)
              })
          } 
        });
        }        
      },
    })
  },
  customerservice(){
    my.navigateTo({url: '../customerservice/customerservice'});
  }
})
