App({
  globalData: {
    userInfo:{},
    plateNumbers:"",
    userId:'',
    carOwnerId:'',
    orgId:'3',
    receiptNumber:'',
    //url:'http://localhost:13382/parkingInterface/',
    url:'https://njyf.jskingen.com/parkingInterface/'
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    my.getAuthCode({
      scopes: 'auth_user',
      success: ({ authCode }) => {
        my.httpRequest({
            url: this.globalData.url+'djalipay/getAuthorization',
            method: 'GET',
            header:{
              'content-type': 'application/json'
            },
            dataType: 'json',
            data:{authCode:authCode},
            success: (res) => {
              this.globalData.carOwnerId = res.data.carOwnerId,
              this.globalData.userId = res.data.userId   
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
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
    });
  },
});