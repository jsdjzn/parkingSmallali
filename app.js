App({
  globalData: {
    userInfo:{},
    plateNumbers:[],
    authCode:'',
    carOwnerId:''
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    my.getAuthCode({
      scopes: 'auth_user',
      success: ({ authCode }) => {
        console.log("授权码："+authCode);
        my.httpRequest({
            url: 'http://localhost:13382/parkingInterface/djalipay/getAuthorization',
            method: 'GET',
            header:{
              'content-type': 'application/json'
            },
            dataType: 'json',
            data:{authCode:authCode},
            success: (res) => {
              console.log("授权接口："+JSON.stringify(res))
              this.globalData.carOwnerId = res.data.carOwnerId,
              this.globalData.authCode = res.data.authCode,
              console.log("全局变量："+JSON.stringify(this.globalData));
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
                  if(res.data.carNumber === 0){
                    my.navigateTo({ 
                    url: '../addplatenumbers/addplatenumbers' }
                    );
                  }else {
                    my.navigateTo({ 
                    url: '../platenumbers/platenumbers' }
                  );
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
            fail: (err) => {
              my.alert({
                title: "错误信息",
                content: JSON.stringify(err)
            })
          }
          });
        
      },
    });
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function () {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
});