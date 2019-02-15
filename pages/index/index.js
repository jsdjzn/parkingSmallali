const app = getApp();
const APP_ID = 'wxf3c91c2174e643cf';//输入小程序appid  
const APP_SECRET = '25c0b63e550c6ac5024739beac984aeb';//输入小程序app_secret  
var OPEN_ID = ''//储存获取到openid  
var SESSION_KEY = ''//储存获取到session_key
Page({

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
    canIUse: my.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //是否授权
    my.getSetting({
      success: function (res) {
        //授权成功，显示输入车牌号
        //console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']){
             that.setData({
                isHide: false
              });
        }else{
          that.setData({
            isHide: true
          });
        }
      }
    })  
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
  , bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      that.setData({
        isHide: false,
        userInfo: e.detail.userInfo
      });
      //给全局变量赋值
      app.globalData.userInfo = e.detail.userInfo;
      //获取用户的openid
      my.login({
        success: function (res) {
          my.request({
            //获取openid接口  
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
            data: {
              appid: APP_ID,
              secret: APP_SECRET,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            success: function (res) {
              console.log("openid:"+res.data.openid)
              OPEN_ID = res.data.openid;//获取到的openid  
              SESSION_KEY = res.data.session_key;//获取到session_key  
              var userInfo={
                openid: OPEN_ID,
                session_key: SESSION_KEY,
                nickName:app.globalData.userInfo.nickName
              }
              my.request({
                url: 'http://localhost:8082/parkingInterface/login/getOpenid',
                data: {
                  openid: OPEN_ID,
                  session_key: SESSION_KEY,
                  nickName: app.globalData.userInfo.nickName
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  console.log(res.data)
                  // wx.navigateTo({
                  //   url: '../pay/pay?money=' + res.data.money
                  // })
                }
              })
            }
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      my.showModal({
        title: '警告',
        content: '拒绝授权小程序将无法正常为您提供服务，请授权登录',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
         // var that = this;
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
           // that.setData();
            that.setData({
              isHide:true
            });
          }
        }
      });
    }




  }, jumpPlatenumbers:function(){
    my.switchTab({
      url: '../platenumbers/platenumbers',
    })
  }, getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
})

