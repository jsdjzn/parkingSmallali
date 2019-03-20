App({
  globalData: {
    userInfo:{},
    plateNumbers:"",
    userId:'',
    carOwnerId:'',
    orgId:'3',
    count:'',
    parktime:'',
    intime:'',
    outtime:''
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    my.getAuthCode({
      scopes: 'auth_user',
      success: ({ authCode }) => {
        my.httpRequest({
            url: 'https://njyf.jskingen.com/parkingInterface/djalipay/getAuthorization',
            method: 'GET',
            header:{
              'content-type': 'application/json'
            },
            dataType: 'json',
            data:{authCode:authCode},
            success: (res) => {
              this.globalData.carOwnerId = res.data.carOwnerId,
              this.globalData.userId = res.data.userId,
              my.httpRequest({
                url: 'https://njyf.jskingen.com/parkingInterface/login/getCarNumber',
                method: 'GET',
                header:{
                  'content-type': 'application/json'
                },
                dataType: 'json',
                data:{carOwnerId:this.globalData.carOwnerId},//获取输入的内容
                success: (res) => {
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
                },               
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
      fail: (err) => {
        my.alert({
        title: "错误信息",
        content: JSON.stringify(err)
        })
      } 
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