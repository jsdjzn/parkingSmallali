const app = getApp();
Page({
  externalClasses: ['v-panel'],

  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    buttonBorder: {
      type: String,
      value: "1px solid #ccc"
    },
    backgroundColor: {
      type: String,
      value: "#fff"
    },
    //1为省份键盘，其它为英文键盘
    keyBoardType: {
      type: Number,
      value: 1,
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    motto: '欢迎进入鼎集智慧停车场',
    userInfo: {},
    orgId:3,
    platenumbers: null,
    banner: '../../img/logginNumber.png',
    isHide:false,
    canIUse: my.canIUse('button.open-type.getAuthorize'),
    keyVehicle1: '陕京津沪冀豫云辽',
    keyVehicle2: '黑湘皖鲁新苏浙赣',
    keyVehicle3: '鄂桂甘晋蒙吉闽贵',
    keyVehicle4: '粤川青藏琼宁渝',
    keyNumber: '1234567890',
    keyEnInput1: 'QWERTYUIOP',
    keyEnInput2: 'ASDFGHJKL',
    keyEnInput3: 'ZXCVBNM'
  },
    methods: {
    vehicleTap: function (event) {
      let val = event.target.dataset.value;
      switch (val) {
        case 'delete':
          this.triggerEvent('delete');
          this.triggerEvent('inputchange');
          break;
        case 'ok':
          this.triggerEvent('ok');
          break;
        default:
          this.triggerEvent('inputchange', val);
      }
    },
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
  jumpPlatenumbers:function(){
    my.httpRequest({
            url: 'http://localhost:13382/parkingInterface/djalipay/addplateNumbers',
            method: 'GET',
            header:{
              'content-type': 'application/json'
            },
            dataType: 'json',
            data:{authCode:this.globalData.authCode,
                  plateNumbers:plateNumbers},//获取输入的内容
            success: (res) => {
              my.navigateTo({
                url: '../platenumbers/platenumbers' 
              });
            },
          });
  }
})