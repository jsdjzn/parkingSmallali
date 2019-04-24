const app = getApp();
Page({
  data: {
    motto: '鼎集智慧停车',
    plateNumbers:'', 
    banner: 'https://njyf.jskingen.com/images/indexBanner2.jpg',
    carnumber:'../../img/myCarNumber/showNumber.png',
    carownerId:''
  },
  onShow: function () {
    if(app.globalData.carOwnerId !=''){
      my.httpRequest({
        url: app.globalData.url+'login/getAllPlatenumber',
        method: 'GET',
        header:{
          'content-type': 'application/json'
        },
        dataType: 'json',
        data:{carOwnerId:app.globalData.carOwnerId},//获取输入的内容
        success: (res) => {
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
      if(plateNumber[i].plateNumber == ev.currentTarget.dataset.name){
        app.globalData.carId = plateNumber[i].carId;
      }
    }
    app.globalData.plateNumbers = ev.currentTarget.dataset.name;
    my.httpRequest({
          url: app.globalData.url+'payment/hasIoRecord',
          method: 'GET',
          header:{
            'content-type': 'application/json'
          },
          dataType: 'json',
          data:{
                plateNumber:app.globalData.plateNumbers,
                },//获取输入的内容
          success: (res) => {
            if(res.data.ioRecord == 0){
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
        if(result.confirm){
          my.httpRequest({
            url: app.globalData.url+'payment/deletPlateNumber',
            method: 'GET',
            header:{
              'content-type': 'application/json'
            },
            dataType: 'json',
            data:{plateNumber:ev.currentTarget.dataset.name},//获取输入的内容
            success: (res) => {
              var platenumbers = this.data.plateNumbers;
              for(var i=0;i<platenumbers.length;i++){
                if(platenumbers[i].plateNumber == ev.currentTarget.dataset.name){
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
        }        
      },
    })
  },
  customerservice(){
    my.navigateTo({url: '../customerservice/customerservice'});
  }
})
