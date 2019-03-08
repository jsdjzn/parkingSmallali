Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:'5.00',
    parktime:'12小时0分0秒',
    intime:'2019年3月5号0时0分0秒',
    outtime:'2019年3月5号12时0分0秒'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    my.httpRequest({
      url: 'http://localhost:13382/parkingInterface/payment/getPay',
      method: 'GET',
      header:{
        'content-type': 'application/json'
      },
      dataType: 'json',
      data:{plateNumbers:plateNumbers},//获取输入的内容
      success: (res) => {
        console.log("缴费接口："+JSON.stringify(res));
        this.setDate({
          count:res.data.fee,
          parktime:res.data.stayTime,
          intime:res.data.inTime,
          outtime:res.data.outTime
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

  }
})