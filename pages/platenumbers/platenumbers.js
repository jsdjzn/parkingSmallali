const app = getApp();
Page({
  data: {
    motto: '鼎集智慧停车',
    plateNumbers:[{number:'苏A1234'}], 
    banner: '../../img/myCarNumber/successful.png',
    carnumber:'../../img/myCarNumber/showNumber.png',
  },
  //事件处理函数
  bindViewTap: function() {
    my.navigateTo({
      url: '../about/about'
    })
  },
  onLoad: function () {
    my.httpRequest({
      url: 'http://localhost:13382/parkingInterface/login/getCarNumber',
      method: 'GET',
      header:{
        'content-type': 'application/json'
      },
      dataType: 'json',
      data:{carOwnerId:this.globalData.carOwnerId},//获取输入的内容
      success: (res) => {
        console.log("车辆接口："+JSON.stringify(res));
        this.globalData.plateNumbers = res.data.carlist,
        this.setData({
          plateNumbers:res.data.carlist
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
  pay(ev) {
    console.log(ev);
    my.alert({
      content: `点击了第${JSON.stringify(ev.detail)}行`,
    });
  },
  navigateTo() {
    my.navigateTo({ url: '../nokeypay/nokeypay' });
  },
  navigateToaddPn() {
    my.navigateTo({url: '../addplatenumbers/addplatenumbers'});
  },
  delPlateNumber() {
    
  },
  onScrollToLower() {
    const { items5 } = this.data;
    const newItems = items5.concat(newitems);
    console.log(newItems.length);
    this.setData({
      items5: newItems,
    });
  },
})
