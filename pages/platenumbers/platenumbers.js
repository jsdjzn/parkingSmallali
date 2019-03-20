const app = getApp();
Page({
  data: {
    motto: '鼎集智慧停车',
    plateNumbers:"", 
    banner: '../../img/myCarNumber/successful.png',
    carnumber:'../../img/myCarNumber/showNumber.png',
    carownerId:''
  },
  onShow: function () {
    var that = this;
    if (app.globalData.carOwnerId != ''){
      that.setData({
        carownerId:app.globalData.carOwnerId
      })
    }else{
      app.callback = () => {
        that.setData({
          carownerId: app.globalData.carOwnerId,
        })
      };
    }
    if(that.data.carownerId !=''){
      my.httpRequest({
        url: 'https://njyf.jskingen.com/parkingInterface/login/getAllPlatenumber',
        method: 'GET',
        header:{
          'content-type': 'application/json'
        },
        dataType: 'json',
        data:{carOwnerId:app.globalData.carOwnerId},//获取输入的内容
        success: (res) => {
          console.log("车牌接口"+JSON.stringify(res));
          this.setData({
            plateNumbers:res.data.userInfo
          });
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
  pay(ev) {
    var plateNumber = this.data.plateNumbers;
    for(var i =0;i<plateNumber.length;i++){
      if(plateNumber[i].plateNumber == ev.currentTarget.id){
        app.globalData.carId = plateNumber[i].carId;
      }
    }
    app.globalData.plateNumbers = ev.currentTarget.id;
    my.httpRequest({
          url: 'https://njyf.jskingen.com/parkingInterface/payment/hasIoRecord',
          method: 'GET',
          header:{
            'content-type': 'application/json'
          },
          dataType: 'json',
          data:{
                plateNumber:app.globalData.plateNumber,
                },//获取输入的内容
          success: (res) => {
            if(res.data.ioRecord == 1){
              my.alert({
                title: "无需付费",
                content: "您尚未停车，无需缴费！"
              })
            }else if(res.data.ioRecord == 1){
              my.httpRequest({
                url: 'https://njyf.jskingen.com/parkingInterface/payment/getPay',
                method: 'GET',
                header:{
                  'content-type': 'application/json'
                },
                dataType: 'json',
                data:{plateNumber:app.globalData.plateNumbers},//获取输入的内容
                success: (res) => {
                  app.globalData.count = res.data.fee;
                  app.globalData.intime = res.data.inTime;
                  app.globalData.outtime = res.data.outTime;
                  app.globalData.parktime = res.data.stayTime;
                  if(res.data.count == 0){
                    my.alert({
                      title:"免费",
                      content:"本次停车无需支付费用！"
                    })
                  }else{
                    my.navigateTo({ url: '../pay/pay' });
                  }
                },
                fail: (err) => {
                  my.alert({
                    title: "错误信息",
                    content: JSON.stringify(err)
                  })
                }, 
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
  navigateTo() {
    my.navigateTo({ url: '../nokeypay/nokeypay' });
  },
  navigateToaddPn() {
    my.navigateTo({url: '../addplatenumbers/addplatenumbers'});
  },
  delPlateNumber(ev) {
    my.alert({
      title: "删除车牌",
      content: "是否删除车牌",
      success: () => {
        my.httpRequest({
          url: 'https://njyf.jskingen.com/parkingInterface/payment/deletPlateNumber',
          method: 'GET',
          header:{
            'content-type': 'application/json'
          },
          dataType: 'json',
          data:{plateNumber:ev.currentTarget.id},//获取输入的内容
          success: (res) => {
            var platenumbers = this.data.plateNumbers;
            for(var i=0;i<platenumbers.length;i++){
              if(platenumbers[i].plateNumber == ev.currentTarget.id){
                platenumbers.splice(i,1);
              }
            }
            this.setData({
              plateNumbers:platenumbers
            })
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
  },
})
